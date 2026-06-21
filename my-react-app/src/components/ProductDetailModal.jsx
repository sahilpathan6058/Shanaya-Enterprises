import { ExternalLink, MessageCircle, X } from 'lucide-react'
import { useEffect } from 'react'
import { business } from '../data/siteData'

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

function ProductDetailModal({ product, onClose }) {
  const features = toList(product?.features)
  const tags = toList(product?.tags)
  const detailHref = product?.detailUrl || product?.href

  useEffect(() => {
    if (!product) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, product])

  if (!product) return null

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
    >
      <button
        type="button"
        aria-label="Close product details"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <article className="relative grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-72 bg-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="h-full min-h-72 w-full object-cover"
          />
          <span className="absolute left-5 top-5 rounded-full bg-orange-500 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
            {product.category}
          </span>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f4eb3]">
                Product Details
              </p>
              <h2 id="product-detail-title" className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                {product.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-5 text-base leading-8 text-slate-600">{product.description}</p>

          {product.price ? (
            <p className="mt-5 text-2xl font-black text-[#0f4eb3]">Rs. {product.price}</p>
          ) : null}

          {features.length ? (
            <div className="mt-6">
              <h3 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">
                Highlights
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {tags.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#0f4eb3]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f4eb3] px-5 py-3 text-sm font-black text-white transition hover:bg-[#08245c]"
            >
              <MessageCircle className="h-4 w-4" />
              Enquire Now
            </a>
            {detailHref ? (
              <a
                href={detailHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
              >
                <ExternalLink className="h-4 w-4" />
                Open Product
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  )
}

export default ProductDetailModal
