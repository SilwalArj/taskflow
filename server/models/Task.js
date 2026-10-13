import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required.'], trim: true, maxlength: [150, 'Title is too long.'] },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: [true, 'Project is required.'], index: true },
    status: { type: String, enum: { values: ['To Do', 'In Progress', 'Completed'], message: 'Invalid status.' }, default: 'To Do' },
    priority: { type: String, enum: { values: ['Low', 'Medium', 'High'], message: 'Invalid priority.' }, default: 'Medium' },
    // Stored as "YYYY-MM-DD" text, matching what <input type="date"> produces.
    // This avoids timezone shifts that real Date objects cause for date-only values.
    dueDate: { type: String, required: [true, 'Due date is required.'], match: [/^\d{4}-\d{2}-\d{2}$/, 'Due date must be YYYY-MM-DD.'] },
  },
  { timestamps: true },
)

taskSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    return ret
  },
})

export default mongoose.model('Task', taskSchema)