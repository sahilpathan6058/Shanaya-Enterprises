const processSteps = [
  {
    id: '01',
    title: 'Call or WhatsApp',
    description:
      'Share your requirement for purchase, repair, installation, or home service support.',
  },
  {
    id: '02',
    title: 'Inspection & Guidance',
    description:
      'We understand the issue or requirement and guide you with a practical next step.',
  },
  {
    id: '03',
    title: 'Repair or Installation',
    description:
      'Our team handles product setup, fitting, service work, or repair with proper attention.',
  },
  {
    id: '04',
    title: 'Support After Service',
    description:
      'Customers get dependable follow-up support for smooth use after delivery or service.',
  },
]

function ProcessSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                Work Process
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                From first enquiry to final support, everything stays simple
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-600">
              This section follows the structured business style you referenced, but is adapted
              for an electronics shop and home service workflow.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            {processSteps.map((step) => (
              <article
                key={step.id}
                className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-slate-900/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-base font-semibold text-white shadow-lg shadow-slate-900/15">
                  {step.id}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
