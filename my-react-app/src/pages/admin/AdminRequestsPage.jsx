import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

const statusOptions = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'cancelled', label: 'Cancelled' },
]

const statusColors = {
  pending: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved: 'bg-green-100 text-green-700',
  cancelled: 'bg-slate-200 text-slate-600',
}

function AdminRequestsPage() {
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('pending')
  const [saving, setSaving] = useState(false)

  const loadRequests = () => {
    setLoading(true)
    api
      .getRequests(filter || undefined)
      .then((data) => setRequests(data.requests))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadRequests()
  }, [filter])

  const selectedRequest = requests.find((item) => item._id === selectedId)

  const openRequest = (request) => {
    setSelectedId(request._id)
    setNotes(request.adminNotes || '')
    setStatus(request.status)
  }

  const handleUpdate = async () => {
    if (!selectedId) return
    setSaving(true)
    setError('')

    try {
      await api.updateRequest(selectedId, { status, adminNotes: notes })
      loadRequests()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this request?')) return

    try {
      await api.deleteRequest(id)
      if (selectedId === id) setSelectedId(null)
      loadRequests()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Customer Requests</h1>
        <p className="mt-1 text-sm text-slate-500">Handle enquiries submitted from the contact page</p>
      </div>

      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p> : null}

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-bold text-slate-700">
          Filter
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="ml-2 rounded-xl border border-slate-200 px-3 py-2 font-normal outline-none focus:border-[#0f4eb3]"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <p className="p-6 text-sm text-slate-500">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">No customer requests found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                    <th className="px-4 py-3 font-semibold">Customer</th>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr
                      key={request._id}
                      className={`cursor-pointer border-b border-slate-100 transition hover:bg-blue-50/40 ${
                        selectedId === request._id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => openRequest(request)}
                    >
                      <td className="px-4 py-4">
                        <p className="font-bold text-slate-900">{request.name}</p>
                        <p className="text-xs text-slate-500">{request.phone}</p>
                      </td>
                      <td className="px-4 py-4">{request.service}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusColors[request.status]}`}
                        >
                          {request.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-500">
                        {new Date(request.createdAt).toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(request._id)
                          }}
                          className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {selectedRequest ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Request Details</h2>
                <p className="text-sm text-slate-500">Update status and add internal notes</p>
              </div>

              <div className="space-y-2 text-sm">
                <p><span className="font-bold">Name:</span> {selectedRequest.name}</p>
                <p><span className="font-bold">Phone:</span> {selectedRequest.phone}</p>
                <p><span className="font-bold">Service:</span> {selectedRequest.service}</p>
                <p><span className="font-bold">Message:</span> {selectedRequest.message || '—'}</p>
              </div>

              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Admin Notes
                <textarea
                  rows="4"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Internal notes for follow-up"
                  className="resize-none rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#0f4eb3]"
                />
              </label>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#0f4eb3] px-5 py-3 text-sm font-bold text-white hover:bg-[#08245c] disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Select a request to view and update details.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminRequestsPage
