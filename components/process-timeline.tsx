'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

import { process } from '@/lib/data'

export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 55%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <ol ref={ref} className="relative flex flex-col gap-10 lg:gap-0">
      <span
        className="absolute top-2 bottom-2 left-[15px] w-px bg-border lg:left-1/2 lg:-translate-x-1/2"
        aria-hidden="true"
      />
      <motion.span
        style={{ scaleY: reduce ? 1 : progress, originY: 0 }}
        className="absolute top-2 bottom-2 left-[15px] w-px bg-gold lg:left-1/2 lg:-translate-x-1/2"
        aria-hidden="true"
      />

      {process.map((item, i) => {
        const rightSide = i % 2 === 1
        return (
          <li key={item.step} className="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0">
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1.5 left-0 z-10 flex size-8 items-center justify-center rounded-full border border-gold bg-ink text-[0.6rem] tracking-[0.1em] text-gold lg:left-1/2 lg:-translate-x-1/2"
              aria-hidden="true"
            >
              {item.step}
            </motion.span>

            <motion.div
              initial={{ opacity: 0, x: reduce ? 0 : rightSide ? 36 : -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={
                rightSide
                  ? 'lg:col-start-2 lg:py-12 lg:pl-16'
                  : 'lg:col-start-1 lg:py-12 lg:pr-16 lg:text-right'
              }
            >
              <span className="eyebrow text-gold/70">Step {item.step}</span>
              <h3 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground lg:inline-block">
                {item.body}
              </p>
            </motion.div>
          </li>
        )
      })}
    </ol>
  )
}
