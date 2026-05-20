import ImageWithFallback from './ImageWithFallback'
import WhatsAppIcon from './WhatsAppIcon'

const phoneLink = 'tel:+919404799782'
const whatsappLink = 'https://wa.me/919404799782'
const heroBackgroundImage =
  'https://images.pexels.com/photos/35278544/pexels-photo-35278544.jpeg?auto=compress&cs=tinysrgb&w=1600'

const heroStats = [
  { value: '8+', label: 'Product categories' },
  { value: '7 Days', label: 'Open for support' },
  { value: 'Home', label: 'Visit service available' },
]

const heroHighlights = [
  'TV, refrigerator, cooler and washing machine support',
  'Dish fitting, set-top box setup and water filter installation',
  'Fast local response for homes, offices and small shops',
]

function Hero() {
  return (
    <section id="home" className="scroll-mt-24 pb-10 pt-6 sm:pb-16 sm:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.7rem] border border-slate-200 bg-slate-950 shadow-[0_35px_90px_-42px_rgba(15,23,42,0.48)]">
          <ImageWithFallback
            src={heroBackgroundImage}
            alt="Professional electronics service workspace"
            fallbackSrc="/images/hero-electronics.svg"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-white/92 lg:hidden"></div>
          <div className="absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,rgba(248,250,252,0.97)_0%,rgba(248,250,252,0.95)_42%,rgba(15,23,42,0.52)_70%,rgba(2,6,23,0.82)_100%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,78,179,0.14),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(18,180,166,0.16),_transparent_28%)]"></div>

          <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10 xl:p-12">
            <div className="flex flex-col justify-center">
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-[#0f4eb3]/15 bg-white/85 px-4 py-2 text-sm font-semibold text-[#0f4eb3] shadow-sm shadow-blue-600/10 backdrop-blur">
                  Trusted Local Shop
                </span>
                <span className="rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 backdrop-blur">
                  Sales • Repair • Installation
                </span>
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl xl:text-6xl">
                Trusted electronics solutions for{' '}
                <span className="text-[#0f4eb3]">sales</span>,{' '}
                <span className="text-[#12b4a6]">repair</span> and installation
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                TV, refrigerator, cooler, dish fitting, water filter installation, washing machine
                repair and dependable local home service support.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={phoneLink}
                  className="inline-flex items-center justify-center rounded-full bg-[#0f4eb3] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#133b8e]"
                >
                  Call Now
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#12b4a6]/20 bg-gradient-to-r from-[#ebfff6] to-[#e9fffd] px-6 py-3 text-sm font-semibold text-[#0d8e83] shadow-lg shadow-[#12b4a6]/10 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#12b4a6]/15"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25d366] shadow-sm shadow-[#25d366]/30">
                    <WhatsAppIcon className="h-[18px] w-[18px] text-white" />
                  </span>
                  WhatsApp Enquiry
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-[#0f4eb3]/25 hover:text-[#0f4eb3]"
                >
                  View Services
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:max-w-2xl">
                {heroHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[1.3rem] border border-slate-200/80 bg-white/75 px-4 py-3 text-sm text-slate-700 shadow-sm shadow-slate-900/5 backdrop-blur"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#12b4a6]"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.7rem] border border-slate-200/80 bg-white/80 p-5 shadow-lg shadow-slate-900/5 backdrop-blur"
                  >
                    <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
                    <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-end">
              <div className="grid w-full max-w-xl gap-5 lg:pt-8">
                <div className="ml-auto w-full max-w-[320px] rounded-[1.7rem] border border-white/12 bg-slate-950/78 p-5 text-white shadow-2xl shadow-slate-900/20 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Support Window
                  </p>
                  <p className="mt-3 text-3xl font-semibold">9 AM - 9 PM</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">Monday to Sunday</p>
                </div>

                <div className="rounded-[2rem] border border-white/12 bg-slate-950/72 p-6 text-white shadow-2xl shadow-slate-900/20 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8bd8d0]">
                    Professional Service Experience
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold">
                    Faster support, cleaner guidance and dependable local response
                  </h3>
                  <p className="mt-3 text-sm leading-8 text-slate-200">
                    From product enquiries to repair calls and installation visits, Shanaya
                    Enterprises focuses on quick response, practical advice, and customer-friendly
                    support.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4">
                      <p className="text-sm font-semibold text-white">Quick home service</p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        Convenient visit support for local homes and offices.
                      </p>
                    </div>
                    <div className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4">
                      <p className="text-sm font-semibold text-white">Sales and repair both</p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        One place for products, fitting, troubleshooting and service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
