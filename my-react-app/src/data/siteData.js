import {
  BadgeCheck,
  Cable,
  CheckCircle2,
  Headphones,
  MonitorUp,
  Router,
  Satellite,
  ShieldCheck,
  Sparkles,
  Star,
  Tv,
  Wrench,
} from 'lucide-react'

export const business = {
  name: 'Shanaya Electronics Care',
  shortName: 'Shanaya Care',
  phone: '+91 94047 99782',
  phoneHref: 'tel:+919404799782',
  whatsappHref:
    'https://wa.me/919404799782?text=Hi%2C%20I%20want%20to%20book%20an%20electronics%20service.',
  email: 'support@shanayacare.local',
  address: 'Local electronics service team serving homes and shops nearby',
  hours: 'Mon-Sun, 9:00 AM - 9:00 PM',
}

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Dish TV', path: '/dish-tv' },
  { label: 'Products', path: '/products' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export const services = [
  {
    title: 'TV Installation & Repair',
    icon: Tv,
    image: '/images/electronics-service-hero.png',
    description:
      'Wall mounting, bracket fitting, basic repair checks, cable dressing, and safe setup for LED, LCD, and Smart TVs.',
    benefits: ['Clean wall mounting', 'Cable management', 'Same-day visit'],
  },
  {
    title: 'Smart TV Setup',
    icon: MonitorUp,
    image: '/images/electronics-service-hero.png',
    description:
      'App setup, WiFi connection, account configuration, remote pairing, display settings, and streaming readiness.',
    benefits: ['Streaming apps ready', 'WiFi pairing', 'Remote setup'],
  },
  {
    title: 'Dish TV Installation',
    icon: Satellite,
    image: '/images/dish-installation.png',
    description:
      'Antenna alignment, signal tuning, cabling, set top box configuration, and support for new or existing connections.',
    benefits: ['Signal tuning', 'Neat cabling', 'Authorized support'],
  },
  {
    title: 'New Dish TV Connection',
    icon: BadgeCheck,
    image: '/images/dish-installation.png',
    description:
      'Guided plan selection, new connection setup, HD set top box installation, and recharge assistance.',
    benefits: ['Dealer guidance', 'Quick activation', 'Recharge help'],
  },
  {
    title: 'Set Top Box Installation',
    icon: Cable,
    image: '/images/dish-installation.png',
    description:
      'Set top box fitting, HDMI/AV connection, remote pairing, channel scan, and troubleshooting.',
    benefits: ['HDMI setup', 'Channel scan', 'Remote pairing'],
  },
  {
    title: 'WiFi Router Installation',
    icon: Router,
    image: '/images/wifi-setup.png',
    description:
      'Router placement, broadband setup, password security, speed checks, and coverage optimization.',
    benefits: ['Secure WiFi', 'Speed check', 'Coverage advice'],
  },
  {
    title: 'Internet Network Setup',
    icon: ShieldCheck,
    image: '/images/wifi-setup.png',
    description:
      'Home and shop network setup with LAN cabling, extender planning, device connection, and basic diagnostics.',
    benefits: ['LAN cabling', 'Device setup', 'Network testing'],
  },
  {
    title: 'RO Installation & Service',
    icon: Wrench,
    image: '/images/ro-service.png',
    description:
      'Water purifier installation, filter service, leakage checks, TDS guidance, and maintenance visits.',
    benefits: ['Hygienic fitting', 'Leakage check', 'Filter guidance'],
  },
  {
    title: 'Home Visit Technical Support',
    icon: Headphones,
    image: '/images/electronics-service-hero.png',
    description:
      'On-site troubleshooting for TV, WiFi, dish connection, set top box, and basic electronics setup issues.',
    benefits: ['Doorstep visit', 'Clear diagnosis', 'Friendly support'],
  },
]

export const products = [
  {
    title: 'Smart TVs',
    category: 'TV',
    image: '/images/electronics-service-hero.png',
    description: 'LED and Smart TV recommendations with installation support.',
    features: ['LED and Smart TV options', 'Wall mount setup support', 'Picture and app guidance'],
    tags: ['Installation Ready', 'Home Setup'],
    keywords: ['smart tv', 'led tv', 'wall mount', 'tv installation'],
  },
  {
    title: 'HD Set Top Boxes',
    category: 'Dish TV',
    image: '/images/dish-installation.png',
    description: 'HD set top box setup, replacement, pairing, and activation help.',
    features: ['HD set top box options', 'Remote pairing support', 'Activation assistance'],
    tags: ['Dish TV', 'HD Setup'],
    keywords: ['set top box', 'dish tv', 'hd box', 'activation'],
  },
  {
    title: 'WiFi Routers',
    category: 'Internet',
    image: '/images/wifi-setup.png',
    description: 'Router selection, placement, password setup, and coverage support.',
    features: ['Coverage planning', 'Secure password setup', 'Device connection support'],
    tags: ['WiFi', 'Network'],
    keywords: ['router', 'wifi', 'internet', 'network setup'],
  },
  {
    title: 'Water Purifiers',
    category: 'RO',
    image: '/images/ro-service.png',
    description: 'RO purifier installation, servicing, filter support, and maintenance.',
    features: ['RO installation support', 'Filter service guidance', 'Leakage and TDS checks'],
    tags: ['RO Service', 'Maintenance'],
    keywords: ['ro', 'water purifier', 'filter', 'service'],
  },
  {
    title: 'Cables & Accessories',
    category: 'Accessories',
    image: '/images/electronics-service-hero.png',
    description: 'HDMI cables, brackets, connectors, remotes, and installation accessories.',
    features: ['HDMI and AV accessories', 'TV brackets and fittings', 'Remote and connector support'],
    tags: ['Accessories', 'Fittings'],
    keywords: ['hdmi', 'bracket', 'remote', 'cable', 'connector'],
  },
]

export const galleryItems = [
  {
    title: 'Smart TV Wall Mount',
    type: 'TV Installation',
    image: '/images/electronics-service-hero.png',
  },
  {
    title: 'Dish Antenna Alignment',
    type: 'Dish TV',
    image: '/images/dish-installation.png',
  },
  {
    title: 'Home WiFi Network Setup',
    type: 'WiFi Setup',
    image: '/images/wifi-setup.png',
  },
  {
    title: 'RO Water Purifier Service',
    type: 'RO Installation',
    image: '/images/ro-service.png',
  },
]

export const reviews = [
  {
    name: 'Amit Sharma',
    area: 'Near City Center',
    rating: 5,
    text: 'TV wall mount and Dish TV setup were done neatly. The technician explained everything before leaving.',
  },
  {
    name: 'Priya Khan',
    area: 'Green Park',
    rating: 5,
    text: 'Router setup was quick and the WiFi coverage improved. Very professional home visit service.',
  },
  {
    name: 'Rohit Patil',
    area: 'Market Road',
    rating: 5,
    text: 'RO installation was clean and on time. Good support for service reminders and maintenance.',
  },
]

export const whyChooseUs = [
  { title: 'Authorized Dish TV Dealer', icon: BadgeCheck, text: 'Trusted support for new connections, setup boxes, and recharge help.' },
  { title: 'Doorstep Service', icon: Sparkles, text: 'Fast home visits for installations, repairs, and technical support.' },
  { title: 'Transparent Guidance', icon: CheckCircle2, text: 'Clear service scope, neat work, and practical advice before billing.' },
  { title: 'Highly Rated Support', icon: Star, text: 'Friendly technicians focused on clean setup and long-term reliability.' },
]

export const serviceAreas = [
  'City Center',
  'Market Road',
  'Green Park',
  'Station Area',
  'New Colony',
  'Ring Road',
  'Industrial Area',
  'Nearby Villages',
]

export const dishFaqs = [
  {
    question: 'Do you provide new Dish TV connections?',
    answer: 'Yes. We help with new connection guidance, set top box installation, activation, and basic plan support.',
  },
  {
    question: 'Can you fix low signal or no signal issues?',
    answer: 'Yes. We check antenna direction, cable condition, set top box settings, and signal strength.',
  },
  {
    question: 'Do you help with recharge?',
    answer: 'Yes. We provide recharge assistance and basic account guidance for existing customers.',
  },
  {
    question: 'How quickly can you visit?',
    answer: 'Most local visits can be scheduled the same day depending on technician availability.',
  },
]
