import jwt from 'jsonwebtoken'
import env from '../config/env.js'
import Admin from '../models/Admin.js'

export function signToken(adminId) {
  return jwt.sign({ id: adminId }, env.jwtSecret, { expiresIn: '7d' })
}

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Login required' })
    }

    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, env.jwtSecret)
    const admin = await Admin.findById(decoded.id).select('-password')

    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' })
    }

    req.admin = admin
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export async function optionalProtect(req, res, next) {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) return next()

    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, env.jwtSecret)
    const admin = await Admin.findById(decoded.id).select('-password')
    if (admin) req.admin = admin
    next()
  } catch {
    next()
  }
}
