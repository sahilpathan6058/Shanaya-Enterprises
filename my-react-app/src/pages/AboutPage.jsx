import { Award, Clock, HeartHandshake, ShieldCheck } from 'lucide-react'
import CTASection from '../components/CTASection'
import SectionHeader from '../components/SectionHeader'

const milestones = [
  { title: 'Local Experience', icon: Clock, text: 'Hands-on support for home electronics, TV setup, WiFi, Dish TV, and RO service.' },
  { title: 'Service Commitment', icon: ShieldCheck, text: 'Every visit focuses on clean installation, practical guidance, and careful testing.' },
  { title: 'Customer First', icon: HeartHandshake, text: 'Easy booking through phone or WhatsApp with clear communication from start to finish.' },
  { title: 'Trusted Dealer Support', icon: Award, text: 'Authorized Dish TV dealer support for new connections, setup boxes, and recharge help.' },
]

function AboutPage() {
  return (
    <main>
      <section className="bg-blue-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <SectionHeader
              align="left"
              eyebrow="About us"
              title="A local electronics service team built on trust"
              description="We help homes and small businesses get their electronics installed, connected, repaired, and maintained with a premium service experience."
            />
          </div>
          <img
            src="/images/electronics-service-hero.png"
            alt="Technician installing home electronics"
            className="aspect-[4/3] rounded-3xl object-cover shadow-2xl shadow-blue-950/10"
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                Our story
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Practical expertise for modern homes
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Modern homes depend on multiple devices working together: TVs, streaming apps, set
                top boxes, dish antennas, routers, internet cables, and water purifiers. Our job is
                to make that setup simple, neat, and reliable.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600">
                We focus on trust-building service: clear communication, doorstep support, neat
                installations, and guidance that customers can understand.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {milestones.map((item) => {
                const Icon = item.icon
                return (
                  <article key={item.title} className="rounded-3xl border border-slate-200 p-6 shadow-sm">
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
        </div>
      </section>

      <CTASection title="Let us handle your electronics setup" />
    </main>
  )
}

export default AboutPage
