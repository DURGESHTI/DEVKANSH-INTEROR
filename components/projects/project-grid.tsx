'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MapPin, Ruler, Timer } from 'lucide-react'

import { projects } from '@/lib/data'

const filters = ['All', 'Residential', 'Commercial'] as const
type Filter = (typeof filters)[number]

export function ProjectGrid() {
  const [active, setActive] = useState<Filter>('All')

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active],
  )

  return (
    <div className="flex flex-col gap-10">
      <div
        className="flex flex-wrap items-center gap-2 sm:gap-3"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {filters.map((f) => {
          const isActive = f === active
          const count =
            f === 'All' ? projects.length : projects.filter((p) => p.category === f).length
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f)}
              className={`inline-flex items-center gap-2 border px-5 py-3 text-[0.68rem] tracking-[0.18em] uppercase transition-colors ${
                isActive
                  ? 'border-gold bg-gold text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-gold/50 hover:text-gold'
              }`}
            >
              {f}
              <span className={isActive ? 'text-primary-foreground/70' : 'text-foreground/40'}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.article
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col border border-border bg-card transition-colors hover:border-gold/50"
            >
              <div className="relative aspect-16/11 overflow-hidden">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={`${project.title} — ${project.type} interior in ${project.location} by Devkansh Interior`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute top-4 left-4 border border-gold/60 bg-ink/75 px-3 py-1.5 text-[0.6rem] tracking-[0.18em] uppercase text-gold backdrop-blur-sm">
                  {project.type}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-7">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl text-foreground sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="flex items-center gap-2 text-[0.68rem] tracking-[0.16em] uppercase text-gold">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {project.location}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                  {project.summary}
                </p>

                <ul className="flex flex-col gap-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-[0.8rem] text-foreground/80">
                      <span className="mt-1.5 size-1 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                  <div className="flex flex-wrap items-center gap-5">
                    <span className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground">
                      <Ruler className="size-3.5 text-gold/70" aria-hidden="true" />
                      {project.area}
                    </span>
                    <span className="flex items-center gap-2 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground">
                      <Timer className="size-3.5 text-gold/70" aria-hidden="true" />
                      {project.duration}
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.18em] uppercase text-gold transition-colors hover:text-gold-soft"
                  >
                    Discuss similar
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
