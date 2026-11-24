"use client";

import { useMemo, useState } from "react";

type BlogPost = {
  key: string;
  updated_at?: string;
  updatedAt?: string;
  payload: {
    title?: string;
    excerpt?: string;
    imageUrl?: string;
    slug?: string;
    date?: string;
    createdAt?: string;
    publishedAt?: string;
  };
};

function getImageUrl(url?: string) {
  if (!url) return "";

  const match =
    url.match(/\/file\/d\/([^/?]+)/) ||
    url.match(/[?&]id=([^&]+)/);

  return match?.[1]
    ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1200`
    : url;
}

function getPostDate(post: BlogPost) {
  const p = post.payload || {};
  const timestamp = Number(post.key.replace("blog:", ""));

  const value =
    p.date ||
    p.publishedAt ||
    p.createdAt ||
    post.updatedAt ||
    post.updated_at ||
    (timestamp ? new Date(timestamp).toISOString() : "");

  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return posts;

    return posts.filter((post) => {
      const p = post.payload || {};
      const date = getPostDate(post);

      return (
        (p.title || "").toLowerCase().includes(term) ||
        date.toLowerCase().includes(term) ||
        (p.date || "").toLowerCase().includes(term) ||
        (p.excerpt || "").toLowerCase().includes(term)
      );
    });
  }, [posts, search]);

  return (
    <main className="min-h-[70vh] bg-background px-5 pb-20 pt-32 text-foreground sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow text-gold">Devkansh Interior</p>

        <h1 className="mt-4 font-display text-5xl sm:text-6xl">
          Interior Design Blog
        </h1>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          Discover beautiful interior design ideas, smart space-saving
          solutions and inspiration for your dream home.
        </p>

        <div className="gold-line mt-8 h-px w-full" />

        <div className="mt-7 max-w-xl">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by blog title or date..."
            className="w-full rounded border border-gold/30 bg-card px-5 py-4 text-foreground outline-none focus:border-gold"
          />
        </div>

        {filteredPosts.length > 0 ? (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const p = post.payload || {};
              const slug =
                p.slug?.trim() || post.key.replace("blog:", "");
              const image = getImageUrl(p.imageUrl);
              const date = getPostDate(post);

              return (
                <article
                  key={post.key}
                  className="overflow-hidden rounded border border-gold/20 bg-card"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={p.title || "Devkansh Interior"}
                      className="h-56 w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const id =
                          p.imageUrl?.match(/\/file\/d\/([^/?]+)/)?.[1] ||
                          p.imageUrl?.match(/[?&]id=([^&]+)/)?.[1];

                        if (id) {
                          e.currentTarget.src =
                            `https://drive.google.com/uc?export=view&id=${id}`;
                        }
                      }}
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center bg-black/10 text-muted-foreground">
                      Blog Image
                    </div>
                  )}

                  <div className="p-6">
                    {date && (
                      <p className="mb-3 text-xs text-gold">{date}</p>
                    )}

                    <h2 className="font-display text-2xl">
                      {p.title || "Interior Design Ideas"}
                    </h2>

                    {p.excerpt && (
                      <p className="mt-3 line-clamp-3 leading-7 text-muted-foreground">
                        {p.excerpt}
                      </p>
                    )}

                    <a
                      href={`/blog/${encodeURIComponent(slug)}`}
                      className="mt-5 inline-flex rounded border border-gold px-5 py-2 text-sm text-gold hover:bg-gold hover:text-black"
                    >
                      Read More →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 text-muted-foreground">
            {search
              ? "No matching blogs found."
              : "New articles will be published here soon."}
          </p>
        )}
      </div>
    </main>
  );
}