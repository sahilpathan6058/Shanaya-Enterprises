import { motion } from 'framer-motion'
import {
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import ActionButtons from '../components/ActionButtons'
import AnimatedSection from '../components/AnimatedSection'
import CTASection from '../components/CTASection'
import GalleryCard from '../components/GalleryCard'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import TestimonialCard from '../components/TestimonialCard'
import {
  business,
  galleryItems,
  reviews,
  serviceAreas,
  services,
  whyChooseUs,
} from '../data/siteData'
import { useProducts } from '../hooks/useProducts'

function HomePage() {
  const { products } = useProducts()
  return (
    <main>
      <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-slate-950 text-white">
        <img
          src="/images/electronics-service-hero.png"
          alt="Electronics technician installing a smart TV"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,36,92,0.96)_0%,rgba(8,36,92,0.82)_42%,rgba(15,78,179,0.28)_100%)]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 ring-1 ring-white/15"
            >
              <BadgeCheck className="h-4 w-4 text-orange-300" />
              Authorized Dish TV Dealer
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.65 }}
              className="mt-6 text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl"
            >
              Electronics Service & Installation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.65 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-blue-50"
            >
              Premium home visits for TV installation, Dish TV connection, Smart TV setup, WiFi
              router installation, RO service, and technical support.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.65 }}
            >
              <ActionButtons className="mt-8" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.65 }}
              className="mt-10 grid max-w-2xl grid-cols-3 gap-3"
            >
              {[
                ['9+', 'Services'],
                ['Same Day', 'Visit'],
                ['4.9★', 'Rated'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/15">
                  <p className="text-xl font-black">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedSection className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Book trusted experts"
            title="Services built for everyday home electronics"
            description="Clean installation, quick diagnosis, clear support, and direct call or WhatsApp booking."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0f4eb3]"
            >
              View All Services
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-blue-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
              Special Highlight
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#08245c] sm:text-5xl">
              Authorized Dish TV Dealer
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Get trusted support for new Dish TV connection, HD set top box installation, dish
              antenna alignment, activation, and recharge assistance.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['New connection support', 'HD setup box', 'Signal tuning', 'Recharge assistance'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-[#0f4eb3]" />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-blue-950/10">
            <img
              src="/images/dish-installation.png"
              alt="Dish antenna installation"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <ActionButtons compact className="mt-6" />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why choose us"
            title="A local service team you can trust at home"
            description="From booking to final testing, every visit is designed around clean work and clear communication."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0f4eb3]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Products"
            title="Featured electronics and installation accessories"
            description="Enquire for product availability, setup assistance, and installation support."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product._id || product.title} product={product} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Work gallery"
            title="Recent installation and service work"
            description="A quick look at the kind of clean, practical home support customers expect."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <GalleryCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Customer reviews"
            title="Trusted by families and local businesses"
            description="Real service experience matters when someone is visiting your home."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <TestimonialCard key={review.name} review={review} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Service areas"
              title="Fast home visits across nearby localities"
              description="Call or WhatsApp to confirm same-day availability for your area."
            />
            <div className="mt-8 flex items-center gap-3 rounded-3xl bg-blue-50 p-5 text-[#08245c]">
              <MapPin className="h-6 w-6 text-orange-500" />
              <span className="font-bold">{business.hours}</span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {serviceAreas.map((area) => (
              <div key={area} className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4">
                <ShieldCheck className="h-5 w-5 text-[#0f4eb3]" />
                <span className="font-semibold text-slate-800">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <CTASection />

      <AnimatedSection className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0f4eb3] ring-1 ring-slate-200">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  Book in minutes
                </div>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
                  Tell us what you need. We will guide you clearly.
                </h2>
                <p className="mt-4 text-slate-600">
                  Share your issue, preferred time, and location. We will confirm the visit and
                  send the right technician.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-950/5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Direct booking line</p>
                    <p className="mt-1 text-xl font-black text-slate-950">{business.phone}</p>
                  </div>
                  <CalendarCheck className="h-10 w-10 text-[#0f4eb3]" />
                </div>
                <ActionButtons compact className="mt-5" />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}

export default HomePage
