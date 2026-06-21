import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import ActionButtons from '../components/ActionButtons'
import CTASection from '../components/CTASection'
import SectionHeader from '../components/SectionHeader'
import { business, services } from '../data/siteData'
import { api } from '../services/api'

function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: services[0]?.title || 'TV Installation & Repair',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const data = await api.submitRequest(form)
      setSuccess(data.message || 'Enquiry submitted successfully')
      setForm({
        name: '',
        phone: '',
        service: services[0]?.title || 'TV Installation & Repair',
        message: '',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <section className="bg-blue-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Contact"
            title="Book a service visit or ask a quick question"
            description="Call, WhatsApp, or send your details. We will help you choose the right service and confirm availability."
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="grid gap-4">
            {[
              { icon: Phone, label: 'Call', value: business.phone },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Quick enquiry and booking' },
              { icon: Mail, label: 'Email', value: business.email },
              { icon: Clock, label: 'Hours', value: business.hours },
              { icon: MapPin, label: 'Service Location', value: business.address },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex gap-4 rounded-3xl border border-slate-200 p-5 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0f4eb3]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1 font-bold text-slate-950">{item.value}</p>
                  </div>
                </div>
              )
            })}
            <ActionButtons compact className="mt-2" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-950/5 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Name
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Your name"
                  required
                  className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#0f4eb3] focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Phone
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  placeholder="Mobile number"
                  required
                  className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#0f4eb3] focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
                Service Needed
                <select
                  value={form.service}
                  onChange={handleChange('service')}
                  required
                  className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#0f4eb3] focus:ring-4 focus:ring-blue-100"
                >
                  {services.map((service) => (
                    <option key={service.title} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
                Message
                <textarea
                  rows="5"
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Tell us your issue, address area, and preferred visit time"
                  className="resize-none rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#0f4eb3] focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            {success ? (
              <p className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {success}
              </p>
            ) : null}
            {error ? (
              <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#0f4eb3] px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-[#08245c] disabled:opacity-60"
            >
              {submitting ? 'Sending...' : 'Send Enquiry'}
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">
              For urgent bookings, call or WhatsApp directly.
            </p>
          </form>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Google Maps"
            title="Find service availability near you"
            description="Use maps to confirm nearby route coverage, then call to book a visit."
          />
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Service area map"
              src="https://www.google.com/maps?q=electronics%20repair%20service%20India&output=embed"
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <CTASection title="Prefer direct booking?" />
    </main>
  )
}

export default ContactPage
