import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, Clock, Gem, HeartHandshake, ShieldCheck, Users } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'
import { ProcessTimeline } from '@/components/process-timeline'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { stats } from '@/lib/data'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Devkansh Interior is the interior design and turnkey execution studio of Devkansh Services Private Limited, Mumbai. Twelve years of craft, 480+ spaces delivered, one accountable team.',
  alternates: { canonical: '/about' },
}

const values = [
  {
    icon: Gem,
    title: 'Quality Without Compromise',
    body: 'Every board, hinge and channel is named in your quotation. We specify brands we would install in our own homes and never substitute silently.',
  },
  {
    icon: HeartHandshake,
    title: 'Trust Before Transaction',
    body: 'Honest budgets, honest timelines. If something is not right for your space or your money, we say so before you sign.',
  },
  {
    icon: Clock,
    title: 'Timelines We Honour',
    body: '96% of our projects hand over on or before the promised date, tracked against a weekly milestone plan you can see.',
  },
  {
    icon: ShieldCheck,
    title: 'Accountable Execution',
    body: 'One contract, one supervisor, one point of contact. No blame passed between vendors when something needs fixing.',
  },
]

const differentiators = [
  {
    title: 'In-house carpentry',
    body: 'Our own craftsmen, our own quality control — not a subcontracted lottery.',
  },
  {
    title: 'Line-item BOQ',
    body: 'Brands, thickness and finish written down before the first payment.',
  },
  {
    title: 'Weekly photo reports',
    body: 'You see progress every week, whether you are in Mumbai or overseas.',
  },
  {
    title: '10-year woodwork warranty',
    body: 'Backed in writing, serviced by the same team that built it.',
  },
]

const team = [
  {
    name: 'Design Studio',
    role: 'Concept, space planning & 3D',
    body: 'Architects and interior designers who translate how you live into drawings that can actually be built.',
    image: '/images/material-detail.png',
    alt: 'Luxury interior material samples in marble, brass, boucle and walnut',
  },
  {
    name: 'Craft Workshop',
    role: 'Carpentry & bespoke joinery',
    body: 'Seasoned carpenters who veneer-match, edge-band and finish to a tolerance most sites never reach.',
    image: '/images/craftsmanship.png',
    alt: 'Carpenter finishing bespoke walnut cabinetry with brass hardware',
  },
  {
    name: 'Site Delivery',
    role: 'Civil, MEP & project management',
    body: 'Supervisors who sequence civil, plumbing, electrical and interiors so trades never collide on your site.',
    image: '/images/site-execution.png',
    alt: 'Project manager reviewing interior drawings with the team on site',
  },
]

// CEOs / Directors List updated with your exact file paths from public folder
const ceos = [
  {
    name: 'Durgesh Kumar',
    role: '1 Director and CEO',
    image: '/durgesh kumar1 .jpeg',
    alt: '1 Director and CEO Durgesh Kumar',
  },
  {
    name: 'Akanksha Tiwari',
    role: '2 Director and CEO',
    image: '/akanksha2.jpeg',
    alt: '2 Director and CEO Akanksha Tiwari',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="Who We Are"
        title="Twelve years of designing elegant spaces across Mumbai."
        description="Devkansh Interior is the design and turnkey execution arm of Devkansh Services Private Limited. We plan, build and finish interiors under a single accountable contract — with quality and trust as the only non-negotiables."
        image="/images/villa-interior.png"
        imageAlt="Double-height luxury villa hall with brass staircase and marble flooring"
      />

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="left">
            <div className="relative">
              <div className="relative aspect-4/5 overflow-hidden border border-border">
                <Image
                  src="/images/luxury-apartment.png"
                  alt="Luxury apartment dining area with fluted wood panelling and gold pendant lighting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 hidden w-52 border border-gold/40 bg-ink/95 p-6 backdrop-blur-sm sm:block lg:-right-8">
                <p className="font-display text-4xl text-gold">480+</p>
                <p className="mt-1 text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground">
                  Spaces delivered since 2013
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Our Story"
              title="Built on site, not on slogans."
              description="We started in 2013 as a small civil and carpentry outfit in Antop Hill. The design studio grew out of a simple frustration our clients kept describing — beautiful 3D renders that fell apart at execution."
            />

            <Reveal delay={0.16}>
              <div className="flex flex-col gap-4 text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
                <p>
                  So we built the opposite kind of company. Design and execution sit under one roof,
                  which means the person drawing your feature wall is answerable to the person
                  installing it. Nothing gets promised on paper that our own workshop cannot deliver
                  on site.
                </p>
                <p>
                  Today we deliver homes, villas, offices, showrooms, clinics and full turnkey
                  fit-outs across Mumbai, Navi Mumbai and Thane — from a 210 sq.ft modular kitchen
                  to a 7,400 sq.ft corporate workspace. The scale changes. The standard does not.
                </p>
                <p className="border-l-2 border-gold pl-5 font-display text-lg text-foreground/90 sm:text-xl">
                  &ldquo;{site.tagline}&rdquo; is not a tagline we wrote for a brochure. It is the
                  order in which we make every decision.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/40 py-14">
        <StaggerGroup className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 sm:px-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="font-display text-4xl text-gold sm:text-5xl">{s.value}</p>
                <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Mission & Vision"
            title="Why we do this work"
            description="Two commitments guide every project we accept."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col gap-4 border border-border bg-card p-8 sm:p-10">
                <div className="flex size-12 items-center justify-center border border-gold/40 text-gold">
                  <Award className="size-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl text-foreground sm:text-3xl">Our Mission</h3>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
                  To make premium interiors predictable — transparent pricing, honest materials and
                  handover dates that hold. Every client should be able to trust an interior contract
                  the way they trust a bank statement.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              <article className="flex h-full flex-col gap-4 border border-border bg-card p-8 sm:p-10">
                <div className="flex size-12 items-center justify-center border border-gold/40 text-gold">
                  <Users className="size-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl text-foreground sm:text-3xl">Our Vision</h3>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
                  To be the interior partner Mumbai recommends without hesitation — known less for
                  our renders and more for the fact that our spaces still look and function beautifully
                  a decade after handover.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="Four things we refuse to negotiate."
          />

          <StaggerGroup className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <article className="flex h-full flex-col gap-4 bg-background p-8 transition-colors hover:bg-card sm:p-10">
                  <div className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center border border-gold/40 text-gold">
                      <v.icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl text-foreground sm:text-2xl">{v.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {v.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Team / capability */}
      <section className="border-t border-border bg-card/30 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Team"
            title="Three disciplines, one accountable contract."
            description="Design, craft and site delivery are all in-house. That is the entire reason our drawings match what you finally live in."
          />

          <StaggerGroup className="mt-14 grid gap-8 lg:grid-cols-3">
            {team.map((t) => (
              <StaggerItem key={t.name}>
                <article className="group flex h-full flex-col border border-border bg-background">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={t.image || '/placeholder.svg'}
                      alt={t.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-7">
                    <span className="eyebrow text-gold">{t.role}</span>
                    <h3 className="font-display text-2xl text-foreground">{t.name}</h3>
                    <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                      {t.body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Why choose us */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why Devkansh"
            title="What makes a Devkansh site different."
            description="Four operating habits that clients tell us they could not find elsewhere."
          />

          <StaggerGroup className="flex flex-col">
            {differentiators.map((d, i) => (
              <StaggerItem key={d.title}>
                <div className="flex items-start gap-6 border-b border-border py-6 first:border-t">
                  <span className="font-display text-2xl text-gold/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-xl text-foreground">{d.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="border-t border-border bg-card/30 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="How We Work"
            title="Six steps from first sketch to handover."
            description="A defined path so you always know what happens next, who is responsible and what it costs."
          />
          <div className="mt-16">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* Leadership / CEOs Section */}
      <section className="border-t border-border bg-card/10 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Leadership"
            title="Directors & Leadership"
          />

          <StaggerGroup className="mt-14 flex flex-wrap justify-center gap-8">
            {ceos.map((c) => (
              <StaggerItem key={c.name}>
                <article className="group flex w-full max-w-sm flex-col border border-border bg-background transition-all duration-300 hover:border-gold/50">
                  <div className="relative aspect-3/4 overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 384px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex flex-col gap-1 p-6 text-center">
                    <span className="eyebrow text-gold">{c.role}</span>
                    <h3 className="font-display text-2xl text-foreground">{c.name}</h3>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CtaBand
        title="Come see the difference on a live site."
        description="We will happily walk you through an ongoing project so you can judge our finishing standards before you commit a rupee."
      />
    </>
  )
}