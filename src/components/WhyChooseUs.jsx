const features = [
  {
    title: 'Experienced Technical Handling',
    description: 'Confident support for common electronics, fittings, and appliance issues.',
  },
  {
    title: 'Quick Local Response',
    description: 'Fast guidance for customers in Rajgurunagar and nearby service areas.',
  },
  {
    title: 'Sales and Repair in One Place',
    description: 'Customers can buy products and also get dependable repair support.',
  },
  {
    title: 'Affordable Practical Solutions',
    description: 'Simple recommendations that balance service quality and local budgets.',
  },
  {
    title: 'Installation Expertise',
    description: 'Dish fitting, set-top setup, and water filter installation with proper care.',
  },
  {
    title: 'Friendly Customer Support',
    description: 'Easy contact through phone and WhatsApp with approachable communication.',
  },
]

function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.4rem] border border-slate-900 bg-slate-950 text-white shadow-[0_35px_100px_-32px_rgba(15,23,42,0.6)]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(15,78,179,0.34),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(18,180,166,0.24),_transparent_28%)] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#8bd8d0]">
                  Why Choose Us
                </span>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                  Built like a strong business homepage, tailored for electronics customers
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-300">
                The structure here follows the business-style sectioning you referenced, but the
                messaging and visual tone are adapted for an electronics sales and service brand.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => (
                <article
                  key={feature.title}
                  className="rounded-[1.85rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10 backdrop-blur"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-base font-semibold text-white shadow-lg shadow-blue-600/10">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
