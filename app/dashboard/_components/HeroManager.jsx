'use client'

import { useState, useEffect } from 'react'
import { Plus, X, Save, FileText } from 'lucide-react'
import { toast } from 'sonner'

export default function HeroManager() {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    cvOptions: [],
  })
  const [loading, setLoading] = useState(false)
  const [newCV, setNewCV] = useState({ label: '', file: '' })
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    fetch('/api/hero')
      .then(r => r.json())
      .then(data => {
        if (data && data.title) {
          setForm({
            title: data.title || '',
            subtitle: data.subtitle || '',
            description: data.description || '',
            cvOptions: data.cvOptions || [],
          })
        }
        setFetching(false)
      })
      .catch(() => {
        toast.error('Failed to load hero data')
        setFetching(false)
      })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.error || 'Update failed')
      }
    } catch {
      toast.error('Connection error')
    } finally {
      setLoading(false)
    }
  }

  const addCVOption = () => {
    if (newCV.label.trim() && newCV.file.trim()) {
      setForm({ ...form, cvOptions: [...form.cvOptions, { label: newCV.label.trim(), file: newCV.file.trim() }] })
      setNewCV({ label: '', file: '' })
      toast.info('CV option added to list')
    }
  }

  const removeCVOption = (index) => {
    setForm({ ...form, cvOptions: form.cvOptions.filter((_, i) => i !== index) })
    toast.info('CV option removed')
  }

  if (fetching) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
        <p className="text-gray-500 text-sm mt-1">Edit the main hero text shown on your portfolio homepage</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title & Subtitle */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
          <h3 className="font-semibold text-gray-800">Headline</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
            <input
              type="text"
              placeholder="Full-Stack Developer"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
            <input
              type="text"
              placeholder="& SQA Engineer"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              placeholder="Building modern web applications with clean code..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              rows="4"
              required
            />
          </div>
        </div>

        {/* CV Options */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold text-gray-800">CV Download Links</h3>
            <span className="ml-auto text-xs text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
              Auto-synced from CV Files tab
            </span>
          </div>

          {/* Existing CV Options */}
          {form.cvOptions.length > 0 && (
            <div className="space-y-2 mb-4">
              {form.cvOptions.map((cv, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{cv.label}</p>
                    <p className="text-xs text-gray-500 truncate">{cv.file}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCVOption(index)}
                    className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add New CV */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Add CV Link</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Label (e.g. Developer CV)"
                value={newCV.label}
                onChange={(e) => setNewCV({ ...newCV, label: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="File path (e.g. /cv/file.pdf)"
                value={newCV.file}
                onChange={(e) => setNewCV({ ...newCV, file: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addCVOption}
                disabled={!newCV.label.trim() || !newCV.file.trim()}
                className="px-3 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-400">Place PDF files in the <code className="bg-gray-100 px-1 py-0.5 rounded">/public/cv/</code> folder and enter the path above</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Hero Section'}
        </button>
      </form>
    </div>
  )
}

