import WhatsAppIcon from './WhatsAppIcon'

function Services({ services }) {
  return (
    <section id="services" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                Services
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Repair, fitting, installation and home support
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                From product setup to household repair visits, every service is shown in a more
                polished and premium format so customers can understand your support instantly.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-green-200 bg-gradient-to-br from-green-50 to-white px-5 py-4 text-sm font-medium text-green-800">
              Home service available in and around Rajgurunagar
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-[1.85rem] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0f4eb3] to-[#0b2d6d] text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-600/20">
                  <span aria-hidden="true">{service.icon}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-slate-950 px-6 py-6 text-white lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-lg font-semibold">Need urgent local repair or installation help?</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Customers can directly call or send a WhatsApp message for fast assistance.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+919404799782"
                className="inline-flex items-center justify-center rounded-full bg-[#0f4eb3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#133b8e]"
              >
                Call for Service
              </a>
              <a
                href="https://wa.me/919404799782"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25d366]">
                  <WhatsAppIcon className="h-4 w-4 text-white" />
                </span>
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
