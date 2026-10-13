import { useEffect, useState } from 'react'
import { DataContext } from './DataContext'
import { api } from '../api'

function DataProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [loadedTasks, loadedProjects] = await Promise.all([api.getTasks(), api.getProjects()])
        if (cancelled) return
        setTasks(loadedTasks)
        setProjects(loadedProjects)
        setError('')
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  function retry() {
    setLoading(true)
    setError('')
    setReloadKey((k) => k + 1)
  }

  async function addTask(data) {
    const created = await api.createTask(data)
    setTasks((prev) => [created, ...prev])
  }

  async function updateTask(id, changes) {
    const saved = await api.updateTask(id, changes)
    setTasks((prev) => prev.map((t) => (t.id === id ? saved : t)))
  }

  async function deleteTask(id) {
    await api.deleteTask(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  async function addProject(data) {
    const created = await api.createProject(data)
    setProjects((prev) => [created, ...prev])
  }

  async function updateProject(id, changes) {
    const saved = await api.updateProject(id, changes)
    setProjects((prev) => prev.map((p) => (p.id === id ? saved : p)))
  }

  // The server deletes the project's tasks too; we mirror that locally.
  async function deleteProject(id) {
    await api.deleteProject(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setTasks((prev) => prev.filter((t) => t.projectId !== id))
  }

  const value = {
    tasks, projects, loading, error, retry,
    addTask, updateTask, deleteTask,
    addProject, updateProject, deleteProject,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataProvider