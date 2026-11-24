import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { site } from '@/lib/site'

export const dynamic = 'force-dynamic'

const pages = [
  { path: '', priority: 1.0 },
  { path: '/about', priority: 0.8 },
  { path: '/services', priority: 0.9 },
  { path: '/projects', priority: 0.9 },
  { path: '/gallery', priority: 0.8 },
  { path: '/testimonials', priority: 0.7 },
  { path: '/blog', priority: 0.8 },
  { path: '/updates', priority: 0.7 },
  { path: '/contact', priority: 0.8 },
  { path: '/faq', priority: 0.7 },
  { path: '/locations/mumbai', priority: 0.8 },
  { path: '/locations/navi-mumbai', priority: 0.8 },
  { path: '/locations/pune', priority: 0.8 },
  { path: '/locations/nashik', priority: 0.8 },
  { path: '/locations/latur', priority: 0.8 },
  { path: '/locations/goa', priority: 0.8 },
  { path: '/locations/ahmednagar', priority: 0.8 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${site.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page.priority,
  }))

  try {
    const h = await headers()
    const host = h.get('x-forwarded-host') || h.get('host')
    const proto = h.get('x-forwarded-proto') || 'http'

    if (!host) return staticPages

    const response = await fetch(`${proto}://${host}/api/cms/public`, {
      cache: 'no-store',
    })

    if (!response.ok) return staticPages

    const data = await response.json()

    const blogPages: MetadataRoute.Sitemap = (data.records || [])
      .filter((item: any) => item.key?.startsWith('blog:'))
      .map((item: any) => {
        const slug = item.payload?.slug || item.key.replace('blog:', '')
        return {
          url: `${site.url}/blog/${encodeURIComponent(slug)}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }
      })

    return [...staticPages, ...blogPages]
  } catch {
    return staticPages
  }
}
