import StatCard from '../components/dashboard/StatCard'
import RecentTasksTable from '../components/dashboard/RecentTasksTable'
import { useData } from '../context/useData'
import { getTaskStats } from '../utils/taskHelpers'

function DashboardPage() {
  const { tasks, projects } = useData()
  const stats = getTaskStats(tasks)
  const projectNames = Object.fromEntries(projects.map((p) => [p.id, p.name]))

  const recentTasks = [...tasks]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 6)
    .map((t) => ({ ...t, projectName: projectNames[t.projectId] ?? 'No project' }))

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">A snapshot of your workspace activity.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Tasks" value={stats.total} />
        <StatCard label="Completed" value={stats.completed} />
        <StatCard label="In Progress" value={stats.inProgress} />
        <StatCard label="Overdue" value={stats.overdue} tone="danger" />
      </div>

      <RecentTasksTable tasks={recentTasks} />
    </div>
  )
}

export default DashboardPage