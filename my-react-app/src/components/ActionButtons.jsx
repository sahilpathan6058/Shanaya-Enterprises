import { MessageCircle, Phone } from 'lucide-react'
import { business } from '../data/siteData'

function ActionButtons({ compact = false, className = '' }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={business.phoneHref}
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#0f4eb3] px-5 font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#08245c] ${
          compact ? 'py-2.5 text-sm' : 'py-3.5 text-base'
        }`}
      >
        <Phone className="h-5 w-5" />
        Call Now
      </a>
      <a
        href={business.whatsappHref}
        target="_blank"
        rel="noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-5 font-semibold text-emerald-700 shadow-lg shadow-emerald-950/5 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 ${
          compact ? 'py-2.5 text-sm' : 'py-3.5 text-base'
        }`}
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
    </div>
  )
}

export default ActionButtons
