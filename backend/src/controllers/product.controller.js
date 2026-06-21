import Product from '../models/Product.js'

const validProductFilter = {
  title: { $exists: true, $ne: '' },
  category: { $exists: true, $ne: '' },
  image: { $exists: true, $ne: '' },
  description: { $exists: true, $ne: '' },
}

function toStringList(value) {
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

function buildProductPayload(body) {
  const price = body.price === '' || body.price == null ? null : Number(body.price)

  return {
    title: body.title?.trim(),
    category: body.category?.trim(),
    image: body.image?.trim(),
    description: body.description?.trim(),
    features: toStringList(body.features),
    tags: toStringList(body.tags),
    keywords: toStringList(body.keywords),
    detailUrl: body.detailUrl?.trim() || '',
    price: Number.isNaN(price) ? null : price,
    isActive: body.isActive ?? true,
  }
}

function hasRequiredProductFields(product) {
  return Boolean(product?.title && product?.category && product?.image && product?.description)
}

export async function getProducts(req, res, next) {
  try {
    const filter = req.admin ? validProductFilter : { ...validProductFilter, isActive: true }
    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json({ products })
  } catch (error) {
    next(error)
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id)
    if (!product || !hasRequiredProductFields(product) || (!req.admin && !product.isActive)) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ product })
  } catch (error) {
    next(error)
  }
}

export async function createProduct(req, res, next) {
  try {
    const payload = buildProductPayload(req.body)
    const { title, category, image, description } = payload

    if (!title || !category || !image || !description) {
      return res.status(400).json({ message: 'Title, category, image, and description are required' })
    }

    const product = await Product.create(payload)

    res.status(201).json({ product })
  } catch (error) {
    next(error)
  }
}

export async function updateProduct(req, res, next) {
  try {
    const payload = buildProductPayload(req.body)
    const { title, category, image, description } = payload

    if (!title || !category || !image || !description) {
      return res.status(400).json({ message: 'Title, category, image, and description are required' })
    }

    const product = await Product.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json({ product })
  } catch (error) {
    next(error)
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted' })
  } catch (error) {
    next(error)
  }
}
