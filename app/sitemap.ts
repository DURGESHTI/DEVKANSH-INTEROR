import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

// Keep this sitemap static and independent of request headers or a self-fetch.
// This avoids runtime failures when Google requests /sitemap.xml.
const pages = [
  { path: '/', priority: 1.0 },
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
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: new URL(page.path, site.url).toString(),
    changeFrequency: 'weekly',
    priority: page.priority,
  }))
}
