'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { ServiceCard } from '@/components/service-card'
import { services } from '@/lib/data'

const filters = ['All', 'Residential', 'Commercial', 'Execution'] as const
type Filter = (typeof filters)[number]

export function ServiceExplorer() {
  const [active, setActive] = useState<Filter>('All')

  const visible = useMemo(
    () => (active === 'All' ? services : services.filter((s) => s.category === active)),
    [active],
  )

  return (
    <div className="flex flex-col gap-10">
      <div
        className="flex flex-wrap items-center gap-2 sm:gap-3"
        role="tablist"
        aria-label="Filter services by category"
      >
        {filters.map((f) => {
          const isActive = f === active
          const count = f === 'All' ? services.length : services.filter((s) => s.category === f).length
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f)}
              className={`relative inline-flex items-center gap-2 border px-5 py-3 text-[0.68rem] tracking-[0.18em] uppercase transition-colors ${
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((service) => (
            <motion.div
              key={service.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
