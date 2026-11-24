'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react'

import { testimonials } from '@/lib/data'

export function TestimonialSlider() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const go = useCallback((dir: number) => {
    setDirection(dir)
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => go(1), 6500)
    return () => window.clearInterval(id)
  }, [go, paused])

  const active = testimonials[index]

  return (
    <div
      className="flex flex-col gap-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative min-h-72 sm:min-h-64">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.figure
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
            aria-live="polite"
          >
            <Quote className="size-9 text-gold/50" aria-hidden="true" />
            <blockquote className="max-w-3xl font-display text-2xl leading-[1.35] text-balance text-foreground sm:text-3xl lg:text-[2.1rem]">
              {`"${active.quote}"`}
            </blockquote>
            <figcaption className="flex flex-col gap-2">
              <div className="flex gap-1" aria-label={`${active.rating} out of 5 stars`}>
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gold text-gold" aria-hidden="true" />
                ))}
              </div>
              <span className="text-sm text-foreground">{active.name}</span>
              <span className="text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground">
                {active.role}
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-6 border-t border-border pt-6">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial from ${t.name}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              className={`h-px w-8 transition-colors ${i === index ? 'bg-gold' : 'bg-border hover:bg-muted-foreground'}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex size-11 items-center justify-center border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex size-11 items-center justify-center border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
