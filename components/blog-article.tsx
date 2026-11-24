"use client";

import { useState } from "react";

type BlogPost = {
  title?: string;
  category?: string;
  excerpt?: string;
  text?: string;
  content?: string;
  imageUrl?: string;
  images?: string[];
  date?: string;
  createdAt?: string;
  publishedAt?: string;
};

export default function BlogArticle({ post }: { post: BlogPost }) {
  const [activeImage, setActiveImage] = useState("");

  function getImageUrl(url: string) {
    if (!url) return "";

    const match =
      url.match(/\/file\/d\/([^/?]+)/) ||
      url.match(/[?&]id=([^&]+)/);

    if (match?.[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
    }

    return url;
  }

  const mainImage = post.imageUrl
    ? getImageUrl(post.imageUrl)
    : "";

  const extraImages = Array.isArray(post.images)
    ? post.images.map(getImageUrl).filter(Boolean)
    : [];

  const articleText = post.text || post.content || "";

  const articleDate =
    post.date || post.publishedAt || post.createdAt || "";

  return (
    <main className="min-h-screen bg-background px-5 pb-20 pt-32 text-foreground sm:px-8">

      <article className="mx-auto max-w-5xl">

        <a
          href="/blog"
          className="mb-8 inline-block text-sm text-gold hover:underline"
        >
          ← Back to Blog
        </a>

        {mainImage && (
          <button
            type="button"
            onClick={() => setActiveImage(mainImage)}
            className="mb-10 block w-full overflow-hidden rounded border border-gold/20"
          >
            <img
              src={mainImage}
              alt={post.title || "Devkansh Interior"}
              className="max-h-[650px] w-full object-cover"
            />
          </button>
        )}

        <p className="eyebrow text-gold">
          DEVKANSH INTERIOR
        </p>

        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          {post.title}
        </h1>

        {articleDate && (
          <p className="mt-4 text-sm text-muted-foreground">
            Published: {articleDate}
          </p>
        )}

        {post.excerpt && (
          <p className="mt-7 text-xl leading-8 text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <div className="mt-10 whitespace-pre-wrap break-words text-base leading-8">

          {articleText.split("\n").map((line, index) => {
            if (line.startsWith("### ")) {
              return (
                <h3
                  key={index}
                  className="mb-3 mt-8 font-display text-2xl"
                >
                  {line.replace(/^### /, "")}
                </h3>
              );
            }

            if (line.startsWith("## ")) {
              return (
                <h2
                  key={index}
                  className="mb-4 mt-10 font-display text-3xl"
                >
                  {line.replace(/^## /, "")}
                </h2>
              );
            }

            return line.trim() ? (
              <p key={index} className="mb-5">
                {line}
              </p>
            ) : (
              <div key={index} className="h-2" />
            );
          })}

        </div>

        {extraImages.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-7 font-display text-3xl">
              More Project Photos
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {extraImages.map((photo, index) => (
                <button
                  key={`${photo}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(photo)}
                  className="overflow-hidden rounded border border-gold/20"
                >
                  <img
                    src={photo}
                    alt={`Blog Photo ${index + 1}`}
                    className="h-72 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

      </article>

      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-5"
          onClick={() => setActiveImage("")}
        >
          <button
            type="button"
            onClick={() => setActiveImage("")}
            className="absolute right-6 top-5 text-4xl text-white"
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={activeImage}
            alt="Full size blog photo"
            className="max-h-[90vh] max-w-full object-contain"
          />
        </div>
      )}

    </main>
  );
}