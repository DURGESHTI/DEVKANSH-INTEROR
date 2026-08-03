import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { Reveal, WordsReveal } from '@/components/motion/reveal'

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  breadcrumb,
}: {
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  breadcrumb: string
}) {
  return (
    <section className="relative isolate flex min-h-[62vh] items-end overflow-hidden pt-28 pb-14 sm:min-h-[68vh] sm:pb-20">
      <Image
        src={image || '/placeholder.svg'}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/45"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal direction="none">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <ChevronRight className="size-3 text-gold/60" aria-hidden="true" />
              <li className="text-gold">{breadcrumb}</li>
            </ol>
          </nav>
        </Reveal>

        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold" aria-hidden="true" />
          <Reveal direction="none" delay={0.1}>
            <span className="eyebrow text-gold">{eyebrow}</span>
          </Reveal>
        </div>

        <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] text-balance text-foreground sm:text-5xl lg:text-6xl">
          <WordsReveal text={title} delay={0.15} />
        </h1>

        <Reveal delay={0.4}>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-pretty text-foreground/75 sm:text-base">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
