'use client';

import { useEffect, useState } from 'react';

type FeaturedVideoRecord = {
  key: string;
  payload?: {
    videoUrl?: string;
    title?: string;
  };
};

function getDrivePreviewUrl(url: string, autoplay = false) {
  if (!url) return '';

  const fileMatch = url.match(/\/file\/d\/([^/]+)/);
  const queryMatch = url.match(/[?&]id=([^&]+)/);
  const id = fileMatch?.[1] || queryMatch?.[1];

  if (id) {
    return `https://drive.google.com/file/d/${id}/preview?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}`;
  }

  return url;
}

export default function FeaturedReviewVideo() {
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('Featured Customer Review');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/cms/public', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Featured video request failed');
        }
        return response.json();
      })
      .then((data) => {
        const record = (data.records || []).find(
          (item: FeaturedVideoRecord) =>
            item.key === 'featured-review-video:main' &&
            item.payload?.videoUrl
        );

        if (!cancelled && record?.payload?.videoUrl) {
          setVideoUrl(record.payload.videoUrl);
          if (record.payload.title) {
            setTitle(record.payload.title);
          }
        }
      })
      .catch((error) => {
        console.error('Featured review video load error:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  if (!videoUrl) return null;

  return (
    <>
      <section className="border-b border-border bg-card/30 py-12 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <p className="text-center text-xs uppercase tracking-[.22em] text-gold">
            Featured Customer Review
          </p>

          <h2 className="mt-3 text-center font-display text-3xl text-foreground">
            Real Review. Real Experience.
          </h2>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Play featured customer review"
            className="mx-auto mt-8 block aspect-video w-full max-w-5xl overflow-hidden border border-gold/30 bg-black"
          >
            <iframe
              src={getDrivePreviewUrl(videoUrl, true)}
              title={title}
              className="pointer-events-none h-full w-full border-0"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Click on the video to watch in full screen
          </p>
        </div>
      </section>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-3 sm:p-6"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
          >
            Close ✕
          </button>

          <div
            className="w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="aspect-video w-full overflow-hidden bg-black">
              <iframe
                src={getDrivePreviewUrl(videoUrl, true)}
                title={title}
                className="h-full w-full border-0"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}