import { useState } from 'react'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import inputClass from '../ui/inputClass'

function ProjectForm({ project, onSubmit, onCancel }) {
  const [name, setName] = useState(project?.name ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Project name is required.')
      return
    }
    setError('')
    setSaving(true)
    setSubmitError('')
    try {
      await onSubmit({ name: name.trim(), description: description.trim() })
    } catch (err) {
      setSubmitError(err.message)
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField id="name" label="Name" error={error}>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)}
          className={inputClass} placeholder="e.g. Customer Portal" autoFocus />
      </FormField>
      <FormField id="description" label="Description">
        <textarea id="description" rows={3} value={description}
          onChange={(e) => setDescription(e.target.value)} className={inputClass}
          placeholder="What is this project about?" />
      </FormField>

      {submitError && <p className="text-sm text-red-700" role="alert">{submitError}</p>}

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="secondary" onClick={onCancel} disabled={saving}>Cancel</Button>
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving...' : project ? 'Save changes' : 'Add project'}
        </Button>
      </div>
    </form>
  )
}

export default ProjectForm