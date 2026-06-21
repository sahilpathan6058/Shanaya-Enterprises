import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from '../controllers/product.controller.js'
import { optionalProtect, protect } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', optionalProtect, getProducts)
router.get('/:id', optionalProtect, getProduct)
router.post('/', protect, createProduct)
router.put('/:id', protect, updateProduct)
router.delete('/:id', protect, deleteProduct)

export default router
