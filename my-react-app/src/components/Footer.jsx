import { Mail, MapPin, MessageCircle, Phone, Satellite } from 'lucide-react'
import { Link } from 'react-router-dom'
import { business, navLinks, services } from '../data/siteData'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f4eb3]">
              <Satellite className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-lg font-black">{business.shortName}</span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-400">
                Electronics service experts
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            Premium local service for TV installation, Dish TV connection, WiFi setup, RO service,
            and home technical support.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Pages</h3>
          <div className="mt-4 grid gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-slate-300 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold">Popular Services</h3>
          <div className="mt-4 grid gap-2">
            {services.slice(0, 5).map((service) => (
              <Link key={service.title} to="/services" className="text-sm text-slate-300 hover:text-white">
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold">Book Service</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <a href={business.phoneHref} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4 text-orange-400" />
              {business.phone}
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <MessageCircle className="h-4 w-4 text-orange-400" />
              WhatsApp enquiry
            </a>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-orange-400" />
              {business.email}
            </span>
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
              {business.address}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {business.name}. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
