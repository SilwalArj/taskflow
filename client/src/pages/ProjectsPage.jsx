import { useState } from 'react'
import { useData } from '../context/useData'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EmptyState from '../components/ui/EmptyState'
import ProjectForm from '../components/projects/ProjectForm'
import ProjectCard from '../components/projects/ProjectCard'

function ProjectsPage() {
  const { tasks, projects, addProject, updateProject, deleteProject } = useData()
  const [editor, setEditor] = useState(null)
  const [projectToDelete, setProjectToDelete] = useState(null)

  async function handleSave(data) {
    if (editor.project) await updateProject(editor.project.id, data)
    else await addProject(data)
    setEditor(null)
  }

  async function handleConfirmDelete() {
    await deleteProject(projectToDelete.id)
    setProjectToDelete(null)
  }

  const taskCountFor = (project) => tasks.filter((t) => t.projectId === project.id).length
  const doneCountFor = (project) =>
    tasks.filter((t) => t.projectId === project.id && t.status === 'Completed').length

  const addButton = <Button onClick={() => setEditor({ project: null })}>Add project</Button>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">Group your tasks and track progress per project.</p>
        {addButton}
      </div>

      {projects.length === 0 ? (
        <EmptyState title="No projects yet" description="Projects organize your tasks." action={addButton} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              total={taskCountFor(project)}
              completed={doneCountFor(project)}
              onEdit={(p) => setEditor({ project: p })}
              onDelete={setProjectToDelete}
            />
          ))}
        </div>
      )}

      {editor && (
        <Modal title={editor.project ? 'Edit project' : 'Add project'} onClose={() => setEditor(null)}>
          <ProjectForm project={editor.project} onSubmit={handleSave} onCancel={() => setEditor(null)} />
        </Modal>
      )}

      {projectToDelete && (
        <ConfirmDialog
          title="Delete project"
          message={`Delete "${projectToDelete.name}"? This also deletes its ${taskCountFor(projectToDelete)} task(s) and can't be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setProjectToDelete(null)}
        />
      )}
    </div>
  )
}

export default ProjectsPage