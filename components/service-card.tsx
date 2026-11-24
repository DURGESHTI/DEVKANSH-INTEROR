import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { Service } from '@/lib/data'
import { ServiceIcon } from '@/components/service-icon'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      id={service.slug}
      className="group relative flex h-full flex-col overflow-hidden border border-border bg-card transition-colors hover:border-gold/50"
    >
      {service.image ? (
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={service.image || '/placeholder.svg'}
            alt={`${service.title} by Devkansh Interior`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute top-4 left-4 flex size-10 items-center justify-center border border-gold/60 bg-ink/70 text-gold backdrop-blur-sm">
            <ServiceIcon name={service.icon} className="size-4.5" />
          </span>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl text-foreground sm:text-2xl">{service.title}</h3>
          <span className="text-[0.6rem] tracking-[0.16em] whitespace-nowrap uppercase text-gold/70">
            {service.category}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
          {service.summary}
        </p>

        <ul className="mt-1 flex flex-col gap-2">
          {service.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-[0.8rem] text-foreground/80">
              <span className="mt-1.5 size-1 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="mt-auto inline-flex w-fit items-center gap-2 pt-4 text-[0.7rem] tracking-[0.18em] uppercase text-gold transition-colors hover:text-gold-soft"
        >
          Enquire
          <ArrowUpRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}
