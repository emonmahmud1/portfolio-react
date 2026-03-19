'use client'

import { useState, useEffect } from 'react'
import { Trash2, Edit, Plus, X, Save } from 'lucide-react'
import { availableIcons } from '@/data/icons'
import { renderIcon } from '@/data/iconMap'

const EMPTY_FORM = { title: '', description: '', iconName: '', iconColor: '', isCustomIcon: false }

export default function SkillsManager() {
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [iconSearch, setIconSearch] = useState('')

  useEffect(() => { fetchSkills() }, [])

  const fetchSkills = async () => {
    const res = await fetch('/api/skills')
    const data = await res.json()
    setSkills(Array.isArray(data) ? data : [])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.iconName) {
      alert('Please select an icon')
      return
    }
    setLoading(true)
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
    setForm(EMPTY_FORM)
    setEditing(null)
    setShowForm(false)
    setLoading(false)
    fetchSkills()
  }

  const handleEdit = (skill) => {
    // Check if the icon is in available list
    const isKnown = availableIcons.some(i => i.value === skill.iconName)
    setForm({ 
      title: skill.title, 
      description: skill.description, 
      iconName: skill.iconName, 
      iconColor: skill.iconColor,
      isCustomIcon: !isKnown
    })
    setEditing(skill._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    await fetch('/api/skills', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    fetchSkills()
  }

  const handleCancel = () => {
    setForm(EMPTY_FORM)
    setEditing(null)
    setShowForm(false)
    setIconSearch('')
  }

  const filteredIcons = iconSearch.trim()
    ? availableIcons.filter(i => i.name.toLowerCase().includes(iconSearch.toLowerCase()))
    : availableIcons

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          <p className="text-gray-500 text-sm mt-1">{skills.length} skill{skills.length !== 1 ? 's' : ''} in your portfolio</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">{editing ? 'Edit Skill' : 'New Skill'}</h3>
            <button onClick={handleCancel} className="p-1 text-gray-400 hover:text-gray-900 rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Skill Title</label>
                <input
                  type="text"
                  placeholder="React.js"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex items-center gap-4">
                {/* Live Icon Preview */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1.5">Preview</p>
                  <div className="w-14 h-14 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50 transition-all duration-200">
                    {form.iconName
                      ? <div className="text-2xl">{renderIcon(form.iconName, form.iconColor, 'text-2xl')}</div>
                      : <span className="text-gray-300 text-[10px] text-center leading-tight">No<br/>icon</span>
                    }
                  </div>
                </div>
                {form.iconName && (
                  <div className="mt-5">
                    <p className="text-xs font-semibold text-gray-700">
                      {availableIcons.find(i => i.value === form.iconName)?.name || form.iconName}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{form.iconColor || 'No color'}</p>
                    <button 
                      type="button" 
                      onClick={() => setForm({ ...form, iconName: '', iconColor: '' })} 
                      className="text-xs text-red-400 hover:text-red-600 mt-1 flex items-center gap-0.5"
                    >
                      <X className="w-3 h-3" /> Clear
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                placeholder="A powerful JavaScript library for building interactive UIs..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                rows="2"
                required
              />
            </div>

            {/* Icon Picker */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <label className="block text-sm font-medium text-gray-700">Choose Icon</label>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      className="w-3.5 h-3.5 rounded border-gray-300 text-gray-900 focus:ring-gray-900" 
                      checked={form.isCustomIcon}
                      onChange={(e) => setForm({ 
                        ...form, 
                        isCustomIcon: e.target.checked,
                        iconName: e.target.checked ? '' : form.iconName 
                      })}
                    />
                    <span className="text-xs text-gray-500 font-medium">Use Custom / URL</span>
                  </label>
                </div>
                {!form.isCustomIcon && (
                  <input
                    type="text"
                    placeholder="Search icons..."
                    value={iconSearch}
                    onChange={(e) => setIconSearch(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-gray-900 w-full sm:w-44"
                  />
                )}
              </div>

              {form.isCustomIcon ? (
                <div className="space-y-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-tight mb-1.5">Icon Name or Image URL</p>
                      <input 
                        type="text"
                        placeholder="e.g. FaReact or https://logo.com/react.png"
                        value={form.iconName}
                        onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-tight mb-1.5">Icon Color (Tailwind class)</p>
                      <input 
                        type="text"
                        placeholder="e.g. text-blue-500"
                        value={form.iconColor}
                        onChange={(e) => setForm({ ...form, iconColor: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400">
                    💡 Tip: For React Icons, use names like <code className="bg-gray-200 px-1 rounded">FaReact</code>. Make sure it is exported in <code className="bg-gray-200 px-1 rounded">/data/iconMap.jsx</code>. For images, use a full URL.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-52 overflow-y-auto p-2 border border-gray-200 rounded-lg bg-gray-50">
                  {filteredIcons.map((icon) => (
                    <button
                      key={icon.value}
                      type="button"
                      onClick={() => setForm({ ...form, iconName: icon.value, iconColor: icon.color })}
                      title={icon.name}
                      className={`p-2.5 border-2 rounded-lg hover:border-gray-900 hover:bg-white transition-all flex items-center justify-center ${
                        form.iconName === icon.value
                          ? 'border-gray-900 bg-white shadow-sm scale-105 z-10'
                          : 'border-transparent bg-white opacity-70 hover:opacity-100 shadow-sm'
                      }`}
                    >
                      <span className="text-xl">
                        {renderIcon(icon.value, icon.color, 'text-xl')}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : (editing ? 'Update Skill' : 'Add Skill')}
              </button>
              <button type="button" onClick={handleCancel} className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills Grid */}
      {skills.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No skills yet</p>
          <p className="text-gray-400 text-sm mt-1">Click &quot;Add Skill&quot; to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <div key={skill._id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 shadow-sm transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="text-2xl flex-shrink-0 mt-0.5">
                    {renderIcon(skill.iconName, skill.iconColor, 'text-2xl')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{skill.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{skill.description}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-1.5 border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-900 rounded-lg transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-1.5 border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-300 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
