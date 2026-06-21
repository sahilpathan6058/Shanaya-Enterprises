import { Star } from 'lucide-react'

function TestimonialCard({ review }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
      <div className="flex gap-1 text-orange-500">
        {Array.from({ length: review.rating }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-600">"{review.text}"</p>
      <div className="mt-6">
        <h3 className="font-bold text-slate-950">{review.name}</h3>
        <p className="text-sm text-slate-500">{review.area}</p>
      </div>
    </article>
  )
}

export default TestimonialCard
