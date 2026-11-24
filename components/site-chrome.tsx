'use client'

import { usePathname } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FloatingActions } from '@/components/floating-actions'

/** Keeps the public site in the correct document order: header -> page -> footer.
 * Admin routes intentionally render without public-site chrome.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const path = usePathname()

  if (path === '/admin' || path.startsWith('/admin/')) {
    return <>{children}</>
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <FloatingActions />
    </>
  )
}
