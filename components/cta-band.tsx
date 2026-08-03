import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { site } from '@/lib/site'

export function CtaBand({
  title = 'Let us design a space worth coming home to.',
  description = 'Book a complimentary consultation with our design team. We will study your space, understand your budget and share an honest direction — with zero obligation.',
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="relative isolate overflow-hidden border-y border-border py-20 lg:py-28">
      <Image
        src="/images/material-detail.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-ink/80" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-7 px-5 text-center sm:px-8">
        <Reveal direction="none">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <span className="eyebrow text-gold">Free Consultation</span>
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display text-3xl leading-[1.1] text-balance text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="max-w-2xl text-sm leading-relaxed text-pretty text-foreground/75 sm:text-base">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
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
            <a
              href={site.phones[0].href}
              className="inline-flex items-center justify-center gap-2 border border-border px-7 py-4 text-[0.72rem] tracking-[0.18em] uppercase text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phones[0].label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
