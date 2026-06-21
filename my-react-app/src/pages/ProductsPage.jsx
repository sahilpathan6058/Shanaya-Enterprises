import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import { useProducts } from '../hooks/useProducts'
import { getProductPath } from '../utils/productRoutes'

function CollectionCard({ product }) {
  return (
    <Link
      to={getProductPath(product)}
      className="group overflow-hidden rounded-xl border border-[#c9d9ea] bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0f4eb3] hover:shadow-xl hover:shadow-slate-950/10"
    >
      <div className="relative flex aspect-[16/8.2] items-center justify-center overflow-hidden bg-[#eaf4ff] px-10 py-5">
        <div className="absolute left-0 top-0 h-9 w-9 bg-[#d9ebfb] [clip-path:polygon(0_0,100%_0,0_100%)]" />
        <div className="absolute right-0 top-0 h-11 w-11 bg-[#d9ebfb] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="relative z-10 max-h-full w-full object-contain transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="border-t border-[#d6e2ef] bg-[#f4f9ff] px-4 py-4">
        <h3 className="text-base font-black leading-snug text-slate-950 sm:text-lg">{product.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.description}</p>
      </div>
    </Link>
  )
}

function ProductsPage() {
  const { products, loading } = useProducts()

  return (
    <main className="bg-[#fbfaf7]">
      <section className="h-20 bg-[#f5f0e8]" />

      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-[1124px] px-4 sm:px-6">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="h-72 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <CollectionCard key={product._id || product.title} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection title="Need help choosing the right product?" />
    </main>
  )
}

export default ProductsPage
