function GalleryCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm shadow-slate-950/5 ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/10">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-500">{item.type}</p>
        <h3 className="mt-2 text-lg font-bold text-slate-950">{item.title}</h3>
      </div>
    </article>
  )
}

export default GalleryCard
