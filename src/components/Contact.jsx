import { useState } from 'react'
import ImageWithFallback from './ImageWithFallback'
import WhatsAppIcon from './WhatsAppIcon'

const phoneNumber = '+91 9561136564'
const phoneLink = 'tel:+9561136564'
const whatsappBaseLink = 'https://wa.me/919561136564'

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  requestType: '',
  message: '',
}

function Contact({ services, selectedProduct, onSubmitRequest, onClearSelectedProduct }) {
  const [formData, setFormData] = useState(initialFormData)
  const [statusMessage, setStatusMessage] = useState('')
  const suggestedMessage = selectedProduct
    ? `I am interested in ${selectedProduct.name} (${selectedProduct.category}) priced at ${selectedProduct.price}. Please share availability and delivery details.`
    : ''
  const requestTypeValue = formData.requestType || (selectedProduct ? 'Product Enquiry' : '')
  const messageValue = formData.message || suggestedMessage

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const requestPayload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      requestType: requestTypeValue,
      message: messageValue.trim(),
      product: selectedProduct
        ? {
            id: selectedProduct.id,
            name: selectedProduct.name,
            category: selectedProduct.category,
            price: selectedProduct.price,
          }
        : null,
    }

    const enquiryLines = [
      'New enquiry from Shanaya Enterprises website',
      `Name: ${requestPayload.name}`,
      `Phone: ${requestPayload.phone}`,
      `Email: ${requestPayload.email || 'Not provided'}`,
      `Requirement: ${requestPayload.requestType}`,
      requestPayload.product
        ? `Product: ${requestPayload.product.name} | ${requestPayload.product.category} | ${requestPayload.product.price}`
        : null,
      `Message: ${requestPayload.message}`,
    ].filter(Boolean)

    const enquiryText = encodeURIComponent(enquiryLines.join('\n'))

    window.open(`${whatsappBaseLink}?text=${enquiryText}`, '_blank', 'noopener,noreferrer')

    onSubmitRequest?.(requestPayload)

    setStatusMessage(
      'Your enquiry is saved for admin follow-up and ready in WhatsApp. Please send the message to complete it.',
    )
    setFormData(initialFormData)
    onClearSelectedProduct?.()
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
                Get in touch for product purchase guidance, repair requests, dish fitting, water
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
                    Monday to Sunday, 24 X 7 availability for sales, repair, installation, and
                    support services.
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
                Fill the form to save the request for admin follow-up and open WhatsApp with the
                details ready to send.
              </p>
            </div>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit}>
              {selectedProduct ? (
                <div className="rounded-[1.8rem] border border-[#0f4eb3]/10 bg-[linear-gradient(135deg,#eff6ff_0%,#f0fdfa_100%)] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-20 w-20 overflow-hidden rounded-[1.3rem] border border-white/80 bg-white shadow-sm shadow-slate-900/5">
                        <ImageWithFallback
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f4eb3]">
                          Selected Product
                        </p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">
                          {selectedProduct.name}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {selectedProduct.category} • {selectedProduct.price}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onClearSelectedProduct}
                      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#0f4eb3]/20 hover:text-[#0f4eb3]"
                    >
                      Clear Product
                    </button>
                  </div>
                </div>
              ) : null}

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
                  Requirement Type
                  <select
                    name="requestType"
                    value={requestTypeValue}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#0f4eb3] focus:bg-white"
                  >
                    <option value="">Select requirement type</option>
                    <option value="Product Enquiry">Product Enquiry</option>
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
                  value={messageValue}
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
                  Static website form: submission saves the request locally for admin review and
                  opens WhatsApp with prefilled enquiry details.
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
