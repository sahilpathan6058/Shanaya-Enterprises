import cors from 'cors'
import express from 'express'
import env from './config/env.js'
import { errorHandler } from './middleware/error.middleware.js'
import { notFound } from './middleware/not-found.middleware.js'
import healthRoutes from './routes/health.routes.js'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import requestRoutes from './routes/request.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const app = express()

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api', (req, res) => {
  res.json({ message: 'Backend API is running' })
})

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/requests', requestRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
