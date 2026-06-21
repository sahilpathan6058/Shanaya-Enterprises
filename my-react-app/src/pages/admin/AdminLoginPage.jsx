import { Lock } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'

function AdminLoginPage() {
  const { login, isAuthenticated, loading } = useAdminAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#08245c] to-[#0f4eb3] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0f4eb3]">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-950">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage products and customer requests</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              autoComplete="username"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#0f4eb3] focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#0f4eb3] focus:ring-4 focus:ring-blue-100"
            />
          </label>

          {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#0f4eb3] px-6 py-3.5 font-bold text-white transition hover:bg-[#08245c] disabled:opacity-60"
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
