
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_INTERVAL = 7000;


const slides = [
  {
    eyebrow: "SHANAYA ENTERPRISES • RAJGURUNAGAR",
    title: "Bring Home the",
    highlight: "Big Screen Experience",
    description:
      "Explore LED and Smart TVs for stunning picture quality, immersive entertainment, and unforgettable family moments.",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=2000&q=85",
    buttonText: "Explore TVs",
    buttonLink: "/products",
  },
  {
    eyebrow: "PURE WATER, HEALTHIER LIVING",
    title: "Every Drop",
    highlight: "Deserves to Be Pure",
    description:
      "Discover water purifiers designed to support cleaner drinking water for your home and family.",
    image:
      "https://images.openai.com/static-rsc-4/frDljUaHk2w3EVi4Sa_cvG-8ORS3yA5QXNyGIgMDqbWdWXb2pKDQBozeuv7vc89FlERjjtCT1Vb3XHKns-q86LrEsUIkYoZBc_W5eSIQZLHVfFIXFGm9dKEvW_zXowg-ne30AHrSnjmSTyxTJ0Y3u4h9kGtN1odlgGT2jLVxVtQ?purpose=inline",
    buttonText: "Explore Water Purifiers",
    buttonLink: "/products?category=Water%20Purifiers",
  },
  {
    eyebrow: "YOUR ENTERTAINMENT PARTNER",
    title: "More Channels,",
    highlight: "More Entertainment",
    description:
      "Discover Dish TV connections, recharge assistance, and entertainment solutions for your home.",
    image:
      "https://images.openai.com/static-rsc-4/L5YjYwAVEDbvz7m32ObZAT3Yu7Kl6l2nUmiTD0IWx5C5b9rwph7GCgf5B7lS3-M08ooy-QUhmb3PtRWlnHcjrqGVnLHw-U33xkZmXmbrQvIE2-SVW8T9MqKZkymKkxNsWRcQlT1K7XStzGgJ_eAEeSAxGUuwr1UdJbnqR5InLpHenNpIk71dp87WkIViiDsN?purpose=fullsize",
    buttonText: "Explore Dish TV",
    buttonLink: "/dish-tv",
  },
];



export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(interval);
  }, []);

  const previousSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
   <section
  aria-label="Featured products and services"
  className="
    relative isolate
    h-[340px] sm:h-[400px] md:h-[460px] lg:h-[500px] xl:h-[520px]
    w-full overflow-hidden bg-[#092d43]
  "
>
      {/* Background images */}
      {slides.map((slide, index) => (
        <div
          key={slide.eyebrow}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <img
            src={slide.image}
            alt=""
           className={`h-full w-full object-cover object-center transition-transform duration-[5000ms] ease-out ${
  index === activeIndex ? "scale-105" : "scale-100"
}`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061c2b]/95 via-[#092d43]/75 to-[#092d43]/20" />

      {/* Slide content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8 md:px-12 lg:px-16">
        {slides.map((slide, index) => (
          <div
            key={slide.eyebrow}
            className={`w-full max-w-2xl ${
              index === activeIndex
                ? "animate-[heroEnter_700ms_ease-out_both]"
                : "hidden"
            }`}
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400 sm:mb-3 sm:text-xs sm:tracking-[0.22em]">
              {slide.eyebrow}
            </p>

            <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {slide.title}
              <span className="mt-1 block text-orange-400">
                {slide.highlight}
              </span>
            </h1>

            <p className="mt-2 max-w-lg text-xs leading-relaxed text-white/85 sm:mt-4 sm:text-sm md:text-base">
              {slide.description}
            </p>

            <Link
              to={slide.buttonLink}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition duration-300 hover:bg-orange-700 sm:mt-6 sm:px-5 sm:py-3 sm:text-sm"
            >
              {slide.buttonText}
              <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      {/* Previous and next buttons */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-white/20 sm:left-4 sm:h-10 sm:w-10 md:left-6"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:bg-white/20 sm:right-4 sm:h-10 sm:w-10 md:right-6"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-4">
        {slides.map((slide, index) => (
          <button
            key={slide.eyebrow}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-7 bg-orange-400"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
