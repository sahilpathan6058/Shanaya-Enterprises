import Admin from '../models/Admin.js'
import { signToken } from '../middleware/auth.middleware.js'

export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() })
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = signToken(admin._id)
    res.json({
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    })
  } catch (error) {
    next(error)
  }
}

export async function getMe(req, res) {
  res.json({ admin: req.admin })
}
