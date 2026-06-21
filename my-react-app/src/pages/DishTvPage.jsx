import { BadgeCheck, CheckCircle2 } from 'lucide-react'
import ActionButtons from '../components/ActionButtons'
import CTASection from '../components/CTASection'
import SectionHeader from '../components/SectionHeader'
import { dishFaqs } from '../data/siteData'

const dishServices = [
  'New Dish TV Connection',
  'HD Setup Box Installation',
  'Dish Antenna Installation',
  'Signal Tuning & Alignment',
  'Recharge Assistance',
  'Set Top Box Troubleshooting',
]

function DishTvPage() {
  return (
    <main>
      <section className="bg-[#08245c] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 ring-1 ring-white/15">
              <BadgeCheck className="h-4 w-4 text-orange-300" />
              Authorized Dealer
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
              Dish TV Connection & Installation
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              New connection, HD setup box, installation service, recharge guidance, and signal
              troubleshooting from a trusted local team.
            </p>
            <ActionButtons className="mt-8" />
          </div>
          <img
            src="/images/dish-installation.png"
            alt="Dish TV antenna installation"
            className="aspect-[4/3] rounded-3xl object-cover shadow-2xl shadow-blue-950/30"
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Dish TV services"
            title="Everything needed for a smooth TV connection"
            description="From choosing a connection to final channel testing, the service is designed for quick setup and reliable viewing."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dishServices.map((service) => (
              <div key={service} className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-[#0f4eb3]" />
                <span className="font-bold text-slate-900">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Dish TV questions answered"
            description="Quick answers before you call or book a visit."
          />
          <div className="mt-10 grid gap-4">
            {dishFaqs.map((faq) => (
              <details key={faq.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <summary className="cursor-pointer text-lg font-bold text-slate-950">
                  {faq.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Book Dish TV setup now" />
    </main>
  )
}

export default DishTvPage
