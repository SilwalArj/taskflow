export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` })
}

// Express recognizes error handlers by their 4 parameters. Keep all four.
export function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((e) => e.message).join(' ')
    return res.status(400).json({ message })
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id.' })
  }
  const status = err.status ?? 500
  if (status === 500) console.error(err)
  res.status(status).json({ message: status === 500 ? 'Server error.' : err.message })
}