export const productStorageKey = 'shanaya-enterprises-products-v1'
export const requestStorageKey = 'shanaya-enterprises-customer-requests-v1'
export const productPlaceholderImage = '/images/product-placeholder.svg'
export const enquiryStatusOptions = ['New', 'Contacted', 'In Progress', 'Resolved']

function loadCollection(key, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue
  }

  try {
    const storedValue = window.localStorage.getItem(key)

    if (!storedValue) {
      return fallbackValue
    }

    const parsedValue = JSON.parse(storedValue)
    return Array.isArray(parsedValue) ? parsedValue : fallbackValue
  } catch {
    return fallbackValue
  }
}

function saveCollection(key, value) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(value))
}

export function loadStoredProducts(fallbackProducts) {
  return loadCollection(productStorageKey, fallbackProducts)
}

export function loadStoredRequests() {
  return loadCollection(requestStorageKey, [])
}

export function persistProducts(products) {
  saveCollection(productStorageKey, products)
}

export function persistRequests(requests) {
  saveCollection(requestStorageKey, requests)
}

export function createClientId(prefix) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`
}
