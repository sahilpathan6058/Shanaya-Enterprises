import { useState } from 'react'
import ImageWithFallback from './ImageWithFallback'
import { enquiryStatusOptions, productPlaceholderImage } from '../lib/adminData'

const emptyProductForm = {
  category: '',
  name: '',
  company: '',
  size: '',
  color: '',
  price: '',
  image: '',
  tag: '',
  description: '',
}

function createProductForm(defaultCategory = '') {
  return {
    ...emptyProductForm,
    category: defaultCategory,
  }
}

function formatRequestDate(dateValue) {
  if (!dateValue) {
    return 'No date available'
  }

  try {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(dateValue))
  } catch {
    return dateValue
  }
}

function getStatusBadgeClasses(status) {
  if (status === 'Resolved') {
    return 'bg-emerald-50 text-emerald-700 ring-emerald-200'
  }

  if (status === 'In Progress') {
    return 'bg-amber-50 text-amber-700 ring-amber-200'
  }

  if (status === 'Contacted') {
    return 'bg-blue-50 text-blue-700 ring-blue-200'
  }

  return 'bg-rose-50 text-rose-700 ring-rose-200'
}

function formatWhatsAppPhone(phone) {
  const digits = phone.replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  return digits.length === 10 ? `91${digits}` : digits
}

function AdminPanel({
  products,
  requests,
  categoryOptions,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateRequestStatus,
  onDeleteRequest,
  onExitAdmin,
}) {
  const [productForm, setProductForm] = useState(() => createProductForm(categoryOptions[0] || ''))
  const [editingProductId, setEditingProductId] = useState(null)
  const [inventorySearch, setInventorySearch] = useState('')
  const [requestFilter, setRequestFilter] = useState('All')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const resetProductForm = () => {
    setEditingProductId(null)
    setProductForm(createProductForm(categoryOptions[0] || ''))
  }

  const handleProductFormChange = (event) => {
    const { name, value } = event.target

    setProductForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  const handleProductSubmit = (event) => {
    event.preventDefault()
    const nextProductForm = {
      ...productForm,
      category: productForm.category || categoryOptions[0] || '',
    }

    if (editingProductId) {
      onUpdateProduct(editingProductId, nextProductForm)
      setFeedbackMessage(`Updated ${nextProductForm.name} in the inventory.`)
    } else {
      onAddProduct(nextProductForm)
      setFeedbackMessage(`Added ${nextProductForm.name} to the inventory.`)
    }

    resetProductForm()
  }

  const handleEditProduct = (product) => {
    setEditingProductId(product.id)
    setProductForm({
      category: product.category,
      name: product.name,
      company: product.company,
      size: product.size,
      color: product.color,
      price: product.price,
      image: product.image,
      tag: product.tag,
      description: product.description,
    })
    setFeedbackMessage(`Editing ${product.name}.`)
  }

  const handleDeleteProduct = (product) => {
    if (typeof window !== 'undefined') {
      const shouldDelete = window.confirm(`Delete ${product.name} from the inventory?`)

      if (!shouldDelete) {
        return
      }
    }

    onDeleteProduct(product.id)
    if (editingProductId === product.id) {
      resetProductForm()
    }
    setFeedbackMessage(`Deleted ${product.name} from the inventory.`)
  }

  const handleDeleteRequest = (request) => {
    if (typeof window !== 'undefined') {
      const shouldDelete = window.confirm(`Delete the request from ${request.name}?`)

      if (!shouldDelete) {
        return
      }
    }

    onDeleteRequest(request.id)
    setFeedbackMessage(`Deleted the request from ${request.name}.`)
  }

  const filteredProducts = [...products]
    .filter((product) => {
      if (!inventorySearch.trim()) {
        return true
      }

      const searchValue = inventorySearch.toLowerCase()
      return [product.name, product.company, product.category, product.price]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(searchValue))
    })
    .sort((firstProduct, secondProduct) => firstProduct.name.localeCompare(secondProduct.name))

  const filteredRequests = [...requests]
    .filter((request) => (requestFilter === 'All' ? true : request.status === requestFilter))
    .sort(
      (firstRequest, secondRequest) =>
        new Date(secondRequest.createdAt).getTime() - new Date(firstRequest.createdAt).getTime(),
    )

  const totalProducts = products.length
  const totalCategories = categoryOptions.length
  const totalRequests = requests.length
  const openRequests = requests.filter((request) => request.status !== 'Resolved').length
  const availableCategoryOptions =
    productForm.category && !categoryOptions.includes(productForm.category)
      ? [productForm.category, ...categoryOptions]
      : categoryOptions

  const statCards = [
    {
      label: 'Total Products',
      value: totalProducts,
      helper: 'Products currently visible on the website',
    },
    {
      label: 'Categories',
      value: totalCategories,
      helper: 'Product groups managed from this device',
    },
    {
      label: 'Customer Requests',
      value: totalRequests,
      helper: 'Saved enquiries from the website contact form',
    },
    {
      label: 'Open Requests',
      value: openRequests,
      helper: 'Requests still needing follow-up',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f4f7fb_0%,#eef7ff_38%,#ffffff_100%)] text-slate-800">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,_rgba(15,78,179,0.18),_transparent_56%)]"></div>
      <div className="pointer-events-none absolute right-0 top-20 -z-10 h-64 w-64 rounded-full bg-[#12b4a6]/15 blur-3xl"></div>
      <div className="pointer-events-none absolute left-0 top-[28rem] -z-10 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl"></div>

      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,248,252,0.94))] p-6 shadow-[0_24px_55px_-38px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/70">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                  Admin Workspace
                </span>
                <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  Dashboard for products and customer request handling
                </h1>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Manage inventory, update product details, remove outdated items, and track every
                  customer enquiry from one place. Data is saved in this browser using local
                  storage.
                </p>
              </div>

              <button
                type="button"
                onClick={onExitAdmin}
                className="inline-flex items-center justify-center rounded-full bg-[#0f4eb3] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_-18px_rgba(15,78,179,0.72)] transition hover:-translate-y-0.5 hover:bg-[#133b8e]"
              >
                Back to Website
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <article
              key={card.label}
              className="rounded-[1.75rem] border border-slate-200/80 bg-white/90 p-5 shadow-lg shadow-slate-900/5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                {card.label}
              </p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{card.value}</p>
              <p className="mt-3 text-sm leading-7 text-slate-500">{card.helper}</p>
            </article>
          ))}
        </section>

        {feedbackMessage ? (
          <div className="mt-6 rounded-[1.5rem] border border-[#12b4a6]/20 bg-[#12b4a6]/10 px-5 py-4 text-sm font-medium text-[#0d8e83]">
            {feedbackMessage}
          </div>
        ) : null}

        <section className="mt-8 grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  Product Form
                </span>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                  {editingProductId ? 'Update existing product' : 'Add a new product'}
                </h2>
              </div>

              {editingProductId ? (
                <button
                  type="button"
                  onClick={resetProductForm}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#0f4eb3]/20 hover:text-[#0f4eb3]"
                >
                  Cancel Edit
                </button>
              ) : null}
            </div>

            <form className="mt-8 grid gap-5" onSubmit={handleProductSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Category
                  <select
                    name="category"
                    value={productForm.category || categoryOptions[0] || ''}
                    onChange={handleProductFormChange}
                    required
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {availableCategoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Product Name
                  <input
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleProductFormChange}
                    required
                    placeholder="Samsung Smart LED TV"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Company
                  <input
                    type="text"
                    name="company"
                    value={productForm.company}
                    onChange={handleProductFormChange}
                    required
                    placeholder="Samsung"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Price
                  <input
                    type="text"
                    name="price"
                    value={productForm.price}
                    onChange={handleProductFormChange}
                    required
                    placeholder="Rs. 18,999"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Size
                  <input
                    type="text"
                    name="size"
                    value={productForm.size}
                    onChange={handleProductFormChange}
                    placeholder="32 inch"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Color
                  <input
                    type="text"
                    name="color"
                    value={productForm.color}
                    onChange={handleProductFormChange}
                    placeholder="Black"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Product Tag
                  <input
                    type="text"
                    name="tag"
                    value={productForm.tag}
                    onChange={handleProductFormChange}
                    placeholder="Smart Ready"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Image URL
                <input
                  type="text"
                  name="image"
                  value={productForm.image}
                  onChange={handleProductFormChange}
                  placeholder={productPlaceholderImage}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Description
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductFormChange}
                  rows="5"
                  required
                  placeholder="Describe the product in a way that helps shoppers understand the model."
                  className="rounded-[1.6rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                ></textarea>
              </label>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#0f4eb3] px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#133b8e]"
              >
                {editingProductId ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  Inventory
                </span>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                  Browse and edit products
                </h2>
              </div>

              <input
                type="search"
                value={inventorySearch}
                onChange={(event) => setInventorySearch(event.target.value)}
                placeholder="Search products"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white sm:w-72"
              />
            </div>

            <div className="mt-8 grid gap-4 lg:max-h-[58rem] lg:overflow-y-auto lg:pr-1">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-sm shadow-slate-900/[0.03]"
                >
                  <div className="grid gap-0 md:grid-cols-[11rem_1fr]">
                    <div className="h-full bg-slate-100">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="h-full min-h-52 w-full object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                              {product.category}
                            </span>
                            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                              {product.tag}
                            </span>
                          </div>

                          <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                            {product.name}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-slate-600">
                            {product.description}
                          </p>
                        </div>

                        <p className="text-lg font-semibold text-[#0f4eb3]">{product.price}</p>
                      </div>

                      <div className="mt-5 grid gap-3 rounded-[1.4rem] bg-white p-4 ring-1 ring-slate-100 sm:grid-cols-3">
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
                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {product.size || 'Not set'}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Color
                          </p>
                          <p className="mt-1 text-sm font-semibold text-slate-800">
                            {product.color || 'Not set'}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => handleEditProduct(product)}
                          className="inline-flex items-center justify-center rounded-full bg-[#0f4eb3] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#133b8e]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(product)}
                          className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {filteredProducts.length === 0 ? (
                <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm font-medium text-slate-500">
                  No products matched your search.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="rounded-full bg-[#ecfeff] px-4 py-2 text-sm font-semibold text-[#0d8e83]">
                Customer Requests
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">
                Track and respond to enquiries
              </h2>
            </div>

            <select
              value={requestFilter}
              onChange={(event) => setRequestFilter(event.target.value)}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
            >
              <option value="All">All statuses</option>
              {enquiryStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8 grid gap-4">
            {filteredRequests.map((request) => {
              const whatsappPhone = formatWhatsAppPhone(request.phone)

              return (
                <article
                  key={request.id}
                  className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#fbfcff_100%)] p-5 shadow-sm shadow-slate-900/[0.03]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                          {request.source}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getStatusBadgeClasses(request.status)}`}
                        >
                          {request.status}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {formatRequestDate(request.createdAt)}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                        {request.name}
                      </h3>

                      <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-4">
                        <p>
                          <span className="font-semibold text-slate-900">Phone:</span> {request.phone}
                        </p>
                        <p>
                          <span className="font-semibold text-slate-900">Email:</span>{' '}
                          {request.email || 'Not provided'}
                        </p>
                        <p>
                          <span className="font-semibold text-slate-900">Requirement:</span>{' '}
                          {request.requestType}
                        </p>
                        <p>
                          <span className="font-semibold text-slate-900">Product:</span>{' '}
                          {request.product
                            ? `${request.product.name} (${request.product.price})`
                            : 'General enquiry'}
                        </p>
                      </div>

                      <div className="mt-5 rounded-[1.4rem] bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Customer Message
                        </p>
                        <p className="mt-3 text-sm leading-7 text-slate-700">{request.message}</p>
                      </div>
                    </div>

                    <div className="flex w-full flex-col gap-3 lg:w-60">
                      <label className="grid gap-2 text-sm font-medium text-slate-700">
                        Update Status
                        <select
                          value={request.status}
                          onChange={(event) =>
                            onUpdateRequestStatus(request.id, event.target.value)
                          }
                          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                        >
                          {enquiryStatusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </label>

                      <a
                        href={`tel:${request.phone}`}
                        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#0f4eb3]/20 hover:text-[#0f4eb3]"
                      >
                        Call Customer
                      </a>

                      {whatsappPhone ? (
                        <a
                          href={`https://wa.me/${whatsappPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-[#12b4a6] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0d8e83]"
                        >
                          WhatsApp
                        </a>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => handleDeleteRequest(request)}
                        className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                      >
                        Delete Request
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}

            {filteredRequests.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm font-medium text-slate-500">
                No customer requests have been saved for this filter yet.
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminPanel
