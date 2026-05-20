import ImageWithFallback from './ImageWithFallback'

const aboutImage =
  'https://images.unsplash.com/photo-1721613877687-c9099b698faa?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=1600'

const aboutHighlights = [
  'Trusted local response for homes, offices and small shops',
  'Clear product guidance before sales, fitting or repair booking',
  'Professional service experience with practical after-support',
]

const aboutStats = [
  { value: '8+', label: 'Home appliance categories' },
  { value: '7 Days', label: 'Support availability' },
  { value: 'Home Visit', label: 'Doorstep service support' },
]

function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="relative overflow-hidden rounded-[2.35rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-7 shadow-[0_28px_60px_-34px_rgba(15,23,42,0.18)] sm:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,_rgba(15,78,179,0.14),_transparent_58%)]"></div>
          <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#12b4a6]/8 blur-3xl"></div>

          <div className="relative">
            <span className="inline-flex rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/5">
              About Shanaya
            </span>

            <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.12] text-slate-900 sm:text-[3rem]">
              Professional presentation, local service mindset and practical support.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              We provide reliable electronics sales, repair, installation, and home service
              support. Our goal is to provide quick service, genuine guidance, and affordable
              solutions for every customer.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Whether a customer needs a new appliance, a repair visit, or help with fitting and
              setup, the experience stays clear, professional, and easy to trust.
            </p>

            <div className="mt-7 grid gap-3">
              {aboutHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[1.3rem] border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-700 shadow-sm shadow-slate-900/5"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#12b4a6]"></span>
                  <span className="leading-7">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/[0.04]"
                >
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-slate-900/80 bg-slate-950 p-4 shadow-[0_35px_80px_-34px_rgba(15,23,42,0.42)] sm:p-5">
          <ImageWithFallback
            src={aboutImage}
            alt="Modern refrigerator and electronics display"
            fallbackSrc="/images/hero-electronics.svg"
            className="h-full min-h-[440px] w-full rounded-[1.8rem] object-cover"
          />

          <div className="absolute inset-4 rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.14)_42%,rgba(2,6,23,0.88)_100%)] sm:inset-5"></div>

          <div className="absolute left-8 top-8 rounded-full border border-white/12 bg-slate-950/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-md sm:left-9 sm:top-9">
            Trusted local team
          </div>

          <div className="absolute bottom-8 left-8 right-8 rounded-[1.75rem] border border-white/12 bg-slate-950/52 p-5 text-white shadow-xl shadow-slate-950/20 backdrop-blur-md sm:bottom-9 sm:left-9 sm:right-9 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8bd8d0]">
              Customer-first service
            </p>
            <p className="mt-3 text-2xl font-semibold leading-tight">
              Clear product guidance, honest suggestions and dependable after-service support.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200">
              Every enquiry is handled with practical advice, clean communication and service
              support customers can trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
