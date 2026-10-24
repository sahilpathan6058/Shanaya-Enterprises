
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Wrench,
  Headphones,
  Tv,
  Snowflake,
  Droplets,
  Refrigerator,
  Monitor,
  MessageCircle,
  RefreshCw,
  PackageSearch,
} from "lucide-react";

import HeroSlider from "../components/HeroSlider";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const WHATSAPP_NUMBER = "919823786438";

const categories = [
  { name: "Smart TVs", icon: Tv, color: "bg-blue-50" },
  { name: "Dish TV", icon: Monitor, color: "bg-orange-50" },
  { name: "Water Purifiers", icon: Droplets, color: "bg-cyan-50" },
  { name: "Air Coolers", icon: Snowflake, color: "bg-sky-50" },
  { name: "Refrigerators", icon: Refrigerator, color: "bg-purple-50" },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Product Guidance",
    text: "Get help choosing suitable products for your home.",
  },
  {
    icon: Truck,
    title: "Local Support",
    text: "Serving Rakshewadi and nearby areas.",
  },
  {
    icon: Wrench,
    title: "Installation Services",
    text: "Ask about available installation services.",
  },
  {
    icon: Headphones,
    title: "Customer Assistance",
    text: "Contact our team for product and service enquiries.",
  },
];

function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-52 w-full flex-col items-center justify-center gap-2 bg-slate-100 text-slate-400">
        <PackageSearch size={38} />
        <span className="text-xs">Product image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-52 w-full bg-slate-50 object-contain p-3 transition duration-300 group-hover:scale-105"
    />
  );
}

function ProductCard({ product }) {
  const productId = product.slug || product._id;
  const productName = product.name || "Product";
  const image = product.imageUrl || product.images?.[0] || "";

  const message = encodeURIComponent(
    `Hello Shanaya Enterprises, I am interested in ${productName}. Please share the price and availability.`
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        to={`/products/${productId}`}
        aria-label={`View ${productName}`}
        className="block overflow-hidden"
      >
        <ProductImage src={image} alt={productName} />
      </Link>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
          {product.category || "Electronics"}
        </p>

        <Link to={`/products/${productId}`}>
          <h3 className="mt-2 text-lg font-extrabold text-[#10243a] transition hover:text-teal-700">
            {productName}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
          {product.description || "Contact us for product details."}
        </p>

        <div className="mt-3">
          {typeof product.price === "number" ? (
            <p className="text-lg font-extrabold text-orange-700">
              {product.price === 0
                ? "Contact for price"
                : `₹${product.price.toLocaleString("en-IN")}`}
            </p>
          ) : (
            <p className="font-bold text-orange-700">
              Ask for current price
            </p>
          )}

          <p
            className={`mt-1 text-xs font-medium ${
              product.inStock ? "text-green-700" : "text-red-600"
            }`}
          >
            {product.inStock ? "Availability on enquiry" : "Currently unavailable"}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            to={`/products/${productId}`}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-200 px-3 py-3 text-sm font-bold text-[#10243a] transition hover:border-teal-700 hover:bg-teal-50"
          >
            Details <ArrowRight size={15} />
          </Link>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-orange-600 px-2 py-3 text-sm font-bold text-white transition hover:bg-orange-700"
          >
            <MessageCircle size={16} />
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/api/products?featured=true`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const data = await response.json();

        if (!Array.isArray(data.products)) {
          throw new Error("The products API returned an unexpected response.");
        }

        setProducts(data.products);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "We couldn't load products right now. Please check your connection and try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [retryCount]);

  return (
    <main className="pb-10">
      {/* Animated hero slider */}
      <HeroSlider />

      {/* Product categories */}
      <section className="container py-10 md:py-12">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
              Browse by category
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-[#10243a] sm:text-3xl">
              Explore Our Categories
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Find electronics and appliances for your home.
            </p>
          </div>

          <Link
            to="/products"
            className="shrink-0 text-sm font-bold text-teal-700 hover:text-orange-600"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {categories.map(({ name, icon: Icon, color }) => (
            <Link
              key={name}
              to={
                name === "Dish TV"
                  ? "/dish-tv"
                  : `/products?category=${encodeURIComponent(
                      name === "Smart TVs" ? "Televisions" : name
                    )}`
              }
              className={`${color} group rounded-2xl border border-slate-100 p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg sm:p-6`}
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition group-hover:bg-teal-700 group-hover:text-white">
                <Icon className="text-teal-800 group-hover:text-inherit" size={29} />
              </span>

              <p className="mt-4 text-sm font-bold text-[#10243a] sm:text-base">
                {name}
              </p>

              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                Explore <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional banners */}
      <section className="container">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 via-red-600 to-red-800 p-7 text-white sm:p-9">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-100">
                Dish TV Services
              </p>

              <h2 className="mt-3 max-w-md text-3xl font-black leading-tight sm:text-4xl">
                More Entertainment. Local Support.
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/90">
                Ask about new connections, installation and available services.
              </p>

              <Link
                to="/dish-tv"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-red-700 transition hover:bg-orange-50"
              >
                Explore Dish TV <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#123c55] to-[#071f36] p-7 text-white sm:p-9">
            <div className="absolute -bottom-16 -right-8 h-48 w-48 rounded-full border-[30px] border-white/5" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">
                We're here to help
              </p>

              <h2 className="mt-3 max-w-md text-3xl font-black leading-tight sm:text-4xl">
                Need Help Choosing a Product?
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                Ask about product availability, pricing or service bookings.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  "Hello Shanaya Enterprises, I need help choosing a product."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products loaded from MongoDB through Express */}
      <section className="container py-12 md:py-16">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
              Featured collection
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-[#10243a] sm:text-3xl">
              Popular Products
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Explore products selected by Shanaya Enterprises.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-orange-600"
          >
            Browse all products <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
            aria-label="Loading products"
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-52 bg-slate-100" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-1/3 rounded bg-slate-100" />
                  <div className="h-5 w-3/4 rounded bg-slate-100" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-10 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-10 text-center">
            <PackageSearch size={38} className="mx-auto text-red-500" />

            <h3 className="mt-3 font-bold text-slate-800">
              Products are temporarily unavailable
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#092d43] px-5 py-3 text-sm font-bold text-white hover:bg-teal-800"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
            <PackageSearch
              size={42}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-4 text-lg font-bold text-[#10243a]">
              No featured products yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Published featured products added by the admin will appear here.
            </p>

            <Link
              to="/products"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-bold text-white hover:bg-orange-700"
            >
              Browse Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard
                key={product._id || product.slug}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* Why choose us */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-teal-700">
              Why choose us
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-[#10243a] sm:text-3xl">
              Local Service You Can Count On
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Friendly product guidance and support from your local electronics
              business.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Icon size={26} />
                </span>

                <h3 className="mt-4 font-extrabold text-[#10243a]">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
