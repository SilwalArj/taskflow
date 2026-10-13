function ProjectCard({ project, total, completed, onEdit, onDelete }) {
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-base font-semibold text-slate-900">{project.name}</h3>
      <p className="mt-1 flex-1 text-sm text-slate-600">
        {project.description || 'No description.'}
      </p>

      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-xs text-slate-500">
          <span>{completed} of {total} tasks completed</span>
          <span>{progress}%</span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${project.name} progress`}
        >
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 text-sm font-medium">
        <button type="button" onClick={() => onEdit(project)}
          className="text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label={`Edit ${project.name}`}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(project)}
          className="text-red-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
          aria-label={`Delete ${project.name}`}>
          Delete
        </button>
      </div>
    </article>
  )
}

export default ProjectCard