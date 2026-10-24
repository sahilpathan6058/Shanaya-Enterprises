
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function Placeholder({ title }) {
  return (
    <main className="container min-h-[60vh] py-16">
      <h1 className="text-3xl font-black text-[#10243a]">{title}</h1>
      <p className="mt-3 text-slate-600">
        This page will be implemented in the next development step.
      </p>
    </main>
  )
}

function Footer() {
  return (
    <footer className="bg-[#092d43] py-8 text-white">
      <div className="container flex flex-col justify-between gap-3 sm:flex-row">
        <div>
          <p className="text-lg font-extrabold">Shanaya Enterprises</p>
          <p className="mt-1 text-sm text-slate-300">
            Sales · Repair · Installation
          </p>
        </div>
        <p className="text-sm text-slate-300">
          Rakshewadi, Pune, Maharashtra
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Placeholder title="Our Products" />} />
        <Route path="/dish-tv" element={<Placeholder title="Dish TV Services" />} />
        <Route path="/services" element={<Placeholder title="Our Services" />} />
        <Route path="/offers" element={<Placeholder title="Latest Offers" />} />
        <Route path="/about" element={<Placeholder title="About Us" />} />
        <Route path="/contact" element={<Placeholder title="Contact Us" />} />
        <Route path="*" element={<Placeholder title="Page not found" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
