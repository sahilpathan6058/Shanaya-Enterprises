
import { Link, NavLink } from 'react-router-dom'
import {
  Tv,
  Search,
  Headphones,
  MapPin,
  Menu,
  MessageCircle,
  ShoppingCart,
} from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Dish TV', to: '/dish-tv' },
  { label: 'Services', to: '/services' },
  { label: 'Offers', to: '/offers' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container flex min-h-[76px] items-center gap-5">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="rounded-xl bg-orange-500 p-2 text-white">
            <Tv size={28} />
          </span>
          <span>
            <span className="block text-lg font-extrabold leading-tight">
              <span className="text-[#10243a]">Shanaya</span>{' '}
              <span className="text-orange-600">Enterprises</span>
            </span>
            <span className="text-xs text-slate-500">
              Sales · Repair · Installation
            </span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center rounded-lg border md:flex">
          <Search className="ml-3 text-slate-400" size={18} />
          <input
            aria-label="Search products"
            placeholder="Search TVs, appliances, DTH..."
            className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
          />
          <button className="bg-teal-700 p-3 text-white">
            <Search size={17} />
          </button>
        </div>

        <a
          href="tel:09823786438"
          className="hidden items-center gap-2 text-sm font-semibold lg:flex"
        >
          <Headphones size={21} />
          <span>Call Us</span>
        </a>

        <a
          href="https://wa.me/919823786438"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-lg bg-green-600 px-3 py-2.5 text-sm font-bold text-white sm:flex"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <Link
        to="/cart"
        aria-label="Shopping cart"
        className="relative hidden rounded-lg border border-slate-200 p-2.5 text-[#10243a] transition hover:border-teal-700 hover:text-teal-700 sm:block"
      >
        <ShoppingCart size={22} />

        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1 text-xs font-bold text-white">
          0
        </span>
      </Link>

        <button
          aria-label="Open navigation"
          className="ml-auto rounded-lg border p-2 md:hidden"
          onClick={() =>
            document.getElementById('mobile-nav')?.classList.toggle('hidden')
          }
        >
          <Menu size={22} />
        </button>
      </div>

      <nav className="hidden bg-[#092d43] text-white md:block">
        <div className="container flex items-center justify-between gap-3">
           <div className="flex flex-wrap items-center gap-10">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
               className={({ isActive }) =>
          `rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200
          hover:bg-teal-800 hover:text-white ${
            isActive
              ? 'border-b-2 border-orange-500 bg-white/10 text-white'
              : 'text-slate-200'
          }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <span className="flex items-center gap-1 text-xs text-slate-200">
            <MapPin size={14} />
            Rakshewadi, Pune
          </span>
        </div>
      </nav>

      <nav id="mobile-nav" className="hidden bg-[#092d43] text-white md:hidden">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() =>
              document.getElementById('mobile-nav')?.classList.add('hidden')
            }
            className="block border-t border-white/10 px-10 py-3 text-sm"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
