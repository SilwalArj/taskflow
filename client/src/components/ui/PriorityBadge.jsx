const styles = {
  Low: 'text-slate-600',
  Medium: 'text-amber-700',
  High: 'text-red-700',
}
const dots = {
  Low: 'bg-slate-400',
  Medium: 'bg-amber-500',
  High: 'bg-red-500',
}

function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${styles[priority]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dots[priority]}`} aria-hidden="true" />
      {priority}
    </span>
  )
}

export default PriorityBadge