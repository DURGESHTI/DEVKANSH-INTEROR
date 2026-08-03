'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, X } from 'lucide-react'

import { site } from '@/lib/site'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.421.52-.632.174-.21.232-.36.348-.606.116-.247.058-.458-.03-.606-.087-.149-.673-1.612-.923-2.203-.243-.583-.487-.504-.672-.513l-.569-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.073.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.626.712.226 1.36.194 1.872.118.573-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.13c-1.55 0-3.07-.42-4.4-1.2l-.32-.19-3.11.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.23 3.69 8.23 8.23s-3.69 8.3-8.01 8.3z" />
    </svg>
  )
}

export function FloatingActions() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {visible ? (
          <motion.a
            key="whatsapp"
            href={site.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.06 }}
            className="group flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 sm:size-14"
          >
            <WhatsAppIcon className="size-6.5 sm:size-7" />
            <span className="sr-only">WhatsApp</span>
          </motion.a>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {visible ? (
          <motion.div
            key="call"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-end gap-2"
          >
            <AnimatePresence>
              {expanded ? (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col overflow-hidden border border-gold/40 bg-ink/95 backdrop-blur-md"
                >
                  <span className="border-b border-border px-4 pt-3 pb-2 text-[0.6rem] tracking-[0.2em] uppercase text-gold">
                    Tap to call
                  </span>
                  {site.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-foreground transition-colors hover:bg-secondary hover:text-gold"
                    >
                      <Phone className="size-3.5 text-gold" aria-hidden="true" />
                      {p.label}
                    </a>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? 'Close call options' : 'Call Devkansh Interior'}
              aria-expanded={expanded}
              whileHover={{ scale: 1.06 }}
              className="flex size-13 items-center justify-center rounded-full bg-gold text-primary-foreground shadow-lg shadow-black/40 sm:size-14"
            >
              {expanded ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <Phone className="size-6" aria-hidden="true" />
              )}
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
