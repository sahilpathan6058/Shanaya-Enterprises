import env from '../config/env.js'

export function errorHandler(error, req, res, _next) {
  const statusCode = error.statusCode || 500

  res.status(statusCode).json({
    message: error.message || 'Internal Server Error',
    ...(env.nodeEnv === 'development' ? { stack: error.stack } : {}),
  })
}
