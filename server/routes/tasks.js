import { Router } from 'express'
import mongoose from 'mongoose'
import Task from '../models/Task.js'
import Project from '../models/Project.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { httpError } from '../utils/httpError.js'
import { validateId } from '../middleware/validateId.js'

const router = Router()

const pick = ({ title, projectId, status, priority, dueDate }) => ({
  title, projectId, status, priority, dueDate,
})

async function ensureProjectExists(projectId) {
  if (!mongoose.isValidObjectId(projectId) || !(await Project.exists({ _id: projectId }))) {
    throw httpError(400, 'Project does not exist.')
  }
}

router.get('/', asyncHandler(async (req, res) => {
  res.json(await Task.find().sort({ createdAt: -1 }))
}))

router.post('/', asyncHandler(async (req, res) => {
  const data = pick(req.body)
  await ensureProjectExists(data.projectId)
  const task = await Task.create(data)
  res.status(201).json(task)
}))

router.put('/:id', validateId, asyncHandler(async (req, res) => {
  const data = pick(req.body)
  await ensureProjectExists(data.projectId)
  const task = await Task.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  })
  if (!task) throw httpError(404, 'Task not found.')
  res.json(task)
}))

router.delete('/:id', validateId, asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id)
  if (!task) throw httpError(404, 'Task not found.')
  res.status(204).end()
}))

export default router