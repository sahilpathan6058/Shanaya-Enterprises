import { useState } from 'react'
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
import products, { productCategoryDetails } from './data/products'
import services from './data/services'

function App() {
  const allCategoriesLabel = 'All Categories'
  const productCategories = [
    allCategoriesLabel,
    ...productCategoryDetails.map((categoryDetail) => categoryDetail.category),
  ]
  const [selectedCategory, setSelectedCategory] = useState(allCategoriesLabel)

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

  return (
    <div className="relative overflow-x-hidden bg-[linear-gradient(180deg,#f5f8fc_0%,#f8fbff_34%,#ffffff_100%)] text-slate-800">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(15,78,179,0.18),_transparent_58%)]"></div>
      <div className="pointer-events-none absolute -left-16 top-[20rem] -z-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 top-[36rem] -z-10 h-72 w-72 rounded-full bg-[#12b4a6]/15 blur-3xl"></div>
      <div className="pointer-events-none absolute inset-x-0 top-[84rem] -z-10 h-[24rem] bg-[radial-gradient(circle_at_center,_rgba(15,23,42,0.05),_transparent_60%)]"></div>

      <Navbar
        onProductsClick={() => handleProductCategorySelect(allCategoriesLabel)}
      />

      <main>
        <Hero />
        <About />
        <Services services={services} />
        <ProcessSection />
        <Products
          products={products}
          categoryDetails={productCategoryDetails}
          productCategories={productCategories}
          selectedCategory={selectedCategory}
          allCategoriesLabel={allCategoriesLabel}
          onProductCategorySelect={handleProductCategorySelect}
        />
        <WhyChooseUs />
        <Contact services={services} />
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
