import CTASection from '../components/CTASection'
import GalleryCard from '../components/GalleryCard'
import SectionHeader from '../components/SectionHeader'
import { galleryItems } from '../data/siteData'

function GalleryPage() {
  return (
    <main>
      <section className="bg-blue-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Gallery"
            title="Real work showcase"
            description="TV installations, Dish antenna setup, WiFi setup, and RO purifier installation examples."
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {galleryItems.map((item) => (
            <GalleryCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <CTASection title="Want the same clean setup at your home?" />
    </main>
  )
}

export default GalleryPage
