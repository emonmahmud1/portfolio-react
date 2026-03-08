'use client'

import { useState, useEffect } from 'react'

export default function SkillsManager() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({ title: '', description: '', icon: '' })
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    const res = await fetch('/api/skills')
    const data = await res.json()
    setSkills(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (editing) {
      await fetch('/api/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editing, ...form }),
      })
    } else {
      await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }

    setForm({ title: '', description: '', icon: '' })
    setEditing(null)
    fetchSkills()
  }

  const handleEdit = (skill) => {
    setForm(skill)
    setEditing(skill._id)
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this skill?')) {
      await fetch('/api/skills', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      fetchSkills()
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-bold">{editing ? 'Edit' : 'Add'} Skill</h2>
        
        <input
          type="text"
          placeholder="Skill Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
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
          type="text"
          placeholder="Icon (emoji or text)"
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
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
                setForm({ title: '', description: '', icon: '' })
              }}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{skill.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{skill.description}</p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(skill)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(skill._id)}
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
