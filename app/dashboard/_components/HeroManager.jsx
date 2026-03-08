'use client'

import { useState, useEffect } from 'react'

export default function HeroManager() {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
  })

  useEffect(() => {
    fetchHero()
  }, [])

  const fetchHero = async () => {
    const res = await fetch('/api/hero')
    const data = await res.json()
    if (data.title) setForm(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await fetch('/api/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    alert('Hero section updated!')
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Hero Section</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Full-Stack Developer"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subtitle</label>
          <input
            type="text"
            placeholder="& SQA Engineer"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            placeholder="Building modern web applications..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            rows="4"
            required
          />
        </div>

        <button type="submit" className="px-6 py-2 bg-gray-900 text-white rounded-lg">
          Update Hero Section
        </button>
      </form>
    </div>
  )
}
