import { Search, SlidersHorizontal, X } from 'lucide-react'

function ProductFilters({
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
  resultCount,
  totalCount,
}) {
  const hasFilters = query || activeCategory !== 'All Products'

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <label className="relative block">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search products"
            className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#0f4eb3] focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </label>

        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-3 text-sm font-bold text-[#0f4eb3]">
          <SlidersHorizontal className="h-4 w-4" />
          <span>
            {resultCount} / {totalCount}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                isActive
                  ? 'border-[#0f4eb3] bg-[#0f4eb3] text-white shadow-lg shadow-blue-900/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0f4eb3]'
              }`}
            >
              {category}
            </button>
          )
        })}

        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              onQueryChange('')
              onCategoryChange('All Products')
            }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default ProductFilters
