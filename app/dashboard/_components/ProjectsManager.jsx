'use client'

import { useState, useEffect } from 'react'

export default function ProjectsManager() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ name: '', description: '', liveLink: '', frontend: '', backend: '' })
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (editing) {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editing, ...form }),
      })
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }

    setForm({ name: '', description: '', liveLink: '', frontend: '', backend: '' })
    setEditing(null)
    fetchProjects()
  }

  const handleEdit = (project) => {
    setForm(project)
    setEditing(project._id)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this project?')) {
      await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      fetchProjects()
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold">{editing ? 'Edit' : 'Add'} Project</h2>
        
        <input
          type="text"
          placeholder="Project Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          rows="3"
          required
        />
        
        <input
          type="url"
          placeholder="Live Link"
          value={form.liveLink}
          onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
        
        <input
          type="url"
          placeholder="Frontend Repo"
          value={form.frontend}
          onChange={(e) => setForm({ ...form, frontend: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
        
        <input
          type="url"
          placeholder="Backend Repo"
          value={form.backend}
          onChange={(e) => setForm({ ...form, backend: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />

        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg">
            {editing ? 'Update' : 'Add'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null)
                setForm({ name: '', description: '', liveLink: '', frontend: '', backend: '' })
              }}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{project.name}</h3>
            <p className="text-gray-600 text-sm mt-2">{project.description}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(project)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
