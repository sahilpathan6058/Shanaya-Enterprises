import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'

const envPath = fileURLToPath(new URL('../../.env', import.meta.url))

dotenv.config({ path: envPath, quiet: true })

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGODB_URI,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
}

if (!env.mongodbUri) {
  throw new Error('MONGODB_URI is required. Add it to backend/.env file.')
}

export default env
