'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { navLinks, site } from '@/lib/site'
import { Wordmark } from '@/components/wordmark'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-border/70 bg-ink/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent',
        )}
      >
        <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:h-20">
          <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative px-3 py-2 text-[0.8rem] tracking-[0.14em] uppercase transition-colors',
                    active ? 'text-gold' : 'text-foreground/70 hover:text-foreground',
                  )}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phones[0].href}
              className="hidden items-center gap-2 border border-border px-4 py-2.5 text-[0.72rem] tracking-[0.18em] uppercase text-foreground/85 transition-colors hover:border-gold hover:text-gold md:flex"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {site.phones[0].label}
            </a>

            <Link
              href="/contact"
              className="hidden bg-gold px-5 py-3 text-[0.72rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-90 sm:block"
            >
              Free Consultation
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex size-11 items-center justify-center border border-border text-foreground transition-colors hover:border-gold hover:text-gold lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-ink/95 backdrop-blur-xl"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-border bg-ink"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex h-18 items-center justify-between border-b border-border px-5">
                <Wordmark compact />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex size-10 items-center justify-center border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-baseline gap-4 border-b border-border/60 py-4 font-display text-2xl transition-colors',
                        pathname === link.href ? 'text-gold' : 'text-foreground hover:text-gold',
                      )}
                    >
                      <span className="font-sans text-[0.6rem] tracking-[0.2em] text-gold/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="flex flex-col gap-3 border-t border-border px-5 py-6">
                {site.phones.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="flex items-center gap-3 text-sm text-foreground/85 transition-colors hover:text-gold"
                  >
                    <Phone className="size-4 text-gold" aria-hidden="true" />
                    {p.label}
                  </a>
                ))}
                <Link
                  href="/contact"
                  className="mt-2 bg-gold px-5 py-3.5 text-center text-[0.72rem] tracking-[0.18em] uppercase text-primary-foreground"
                >
                  Book Free Consultation
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
