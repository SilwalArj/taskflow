import StatusBadge from '../ui/StatusBadge'
import PriorityBadge from '../ui/PriorityBadge'
import DueDate from '../ui/DueDate'

function RowActions({ task, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-4 text-sm font-medium">
      <button type="button" onClick={() => onEdit(task)}
        className="text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        aria-label={`Edit ${task.title}`}>
        Edit
      </button>
      <button type="button" onClick={() => onDelete(task)}
        className="text-red-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        aria-label={`Delete ${task.title}`}>
        Delete
      </button>
    </div>
  )
}

function TasksTable({ tasks, projectNames, onEdit, onDelete }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Task</th>
              <th scope="col" className="px-5 py-3 font-medium">Project</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
              <th scope="col" className="px-5 py-3 font-medium">Priority</th>
              <th scope="col" className="px-5 py-3 font-medium">Due date</th>
              <th scope="col" className="px-5 py-3 font-medium"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-slate-50">
                <td className="px-5 py-3.5 font-medium text-slate-900">{task.title}</td>
                <td className="px-5 py-3.5 text-slate-600">{projectNames[task.projectId] ?? 'No project'}</td>
                <td className="px-5 py-3.5"><StatusBadge status={task.status} /></td>
                <td className="px-5 py-3.5"><PriorityBadge priority={task.priority} /></td>
                <td className="whitespace-nowrap px-5 py-3.5"><DueDate task={task} /></td>
                <td className="px-5 py-3.5"><RowActions task={task} onEdit={onEdit} onDelete={onDelete} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <ul className="divide-y divide-slate-100 md:hidden">
        {tasks.map((task) => (
          <li key={task.id} className="space-y-2 px-5 py-4">
            <p className="font-medium text-slate-900">{task.title}</p>
            <p className="text-sm text-slate-500">{projectNames[task.projectId] ?? 'No project'}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <StatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
            </div>
            <p className="text-sm"><DueDate task={task} /></p>
            <RowActions task={task} onEdit={onEdit} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TasksTable