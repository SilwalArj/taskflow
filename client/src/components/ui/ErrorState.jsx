import Button from './Button'

function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-lg border border-red-200 bg-white px-6 py-12 text-center" role="alert">
      <h2 className="text-sm font-semibold text-slate-900">Couldn't load your data</h2>
      <p className="mt-1 text-sm text-slate-600">{message}</p>
      <div className="mt-4">
        <Button variant="secondary" onClick={onRetry}>Try again</Button>
      </div>
    </div>
  )
}

export default ErrorState