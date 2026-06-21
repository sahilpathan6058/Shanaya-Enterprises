import CustomerRequest from '../models/CustomerRequest.js'
import Product from '../models/Product.js'

export async function getDashboardStats(req, res, next) {
  try {
    const [
      totalProducts,
      activeProducts,
      totalRequests,
      pendingRequests,
      inProgressRequests,
      resolvedRequests,
      recentRequests,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      CustomerRequest.countDocuments(),
      CustomerRequest.countDocuments({ status: 'pending' }),
      CustomerRequest.countDocuments({ status: 'in_progress' }),
      CustomerRequest.countDocuments({ status: 'resolved' }),
      CustomerRequest.find().sort({ createdAt: -1 }).limit(5),
    ])

    res.json({
      stats: {
        totalProducts,
        activeProducts,
        totalRequests,
        pendingRequests,
        inProgressRequests,
        resolvedRequests,
      },
      recentRequests,
    })
  } catch (error) {
    next(error)
  }
}
