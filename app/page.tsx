import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Award, Clock, ShieldCheck, Users } from 'lucide-react'

import { Hero } from '@/components/home/hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { ServiceIcon } from '@/components/service-icon'
import { ProcessTimeline } from '@/components/process-timeline'
import { BeforeAfter } from '@/components/before-after'
import { TestimonialSlider } from '@/components/testimonial-slider'
import { CtaBand } from '@/components/cta-band'
import { beforeAfter, faqs, projects, services } from '@/lib/data'
import { site } from '@/lib/site'

const promises = [
  {
    icon: ShieldCheck,
    title: '10-Year Woodwork Warranty',
    body: 'Branded ply, hardware and finishes named in your quotation — and backed in writing.',
  },
  {
    icon: Clock,
    title: '96% On-Time Handover',
    body: 'Fixed timelines with weekly milestone tracking and a dedicated site supervisor.',
  },
  {
    icon: Users,
    title: 'In-House Craft Teams',
    body: 'Our own carpenters, painters and civil crew — no chain of untraceable subcontractors.',
  },
  {
    icon: Award,
    title: 'Transparent Line-Item BOQ',
    body: 'Every board, hinge and litre of paint priced upfront. Zero hidden escalation.',
  },
]

export default function HomePage() {
  const featured = services.slice(0, 6)
  const showcase = projects.slice(0, 4)

  return (
    <>
      <Hero />

      {/* Intro / About strip */}
      <section className="border-b border-border py-20 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal direction="right">
              <div className="relative">
                <div className="relative aspect-4/5 overflow-hidden border border-border">
                  <Image
                    src="/images/luxury-apartment.png"
                    alt="Devkansh Interior designed dining and living area with gold pendant lights"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -right-4 -bottom-8 hidden w-48 border border-gold/40 bg-ink p-6 sm:block">
                  <p className="font-display text-4xl text-gold">12</p>
                  <p className="mt-1 text-[0.65rem] leading-relaxed tracking-[0.16em] uppercase text-muted-foreground">
                    Years designing Mumbai homes
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-7 lg:pt-6">
            <SectionHeading
              eyebrow="Who We Are"
              title="A Mumbai studio where design intent survives execution."
              description="Devkansh Interior is the interior design arm of Devkansh Services Private Limited. We design, build and hand over complete spaces — because the studio that draws your home should also be the one accountable for the joint lines, the switch heights and the final polish."
            />

            <Reveal delay={0.1}>
              <p className="max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground">
                From compact Wadala apartments to Alibaug villas, corporate floors in Lower Parel and
                multi-speciality clinics, our teams handle design, civil work, MEP coordination,
                carpentry, painting and fire protection under one turnkey contract. One point of
                contact. One timeline. One accountable signature.
              </p>
            </Reveal>

            <StaggerGroup className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {promises.map((p) => (
                <StaggerItem key={p.title}>
                  <div className="flex flex-col gap-3">
                    <span className="flex size-11 items-center justify-center border border-gold/40 text-gold">
                      <p.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-sm tracking-[0.05em] text-foreground">{p.title}</h3>
                    <p className="text-[0.82rem] leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal delay={0.1}>
              <Link
                href="/about"
                className="group inline-flex w-fit items-center gap-2 border border-border px-6 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                More About Us
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-border py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="What We Do"
              title="Fifteen disciplines. One accountable team."
              description="Design, build and finish — every trade your project needs, delivered in-house or by long-standing vetted partners."
            />
            <Reveal delay={0.15}>
              <Link
                href="/services"
                className="group inline-flex shrink-0 items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase text-gold transition-colors hover:text-gold-soft"
              >
                All Services
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <StaggerGroup className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <StaggerItem key={s.slug} className="bg-background">
                <Link
                  href={`/services#${s.slug}`}
                  className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-card lg:p-9"
                >
                  <span className="flex size-12 items-center justify-center border border-gold/40 text-gold transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <h3 className="font-display text-xl text-foreground sm:text-2xl">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {s.summary}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[0.65rem] tracking-[0.18em] uppercase text-gold/80">
                    Explore
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <StaggerGroup className="mt-10 flex flex-wrap gap-2.5">
            {services.slice(6).map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-[0.72rem] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <ServiceIcon name={s.icon} className="size-3.5" />
                  {s.title}
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Featured projects */}
      <section className="border-b border-border py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects that speak before we do."
            description="A glimpse of recently delivered residences and commercial spaces across Mumbai and Maharashtra."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {showcase.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  href={`/projects#${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-colors hover:border-gold/50"
                >
                  <div className="relative aspect-16/11 overflow-hidden">
                    <Image
                      src={p.image || '/placeholder.svg'}
                      alt={`${p.title} — ${p.type} in ${p.location}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute top-4 left-4 border border-gold/50 bg-ink/70 px-3 py-1.5 text-[0.6rem] tracking-[0.18em] uppercase text-gold backdrop-blur-sm">
                      {p.type}
                    </span>
                    <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl text-foreground sm:text-3xl">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-[0.7rem] tracking-[0.16em] uppercase text-foreground/70">
                          {p.location} · {p.area}
                        </p>
                      </div>
                      <span className="flex size-11 shrink-0 items-center justify-center border border-gold/50 bg-ink/70 text-gold backdrop-blur-sm transition-colors group-hover:bg-gold group-hover:text-primary-foreground">
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  <p className="p-6 text-sm leading-relaxed text-pretty text-muted-foreground">
                    {p.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-12">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border border-border px-6 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              View Full Portfolio
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Before & After */}
      <section className="border-b border-border bg-card/40 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Before & After"
            title="Drag to see the transformation."
            description="Real Devkansh sites — from bare shells and dated fittings to finished, liveable luxury."
            align="center"
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            {beforeAfter.slice(0, 2).map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <BeforeAfter {...item} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-12 flex justify-center">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 border border-gold/50 px-6 py-3.5 text-[0.7rem] tracking-[0.18em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              Open Full Gallery
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-border py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Process"
            title="Six steps from first sketch to handover."
            description="A defined path so you always know what happens next, who is responsible and what it costs."
            align="center"
          />
          <div className="mt-16">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border py-20 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Client Voices" title="Trust, in their words." />
            <Reveal delay={0.15}>
              <Link
                href="/testimonials"
                className="group mt-8 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase text-gold transition-colors hover:text-gold-soft"
              >
                All Testimonials
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="border-b border-border py-20 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Questions"
              title="Answers before you ask."
              description="Costs, timelines, warranties — the things people actually want to know."
            />
            <Reveal delay={0.15}>
              <Link
                href="/faq"
                className="group mt-8 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase text-gold transition-colors hover:text-gold-soft"
              >
                Read All FAQs
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <StaggerGroup className="flex flex-col">
              {faqs.slice(0, 4).map((f) => (
                <StaggerItem key={f.q}>
                  <div className="border-t border-border py-7 last:border-b">
                    <h3 className="font-display text-xl text-foreground sm:text-2xl">{f.q}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      <CtaBand />

      {/* Contact quick strip */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-3">
          <Reveal>
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-gold">Call Us</span>
              {site.phones.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="font-display text-2xl text-foreground transition-colors hover:text-gold"
                >
                  {p.label}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-gold">Email Us</span>
              <a
                href={`mailto:${site.email}`}
                className="text-base break-all text-foreground transition-colors hover:text-gold sm:text-lg"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-gold">Visit Studio</span>
              <a
                href={site.address.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-relaxed text-muted-foreground transition-colors hover:text-gold"
              >
                {site.address.lines.join(' ')}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
