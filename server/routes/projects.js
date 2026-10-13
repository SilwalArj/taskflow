import { Router } from 'express'
import Project from '../models/Project.js'
import Task from '../models/Task.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { httpError } from '../utils/httpError.js'
import { validateId } from '../middleware/validateId.js'

const router = Router()

// Only accept known fields, so clients can't set anything else.
const pick = ({ name, description }) => ({ name, description })

router.get('/', asyncHandler(async (req, res) => {
  res.json(await Project.find().sort({ createdAt: -1 }))
}))

router.post('/', asyncHandler(async (req, res) => {
  const project = await Project.create(pick(req.body))
  res.status(201).json(project)
}))

router.put('/:id', validateId, asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, pick(req.body), {
    new: true,
    runValidators: true,
  })
  if (!project) throw httpError(404, 'Project not found.')
  res.json(project)
}))

// Deleting a project also deletes its tasks (same rule as the frontend).
router.delete('/:id', validateId, asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id)
  if (!project) throw httpError(404, 'Project not found.')
  await Task.deleteMany({ projectId: project._id })
  res.status(204).end()
}))

export default router