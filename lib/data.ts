export type Service = {
  slug: string
  title: string
  icon: string
  summary: string
  points: string[]
  image?: string
  category: 'Residential' | 'Commercial' | 'Execution'
}

export const services: Service[] = [
  {
    slug: 'residential-interior',
    title: 'Residential Interior',
    icon: 'Home',
    category: 'Residential',
    summary:
      'End-to-end home interiors designed around how your family actually lives — from 1BHK homes to sprawling duplexes.',
    points: ['Space planning & 3D design', 'Custom furniture', 'False ceiling & lighting', 'Handover in 45–75 days'],
    image: '/images/hero-living-room.png',
  },
  {
    slug: 'luxury-apartment-interior',
    title: 'Luxury Apartment Interior',
    icon: 'Building2',
    category: 'Residential',
    summary:
      'High-rise apartment interiors with imported finishes, layered lighting and bespoke detailing built for premium living.',
    points: ['Imported veneers & marble', 'Profile & cove lighting', 'Smart home ready', 'Acoustic treatment'],
    image: '/images/luxury-apartment.png',
  },
  {
    slug: 'villa-interior',
    title: 'Villa Interior',
    icon: 'Landmark',
    category: 'Residential',
    summary:
      'Grand villa and bungalow interiors — double-height volumes, statement staircases and curated art walls.',
    points: ['Double-height design', 'Landscape & deck styling', 'Custom chandeliers', 'Home theatre & bar'],
    image: '/images/villa-interior.png',
  },
  {
    slug: 'modular-kitchen',
    title: 'Modular Kitchen',
    icon: 'ChefHat',
    category: 'Residential',
    summary:
      'Ergonomic modular kitchens engineered with premium hardware, moisture-resistant carcass and lifetime-grade fittings.',
    points: ['Hettich / Blum hardware', 'Quartz & granite tops', 'Tall units & carousels', 'Anti-termite ply'],
    image: '/images/modular-kitchen.png',
  },
  {
    slug: 'bedroom',
    title: 'Bedroom Interior',
    icon: 'BedDouble',
    category: 'Residential',
    summary:
      'Restful bedrooms with upholstered headboard walls, sliding wardrobes and warm dimmable lighting layers.',
    points: ['Walk-in & sliding wardrobes', 'Upholstered panelling', 'Study / vanity nooks', 'Blackout drapery'],
    image: '/images/master-bedroom.png',
  },
  {
    slug: 'living-room',
    title: 'Living Room',
    icon: 'Sofa',
    category: 'Residential',
    summary:
      'Living rooms designed as the signature of your home — feature walls, TV consoles and conversation-first layouts.',
    points: ['Statement feature walls', 'Bespoke TV units', 'Art & decor curation', 'Foyer & partition design'],
    image: '/images/after-living.png',
  },
  {
    slug: 'office-interior',
    title: 'Office Interior',
    icon: 'Briefcase',
    category: 'Commercial',
    summary:
      'Workspaces that carry your brand — reception walls, cabins, workstations and meeting rooms delivered turnkey.',
    points: ['Brand-led reception', 'Modular workstations', 'Cabin & boardroom', 'Data & power routing'],
    image: '/images/office-interior.png',
  },
  {
    slug: 'commercial-interior',
    title: 'Commercial Interior',
    icon: 'Layers',
    category: 'Commercial',
    summary:
      'Restaurants, salons, showrooms and studios built for footfall, durability and a distinctive guest experience.',
    points: ['Concept & theming', 'High-traffic finishes', 'HVAC coordination', 'Statutory compliance'],
    image: '/images/shop-interior.png',
  },
  {
    slug: 'shop-interior',
    title: 'Shop Interior',
    icon: 'Store',
    category: 'Commercial',
    summary:
      'Retail interiors that sell — display systems, accent lighting and signage engineered for maximum visibility.',
    points: ['Display & shelving systems', 'Accent spot lighting', 'Signage & facade', 'Fast-track fit-out'],
    image: '/images/shop-interior.png',
  },
  {
    slug: 'hospital-interior',
    title: 'Hospital Interior',
    icon: 'Stethoscope',
    category: 'Commercial',
    summary:
      'Healthcare interiors balancing hygiene norms with human warmth — OPD, wards, ICU and reception zones.',
    points: ['Antibacterial finishes', 'Seamless flooring', 'Nurse station design', 'NABH-aware detailing'],
    image: '/images/hospital-interior.png',
  },
  {
    slug: 'civil-work',
    title: 'Civil Work',
    icon: 'Hammer',
    category: 'Execution',
    summary:
      'Structural and civil execution — demolition, masonry, plaster, waterproofing, plumbing and tiling done right.',
    points: ['Demolition & masonry', 'Waterproofing', 'Plumbing & drainage', 'Tiling & flooring'],
    image: '/images/site-execution.png',
  },
  {
    slug: 'carpentry',
    title: 'Carpentry',
    icon: 'Ruler',
    category: 'Execution',
    summary:
      'In-house carpentry with seasoned craftsmen — bespoke joinery, veneer matching and flawless edge finishing.',
    points: ['Bespoke joinery', 'Veneer & laminate', 'Site & factory finish', 'Hardware installation'],
    image: '/images/craftsmanship.png',
  },
  {
    slug: 'painting',
    title: 'Painting',
    icon: 'PaintRoller',
    category: 'Execution',
    summary:
      'Premium painting and wall finishes — putty, texture, stucco, metallic and Italian-finish applications.',
    points: ['Putty & primer prep', 'Texture & stucco', 'PU & metallic finish', 'Low-VOC options'],
    image: '/images/ceiling-detail.png',
  },
  {
    slug: 'fire-protection',
    title: 'Fire Protection',
    icon: 'Flame',
    category: 'Execution',
    summary:
      'Fire safety systems designed and installed to code — detection, suppression, signage and clearances.',
    points: ['Sprinkler & hydrant', 'Smoke detection', 'Fire-rated doors', 'Compliance documentation'],
    image: '/images/material-detail.png',
  },
  {
    slug: 'turnkey-projects',
    title: 'Turnkey Projects',
    icon: 'ShieldCheck',
    category: 'Execution',
    summary:
      'One contract, one accountable team — design, civil, MEP, interiors and styling delivered to a fixed timeline.',
    points: ['Single point of contact', 'Fixed cost & timeline', 'Weekly progress reports', 'Warranty & service'],
    image: '/images/walk-in-wardrobe.png',
  },
]

export const process = [
  {
    step: '01',
    title: 'Consultation',
    body: 'A free discovery session at your site or our studio. We understand your lifestyle, budget band and timelines.',
  },
  {
    step: '02',
    title: 'Design & 3D',
    body: 'Space planning, mood boards and photorealistic 3D views so you approve the space before a single nail is driven.',
  },
  {
    step: '03',
    title: 'Transparent Quotation',
    body: 'A line-item BOQ with brands, thickness and finishes named. No hidden extras, no surprises at handover.',
  },
  {
    step: '04',
    title: 'Material Selection',
    body: 'Curated samples of ply, veneer, laminate, quartz and hardware — signed off by you and locked into the BOQ.',
  },
  {
    step: '05',
    title: 'Execution',
    body: 'Dedicated site supervisor, in-house carpentry and weekly photo updates with a live progress tracker.',
  },
  {
    step: '06',
    title: 'Handover & Warranty',
    body: 'Deep-cleaned, styled and snag-free handover, backed by a 10-year warranty on modular woodwork.',
  },
]

export type Project = {
  slug: string
  title: string
  location: string
  category: 'Residential' | 'Commercial'
  type: string
  area: string
  duration: string
  image: string
  summary: string
  highlights: string[]
}

export const projects: Project[] = [
  {
    slug: 'skyline-penthouse',
    title: 'Skyline Penthouse',
    location: 'Worli, Mumbai',
    category: 'Residential',
    type: 'Luxury Apartment',
    area: '3,200 sq.ft',
    duration: '92 days',
    image: '/images/hero-living-room.png',
    summary:
      'A four-bedroom penthouse reimagined around the skyline — black marble, brushed gold reveals and a fully layered lighting plan.',
    highlights: ['Italian marble feature wall', 'Concealed cove + profile lighting', 'Bespoke gold-inlay joinery'],
  },
  {
    slug: 'the-ivory-villa',
    title: 'The Ivory Villa',
    location: 'Alibaug',
    category: 'Residential',
    type: 'Villa',
    area: '5,800 sq.ft',
    duration: '140 days',
    image: '/images/villa-interior.png',
    summary:
      'A double-height weekend villa with a sculptural brass staircase, monochrome marble flooring and a custom chandelier.',
    highlights: ['Double-height living hall', 'Custom 2.4m chandelier', 'Indoor–outdoor deck styling'],
  },
  {
    slug: 'noir-kitchen-residence',
    title: 'Noir Kitchen Residence',
    location: 'Powai, Mumbai',
    category: 'Residential',
    type: 'Modular Kitchen',
    area: '210 sq.ft',
    duration: '34 days',
    image: '/images/modular-kitchen.png',
    summary:
      'A handleless matte-black kitchen with a quartz waterfall island, tall units and fully concealed appliance integration.',
    highlights: ['Handleless push-to-open', 'Quartz waterfall island', 'Blum soft-close hardware'],
  },
  {
    slug: 'aurum-suite',
    title: 'Aurum Master Suite',
    location: 'Bandra West, Mumbai',
    category: 'Residential',
    type: 'Bedroom',
    area: '480 sq.ft',
    duration: '38 days',
    image: '/images/master-bedroom.png',
    summary:
      'An ivory-and-brass master suite with an upholstered headboard wall, walk-in wardrobe and dimmable ambient scenes.',
    highlights: ['Upholstered fluted panelling', 'Walk-in wardrobe', 'Three-scene lighting control'],
  },
  {
    slug: 'meridian-workspace',
    title: 'Meridian Workspace',
    location: 'Lower Parel, Mumbai',
    category: 'Commercial',
    type: 'Office Interior',
    area: '7,400 sq.ft',
    duration: '110 days',
    image: '/images/office-interior.png',
    summary:
      'A 90-seat corporate office with a backlit brand wall, glass cabins in gold framing and a designer collaboration lounge.',
    highlights: ['Backlit brand reception', 'Acoustic meeting pods', 'Integrated data & power'],
  },
  {
    slug: 'the-gilded-boutique',
    title: 'The Gilded Boutique',
    location: 'Colaba, Mumbai',
    category: 'Commercial',
    type: 'Shop Interior',
    area: '1,150 sq.ft',
    duration: '46 days',
    image: '/images/shop-interior.png',
    summary:
      'A jewellery boutique with brass display niches, terrazzo flooring and a precisely calibrated accent lighting grid.',
    highlights: ['Brass display niches', 'Terrazzo flooring', '3000K accent lighting grid'],
  },
  {
    slug: 'careview-clinic',
    title: 'CareView Clinic',
    location: 'Chembur, Mumbai',
    category: 'Commercial',
    type: 'Hospital Interior',
    area: '4,600 sq.ft',
    duration: '96 days',
    image: '/images/hospital-interior.png',
    summary:
      'A multi-speciality clinic combining hygiene-first seamless finishes with warm wood-slat ceilings and calm waiting zones.',
    highlights: ['Seamless vinyl flooring', 'Antibacterial laminates', 'Wayfinding & signage'],
  },
  {
    slug: 'stone-and-brass-bath',
    title: 'Stone & Brass Bath',
    location: 'Juhu, Mumbai',
    category: 'Residential',
    type: 'Bathroom',
    area: '140 sq.ft',
    duration: '28 days',
    image: '/images/luxury-bathroom.png',
    summary:
      'A spa-grade bathroom in book-matched black marble with a freestanding tub and full brushed-gold sanitaryware.',
    highlights: ['Book-matched marble', 'Freestanding tub', 'Backlit anti-fog mirror'],
  },
]

export const beforeAfter = [
  {
    title: 'Living Room Transformation',
    location: 'Wadala, Mumbai',
    before: '/images/before-living.png',
    after: '/images/after-living.png',
    note: 'Bare shell to a layered living room in 52 days.',
  },
  {
    title: 'Kitchen Makeover',
    location: 'Sion, Mumbai',
    before: '/images/before-kitchen.png',
    after: '/images/after-kitchen.png',
    note: 'Dated laminate kitchen rebuilt as a handleless modular kitchen.',
  },
  {
    title: 'Master Bedroom Revival',
    location: 'Matunga, Mumbai',
    before: '/images/before-bedroom.png',
    after: '/images/after-bedroom.png',
    note: 'Empty room to a warm, wardrobe-complete master suite.',
  },
]

export const galleryImages = [
  { src: '/images/hero-living-room.png', alt: 'Luxury living room with black marble and gold inlay wall', tag: 'Living Room' },
  { src: '/images/modular-kitchen.png', alt: 'Matte black modular kitchen with quartz waterfall island', tag: 'Kitchen' },
  { src: '/images/master-bedroom.png', alt: 'Ivory master bedroom with gold trim panelling', tag: 'Bedroom' },
  { src: '/images/villa-interior.png', alt: 'Double height villa hall with brass staircase', tag: 'Villa' },
  { src: '/images/luxury-apartment.png', alt: 'Apartment dining area with gold pendant cluster', tag: 'Apartment' },
  { src: '/images/office-interior.png', alt: 'Corporate office reception with backlit brand wall', tag: 'Office' },
  { src: '/images/shop-interior.png', alt: 'Retail boutique with brass display niches', tag: 'Retail' },
  { src: '/images/luxury-bathroom.png', alt: 'Black marble bathroom with freestanding tub', tag: 'Bathroom' },
  { src: '/images/walk-in-wardrobe.png', alt: 'Walk-in wardrobe with brass rails and glass cabinets', tag: 'Wardrobe' },
  { src: '/images/ceiling-detail.png', alt: 'Designer false ceiling with cove lighting and gold reveal', tag: 'Ceiling' },
  { src: '/images/craftsmanship.png', alt: 'Carpenter finishing bespoke walnut cabinetry', tag: 'Carpentry' },
  { src: '/images/hospital-interior.png', alt: 'Hospital reception with wood slat ceiling', tag: 'Healthcare' },
]

export const testimonials = [
  {
    name: 'Rohit & Anjali Deshmukh',
    role: '3BHK Apartment · Wadala',
    quote:
      'They handed over our flat eleven days ahead of schedule and the finishing is better than the 3D views. The site supervisor sent photos every single week.',
    rating: 5,
  },
  {
    name: 'Dr. Sneha Kulkarni',
    role: 'CareView Clinic · Chembur',
    quote:
      'A clinic is a difficult brief — hygiene norms, patient comfort, tight shutdown windows. Devkansh handled all of it and kept us operational throughout.',
    rating: 5,
  },
  {
    name: 'Imran Shaikh',
    role: 'Villa · Alibaug',
    quote:
      'The double-height hall is the reason people visit our home. Detailing on the brass railing and marble joints is genuinely world class.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Modular Kitchen · Powai',
    quote:
      'Every hinge, channel and board brand was written into the quotation. Two years on, not one door has sagged. That is the trust they promise.',
    rating: 5,
  },
  {
    name: 'Sandeep Agarwal',
    role: 'Meridian Workspace · Lower Parel',
    quote:
      '7,400 sq.ft of office fit-out with zero cost escalation. Our leadership team still talks about the reception wall.',
    rating: 5,
  },
  {
    name: 'Meenal Joshi',
    role: 'Master Bedroom · Bandra West',
    quote:
      'They worked around a live household with two kids and kept the site spotless daily. Rare professionalism in this trade.',
    rating: 5,
  },
]

export const faqs = [
  {
    q: 'What does a Devkansh Interior project typically cost?',
    a: 'Full home interiors generally begin around ₹1,450 per sq.ft for essential packages and ₹2,600+ per sq.ft for premium and luxury specifications. Every quotation is a line-item BOQ that names the brand, thickness and finish of each material, so you know exactly what you are paying for.',
  },
  {
    q: 'How long will my project take?',
    a: 'A modular kitchen takes 28–35 days, a full 2–3BHK home 45–75 days, and villa or commercial turnkey projects 90–150 days. Your timeline is fixed in writing at the quotation stage along with a weekly milestone plan.',
  },
  {
    q: 'Is the free consultation really free?',
    a: 'Yes. The first site visit or studio meeting, requirement study, budget guidance and an indicative layout direction carry no charge and no obligation.',
  },
  {
    q: 'Do you handle civil work, plumbing and electrical too?',
    a: 'We do. Devkansh Services Private Limited executes civil work, waterproofing, plumbing, electrical, false ceiling, painting, carpentry and fire protection in-house or through long-standing vetted partners — under one turnkey contract.',
  },
  {
    q: 'What warranty do you provide?',
    a: 'Modular woodwork carries a 10-year warranty against manufacturing defects, hardware follows the manufacturer warranty (typically 5–10 years), and all painting and civil work carries a 1-year service warranty.',
  },
  {
    q: 'Will I get 3D designs before work begins?',
    a: 'Always. You receive space plans, mood boards and photorealistic 3D views of every room. Execution begins only after you sign off on the design and the BOQ.',
  },
  {
    q: 'How are payments structured?',
    a: 'A standard schedule is 10% booking, 40% on design sign-off and material ordering, 40% at mid-execution and 10% at snag-free handover. Every payment is invoiced with GST.',
  },
  {
    q: 'Which locations do you serve?',
    a: 'We are headquartered in Antop Hill, Wadala and serve all of Mumbai, Navi Mumbai and Thane. We also take on villa and commercial projects across Maharashtra, including Alibaug, Lonavala and Pune.',
  },
  {
    q: 'Can you work on an occupied home or a running business?',
    a: 'Yes. We plan phased execution, dust barriers and daily cleaning, and for commercial sites we can work night shifts or weekends so your operations never stop.',
  },
  {
    q: 'Do you offer EMI or finance options?',
    a: 'We can connect you with partner lenders offering interior finance at competitive rates with tenures of 12–60 months. Our team will help with the documentation.',
  },
]

export const stats = [
  { value: '480+', label: 'Spaces Delivered' },
  { value: '12', label: 'Years of Craft' },
  { value: '96%', label: 'On-Time Handover' },
  { value: '10 Yr', label: 'Woodwork Warranty' },
]
