import CTASection from '../components/CTASection'
import ServiceCard from '../components/ServiceCard'
import SectionHeader from '../components/SectionHeader'
import { services } from '../data/siteData'

function ServicesPage() {
  return (
    <main>
      <section className="bg-blue-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="All services"
            title="Book electronics service with clear benefits"
            description="Detailed support for TV, Dish TV, Smart TV, WiFi, internet network, RO purifier, and home visits."
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} detailed />
          ))}
        </div>
      </section>

      <CTASection title="Ready to book a home visit?" />
    </main>
  )
}

export default ServicesPage
