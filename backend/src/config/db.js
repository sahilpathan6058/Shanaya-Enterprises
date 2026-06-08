import mongoose from 'mongoose'
import env from './env.js'

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  await mongoose.connect(env.mongodbUri, {
    serverSelectionTimeoutMS: 10000,
  })

  console.log(`MongoDB connected: ${mongoose.connection.host}`)
  return mongoose.connection
}

export async function disconnectDB() {
  await mongoose.disconnect()
}
