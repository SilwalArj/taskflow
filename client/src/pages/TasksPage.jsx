import { useState } from 'react'
import { useData } from '../context/useData'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import EmptyState from '../components/ui/EmptyState'
import inputClass from '../components/ui/inputClass'
import TaskForm from '../components/tasks/TaskForm'
import TasksTable from '../components/tasks/TasksTable'
import { STATUSES, PRIORITIES } from '../utils/constants'

function TasksPage() {
  const { tasks, projects, addTask, updateTask, deleteTask } = useData()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [editor, setEditor] = useState(null) // null = closed, { task } = open (task null = new)
  const [taskToDelete, setTaskToDelete] = useState(null)

  const projectNames = Object.fromEntries(projects.map((p) => [p.id, p.name]))

  const visibleTasks = tasks
    .filter((t) => t.title.toLowerCase().includes(search.trim().toLowerCase()))
    .filter((t) => statusFilter === 'All' || t.status === statusFilter)
    .filter((t) => priorityFilter === 'All' || t.priority === priorityFilter)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  const filtersActive = search || statusFilter !== 'All' || priorityFilter !== 'All'

  function clearFilters() {
    setSearch('')
    setStatusFilter('All')
    setPriorityFilter('All')
  }

  async function handleSave(data) {
    if (editor.task) await updateTask(editor.task.id, data)
    else await addTask(data)
    setEditor(null)
  }

  async function handleConfirmDelete() {
    await deleteTask(taskToDelete.id)
    setTaskToDelete(null)
  }

  const addButton = <Button onClick={() => setEditor({ task: null })}>Add task</Button>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} across {projects.length}{' '}
          {projects.length === 1 ? 'project' : 'projects'}.
        </p>
        {addButton}
      </div>

      {tasks.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks"
            aria-label="Search tasks"
            className={`${inputClass} sm:max-w-xs`}
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status" className={`${inputClass} sm:w-44`}>
            <option value="All">All statuses</option>
            {STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}
            aria-label="Filter by priority" className={`${inputClass} sm:w-44`}>
            <option value="All">All priorities</option>
            {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
      )}

      {tasks.length === 0 ? (
        <EmptyState title="No tasks yet" description="Create your first task to get started." action={addButton} />
      ) : visibleTasks.length === 0 ? (
        <EmptyState
          title="No tasks match your filters"
          description="Try a different search or clear the filters."
          action={filtersActive && <Button variant="secondary" onClick={clearFilters}>Clear filters</Button>}
        />
      ) : (
        <TasksTable tasks={visibleTasks} projectNames={projectNames}
          onEdit={(task) => setEditor({ task })} onDelete={setTaskToDelete} />
      )}

      {editor && (
        <Modal title={editor.task ? 'Edit task' : 'Add task'} onClose={() => setEditor(null)}>
          <TaskForm task={editor.task} projects={projects} onSubmit={handleSave} onCancel={() => setEditor(null)} />
        </Modal>
      )}

      {taskToDelete && (
        <ConfirmDialog
          title="Delete task"
          message={`Delete "${taskToDelete.title}"? This can't be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  )
}

export default TasksPage