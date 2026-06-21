import Admin from '../models/Admin.js'
import Product from '../models/Product.js'
import env from '../config/env.js'

const defaultProducts = [
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

async function ensureConfiguredAdmin() {
  const email = env.adminEmail.toLowerCase().trim()
  const existingAdmin = await Admin.findOne({ email })

  if (!existingAdmin) {
    await Admin.create({
      name: 'Admin',
      email,
      password: env.adminPassword,
    })
    console.log(`Configured admin created: ${email}`)
    return
  }

  if (env.nodeEnv !== 'production' && !(await existingAdmin.comparePassword(env.adminPassword))) {
    existingAdmin.password = env.adminPassword
    await existingAdmin.save()
    console.log(`Configured admin password synced: ${email}`)
  }
}

export async function seedDatabase() {
  await ensureConfiguredAdmin()

  const validProductCount = await Product.countDocuments({
    title: { $exists: true, $ne: '' },
    category: { $exists: true, $ne: '' },
    image: { $exists: true, $ne: '' },
    description: { $exists: true, $ne: '' },
  })

  if (validProductCount === 0) {
    await Product.insertMany(defaultProducts)
    console.log(`Seeded ${defaultProducts.length} default products`)
  } else {
    await Promise.all(
      defaultProducts.map((defaultProduct) =>
        Product.updateOne(
          {
            title: defaultProduct.title,
            $or: [
              { features: { $exists: false } },
              { features: { $size: 0 } },
              { tags: { $exists: false } },
              { tags: { $size: 0 } },
              { keywords: { $exists: false } },
              { keywords: { $size: 0 } },
            ],
          },
          {
            $set: {
              features: defaultProduct.features,
              tags: defaultProduct.tags,
              keywords: defaultProduct.keywords,
            },
          },
        ),
      ),
    )
  }
}
