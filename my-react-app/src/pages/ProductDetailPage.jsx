import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import CTASection from '../components/CTASection'
import ProductCollectionDetail from '../components/ProductCollectionDetail'
import { useProducts } from '../hooks/useProducts'
import {
  createProductCatalog,
  getRelatedCatalogProducts,
  productMatchesRoute,
} from '../utils/productRoutes'

function ProductDetailPage() {
  const { productId } = useParams()
  const { products, loading } = useProducts()
  const catalogProducts = createProductCatalog(products)
  const product = catalogProducts.find((item) => productMatchesRoute(item, productId))
  const relatedProducts = getRelatedCatalogProducts(catalogProducts, product)

  return (
    <main className="bg-[#fbfaf7]">
      <section className="h-20 bg-[#f5f0e8]" />

      <section className="py-8 sm:py-10">
        <div className="mx-auto mb-6 max-w-[1396px] px-4 sm:px-6 xl:px-0">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-[#0f4eb3]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        {loading && !product ? (
          <div className="mx-auto max-w-[1396px] px-4 sm:px-6 xl:px-0">
            <div className="h-[526px] animate-pulse rounded-3xl bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]" />
          </div>
        ) : product ? (
          <ProductCollectionDetail product={product} relatedProducts={relatedProducts} />
        ) : (
          <div className="mx-auto max-w-[1396px] rounded-3xl bg-white px-6 py-16 text-center shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
            <h1 className="text-2xl font-black text-slate-950">Product not found</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This product may have been removed or is currently unavailable.
            </p>
          </div>
        )}
      </section>

      <CTASection title="Need help choosing the right product?" />
    </main>
  )
}

export default ProductDetailPage
