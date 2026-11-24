
'use client';

import { useEffect, useState } from 'react';

type Item = {
  key: string;
  payload: {
    title?: string;
    category?: string;
    text?: string;
    imageUrl?: string;
    createdAt?: string;
  };
};

function orderKey(x: Item) {
  const n = Number(x.key.split(':').pop());
  return Number.isFinite(n) ? n : 0;
}

function getDriveImageUrls(url: string) {
  if (!url) {
    return { preview: '', full: '', fallback: '' };
  }

  let id = '';

  try {
    const parsedUrl = new URL(url);

    const fileMatch = parsedUrl.pathname.match(
      /\/file\/d\/([^/]+)/
    );

    if (fileMatch) {
      id = fileMatch[1];
    } else {
      id =
        parsedUrl.searchParams.get('id') ||
        parsedUrl.searchParams.get('export') ||
        '';
    }
  } catch {
    return {
      preview: url,
      full: url,
      fallback: '',
    };
  }

  if (id) {
    const safeId = encodeURIComponent(id);

    return {
      preview: `https://drive.google.com/thumbnail?id=${safeId}&sz=w1200`,
      full: `https://drive.google.com/thumbnail?id=${safeId}&sz=w2000`,
      fallback: `https://drive.google.com/uc?export=view&id=${safeId}`,
    };
  }

  return {
    preview: url,
    full: url,
    fallback: '',
  };
}

export default function CmsGallery() {
  const [items, setItems] = useState<Item[]>([]);
  const [opened, setOpened] = useState<Item | null>(null);

  useEffect(() => {
    fetch('/api/cms/public', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error('Gallery API failed');
        return r.json();
      })
      .then((d) => {
        const records = (d.records || [])
          .filter(
            (x: Item) =>
              x.key?.startsWith('gallery:') &&
              x.payload?.imageUrl
          )
          .sort(
            (a: Item, b: Item) =>
              orderKey(b) - orderKey(a)
          );

        setItems(records);
      })
      .catch((error) => {
        console.error('Gallery loading error:', error);
      });
  }, []);

  useEffect(() => {
    if (!opened) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpened(null);
    };

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [opened]);

  if (!items.length) return null;

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[3px] text-[#e5b842]">
            Latest Projects
          </p>

          <h2 className="mt-2 font-serif text-3xl text-white">
            Recently Added Gallery
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => {
            const image = getDriveImageUrls(
              x.payload.imageUrl || ''
            );

            return (
              <button
                type="button"
                key={x.key}
                onClick={() => setOpened(x)}
                className="overflow-hidden rounded border border-[#e5b842]/20 bg-[#181818] text-left"
              >
                <img
                  src={image.preview}
                  alt={x.payload.title || 'Devkansh Interior project'}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;

                    if (
                      image.fallback &&
                      !img.dataset.fallback
                    ) {
                      img.dataset.fallback = 'true';
                      img.src = image.fallback;
                    }
                  }}
                  className="h-64 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-white">
                    {x.payload.title}
                  </h3>

                  {x.payload.category && (
                    <p className="mt-1 text-xs text-[#e5b842]">
                      {x.payload.category}
                    </p>
                  )}

                  {x.payload.text && (
                    <p className="mt-2 text-sm text-gray-300">
                      {x.payload.text}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {opened && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setOpened(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpened(null)}
            className="absolute right-5 top-4 text-4xl text-white"
          >
            ×
          </button>

          <img
            src={getDriveImageUrls(
              opened.payload.imageUrl || ''
            ).full}
            alt={opened.payload.title || 'Full photo'}
            className="max-h-[88vh] max-w-[95vw] object-contain"
            onError={(e) => {
              const img = e.currentTarget;
              const image = getDriveImageUrls(
                opened.payload.imageUrl || ''
              );

              if (
                image.fallback &&
                !img.dataset.fallback
              ) {
                img.dataset.fallback = 'true';
                img.src = image.fallback;
              }
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
