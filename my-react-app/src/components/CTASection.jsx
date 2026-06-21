import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'
import { business } from '../data/siteData'

function CTASection({ title = 'Need a technician today?', description }) {
  return (
    <section className="bg-[#08245c] py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 ring-1 ring-white/15">
            <CalendarCheck className="h-4 w-4 text-orange-300" />
            Same-day slots available
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">
            {description ||
              'Book TV, Dish TV, WiFi, set top box, RO, and home technical support with a trusted local team.'}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={business.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
          >
            <Phone className="h-5 w-5" />
            Call Now
          </a>
          <a
            href={business.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[#0f4eb3] transition hover:-translate-y-0.5 hover:bg-blue-50"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection
