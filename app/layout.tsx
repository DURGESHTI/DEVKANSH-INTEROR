import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { FloatingActions } from '@/components/floating-actions'
import { site } from '@/lib/site'
import './globals.css'

const _jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const _cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    'Devkansh Interior by Devkansh Services Private Limited — premium turnkey interior designers in Mumbai for luxury homes, apartments, villas, modular kitchens, offices, retail and hospitals.',
  keywords: [
    'interior designer Mumbai',
    'luxury interior design Mumbai',
    'modular kitchen Mumbai',
    'turnkey interior contractor',
    'villa interior designer',
    'office interior Mumbai',
    'Devkansh Interior',
    'Devkansh Services Private Limited',
    'Wadala interior designer',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  metadataBase: new URL(site.url),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description:
      'Premium turnkey interior design and execution in Mumbai — residential, luxury apartments, villas, modular kitchens, offices, retail and healthcare.',
    images: [
      {
        url: '/images/hero-living-room.png',
        width: 1200,
        height: 630,
        alt: 'Luxury living room interior designed by Devkansh Interior',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.tagline}`,
    description: 'Premium turnkey interior design and execution in Mumbai.',
    images: ['/images/hero-living-room.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  generator: 'v0.app',
 icons: {
  icon: '/logo.png',
  shortcut: '/logo.png',
  apple: '/logo.png',
},
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0d0c',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesignBusiness',
  name: site.name,
  legalName: site.legalName,
  slogan: site.tagline,
  url: site.url,
  email: site.email,
  telephone: site.phones.map((p) => p.label),
  image: `${site.url}/images/hero-living-room.png`,
  priceRange: '₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'FNG 23/1/3, Ground Floor, Anandwadi, R.G. Gaikwad Dada Marg, Korba Mithanagar',
    addressLocality: 'Antop Hill, Wadala, Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400037',
    addressCountry: 'IN',
  },
  areaServed: ['Mumbai', 'Navi Mumbai', 'Thane', 'Maharashtra'],
  openingHours: 'Mo-Sa 10:00-20:00',
  hasMap: site.address.mapLink,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="flex min-h-dvh flex-col overflow-x-hidden antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-gold focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingActions />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
