'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

export function BeforeAfter({
  before,
  after,
  title,
  location,
  note,
}: {
  before: string
  after: string
  title: string
  location: string
  note?: string
}) {
  const [value, setValue] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setValue(Math.min(100, Math.max(0, pct)))
  }, [])

  return (
    <figure className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="group relative aspect-4/3 w-full cursor-ew-resize touch-pan-y overflow-hidden border border-border select-none"
        onPointerDown={(e) => {
          draggingRef.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          setFromClientX(e.clientX)
        }}
        onPointerMove={(e) => {
          if (draggingRef.current) setFromClientX(e.clientX)
        }}
        onPointerUp={() => {
          draggingRef.current = false
        }}
        onPointerCancel={() => {
          draggingRef.current = false
        }}
      >
        <Image
          src={after || '/placeholder.svg'}
          alt={`${title} after renovation by Devkansh Interior`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <Image
            src={before || '/placeholder.svg'}
            alt={`${title} before renovation`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale"
          />
        </div>

        <span className="pointer-events-none absolute top-4 left-4 border border-border bg-ink/80 px-3 py-1.5 text-[0.6rem] tracking-[0.2em] uppercase text-foreground/80 backdrop-blur-sm">
          Before
        </span>
        <span className="pointer-events-none absolute top-4 right-4 border border-gold/60 bg-ink/80 px-3 py-1.5 text-[0.6rem] tracking-[0.2em] uppercase text-gold backdrop-blur-sm">
          After
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-gold"
          style={{ left: `${value}%` }}
          aria-hidden="true"
        >
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-ink text-gold shadow-lg shadow-black/50">
            <MoveHorizontal className="size-4.5" />
          </span>
        </div>

        <label className="sr-only" htmlFor={`ba-${title.replace(/\s+/g, '-')}`}>
          {`Reveal before and after for ${title}`}
        </label>
        <input
          id={`ba-${title.replace(/\s+/g, '-')}`}
          type="range"
          min={0}
          max={100}
          value={Math.round(value)}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0"
          aria-label={`Reveal before and after for ${title}`}
        />
      </div>

      <figcaption className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-xl text-foreground sm:text-2xl">{title}</h3>
          <span className="text-[0.65rem] tracking-[0.16em] uppercase text-gold">{location}</span>
        </div>
        {note ? <p className="text-sm leading-relaxed text-muted-foreground">{note}</p> : null}
      </figcaption>
    </figure>
  )
}
