import { formatDate } from '../../utils/formatDate'
import { isOverdue } from '../../utils/taskHelpers'

function DueDate({ task }) {
  const overdue = isOverdue(task)
  return (
    <span className={overdue ? 'font-medium text-red-700' : 'text-slate-600'}>
      {formatDate(task.dueDate)}
      {overdue && <span className="ml-1.5 text-xs">(Overdue)</span>}
    </span>
  )
}

export default DueDate