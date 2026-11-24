import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'
import { ServiceExplorer } from '@/components/services/service-explorer'
import { ProcessTimeline } from '@/components/process-timeline'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/reveal'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Residential, luxury apartment, villa, modular kitchen, bedroom, living room, office, commercial, shop and hospital interiors plus civil work, carpentry, painting, fire protection and turnkey projects in Mumbai.',
  alternates: { canonical: '/services' },
}

const packages = [
  {
    name: 'Essential',
    price: '₹1,450',
    unit: 'per sq.ft onward',
    body: 'A complete, well-built home with dependable brands and clean detailing.',
    includes: [
      '710-grade plywood carcass',
      'Branded laminate finishes',
      'Modular kitchen with soft-close',
      'False ceiling in living & bedrooms',
      '2D layouts + 3D views',
      '10-year woodwork warranty',
    ],
  },
  {
    name: 'Premium',
    price: '₹2,100',
    unit: 'per sq.ft onward',
    featured: true,
    body: 'Layered lighting, veneer and quartz — our most requested specification.',
    includes: [
      'Veneer & acrylic finishes',
      'Quartz counters & marble accents',
      'Profile + cove lighting design',
      'Hettich / Blum hardware',
      'Upholstered wall panelling',
      'Dedicated site supervisor',
    ],
  },
  {
    name: 'Luxury',
    price: '₹2,600+',
    unit: 'per sq.ft onward',
    body: 'Imported finishes and bespoke joinery for signature residences and villas.',
    includes: [
      'Imported marble & stone',
      'Custom metal & brass inlay',
      'Designer lighting & chandeliers',
      'Smart home & automation ready',
      'Acoustic & home theatre design',
      'Styling, art & decor curation',
    ],
  },
]

const materials = [
  { label: 'Plywood', value: 'Century / Greenply 710 BWP' },
  { label: 'Hardware', value: 'Hettich / Blum / Ebco' },
  { label: 'Laminate', value: 'Merino / Greenlam / Royale' },
  { label: 'Counter', value: 'Quartz / Granite / Imported marble' },
  { label: 'Paint', value: 'Asian Paints Royale / PU finish' },
  { label: 'Lighting', value: 'Wipro / Philips / designer imports' },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Services"
        eyebrow="What We Do"
        title="Fifteen interior services under one accountable contract."
        description="From a single modular kitchen to a full commercial turnkey fit-out — design, civil, carpentry, painting and safety systems delivered by one team with one timeline."
        image="/images/modular-kitchen.png"
        imageAlt="Matte black modular kitchen with quartz waterfall island and gold hardware"
      />

      {/* Explorer */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="Choose a discipline, or hand us the whole project."
            description="Every service below can be booked standalone or bundled into a turnkey contract with a single point of accountability."
            className="mb-12"
          />
          <ServiceExplorer />
        </div>
      </section>

      {/* Packages */}
      <section className="border-y border-border bg-card/30 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Investment Bands"
            title="Transparent pricing, published upfront."
            description="Indicative ranges for full home interiors. Your final quotation is a line-item BOQ naming every brand, thickness and finish."
          />

          <StaggerGroup className="mt-14 grid gap-6 lg:grid-cols-3">
            {packages.map((p) => (
              <StaggerItem key={p.name}>
                <article
                  className={`flex h-full flex-col gap-6 border p-8 sm:p-10 ${
                    p.featured
                      ? 'border-gold bg-background shadow-2xl shadow-black/40'
                      : 'border-border bg-background'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="eyebrow text-gold">{p.name}</span>
                      {p.featured ? (
                        <span className="border border-gold/50 px-2.5 py-1 text-[0.6rem] tracking-[0.16em] uppercase text-gold">
                          Most chosen
                        </span>
                      ) : null}
                    </div>
                    <p className="font-display text-4xl text-foreground sm:text-5xl">{p.price}</p>
                    <p className="text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground">
                      {p.unit}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {p.body}
                  </p>

                  <ul className="flex flex-col gap-3 border-t border-border pt-6">
                    {p.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[0.85rem] text-foreground/85">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`group mt-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-[0.7rem] tracking-[0.18em] uppercase transition-colors ${
                      p.featured
                        ? 'bg-gold text-primary-foreground hover:opacity-90'
                        : 'border border-border text-foreground hover:border-gold hover:text-gold'
                    }`}
                  >
                    Get a quotation
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
              Ranges are indicative for carpet area and exclude civil work, GST and loose furniture.
              Commercial, villa and turnkey projects are quoted per drawing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Materials */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="left">
            <div className="relative aspect-4/3 overflow-hidden border border-border">
              <Image
                src="/images/material-detail.png"
                alt="Luxury interior material samples in black marble, brushed gold, boucle and walnut veneer"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="Materials & Brands"
              title="We name what we use. Always."
              description="No vague line items like premium hardware. Your BOQ specifies the exact brand and grade so you can verify every delivery on site."
            />

            <StaggerGroup className="flex flex-col">
              {materials.map((m) => (
                <StaggerItem key={m.label}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border py-4 first:border-t">
                    <span className="text-[0.68rem] tracking-[0.18em] uppercase text-gold">
                      {m.label}
                    </span>
                    <span className="text-sm text-foreground/85">{m.value}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border bg-card/30 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Our Process"
            title="How a Devkansh project runs."
            description="Six defined stages, each with a deliverable you sign off before we move ahead."
          />
          <div className="mt-16">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        description="Tell us about your space and budget. Our team will map out exactly which disciplines your project requires — and which it does not."
      />
    </>
  )
}
