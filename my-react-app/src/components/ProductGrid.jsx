import ProductCard from './ProductCard'

function ProductSkeleton() {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5">
      <div className="aspect-[4/3] animate-pulse bg-slate-100" />
      <div className="space-y-4 p-5">
        <div className="h-4 w-24 animate-pulse rounded-full bg-slate-100" />
        <div className="h-6 w-3/4 animate-pulse rounded-full bg-slate-100" />
        <div className="space-y-2">
          <div className="h-3 animate-pulse rounded-full bg-slate-100" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-slate-100" />
        </div>
        <div className="h-11 animate-pulse rounded-full bg-slate-100" />
      </div>
    </article>
  )
}

function ProductGrid({ products, loading, onViewDetails }) {
  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
        <h3 className="text-xl font-black text-slate-950">No products found</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
          Try a different category or search term.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id || product.title}
          product={product}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  )
}

export default ProductGrid
