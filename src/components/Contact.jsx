import { useState } from 'react'
import WhatsAppIcon from './WhatsAppIcon'

const phoneNumber = '+91 9823786438'
const phoneLink = 'tel:+9823786438'
const whatsappBaseLink = 'https://wa.me/919823786438'

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
}

function Contact({ services }) {
  const [formData, setFormData] = useState(initialFormData)
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const enquiryLines = [
      'New enquiry from Shanaya Enterprises website',
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email || 'Not provided'}`,
      `Service: ${formData.service}`,
      `Message: ${formData.message}`,
    ]

    const enquiryText = encodeURIComponent(enquiryLines.join('\n'))

    window.open(`${whatsappBaseLink}?text=${enquiryText}`, '_blank', 'noopener,noreferrer')

    setStatusMessage('Your enquiry is ready in WhatsApp. Please send the message to complete it.')
    setFormData(initialFormData)
  }

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-900 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-900/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,78,179,0.42),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(18,180,166,0.22),_transparent_28%)]"></div>

            <div className="relative">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#8bd8d0]">
                Need Help?
              </span>

              <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
                Don&apos;t hesitate to contact us for product or service information
              </h2>

              <p className="mt-4 text-sm leading-8 text-slate-300">
                Get in touch for electronics sales guidance, repair requests, dish fitting, water
                filter installation, and dependable local home service support.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Phone Number
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{phoneNumber}</p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Service Area
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Rajgurunagar, Pune, Maharashtra
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Working Hours
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Monday to Sunday, 24 X 7 availability for sales, repair, installation, and support services.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={phoneLink}
                  className="inline-flex items-center justify-center rounded-full bg-[#0f4eb3] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#133b8e]"
                >
                  Call Now
                </a>
                <a
                  href={whatsappBaseLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#12b4a6]/20 bg-[#12b4a6]/10 px-6 py-3 text-sm font-semibold text-[#8bd8d0] transition hover:-translate-y-0.5 hover:bg-[#12b4a6]/20"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25d366]">
                    <WhatsAppIcon className="h-[18px] w-[18px] text-white" />
                  </span>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          <div
            id="enquiry-form"
            className="scroll-mt-28 rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                  Enquiry Form
                </span>
                <h3 className="mt-5 text-3xl font-semibold text-slate-900">
                  Send your enquiry
                </h3>
              </div>

              <p className="max-w-sm text-sm leading-7 text-slate-500">
                Fill the form and it will open WhatsApp with your enquiry details ready to send.
              </p>
            </div>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Full Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  />
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Email Address
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Service Needed
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Your Message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Write your requirement here"
                  className="rounded-[1.6rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                ></textarea>
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#0f4eb3] px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#133b8e]"
                >
                  Send Enquiry
                </button>

                <p className="text-sm leading-7 text-slate-500">
                  Static website form: submission opens WhatsApp with prefilled enquiry details.
                </p>
              </div>

              {statusMessage ? (
                <div className="rounded-[1.5rem] border border-[#12b4a6]/20 bg-[#12b4a6]/10 px-4 py-3 text-sm font-medium text-[#0d8e83]">
                  {statusMessage}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
