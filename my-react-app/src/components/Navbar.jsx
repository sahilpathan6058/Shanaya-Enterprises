import { Lock, Menu, MessageCircle, Phone, Satellite, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { business, navLinks } from '../data/siteData'

function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition ${
      isActive ? 'bg-blue-50 text-[#0f4eb3]' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f4eb3] text-white shadow-lg shadow-blue-900/20">
            <Satellite className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight text-slate-950">
              {business.shortName}
            </span>
            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
              Authorized Dish TV Dealer
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/admin/login"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 hover:text-[#0f4eb3]"
            aria-label="Admin login"
            title="Admin login"
          >
            <Lock className="h-5 w-5" />
          </NavLink>
          <a
            href={business.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 text-emerald-700 transition hover:bg-emerald-50"
            aria-label="WhatsApp enquiry"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href={business.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#0f4eb3] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#08245c]"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-xl shadow-slate-950/5 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mx-auto mt-4 grid max-w-7xl gap-3 sm:grid-cols-3">
            <NavLink
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700"
            >
              <Lock className="h-4 w-4" />
              Admin
            </NavLink>
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f4eb3] px-4 py-3 text-sm font-bold text-white"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
            <a
              href={business.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
