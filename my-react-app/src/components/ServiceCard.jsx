import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ActionButtons from './ActionButtons'

function ServiceCard({ service, detailed = false }) {
  const Icon = service.icon

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-2xl bg-white/95 p-3 text-[#0f4eb3] shadow-lg shadow-slate-950/10">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-slate-950">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{service.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {service.benefits.map((benefit) => (
            <span
              key={benefit}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0f4eb3]"
            >
              {benefit}
            </span>
          ))}
        </div>
        {detailed ? (
          <ActionButtons compact className="mt-6" />
        ) : (
          <Link
            to="/services"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0f4eb3] transition group-hover:gap-3"
          >
            View service <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  )
}

export default ServiceCard
