'use client';

import { useEffect, useState } from 'react';

type Review = {
  key: string;
  payload: {
    title?: string;
    name?: string;
    text?: string;
    videoUrl?: string;
  };
};

function getDrivePreviewUrl(url: string) {
  if (!url) return '';

  let id = '';

  const fileMatch = url.match(/\/file\/d\/([^/]+)/);
  const queryMatch = url.match(/[?&]id=([^&]+)/);

  if (fileMatch) {
    id = fileMatch[1];
  } else if (queryMatch) {
    id = queryMatch[1];
  }

  if (id) {
    return `https://drive.google.com/file/d/${id}/preview?autoplay=1&mute=1&loop=1`;
  }

  return url;
}

export default function TestimonialVideos() {
  const [items, setItems] = useState<Review[]>([]);
  const [active, setActive] = useState<Review | null>(null);

  useEffect(() => {
    fetch('/api/cms/public', { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        const records = (data.records || []).filter(
          (item: Review) =>
            item.key?.startsWith('testimonial:') &&
            item.payload?.videoUrl
        );

        setItems(records);
      })
      .catch((error) => {
        console.error('Customer videos load error:', error);
      });
  }, []);

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [active]);

  if (!items.length) return null;

  return (
    <section className="border-b border-border bg-card/30 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs uppercase tracking-[.22em] text-gold">
          Customer Stories
        </p>

        <h2 className="mt-3 text-center font-display text-3xl text-foreground">
          Real Reviews. Real Experiences.
        </h2>

        <div className="mt-8 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <button
              type="button"
              key={item.key}
              onClick={() => setActive(item)}
              className="w-full max-w-[260px] overflow-hidden border border-gold/30 bg-black text-left"
            >
              <div className="pointer-events-none aspect-[9/16] w-full bg-black">
                <iframe
                  src={getDrivePreviewUrl(item.payload.videoUrl || '')}
                  title={item.payload.title || 'Customer Review'}
                  className="h-full w-full border-0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              </div>

              <p className="p-3 text-sm text-white">
                {item.payload.name || item.payload.title || 'Customer Review'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close video"
            onClick={() => setActive(null)}
            className="absolute right-5 top-4 z-10 text-4xl text-white"
          >
            ×
          </button>

          <div
            className="h-[88vh] aspect-[9/16] max-w-[95vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <iframe
              key={active.key}
              src={getDrivePreviewUrl(active.payload.videoUrl || '')}
              title={active.payload.title || 'Customer Review'}
              className="h-full w-full border-0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
