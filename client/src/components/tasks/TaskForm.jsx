import { useState } from 'react'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import inputClass from '../ui/inputClass'
import { STATUSES, PRIORITIES } from '../../utils/constants'

function TaskForm({ task, projects, onSubmit, onCancel }) {
  const [values, setValues] = useState({
    title: task?.title ?? '',
    projectId: task?.projectId ?? projects[0]?.id ?? '',
    status: task?.status ?? 'To Do',
    priority: task?.priority ?? 'Medium',
    dueDate: task?.dueDate ?? '',
  })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}
    if (!values.title.trim()) newErrors.title = 'Title is required.'
    if (!values.projectId) newErrors.projectId = 'Create a project first, then pick it here.'
    if (!values.dueDate) newErrors.dueDate = 'Due date is required.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    onSubmit({ ...values, title: values.title.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField id="title" label="Title" error={errors.title}>
        <input id="title" name="title" value={values.title} onChange={handleChange}
          className={inputClass} placeholder="e.g. Write release notes" autoFocus />
      </FormField>

      <FormField id="projectId" label="Project" error={errors.projectId}>
        <select id="projectId" name="projectId" value={values.projectId}
          onChange={handleChange} className={inputClass}>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </FormField>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField id="status" label="Status">
          <select id="status" name="status" value={values.status}
            onChange={handleChange} className={inputClass}>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </FormField>
        <FormField id="priority" label="Priority">
          <select id="priority" name="priority" value={values.priority}
            onChange={handleChange} className={inputClass}>
            {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
        </FormField>
      </div>

      <FormField id="dueDate" label="Due date" error={errors.dueDate}>
        <input id="dueDate" name="dueDate" type="date" value={values.dueDate}
          onChange={handleChange} className={inputClass} />
      </FormField>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{task ? 'Save changes' : 'Add task'}</Button>
      </div>
    </form>
  )
}

export default TaskForm