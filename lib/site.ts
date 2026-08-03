export const site = {
  name: 'Devkansh Interior',
  legalName: 'Devkansh Services Private Limited',
  tagline: 'Designing Elegant Spaces with Quality & Trust',
  url: 'https://devkanshservicesprivatelimited.in',
  email: 'ceo@devkanshservicesprivatelimited.in',
  phones: [
    { label: '+91 93729 44217', href: 'tel:+919372944217', raw: '919372944217' },
    { label: '+91 94527 03229', href: 'tel:+919452703229', raw: '919452703229' },
  ],
  whatsapp: {
    raw: '919372944217',
    href: 'https://wa.me/919372944217?text=Hello%20Devkansh%20Interior%2C%20I%20would%20like%20to%20book%20a%20free%20design%20consultation.',
  },
  address: {
    lines: [
      'FNG 23/1/3, Ground Floor,',
      'Anandwadi, R.G. Gaikwad Dada Marg,',
      'Korba Mithanagar, Antop Hill, Wadala,',
      'Mumbai, Maharashtra – 400037, India.',
    ],
    short: 'Antop Hill, Wadala, Mumbai – 400037',
    mapLink: 'https://maps.app.goo.gl/mN1YwKzGdpBaiQQw5',
    mapEmbed:
      'https://www.google.com/maps?q=Anandwadi%2C%20R.G.%20Gaikwad%20Dada%20Marg%2C%20Korba%20Mithanagar%2C%20Antop%20Hill%2C%20Wadala%2C%20Mumbai%2C%20Maharashtra%20400037&output=embed',
  },
  hours: 'Mon – Sat · 10:00 AM – 8:00 PM',
} as const

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const
