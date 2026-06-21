import { useEffect, useState } from 'react'
import { products as fallbackProducts } from '../data/siteData'
import { api } from '../services/api'

export function useProducts() {
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .getProducts()
      .then((data) => {
        if (data.products?.length) {
          setProducts(data.products)
        }
      })
      .catch(() => {
        setProducts(fallbackProducts)
      })
      .finally(() => setLoading(false))
  }, [])

  return { products, loading }
}
