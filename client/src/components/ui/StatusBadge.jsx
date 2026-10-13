const styles = {
  'To Do': 'bg-slate-100 text-slate-700 ring-slate-200',
  'In Progress': 'bg-blue-50 text-blue-700 ring-blue-200',
  Completed: 'bg-green-50 text-green-700 ring-green-200',
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
        styles[status] ?? styles['To Do']
      }`}
    >
      {status}
    </span>
  )
}

export default StatusBadge