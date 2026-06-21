export function slugifyProduct(value) {
  return String(value || 'product')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function toProductList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

function uniqueList(items) {
  return Array.from(new Set(items.filter(Boolean)))
}

function defaultStatistics(product) {
  const category = product?.category || 'Product'
  return [
    { value: '24h', label: 'Quick Support' },
    { value: '9+', label: 'Services' },
    { value: '4.9', label: 'Rated' },
    { value: category.length > 3 ? category.slice(0, 3).toUpperCase() : '100%', label: 'Category' },
  ]
}

function makeCatalogEntry(product, overrides = {}) {
  const title = overrides.title || product.title
  const slug = overrides.slug || slugifyProduct(title)
  const features = toProductList(overrides.features ?? product.features)
  const tags = toProductList(overrides.tags ?? product.tags)
  const keywords = toProductList(overrides.keywords ?? product.keywords)

  return {
    ...product,
    ...overrides,
    _id: overrides._id || product._id,
    sourceId: product._id || slugifyProduct(product.title),
    parentSlug: overrides.parentSlug || slug,
    slug,
    title,
    category: overrides.category || product.category,
    image: overrides.image || product.image,
    description: overrides.description || product.description,
    features,
    tags,
    keywords,
    statistics: overrides.statistics || product.statistics || defaultStatistics({ ...product, ...overrides }),
  }
}

function makeChildEntry(parent, title, kind, usedSlugs) {
  const baseSlug = slugifyProduct(title)
  let slug = baseSlug

  if (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${slugifyProduct(parent.title)}`
  }

  const parentFeatures = toProductList(parent.features)
  const childFeatures = uniqueList([
    title,
    ...parentFeatures.filter((feature) => feature !== title).slice(0, 3),
    `${parent.category} guidance`,
    'Home visit support',
  ]).slice(0, 6)

  return makeCatalogEntry(parent, {
    title,
    slug,
    parentSlug: parent.slug,
    itemType: kind,
    description: `${title} for ${parent.title}. ${parent.description}`,
    features: childFeatures,
    tags: uniqueList([parent.category, kind, ...toProductList(parent.tags)]).slice(0, 4),
    keywords: uniqueList([title, parent.title, parent.category, ...toProductList(parent.keywords)]),
    statistics: defaultStatistics({ ...parent, title }),
  })
}

export function createProductCatalog(products) {
  const usedSlugs = new Set()
  const entries = []

  products.forEach((product) => {
    const baseEntry = makeCatalogEntry(product, { slug: slugifyProduct(product.title) })
    usedSlugs.add(baseEntry.slug)
    entries.push(baseEntry)

    const children = [
      ...toProductList(product.features).map((title) => ({ title, kind: 'Feature' })),
      ...toProductList(product.tags).map((title) => ({ title, kind: 'Tag' })),
      ...toProductList(product.keywords).map((title) => ({ title, kind: 'Info' })),
    ]

    children.forEach(({ title, kind }) => {
      const childEntry = makeChildEntry(baseEntry, title, kind, usedSlugs)
      usedSlugs.add(childEntry.slug)
      entries.push(childEntry)
    })
  })

  return entries
}

export function getProductRouteId(product) {
  return product?.slug || slugifyProduct(product?.title)
}

export function getProductPath(product) {
  return `/products/${encodeURIComponent(getProductRouteId(product))}`
}

export function productMatchesRoute(product, routeId) {
  const decodedRouteId = decodeURIComponent(routeId || '')
  return (
    product?._id === decodedRouteId ||
    product?.slug === decodedRouteId ||
    slugifyProduct(product?.title) === decodedRouteId
  )
}

export function getRelatedCatalogProducts(entries, activeProduct) {
  if (!activeProduct) return []

  const sameCollection = entries.filter(
    (entry) => entry.parentSlug === activeProduct.parentSlug || entry.slug === activeProduct.parentSlug,
  )
  const fallback = entries.filter((entry) => !sameCollection.some((item) => item.slug === entry.slug))

  return [...sameCollection, ...fallback].slice(0, 8)
}
