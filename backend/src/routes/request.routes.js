import { Router } from 'express'
import {
  createRequest,
  deleteRequest,
  getRequest,
  getRequests,
  updateRequest,
} from '../controllers/request.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/', createRequest)
router.get('/', protect, getRequests)
router.get('/:id', protect, getRequest)
router.patch('/:id', protect, updateRequest)
router.delete('/:id', protect, deleteRequest)

export default router
