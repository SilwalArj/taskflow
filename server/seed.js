import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import Project from './models/Project.js'
import Task from './models/Task.js'

function daysFromNow(offset) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

await connectDB()
await Task.deleteMany({})
await Project.deleteMany({})

const [web, api, marketing, mobile] = await Project.insertMany([
  { name: 'Website Redesign', description: 'Refresh the marketing site with a new design system.' },
  { name: 'API Platform', description: 'Public REST API, documentation, and developer tooling.' },
  { name: 'Marketing Launch', description: 'Coordinate content and campaigns for the Q4 launch.' },
  { name: 'Mobile App', description: 'iOS and Android client for the core product.' },
])

await Task.insertMany([
  { title: 'Design onboarding flow wireframes', projectId: web._id, status: 'In Progress', priority: 'High', dueDate: daysFromNow(2) },
  { title: 'Set up CI pipeline for API', projectId: api._id, status: 'To Do', priority: 'Medium', dueDate: daysFromNow(6) },
  { title: 'Write launch announcement copy', projectId: marketing._id, status: 'In Progress', priority: 'Medium', dueDate: daysFromNow(-1) },
  { title: 'Fix push notification bug on Android', projectId: mobile._id, status: 'To Do', priority: 'High', dueDate: daysFromNow(-3) },
  { title: 'Update pricing page layout', projectId: web._id, status: 'Completed', priority: 'Low', dueDate: daysFromNow(-2) },
  { title: 'Document REST endpoints', projectId: api._id, status: 'In Progress', priority: 'Low', dueDate: daysFromNow(9) },
  { title: 'Prepare App Store screenshots', projectId: mobile._id, status: 'Completed', priority: 'Medium', dueDate: daysFromNow(-5) },
  { title: 'Plan email campaign schedule', projectId: marketing._id, status: 'To Do', priority: 'Medium', dueDate: daysFromNow(4) },
  { title: 'Audit accessibility on homepage', projectId: web._id, status: 'Completed', priority: 'High', dueDate: daysFromNow(-8) },
  { title: 'Add rate limiting to public routes', projectId: api._id, status: 'To Do', priority: 'High', dueDate: daysFromNow(12) },
])

console.log('Seeded 4 projects and 10 tasks.')
await mongoose.disconnect()