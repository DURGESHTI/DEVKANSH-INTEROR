
'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';

type Kind = 'gallery' | 'testimonial' | 'blog' | 'announcement';
type RecordItem = { key: string; status: string; payload: any };

const labels: Record<Kind, string> = {
  gallery: 'Gallery Photo',
  testimonial: 'Customer Review / Video',
  blog: 'Blog Post',
  announcement: 'Announcement Photo / Video',
};

const categories = [
  'Bedroom',
  'Hall',
  'Living Area',
  'Kitchen',
  'Bathroom',
  'Office Interior',
  'Commercial Interior',
  'Modular Kitchen',
  'Wardrobe',
  'Interior Tips',
  'Other',
];

const blank: any = {
  title: '',
  name: '',
  category: 'Bedroom',
  text: '',
  imageUrl: '',
  videoUrl: '',
  rating: '5',
  excerpt: '',
  slug: '',
  keywords: '',
  seoTitle: '',
  metaDescription: '',
  images: [],
};

const input =
  'mt-1 w-full rounded border border-white/20 bg-black/20 p-3 text-white placeholder:text-white/40';

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/* Google Drive URL को image preview URL में बदलता है */
function getDriveImageUrls(url: string): string[] {
  if (!url) return [];

  try {
    const idMatch =
      url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      url.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
      url.match(/\/d\/([a-zA-Z0-9_-]+)/);

    if (!idMatch?.[1]) return [url];

    const id = idMatch[1];

    return [
      `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
      `https://drive.google.com/uc?export=view&id=${id}`,
      `https://drive.google.com/uc?id=${id}&export=download`,
    ];
  } catch {
    return [url];
  }
}

/* Preview में एक URL fail होने पर अगला URL आज़माता है */
function DriveImage({
  url,
  alt,
  className,
}: {
  url: string;
  alt: string;
  className?: string;
}) {
  const urls = getDriveImageUrls(url);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [url]);

  if (!urls.length) {
    return (
      <div className="flex h-28 items-center justify-center rounded bg-black/20 text-xs text-white/50">
        No image
      </div>
    );
  }

  return (
    <img
      src={urls[index]}
      alt={alt}
      className={className || 'h-28 w-full rounded object-cover'}
      onError={() => {
        if (index < urls.length - 1) setIndex(index + 1);
      }}
    />
  );
}

export default function AdminPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);
  const uploadLockRef = useRef(false);
  const [kind, setKind] = useState<Kind>('gallery');

  const [form, setForm] = useState<any>(blank);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [editing, setEditing] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [articleFiles, setArticleFiles] = useState<File[]>([]);
  const [featuredVideoFile, setFeaturedVideoFile] = useState<File | null>(null);

  useEffect(() => {
    fetch('/api/admin', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        setOk(!!d.authenticated);
        if (d.authenticated) load();
      })
      .catch(() => {});
  }, []);

  function resetForm() {
    setForm({ ...blank, images: [] });
    setEditing('');
    setImageFile(null);
    setVideoFile(null);
    setArticleFiles([]);
  }

  async function login(e: FormEvent) {
    e.preventDefault();
    setBusy(true);

    try {
      const r = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password: pw }),
      });

      const d = await r.json();
      setOk(!!d.ok);
      setMsg(d.ok ? 'Login successful' : d.error || 'Login failed');

      if (d.ok) await load();
    } catch {
      setMsg('Login request failed');
    } finally {
      setBusy(false);
    }
  }

  async function load() {
    setBusy(true);

    try {
      const r = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'list' }),
      });

      const d = await r.json();

      if (!r.ok) throw new Error(d.error || 'Load failed');

      setRecords(
        (d.result?.records || []).filter((x: RecordItem) =>
          ['gallery', 'testimonial', 'blog', 'announcement', 'featured-review-video'].some((k) =>
            x.key.startsWith(k + ':')
          )
        )
      );

      setMsg('Google Sheets से रिकॉर्ड लोड हो गए');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Load failed');
    } finally {
      setBusy(false);
    }
  }

  async function upload(file: File, mediaKind: 'image' | 'video') {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('kind', mediaKind);

    const r = await fetch('/api/cms/upload', {
      method: 'POST',
      body: fd,
    });

    const d = await r.json();

    if (!r.ok || !d.ok || !d.url) {
      throw new Error(d.error || 'Upload failed');
    }

    return d.url as string;
  }

  async function save(e: FormEvent, publish: boolean) {
    e.preventDefault();

    if (uploadLockRef.current) return;

    if (!form.title.trim()) {
      setMsg('Title जरूरी है');
      return;
    }

    uploadLockRef.current = true;
    setBusy(true);

    try {
      let imageUrl = form.imageUrl || '';
      let videoUrl = form.videoUrl || '';
      let images: string[] = Array.isArray(form.images)
        ? [...form.images]
        : [];

      if (imageFile) {
        setMsg('Main Photo Google Drive पर अपलोड हो रही है...');
        imageUrl = await upload(imageFile, 'image');
      }

      if (videoFile) {
        setMsg('Video Google Drive पर अपलोड हो रहा है...');
        videoUrl = await upload(videoFile, 'video');
      }

      if (articleFiles.length > 0) {
        setMsg('Article Photos Google Drive पर अपलोड हो रही हैं...');

        for (const file of articleFiles) {
          const uploadedUrl = await upload(file, 'image');
          images.push(uploadedUrl);
        }
      }

      const slug =
        form.slug?.trim() || makeSlug(form.title) || `blog-${Date.now()}`;

      const payload = {
        ...form,
        imageUrl,
        videoUrl,
        images,
        slug,
        rating: Number(form.rating) || 5,
      };

      const key = editing || `${kind}:${Date.now()}`;

      const r = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          key,
          payload,
          status: publish ? 'published' : 'draft',
        }),
      });

      const d = await r.json();

      if (!r.ok || !d.result?.ok) {
        throw new Error(d.error || d.result?.error || 'Save not confirmed');
      }

      setMsg(publish ? 'Publish हो गया' : 'Draft सेव हो गया');

      resetForm();
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Save failed');
    } finally {
      uploadLockRef.current = false;
      setBusy(false);
    }
  }

  async function remove(x: RecordItem) {
    if (!confirm('क्या इस रिकॉर्ड को हटाना है?')) return;

    setBusy(true);

    try {
      const r = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          key: x.key,
          payload: x.payload,
          status: 'deleted',
        }),
      });

      const d = await r.json();

      if (!r.ok || !d.result?.ok) {
        throw new Error(d.error || 'Delete failed');
      }

      setMsg('रिकॉर्ड हटाया गया');
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  }

  const featuredVideo = records.find(
    (x) => x.key === 'featured-review-video:main' && x.status !== 'deleted'
  );

  async function uploadFeaturedVideo() {
    if (!featuredVideoFile) {
      setMsg('पहले वीडियो चुनें');
      return;
    }
    if (featuredVideo) {
      setMsg('पहले मौजूदा Featured Review Video Delete करें');
      return;
    }
    if (uploadLockRef.current) return;

    uploadLockRef.current = true;
    setBusy(true);
    try {
      setMsg('Featured Review Video Google Drive पर अपलोड हो रहा है...');
      const videoUrl = await upload(featuredVideoFile, 'video');
      const r = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          key: 'featured-review-video:main',
          payload: { videoUrl },
          status: 'published',
        }),
      });
      const d = await r.json();
      if (!r.ok || !d.result?.ok) {
        throw new Error(d.error || d.result?.error || 'Featured video save failed');
      }
      setFeaturedVideoFile(null);
      setMsg('Featured Review Video सेव हो गया');
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Featured video upload failed');
    } finally {
      uploadLockRef.current = false;
      setBusy(false);
    }
  }

  async function deleteFeaturedVideo() {
    if (!featuredVideo) return;
    if (!confirm('क्या मौजूदा Featured Review Video हटाना है?')) return;

    setBusy(true);
    try {
      const r = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          key: featuredVideo.key,
          payload: featuredVideo.payload,
          status: 'deleted',
        }),
      });
      const d = await r.json();
      if (!r.ok || !d.result?.ok) {
        throw new Error(d.error || d.result?.error || 'Delete failed');
      }
      setMsg('Featured Review Video हट गया। अब नया वीडियो अपलोड कर सकते हैं।');
      await load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  }

  function edit(x: RecordItem) {
    const p = x.payload || {};

    setKind(x.key.split(':')[0] as Kind);

    setEditing(x.key);

    setForm({
      ...blank,
      ...p,
      images: Array.isArray(p.images) ? p.images : [],
      rating: String(p.rating || 5),
    });

    setImageFile(null);
    setVideoFile(null);
    setArticleFiles([]);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function logout() {
    await fetch('/api/admin', { method: 'DELETE' });
    setOk(false);
    setPw('');
    resetForm();
    setRecords([]);
    setMsg('Logout हो गया');
  }

  function removeArticleImage(index: number) {
    setForm((old: any) => ({
      ...old,
      images: old.images.filter((_: string, i: number) => i !== index),
    }));
  }

  const visible = useMemo(
    () =>
      records.filter(
        (x) => x.key.startsWith(kind + ':') && x.status !== 'deleted'
      ),
    [records, kind]
  );

  if (!ok) {
    return (
      <main className="min-h-screen bg-[#4b2e20] px-4 py-24 text-white">
        <form
          onSubmit={login}
          className="mx-auto max-w-md rounded-xl border border-amber-300/30 bg-[#382116] p-8"
        >
          <div className="mb-5 inline-block bg-white p-2">
            <img
              src="/logo.png"
              alt="Devkansh Interior"
              className="w-48"
            />
          </div>

          <h1 className="text-3xl font-semibold">Admin Login</h1>

          <label className="mt-6 block text-sm">Admin ID</label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoComplete="username"
            className={input}
          />

          <label className="mt-4 block text-sm">Password</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoComplete="current-password"
            className={input}
          />

          <button
            disabled={busy}
            className="mt-6 w-full rounded bg-amber-400 p-3 font-semibold text-black"
          >
            {busy ? 'Please wait...' : 'Login'}
          </button>

          {msg && <p className="mt-3 text-sm text-amber-200">{msg}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#4b2e20] px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-block bg-white p-2">
              <img
                src="/logo.png"
                alt="Devkansh Interior"
                className="w-44"
              />
            </div>
            <h1 className="mt-4 text-3xl font-semibold">
              Website Admin Panel
            </h1>
          </div>

          <button
            onClick={logout}
            className="rounded border border-amber-300/40 px-4 py-2"
          >
            Logout
          </button>
        </header>

        <section className="mt-8 rounded-xl border border-amber-200/20 bg-[#382116] p-6">
          <p className="text-xs uppercase tracking-[.2em] text-amber-300">
            Content Manager
          </p>

          <h2 className="mt-2 text-2xl">Website Content</h2>

          <p className="mt-2 text-sm text-white/70">
            Gallery, Customer Testimonials और Blog को यहाँ से मैनेज करें।
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {(['gallery', 'testimonial', 'blog', 'announcement'] as Kind[]).map(
              (k) => (
                <button
                  key={k}
                  onClick={() => {
                    setKind(k);
                    resetForm();
                  }}
                  className={`rounded px-4 py-3 ${
                    kind === k
                      ? 'bg-amber-400 font-semibold text-black'
                      : 'border border-white/30'
                  }`}
                >
                  {k === 'gallery'
                    ? 'Gallery'
                    : k === 'testimonial'
                      ? 'Testimonials'
                      : k === 'announcement'
                        ? 'Announcements'
                        : 'Blog'}
                </button>
              )
            )}
          </div>

          <form
            onSubmit={(e) => save(e, false)}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold">
                {editing ? 'Edit' : 'Add'} {labels[kind]}
              </h3>
            </div>

            <label className="text-sm">
              Title / Customer Name
              <input
                className={input}
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                placeholder="Title लिखें"
              />
            </label>

            {kind === 'blog' && (
              <>
                <label className="text-sm">
                  Blog Category
                  <select
                    className={input}
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-[#382116]">
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  Short Description / Excerpt
                  <textarea
                    rows={2}
                    className={input}
                    value={form.excerpt}
                    onChange={(e) =>
                      setForm({ ...form, excerpt: e.target.value })
                    }
                  />
                </label>

                <label className="text-sm">
                  Article URL Slug
                  <input
                    className={input}
                    value={form.slug}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        slug: makeSlug(e.target.value),
                      })
                    }
                    placeholder="modern-bedroom-interior"
                  />
                </label>

                <label className="text-sm">
                  Search Keywords (comma separated)
                  <input
                    className={input}
                    value={form.keywords}
                    onChange={(e) =>
                      setForm({ ...form, keywords: e.target.value })
                    }
                    placeholder="bedroom, wardrobe, modern interior"
                  />
                </label>

                <label className="text-sm">
                  SEO Title
                  <input
                    className={input}
                    value={form.seoTitle}
                    onChange={(e) =>
                      setForm({ ...form, seoTitle: e.target.value })
                    }
                  />
                </label>

                <label className="text-sm">
                  SEO Meta Description
                  <textarea
                    rows={2}
                    className={input}
                    value={form.metaDescription}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        metaDescription: e.target.value,
                      })
                    }
                  />
                </label>
              </>
            )}

            {kind !== 'blog' && (
              <label className="text-sm">
                {kind === 'testimonial'
                  ? 'Customer Name'
                  : kind === 'announcement'
                    ? 'Announcement Category'
                    : 'Gallery Section'}
                <input
                  className={input}
                  value={kind === 'testimonial' ? form.name : form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [kind === 'testimonial' ? 'name' : 'category']:
                        e.target.value,
                    })
                  }
                  placeholder={
                    kind === 'testimonial'
                      ? 'Customer name'
                      : 'उदा. Modular Kitchen'
                  }
                />
              </label>
            )}

            <label className="text-sm md:col-span-2">
              {kind === 'blog'
                ? 'Full Blog Content (लेख टेक्स्ट लिखें)'
                : kind === 'testimonial'
                  ? 'Customer Review'
                  : 'Description'}
              <textarea
                rows={kind === 'blog' ? 12 : 5}
                className={input}
                value={form.text}
                onChange={(e) =>
                  setForm({ ...form, text: e.target.value })
                }
                placeholder={
                  kind === 'blog'
                    ? 'मुख्य लेख लिखें। Heading के लिए ## और Subheading के लिए ### लगाएँ।'
                    : 'यहाँ लिखें...'
                }
              />
              {kind === 'blog' && (
                <span className="mt-1 block text-xs text-white/60">
                  Heading: ## Heading लिखें · Subheading: ### Subheading लिखें
                </span>
              )}
            </label>

            <label className="text-sm">
          कंप्यूटर से वीडियो अपलोड (MP4/WEBM/MOV — अधिकतम 50 MB)
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className={`${input} file:mr-3 file:rounded file:border-0 file:bg-amber-400 file:px-3 file:py-2 file:font-semibold file:text-black`}
                onChange={(e) =>
                  setImageFile(e.target.files?.[0] || null)
                }
              />
            </label>

            <label className="text-sm">
              या Main Photo URL
              <input
                className={input}
                value={form.imageUrl}
                onChange={(e) =>
                  setForm({ ...form, imageUrl: e.target.value })
                }
                placeholder="https://..."
              />
            </label>

            {form.imageUrl && (
              <div className="md:col-span-2 rounded border border-white/15 p-3">
                <p className="mb-2 text-sm">Main Photo Preview</p>
                <DriveImage
                  url={form.imageUrl}
                  alt="Main blog photo"
                  className="h-48 max-w-md rounded object-cover"
                />
              </div>
            )}

            {kind === 'blog' && (
              <>
                <label className="text-sm md:col-span-2">
                  Article में लगाने के लिए Multiple Photos चुनें
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className={input}
                    onChange={(e) =>
                      setArticleFiles(Array.from(e.target.files || []))
                    }
                  />
                  <span className="mt-1 block text-xs text-white/60">
                    एक बार में कई फोटो चुन सकते हैं। हर फोटो 3 MB तक होनी चाहिए।
                  </span>
                </label>

                {articleFiles.length > 0 && (
                  <p className="text-sm text-amber-200 md:col-span-2">
                    नई चुनी गई फोटो: {articleFiles.length}
                  </p>
                )}

                {form.images?.length > 0 && (
                  <div className="md:col-span-2 rounded border border-white/20 p-3">
                    <p className="mb-3 text-sm">
                      पहले से सेव Article Photos: {form.images.length}
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {form.images.map((url: string, index: number) => (
                        <div
                          key={`${url}-${index}`}
                          className="rounded border border-white/15 p-2"
                        >
                          <DriveImage
                            url={url}
                            alt={`Article photo ${index + 1}`}
                          />

                          <button
                            type="button"
                            onClick={() => removeArticleImage(index)}
                            className="mt-2 w-full rounded border border-red-300/50 px-2 py-1 text-xs text-red-200"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {(kind === 'testimonial' || kind === 'announcement') && (
              <>
                <label className="text-sm">
                  कंप्यूटर से वीडियो अपलोड (MP4/WEBM/MOV — अधिकतम 3 MB)
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    className={input}
                    onChange={(e) =>
                      setVideoFile(e.target.files?.[0] || null)
                    }
                  />
                </label>

                <label className="text-sm">
                  या Video URL
                  <input
                    className={input}
                    value={form.videoUrl}
                    onChange={(e) =>
                      setForm({ ...form, videoUrl: e.target.value })
                    }
                    placeholder="YouTube / Drive embed URL"
                  />
                </label>

                {kind === 'testimonial' && (
                  <label className="text-sm">
                    Rating (1–5)
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className={input}
                      value={form.rating}
                      onChange={(e) =>
                        setForm({ ...form, rating: e.target.value })
                      }
                    />
                  </label>
                )}
              </>
            )}

            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button
                disabled={busy}
                className="rounded border border-white/30 px-5 py-3"
              >
                Save Draft
              </button>

              <button
                disabled={busy}
                type="button"
                onClick={(e) => save(e as unknown as FormEvent, true)}
                className="rounded bg-amber-400 px-5 py-3 font-semibold text-black"
              >
                Publish
              </button>

              <button
                type="button"
                disabled={busy}
                onClick={resetForm}
                className="rounded border border-white/30 px-5 py-3"
              >
                Clear
              </button>

              <button
                type="button"
                disabled={busy}
                onClick={load}
                className="rounded border border-white/30 px-5 py-3"
              >
                Load from Sheets
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-amber-200">{msg}</p>

          <div className="mt-8 border-t border-white/15 pt-5">
            <h3 className="text-xl font-semibold">
              Saved{' '}
              {kind === 'gallery'
                ? 'Gallery Photos'
                : kind === 'testimonial'
                  ? 'Testimonials'
                  : kind === 'announcement'
                    ? 'Announcements'
                    : 'Blog Posts'}
            </h3>

            <div className="mt-3 grid gap-3">
              {visible.map((x) => (
                <article
                  key={x.key}
                  className="flex flex-wrap items-center justify-between gap-3 rounded border border-white/15 p-4"
                >
                  <div>
                    <p className="font-semibold">
                      {x.payload?.title || x.key}
                    </p>
                    <p className="text-xs text-white/60">
                      {x.status === 'published' ? 'Published' : 'Draft'} ·{' '}
                      {x.payload?.category || x.payload?.name || kind}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => edit(x)}
                      className="rounded border border-white/30 px-3 py-2 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      disabled={busy}
                      onClick={() => remove(x)}
                      className="rounded border border-red-300/50 px-3 py-2 text-sm text-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}

              {visible.length === 0 && (
                <p className="text-sm text-white/60">
                  अभी कोई रिकॉर्ड नहीं है।
                </p>
              )}
            </div>
          </div>

          {kind === 'testimonial' && (
            <div className="mt-6 border-t border-white/15 pt-4">
              {featuredVideo ? (
                <div className="flex flex-wrap items-center justify-between gap-3 rounded border border-white/15 p-3">
                  <span className="text-sm text-amber-200">Featured Review Video सेव है</span>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={deleteFeaturedVideo}
                    className="rounded border border-red-300/50 px-3 py-2 text-xs text-red-200"
                    aria-label="Delete Featured Review Video"
                    title="Delete Featured Review Video"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <label
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-amber-300/50 text-amber-300 hover:bg-amber-300/10"
                    title="Upload Featured Review Video"
                    aria-label="Upload Featured Review Video"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M4 16.5v2A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-2" />
                    </svg>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      className="hidden"
                      disabled={busy}
                      onChange={(e) => setFeaturedVideoFile(e.target.files?.[0] || null)}
                    />
                  </label>
                  {featuredVideoFile && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={uploadFeaturedVideo}
                      className="rounded bg-amber-400 px-3 py-2 text-xs font-semibold text-black"
                    >
                      Upload Video
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        <section className="mt-5 rounded-xl border border-amber-200/20 bg-[#382116] p-5">
          <h3 className="font-semibold">Updates & Announcements</h3>
          <p className="mt-1 text-sm text-white/70">
            मौजूदा Announcement फीचर सुरक्षित है। इसका उपयोग /updates पेज के
            लिए जारी रहेगा।
          </p>
          <a
            href="/updates"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block rounded border border-white/30 px-4 py-2"
          >
            Preview Updates Page
          </a>
        </section>
      </div>
    </main>
  );
}
