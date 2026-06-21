import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getProductPath } from '../utils/productRoutes'

function toList(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

function DetailBadge({ value, label }) {
  return (
    <div className="grid h-20 w-20 place-items-center rounded-full border-2 border-[#0f4eb3] bg-white text-center shadow-sm sm:h-24 sm:w-24">
      <div>
        <p className="text-lg font-black leading-none text-slate-950 sm:text-2xl">{value}</p>
        <p className="mt-1 text-[0.58rem] font-black uppercase leading-tight text-slate-500">{label}</p>
      </div>
    </div>
  )
}

function ProductCollectionDetail({ product, relatedProducts = [] }) {
  if (!product) return null

  const features = toList(product.features)
  const tags = toList(product.tags)
  const statistics = Array.isArray(product.statistics) ? product.statistics : []
  const information = [
    { label: 'Category', value: product.category },
    { label: 'Type', value: product.itemType || 'Collection' },
    { label: 'Support', value: 'Local Setup' },
  ].filter((item) => item.value)

  return (
    <section className="mx-auto max-w-[1396px] px-4 sm:px-6 xl:px-0">
      <motion.article
        key={product.slug || product.title}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="grid min-h-[526px] gap-10 rounded-3xl bg-white p-8 shadow-[0_22px_70px_rgba(15,23,42,0.08)] lg:grid-cols-[0.88fr_1fr] lg:p-9 xl:p-10"
      >
        <motion.div
          key={product.image}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="flex min-h-[360px] items-center justify-center rounded-2xl bg-gradient-to-br from-white to-slate-50 p-8 lg:min-h-[430px]"
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[360px] w-full object-contain lg:max-h-[430px]"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        <div className="self-center py-2">
          <span className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#0f4eb3]">
            Product Collection
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[0.98] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            {product.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-slate-600">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="text-lg font-black uppercase text-red-600">Specialities:</p>
            <ul className="mt-4 grid gap-4 text-lg font-bold leading-7 text-slate-900">
              {(features.length ? features : [product.description]).slice(0, 6).map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-950" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-7 h-px max-w-2xl bg-slate-200" />

          <div className="flex flex-wrap items-center gap-4">
            {statistics.slice(0, 4).map((stat) => (
              <DetailBadge key={`${stat.value}-${stat.label}`} value={stat.value} label={stat.label} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
            {(tags.length ? tags : [product.category, 'Setup', 'Service']).slice(0, 5).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
            {information.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-black text-slate-950">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.article>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((item) => {
          const isActive = item.slug === product.slug

          return (
            <Link
              key={item.slug}
              to={getProductPath(item)}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`relative grid min-h-48 place-items-center rounded-xl border p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10 ${
                isActive
                  ? 'border-[#0f4eb3] bg-blue-50 shadow-blue-950/15 ring-2 ring-blue-100'
                  : 'border-[#c9d9ea] bg-white hover:border-[#0f4eb3]'
              }`}
            >
              {isActive ? (
                <span className="absolute right-3 top-3 rounded-full bg-[#0f4eb3] px-2 py-1 text-[0.58rem] font-black uppercase tracking-[0.12em] text-white">
                  Active
                </span>
              ) : null}
              <div>
                <div className="mx-auto mb-4 flex h-28 w-full items-center justify-center rounded bg-slate-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="max-h-24 object-contain"
                  />
                </div>
                <h3 className="text-xs font-bold leading-5 text-slate-950">{item.title}</h3>
                <p className="mt-1 text-[0.65rem] font-black uppercase tracking-[0.12em] text-slate-500">
                  {item.itemType || item.category}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default ProductCollectionDetail
