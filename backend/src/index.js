import mongoose from 'mongoose'
import app from './app.js'
import env from './config/env.js'
import { connectDB, disconnectDB } from './config/db.js'
import { seedDatabase } from './utils/seed.js'

let server

async function startServer() {
  try {
    await connectDB()
    await seedDatabase()

    server = app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down server...`)

  if (server) {
    server.close(async () => {
      await disconnectDB()
      process.exit(0)
    })
    return
  }

  if (mongoose.connection.readyState !== 0) {
    await disconnectDB()
  }

  process.exit(0)
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))

startServer()
