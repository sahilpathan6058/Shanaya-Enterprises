import { useState } from 'react'
import WhatsAppIcon from './WhatsAppIcon'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Contact Us', href: '#contact' },
]

const phoneLink = 'tel:+919404799782'
const whatsappLink = 'https://wa.me/919404799782'

function MapPinIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function PhoneIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M7.3 4.8h2.1c.4 0 .8.3.9.7l.9 3.7c.1.4 0 .8-.3 1l-1.3 1.3a13.8 13.8 0 0 0 4.9 4.9l1.3-1.3c.3-.3.7-.4 1-.3l3.7.9c.4.1.7.5.7.9v2.1c0 .6-.4 1-.9 1.1c-1 .1-2 .2-3 .1A17.8 17.8 0 0 1 4.1 7.7c-.1-1 0-2 .1-3c.1-.5.5-.9 1.1-.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Brand() {
  return (
    <span className="flex min-w-0 items-center gap-3.5">
      <span className="flex h-12 w-12 items-center justify-center rounded-[1.15rem] border border-slate-200/80 bg-white shadow-md shadow-slate-900/[0.05] sm:h-14 sm:w-14">
        <img
          src="/images/shanaya-mark.svg"
          alt="Shanaya Enterprises mark"
          className="h-8 w-8 object-contain sm:h-9 sm:w-9"
        />
      </span>

      <span className="min-w-0">
        <span className="block truncate text-lg font-extrabold uppercase tracking-[0.12em] text-slate-900 sm:text-[1.35rem]">
          Shanaya
        </span>
        <span className="block truncate text-[10px] font-bold uppercase tracking-[0.34em] text-[#12b4a6] sm:text-[11px]">
          Enterprises
        </span>
        <span className="mt-0.5 hidden truncate text-[9px] font-semibold uppercase tracking-[0.28em] text-slate-400 sm:block">
          Sales | Repair | Installation
        </span>
      </span>
    </span>
  )
}

function Navbar({ onProductsClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleNavLinkClick = (event, href) => {
    if (href === '#products' && typeof onProductsClick === 'function') {
      event.preventDefault()
      onProductsClick()
    }

    closeMenu()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/78 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between gap-4 rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,250,252,0.96))] px-4 py-3 shadow-[0_24px_55px_-40px_rgba(15,23,42,0.38)] ring-1 ring-slate-200/70 sm:px-5">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#12b4a6]/30 to-transparent"></div>

          <a href="#home" className="flex min-w-0 items-center" onClick={closeMenu}>
            <Brand />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2.5 text-[15px] font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                onClick={(event) => handleNavLinkClick(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
          

            <a
              href={phoneLink}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f4eb3] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_30px_-18px_rgba(15,78,179,0.72)] transition hover:-translate-y-0.5 hover:bg-[#133b8e]"
            >
              <PhoneIcon className="h-4 w-4" />
              Call Now
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#12b4a6]/20 bg-gradient-to-r from-[#ebfff6] to-[#e9fffd] px-5 py-2.5 text-sm font-semibold text-[#0d8e83] shadow-[0_18px_32px_-22px_rgba(18,180,166,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-20px_rgba(18,180,166,0.55)]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25d366] shadow-sm shadow-[#25d366]/30">
                <WhatsAppIcon className="h-4 w-4 text-white" />
              </span>
              WhatsApp
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[1.2rem] border border-slate-200 bg-white text-slate-700 shadow-sm shadow-slate-900/[0.03] transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0f4eb3] lg:hidden"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current"></span>
              <span className="block h-0.5 w-5 rounded-full bg-current"></span>
              <span className="block h-0.5 w-5 rounded-full bg-current"></span>
            </span>
          </button>
        </div>

        {isMenuOpen ? (
          <div className="mt-3 rounded-[1.9rem] border border-slate-200/80 bg-white/95 px-4 py-4 shadow-[0_26px_45px_-30px_rgba(15,23,42,0.22)] backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-[1.1rem] px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#0f4eb3]"
                  onClick={(event) => handleNavLinkClick(event, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-4 grid gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
                <MapPinIcon className="h-4 w-4 text-[#12b4a6]" />
                Rajgurunagar, Pune
              </div>

              <a
                href={phoneLink}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f4eb3] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20"
                onClick={closeMenu}
              >
                <PhoneIcon className="h-4 w-4" />
                Call Now
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#12b4a6]/20 bg-gradient-to-r from-[#ebfff6] to-[#e9fffd] px-4 py-3 text-sm font-semibold text-[#0d8e83]"
                onClick={closeMenu}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25d366]">
                  <WhatsAppIcon className="h-4 w-4 text-white" />
                </span>
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Navbar
