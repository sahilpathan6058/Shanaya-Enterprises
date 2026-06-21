import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api, clearToken, saveToken } from '../services/api'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadSession = useCallback(async () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      setAdmin(null)
      setLoading(false)
      return
    }

    try {
      const data = await api.getMe()
      setAdmin(data.admin)
    } catch {
      clearToken()
      setAdmin(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadSession()
  }, [loadSession])

  const login = async (email, password) => {
    const data = await api.login(email, password)
    saveToken(data.token)
    setAdmin(data.admin)
    return data.admin
  }

  const logout = () => {
    clearToken()
    setAdmin(null)
  }

  const value = useMemo(
    () => ({ admin, loading, login, logout, isAuthenticated: Boolean(admin) }),
    [admin, loading],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
