import mongoose from 'mongoose'
import { httpError } from '../utils/httpError.js'

export function validateId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(httpError(400, 'Invalid id.'))
  }
  next()
}