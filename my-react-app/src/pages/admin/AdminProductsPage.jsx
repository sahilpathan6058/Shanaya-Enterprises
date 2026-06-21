import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

const emptyForm = {
  title: '',
  category: '',
  image: '',
  description: '',
  features: '',
  tags: '',
  keywords: '',
  detailUrl: '',
  price: '',
  isActive: true,
}

function listToField(value) {
  return Array.isArray(value) ? value.join(', ') : value || ''
}

function fieldToList(value) {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const loadProducts = () => {
    setLoading(true)
    api
      .getProducts()
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const openCreateForm = () => {
    setEditingId(null)
    setForm(emptyForm)
    setShowForm(true)
  }

  const openEditForm = (product) => {
    setEditingId(product._id)
    setForm({
      title: product.title,
      category: product.category,
      image: product.image,
      description: product.description,
      features: listToField(product.features),
      tags: listToField(product.tags),
      keywords: listToField(product.keywords),
      detailUrl: product.detailUrl || '',
      price: product.price ?? '',
      isActive: product.isActive,
    })
    setShowForm(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    const payload = {
      ...form,
      features: fieldToList(form.features),
      tags: fieldToList(form.tags),
      keywords: fieldToList(form.keywords),
      detailUrl: form.detailUrl.trim(),
      price: form.price === '' ? null : Number(form.price),
    }

    try {
      if (editingId) {
        await api.updateProduct(editingId, payload)
      } else {
        await api.createProduct(payload)
      }
      setShowForm(false)
      setForm(emptyForm)
      setEditingId(null)
      loadProducts()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return

    try {
      await api.deleteProduct(id)
      loadProducts()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Products</h1>
          <p className="mt-1 text-sm text-slate-500">Add, edit, or remove products shown on the website</p>
        </div>
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-full bg-[#0f4eb3] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#08245c]"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p> : null}

      {showForm ? (
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-slate-950">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Title
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Category
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Image URL
              <input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                required
                placeholder="/images/electronics-service-hero.png"
                className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Description
              <textarea
                rows="3"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                className="resize-none rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Feature Highlights
              <textarea
                rows="3"
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder="One per line or comma separated"
                className="resize-none rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Tags
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="Dish TV, HD Setup"
                className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Search Keywords
              <input
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                placeholder="router, wifi, network"
                className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Product URL (optional)
              <input
                type="url"
                value={form.detailUrl}
                onChange={(e) => setForm({ ...form, detailUrl: e.target.value })}
                placeholder="https://example.com/product"
                className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Price (optional)
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
              />
            </label>
            <label className="flex items-center gap-3 pt-8 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="h-4 w-4"
              />
              Show on website
            </label>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-[#0f4eb3] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#08245c] disabled:opacity-60"
            >
              {submitting ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-sm text-slate-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">No products yet. Add your first product.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-slate-100">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt={product.title} className="h-12 w-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-900">{product.title}</p>
                          <p className="max-w-xs truncate text-xs text-slate-500">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">{product.category}</td>
                    <td className="px-4 py-4">{product.price ? `₹${product.price}` : '—'}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          product.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {product.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(product)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminProductsPage
