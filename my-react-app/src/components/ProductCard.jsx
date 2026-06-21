import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
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

function ProductCard({ product, onViewDetails }) {
  const features = toList(product.features).slice(0, 3)
  const tags = toList(product.tags).slice(0, 2)
  const detailHref = product.detailUrl || product.href
  const detailsClass =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 text-sm font-black text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0f4eb3]'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-950/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        {tags.length ? (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-50 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#0f4eb3]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <h3 className="text-xl font-black tracking-tight text-slate-950">{product.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>

        {features.length ? (
          <ul className="mt-5 grid gap-2">
            {features.map((feature) => (
              <li key={feature} className="flex gap-2 text-sm font-semibold leading-5 text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f4eb3]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {product.price ? (
          <p className="mt-5 text-lg font-black text-[#0f4eb3]">Rs. {product.price}</p>
        ) : null}

        <div className="mt-auto grid gap-3 pt-6">
          {detailHref ? (
            <a href={detailHref} target="_blank" rel="noreferrer" className={detailsClass}>
              View Details
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : onViewDetails ? (
            <button type="button" onClick={() => onViewDetails(product)} className={detailsClass}>
              View Details
              <ArrowUpRight className="h-4 w-4" />
            </button>
          ) : (
            <Link to="/products" className={detailsClass}>
              View Details
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}

          <a
            href={business.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#0f4eb3] px-4 text-sm font-black text-white transition hover:bg-[#08245c]"
          >
            <MessageCircle className="h-4 w-4" />
            Enquire Now
          </a>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
