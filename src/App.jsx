import { useEffect, useState } from 'react'
import AdminPanel from './components/AdminPanel'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import ProcessSection from './components/ProcessSection'
import Products from './components/Products'
import Services from './components/Services'
import WhatsAppIcon from './components/WhatsAppIcon'
import WhyChooseUs from './components/WhyChooseUs'
import defaultProducts, { productCategoryDetails } from './data/products'
import services from './data/services'
import {
  createClientId,
  loadStoredProducts,
  loadStoredRequests,
  persistProducts,
  persistRequests,
  productPlaceholderImage,
} from './lib/adminData'

const adminHash = '#admin'
const allCategoriesLabel = 'All Categories'

function getCurrentViewFromHash() {
  if (typeof window === 'undefined') {
    return 'storefront'
  }

  return window.location.hash.toLowerCase().startsWith(adminHash) ? 'admin' : 'storefront'
}

function normalizeProductPayload(product) {
  return {
    category: product.category.trim(),
    name: product.name.trim(),
    company: product.company.trim(),
    size: product.size.trim(),
    color: product.color.trim(),
    price: product.price.trim(),
    image: product.image.trim() || productPlaceholderImage,
    tag: product.tag.trim() || 'Featured',
    description: product.description.trim(),
  }
}

function buildFallbackCategoryDetail(category, categoryProducts) {
  const productCount = categoryProducts.length
  const previewProduct = categoryProducts[0]
  const companies = [...new Set(categoryProducts.map((product) => product.company).filter(Boolean))]

  return {
    category,
    tag: 'Admin Added',
    image: previewProduct?.image || productPlaceholderImage,
    summary: `${productCount} product${productCount === 1 ? '' : 's'} currently listed in this category.`,
    highlights: [
      `${productCount} model${productCount === 1 ? '' : 's'} available`,
      companies.length > 0 ? `${companies.slice(0, 2).join(', ')} options` : 'Ready for new enquiries',
    ],
  }
}

function App() {
  const [currentView, setCurrentView] = useState(getCurrentViewFromHash)
  const [products, setProducts] = useState(() => loadStoredProducts(defaultProducts))
  const [customerRequests, setCustomerRequests] = useState(() => loadStoredRequests())
  const [selectedCategory, setSelectedCategory] = useState(allCategoriesLabel)
  const [selectedProductId, setSelectedProductId] = useState(null)

  const productCategoriesSet = new Set(productCategoryDetails.map((detail) => detail.category))

  products.forEach((product) => {
    if (product.category) {
      productCategoriesSet.add(product.category)
    }
  })

  const managedCategories = [...productCategoriesSet]
  const productCategories = [allCategoriesLabel, ...managedCategories]
  const activeSelectedCategory = managedCategories.includes(selectedCategory)
    ? selectedCategory
    : allCategoriesLabel
  const selectedProduct = products.find((product) => product.id === selectedProductId) || null
  const categoryDetails = managedCategories.map((category) => {
    const categoryDetail = productCategoryDetails.find((detail) => detail.category === category)

    if (categoryDetail) {
      return categoryDetail
    }

    const categoryProducts = products.filter((product) => product.category === category)
    return buildFallbackCategoryDetail(category, categoryProducts)
  })

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentView(getCurrentViewFromHash())
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('hashchange', handleHashChange)
      }
    }
  }, [])

  useEffect(() => {
    persistProducts(products)
  }, [products])

  useEffect(() => {
    persistRequests(customerRequests)
  }, [customerRequests])

  const handleProductCategorySelect = (category) => {
    setSelectedCategory(category)

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        document.getElementById('products')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    }
  }

  const openAdminPanel = () => {
    if (typeof window !== 'undefined') {
      window.location.hash = adminHash
      return
    }

    setCurrentView('admin')
  }

  const openStorefront = () => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#home'
      return
    }

    setCurrentView('storefront')
  }

  const handleAddProduct = (productInput) => {
    const nextProduct = {
      id: createClientId('product'),
      ...normalizeProductPayload(productInput),
    }

    setProducts((currentProducts) => [nextProduct, ...currentProducts])
  }

  const handleUpdateProduct = (productId, productInput) => {
    const normalizedProduct = normalizeProductPayload(productInput)

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId ? { ...product, ...normalizedProduct } : product,
      ),
    )
  }

  const handleDeleteProduct = (productId) => {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId))
  }

  const handleCustomerRequestCreate = (requestInput) => {
    const nextRequest = {
      id: createClientId('request'),
      status: 'New',
      source: requestInput.product ? 'Product enquiry' : 'Website enquiry',
      createdAt: new Date().toISOString(),
      ...requestInput,
    }

    setCustomerRequests((currentRequests) => [nextRequest, ...currentRequests])
  }

  const handleCustomerRequestStatusUpdate = (requestId, status) => {
    setCustomerRequests((currentRequests) =>
      currentRequests.map((request) =>
        request.id === requestId ? { ...request, status } : request,
      ),
    )
  }

  const handleCustomerRequestDelete = (requestId) => {
    setCustomerRequests((currentRequests) =>
      currentRequests.filter((request) => request.id !== requestId),
    )
  }

  if (currentView === 'admin') {
    return (
      <AdminPanel
        products={products}
        requests={customerRequests}
        categoryOptions={managedCategories}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateRequestStatus={handleCustomerRequestStatusUpdate}
        onDeleteRequest={handleCustomerRequestDelete}
        onExitAdmin={openStorefront}
      />
    )
  }

  return (
    <div className="relative overflow-x-hidden bg-[linear-gradient(180deg,#f5f8fc_0%,#f8fbff_34%,#ffffff_100%)] text-slate-800">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(15,78,179,0.18),_transparent_58%)]"></div>
      <div className="pointer-events-none absolute -left-16 top-[20rem] -z-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 top-[36rem] -z-10 h-72 w-72 rounded-full bg-[#12b4a6]/15 blur-3xl"></div>
      <div className="pointer-events-none absolute inset-x-0 top-[84rem] -z-10 h-[24rem] bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.05),_transparent_60%)]"></div>

      <Navbar
        onProductsClick={() => handleProductCategorySelect(allCategoriesLabel)}
        onAdminClick={openAdminPanel}
      />

      <main>
        <Hero />
        <About />
        <Services services={services} />
        <ProcessSection />
        <Products
          products={products}
          categoryDetails={categoryDetails}
          productCategories={productCategories}
          selectedCategory={activeSelectedCategory}
          allCategoriesLabel={allCategoriesLabel}
          onProductCategorySelect={handleProductCategorySelect}
          onProductEnquire={(product) => setSelectedProductId(product.id)}
        />
        <WhyChooseUs />
        <Contact
          services={services}
          selectedProduct={selectedProduct}
          onSubmitRequest={handleCustomerRequestCreate}
          onClearSelectedProduct={() => setSelectedProductId(null)}
        />
      </main>

      <Footer services={services} />

      <a
        href="https://wa.me/919404799782"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group fixed bottom-5 right-5 z-50"
      >
        <span className="absolute -top-2 left-6 h-9 w-9 rounded-xl bg-[#ff6a00] shadow-lg shadow-orange-500/30 transition duration-300 group-hover:-translate-y-1 group-hover:rotate-6"></span>
        <span className="relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#25d366] via-[#1fc680] to-[#1bb6b6] px-2.5 py-2.5 text-sm font-semibold text-white shadow-[0_24px_50px_-16px_rgba(18,180,166,0.55)] ring-1 ring-white/25 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-18px_rgba(18,180,166,0.7)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg shadow-slate-900/15">
            <WhatsAppIcon className="h-6 w-6 text-[#25d366]" />
          </span>
          <span className="pr-2 text-[15px] font-semibold tracking-tight" aria-hidden="true">
            WhatsApp
          </span>
        </span>
      </a>
    </div>
  )
}

export default App
