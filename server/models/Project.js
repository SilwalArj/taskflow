import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Project name is required.'], trim: true, maxlength: [80, 'Name is too long.'] },
    description: { type: String, trim: true, default: '', maxlength: [500, 'Description is too long.'] },
  },
  { timestamps: true },
)

projectSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    return ret
  },
})

export default mongoose.model('Project', projectSchema)