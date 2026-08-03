import type { Metadata } from 'next'

import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'
import { ProjectGrid } from '@/components/projects/project-grid'
import { BeforeAfter } from '@/components/before-after'
import { StaggerGroup, StaggerItem } from '@/components/motion/reveal'
import { beforeAfter, stats } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Completed interior projects by Devkansh Interior across Mumbai — penthouses, villas, modular kitchens, offices, retail boutiques and healthcare interiors with areas, timelines and specifications.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        breadcrumb="Projects"
        eyebrow="Portfolio"
        title="Spaces we have designed, built and handed over."
        description="Real projects with real numbers — carpet area, execution duration and the specifications that made each space work. Every image below is our own delivered work."
        image="/images/office-interior.png"
        imageAlt="Premium corporate office reception with backlit brand wall and gold framed glass partitions"
      />

      {/* Stats strip */}
      <section className="border-b border-border bg-card/40 py-12">
        <StaggerGroup className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-9 px-5 sm:px-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="font-display text-3xl text-gold sm:text-4xl">{s.value}</p>
                <p className="text-[0.62rem] tracking-[0.18em] uppercase text-muted-foreground">
                  {s.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Grid */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Selected Work"
            title="Eight projects, eight different briefs."
            description="Filter by residential or commercial to see how our detailing adapts to each typology."
            className="mb-12"
          />
          <ProjectGrid />
        </div>
      </section>

      {/* Before / after */}
      <section className="border-t border-border bg-card/30 py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Transformations"
            title="Drag to see what we started with."
            description="The most honest way to judge an interior firm is to look at the shell they began from."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            {beforeAfter.map((item) => (
              <BeforeAfter
                key={item.title}
                before={item.before}
                after={item.after}
                title={item.title}
                location={item.location}
                note={item.note}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Your project could be the next one here."
        description="Share your floor plan and we will show you comparable work, an indicative budget band and a realistic handover date."
      />
    </>
  )
}
