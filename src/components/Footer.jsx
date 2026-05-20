import { useState } from 'react'
import WhatsAppIcon from './WhatsAppIcon'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Twitter', href: 'https://x.com/' },
  { label: 'WhatsApp', href: 'https://wa.me/919404799782' },
]

function InstagramIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.9" r="1.1" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.8 8.5A1.9 1.9 0 1 0 6.8 4.7a1.9 1.9 0 0 0 0 3.8ZM5.3 9.9h3V19h-3V9.9Zm4.8 0h2.9v1.2h.1c.4-.8 1.4-1.6 2.9-1.6c3.1 0 3.7 2 3.7 4.7V19h-3v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3V9.9Z" />
    </svg>
  )
}

function TwitterIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 7.1c.9-.1 1.8-.5 2.5-1c-.3 1-.9 1.8-1.7 2.3a4.6 4.6 0 0 0 2-1.2c-.2 1-.8 1.8-1.5 2.4v.6c0 5.7-4.3 12.3-12.3 12.3c-2.4 0-4.7-.7-6.6-1.9h.9c2 0 3.8-.7 5.3-1.8c-1.9 0-3.4-1.3-4-3c.3.1.6.1.9.1c.4 0 .8-.1 1.1-.2c-2-.4-3.5-2.1-3.5-4.2v-.1c.6.3 1.3.5 2 .6A4.3 4.3 0 0 1 2.5 8.5c0-.9.2-1.7.7-2.4A12.2 12.2 0 0 0 12 10.6c-.1-.3-.1-.7-.1-1A4.3 4.3 0 0 1 19.3 6c.8-.1 1.5-.4 2.1-.8c-.3.9-.8 1.6-1.5 1.9Z" />
    </svg>
  )
}

function ArrowIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 12h14m0 0-4.5-4.5M19 12l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Footer({ services = [] }) {
  const [newsletterName, setNewsletterName] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterMessage, setNewsletterMessage] = useState('')
  const socialIcons = {
    Instagram: <InstagramIcon className="h-5 w-5" />,
    LinkedIn: <LinkedInIcon className="h-5 w-5" />,
    Twitter: <TwitterIcon className="h-5 w-5" />,
    WhatsApp: <WhatsAppIcon className="h-5 w-5 text-current" />,
  }

  const handleNewsletterSubmit = (event) => {
    event.preventDefault()
    setNewsletterMessage('Thanks! We will share updates with you.')
    setNewsletterName('')
    setNewsletterEmail('')
  }

  return (
    <footer className="bg-[#eef5f6] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-[0_30px_90px_-45px_rgba(2,8,23,0.9)]">
        
        {/* Top horizontal footer */}
        <div className="grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.5fr_0.8fr_1fr_1.2fr] lg:px-10">
          
          {/* Brand */}
          <div>
            <img
              src="/images/shanaya-logo.svg"
              alt="Shanaya Enterprises logo"
              className="h-16 w-auto object-contain"
            />

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Trusted electronics sales, repair and installation service for TV, fridge,
              cooler, dish fitting, water filter and home appliances.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-slate-200 transition hover:-translate-y-0.5 hover:border-[#12b4a6]/30 hover:bg-[#12b4a6]/10 hover:text-[#8bd8d0]"
                >
                  {socialIcons[link.label]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8bd8d0]">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8bd8d0]">
              Services
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {(services.length ? services.slice(0, 5) : [
                { id: 1, title: 'TV Repair' },
                { id: 2, title: 'Fridge Repair' },
                { id: 3, title: 'Dish Fitting' },
                { id: 4, title: 'Water Filter Service' },
                { id: 5, title: 'Home Visit Service' },
              ]).map((service) => (
                <a
                  key={service.id}
                  href="#services"
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {service.title}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8bd8d0]">
              Newsletter
            </h3>

            <form onSubmit={handleNewsletterSubmit} className="mt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white p-1.5">
                  <input
                    type="text"
                    value={newsletterName}
                    onChange={(event) => setNewsletterName(event.target.value)}
                    placeholder="Enter name"
                    required
                    className="min-w-0 flex-1 bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white p-1.5">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    placeholder="Enter email"
                    required
                    className="min-w-0 flex-1 bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#12b4a6] text-slate-950 transition hover:bg-[#3fd7c9]"
                  >
                    <ArrowIcon />
                  </button>
                </div>
              </div>

              {newsletterMessage ? (
                <p className="mt-3 text-sm font-medium text-[#8bd8d0]">{newsletterMessage}</p>
              ) : null}
            </form>
          </div>
        </div>

        {/* Bottom horizontal bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Shanaya Enterprises. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-2">
            {['Sales', 'Repair', 'Installation'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
