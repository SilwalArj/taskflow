import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useData } from '../../context/useData'
import ErrorState from '../ui/ErrorState'

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { loading, error, retry } = useData()

  // Close the mobile drawer with the Escape key.
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto w-full max-w-6xl">
              {loading ? (
                <p className="py-20 text-center text-sm text-slate-500" role="status">Loading...</p>
              ) : error ? (
                <ErrorState message={error} onRetry={retry} />
              ) : (
                <Outlet />
              )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppLayout