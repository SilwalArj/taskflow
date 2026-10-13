import { parseLocalDate } from './formatDate'

export function isOverdue(task) {
  if (task.status === 'Completed') return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return parseLocalDate(task.dueDate) < today
}

export function getTaskStats(tasks) {
  return {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    overdue: tasks.filter(isOverdue).length,
  }
}