import Link from 'next/link'
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'

import { navLinks, site } from '@/lib/site'
import { services } from '@/lib/data'
import { Wordmark } from '@/components/wordmark'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Wordmark />
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground text-pretty">
              {site.tagline}. A Mumbai-based turnkey interior firm delivering residential and
              commercial spaces with in-house design, carpentry and civil execution.
            </p>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 border border-gold/50 px-5 py-3 text-[0.7rem] tracking-[0.18em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Chat on WhatsApp
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-5 lg:col-span-2">
            <h3 className="eyebrow text-gold">Explore</h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <h3 className="eyebrow text-gold">Services</h3>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm text-gold/90 hover:text-gold">
                  View all 15 services
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-3">
            <h3 className="eyebrow text-gold">Studio</h3>
            <address className="flex flex-col gap-4 text-sm not-italic text-muted-foreground">
              <a
                href={site.address.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-3 transition-colors hover:text-gold"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="leading-relaxed">
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </a>

              <div className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="flex flex-col gap-1">
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="transition-colors hover:text-gold">
                      {p.label}
                    </a>
                  ))}
                </span>
              </div>

              <a
                href={`mailto:${site.email}`}
                className="flex gap-3 transition-colors hover:text-gold"
              >
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="break-all">{site.email}</span>
              </a>

              <div className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{site.hours}</span>
              </div>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="tracking-[0.14em] uppercase">Mumbai · Navi Mumbai · Thane · Maharashtra</p>
        </div>
      </div>
    </footer>
  )
}
