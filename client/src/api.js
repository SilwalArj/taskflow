const BASE = import.meta.env.VITE_API_URL ?? '/api'

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('Cannot reach the server. Please check your connection.')
  }

  if (res.status === 204) return null

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const fallback = res.status >= 500 ? 'The server is unavailable. Please try again.' : 'Request failed.'
    throw new Error(data?.message ?? fallback)
  }
  return data
}

const send = (method, path, body) =>
  request(path, { method, body: body === undefined ? undefined : JSON.stringify(body) })

export const api = {
  getTasks: () => request('/tasks'),
  createTask: (data) => send('POST', '/tasks', data),
  updateTask: (id, data) => send('PUT', `/tasks/${id}`, data),
  deleteTask: (id) => send('DELETE', `/tasks/${id}`),

  getProjects: () => request('/projects'),
  createProject: (data) => send('POST', '/projects', data),
  updateProject: (id, data) => send('PUT', `/projects/${id}`, data),
  deleteProject: (id) => send('DELETE', `/projects/${id}`),
}