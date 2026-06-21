const API_BASE = '/api'

function getToken() {
  return localStorage.getItem('adminToken')
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const token = getToken()
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

export const api = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request('/auth/me'),

  getProducts: () => request('/products'),

  createProduct: (product) =>
    request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  updateProduct: (id, product) =>
    request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),

  deleteProduct: (id) =>
    request(`/products/${id}`, {
      method: 'DELETE',
    }),

  submitRequest: (payload) =>
    request('/requests', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getRequests: (status) => {
    const query = status ? `?status=${status}` : ''
    return request(`/requests${query}`)
  },

  updateRequest: (id, payload) =>
    request(`/requests/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  deleteRequest: (id) =>
    request(`/requests/${id}`, {
      method: 'DELETE',
    }),

  getDashboardStats: () => request('/dashboard/stats'),
}

export function saveToken(token) {
  localStorage.setItem('adminToken', token)
}

export function clearToken() {
  localStorage.removeItem('adminToken')
}
