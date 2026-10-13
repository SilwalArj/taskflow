function StatCard({ label, value, tone = 'default' }) {
  const valueColor = tone === 'danger' ? 'text-red-700' : 'text-slate-900'

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-semibold tracking-tight ${valueColor}`}>{value}</p>
    </div>
  )
}

export default StatCard