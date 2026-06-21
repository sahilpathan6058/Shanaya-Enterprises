import { Clock3, Package, Users, CheckCircle2, AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  cancelled: 'bg-slate-200 text-slate-600',
}

function AdminDashboardPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .getDashboardStats()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-sm font-semibold text-slate-500">Loading dashboard...</p>
  }

  if (error) {
    return <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
  }

  const { stats, recentRequests } = data

  const cards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-[#0f4eb3]' },
    { label: 'Active Products', value: stats.activeProducts, icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Total Requests', value: stats.totalRequests, icon: Users, color: 'text-purple-600' },
    { label: 'Pending Requests', value: stats.pendingRequests, icon: AlertCircle, color: 'text-amber-600' },
    { label: 'In Progress', value: stats.inProgressRequests, icon: Clock3, color: 'text-blue-600' },
    { label: 'Resolved', value: stats.resolvedRequests, icon: CheckCircle2, color: 'text-emerald-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Overview of products and customer enquiries</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-950">{card.value}</p>
            </div>
          )
        })}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-950">Recent Customer Requests</h2>
          <Link to="/admin/requests" className="text-sm font-bold text-[#0f4eb3] hover:underline">
            View all
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <p className="text-sm text-slate-500">No customer requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-3 py-3 font-semibold">Name</th>
                  <th className="px-3 py-3 font-semibold">Phone</th>
                  <th className="px-3 py-3 font-semibold">Service</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request) => (
                  <tr key={request._id} className="border-b border-slate-100">
                    <td className="px-3 py-3 font-semibold text-slate-900">{request.name}</td>
                    <td className="px-3 py-3">{request.phone}</td>
                    <td className="px-3 py-3">{request.service}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusColors[request.status]}`}
                      >
                        {request.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-slate-500">
                      {new Date(request.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboardPage
