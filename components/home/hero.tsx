'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'

import { WordsReveal } from '@/components/motion/reveal'
import { site } from '@/lib/site'
import { stats } from '@/lib/data'

export function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 140])
  const contentY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -60])
  const contentOpacity = useTransform(scrollY, [0, 520], [1, reduce ? 1 : 0.15])

  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden pt-28 pb-16 sm:pt-32">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10 h-[118%]">
        <Image
          src="/images/hero-living-room.png"
          alt="Luxury living room with black marble feature wall, gold inlays and city skyline view"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60"
        aria-hidden="true"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-7xl px-5 sm:px-8"
      >
        <div className="flex max-w-3xl flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <span className="eyebrow text-gold">Mumbai · Turnkey Interior Studio</span>
          </motion.div>

          <h1 className="font-display text-[2.6rem] leading-[1.02] text-balance text-foreground sm:text-6xl lg:text-[4.6rem]">
            <WordsReveal text="Designing Elegant Spaces with" delay={0.25} />{' '}
            <WordsReveal text="Quality & Trust" delay={0.62} wordClassName="text-gradient-gold italic" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="max-w-xl text-base leading-relaxed text-pretty text-foreground/80 sm:text-lg"
          >
            Devkansh Interior crafts luxury homes, villas, offices and commercial spaces across
            Mumbai — with in-house design, carpentry and civil execution under a single accountable
            contract.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 text-[0.72rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
            >
              Book Free Consultation
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 border border-border bg-ink/40 px-7 py-4 text-[0.72rem] tracking-[0.18em] uppercase text-foreground backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
            >
              View Our Work
            </Link>
            <a
              href={site.phones[0].href}
              className="inline-flex items-center justify-center gap-2 px-2 py-4 text-[0.72rem] tracking-[0.18em] uppercase text-foreground/80 transition-colors hover:text-gold sm:px-4"
            >
              <Phone className="size-4 text-gold" aria-hidden="true" />
              {site.phones[0].label}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3 }}
            className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <dt className="order-2 text-[0.65rem] tracking-[0.16em] uppercase text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="order-1 font-display text-3xl text-gold sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="text-[0.6rem] tracking-[0.28em] uppercase text-muted-foreground">
          Scroll
        </span>
        <motion.span
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="h-14 w-px bg-gold"
        />
      </motion.div>
    </section>
  )
}
