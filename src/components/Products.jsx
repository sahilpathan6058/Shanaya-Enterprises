import ImageWithFallback from './ImageWithFallback'

function Products({
  products,
  categoryDetails,
  productCategories,
  selectedCategory,
  allCategoriesLabel,
  onProductCategorySelect,
  onProductEnquire,
}) {
  const isCategoryOverview = selectedCategory === allCategoriesLabel
  const visibleProducts = products.filter((product) => product.category === selectedCategory)
  const productCounts = products.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1
    return counts
  }, {})
  const activeCategory = categoryDetails.find((category) => category.category === selectedCategory)
  const categoryPreviewProducts = products.reduce((previews, product) => {
    if (!previews[product.category]) {
      previews[product.category] = product
    }

    return previews
  }, {})

  return (
    <section id="products" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                Products
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                {isCategoryOverview
                  ? 'Browse every product category with the same clean experience'
                  : `${selectedCategory} options with ready enquiry support`}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {isCategoryOverview
                  ? 'Choose a category to explore the full range. Each section opens matching products with company, size, color, and price details.'
                  : activeCategory?.summary ||
                    'Explore the selected category and send an enquiry for the model that fits your requirement.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-600">
                Showing: <span className="font-semibold text-slate-900">{selectedCategory}</span>
              </div>

              {!isCategoryOverview ? (
                <button
                  type="button"
                  onClick={() => onProductCategorySelect(allCategoriesLabel)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#0f4eb3]/20 hover:text-[#0f4eb3]"
                >
                  View All Categories
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {productCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onProductCategorySelect(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-[#0f4eb3] text-white shadow-lg shadow-blue-600/20'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-[#0f4eb3]/20 hover:text-[#0f4eb3]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {isCategoryOverview ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {categoryDetails.map((category) => (
              <article
                key={category.category}
                className="group relative overflow-hidden rounded-[1.85rem] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_24px_48px_-30px_rgba(15,23,42,0.26)] ring-1 ring-white/70 transition duration-300 hover:-translate-y-2 hover:shadow-[0_30px_58px_-28px_rgba(15,23,42,0.3)]"
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-90"></div>

                <div className="relative aspect-[4/3.55] overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={categoryPreviewProducts[category.category]?.image || category.image}
                    alt={category.category}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/20 to-white/10"></div>

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm shadow-slate-900/10">
                      {category.category}
                    </span>
                    <span className="rounded-full bg-gradient-to-r from-[#2d68d8] to-[#0f4eb3] px-3 py-1 text-[11px] font-semibold text-white shadow-sm shadow-blue-900/20">
                      {category.tag}
                    </span>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 rounded-[1.45rem] border border-white/15 bg-white/10 p-3.5 text-white backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                      Category Overview
                    </p>
                    <p className="mt-1.5 text-[1.05rem] font-semibold">{category.category}</p>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <p className="text-sm leading-6 text-slate-600">{category.summary}</p>

                  <div className="rounded-[1.45rem] border border-slate-100 bg-[linear-gradient(180deg,#f9fbff_0%,#f4f7fc_100%)] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Available Products
                      </p>
                      <p className="text-sm font-semibold text-[#0f4eb3]">
                        {productCounts[category.category] || 0} models
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {category.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-slate-200/80 bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-sm shadow-slate-900/[0.03]"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => onProductCategorySelect(category.category)}
                      className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#1c5fcc] to-[#0f4eb3] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_28px_-18px_rgba(15,78,179,0.75)] transition hover:-translate-y-0.5 hover:from-[#215fbe] hover:to-[#123f8f]"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="relative aspect-[4/3.75] overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent"></div>

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
                      {product.category}
                    </span>
                    <span className="rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                      {product.tag}
                    </span>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/15 bg-white/10 p-3 text-white backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
                      Trusted Local Supply
                    </p>
                    <p className="mt-1.5 text-lg font-semibold">{product.name}</p>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <p className="text-sm leading-6 text-slate-600">{product.description}</p>

                  <div className="grid gap-3 rounded-[1.5rem] bg-slate-50 p-3.5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Company
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{product.company}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Size
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{product.size}</p>
                    </div>

                    <div className="sm:col-span-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Color
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{product.color}</p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Price
                      </p>
                      <p className="mt-2 text-base font-semibold text-[#0f4eb3]">{product.price}</p>
                    </div>

                    <a
                      href="#enquiry-form"
                      onClick={() => onProductEnquire?.(product)}
                      className="inline-flex items-center justify-center rounded-full bg-[#0f4eb3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#133b8e]"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!isCategoryOverview && visibleProducts.length === 0 ? (
          <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-sm font-medium text-slate-500">
            No products found in this category yet.
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Products
