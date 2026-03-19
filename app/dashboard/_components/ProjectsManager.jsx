'use client'

import { useState, useEffect } from 'react'
import { Trash2, Edit, Plus, X, Save, Globe, Github, ImageIcon, GripVertical, Loader2, UploadCloud } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { toast } from 'sonner'

const EMPTY_FORM = { name: '', description: '', liveLink: '', frontend: '', backend: '', images: [], techStack: [] }

export default function ProjectsManager() {
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editing, setEditing] = useState(null)
  const [imageInput, setImageInput] = useState('')
  const [techInput, setTechInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(Array.isArray(data) ? data : [])
  }

  const handleDragEnd = async (result) => {
    if (!result.destination) return
    const items = Array.from(projects)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setProjects(items)

    // Save order to server
    try {
      const res = await fetch('/api/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: items.map(p => p._id) }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Order saved')
      } else {
        toast.error(data.error || 'Failed to save order')
      }
    } catch {
      toast.error('Failed to save order')
    }
  }

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files || files.length === 0) return
    setLoading(true)

    const formData = new FormData()
    files.forEach(f => formData.append('files', f))
    
    const promise = fetch('/api/upload/image', {
      method: 'POST',
      body: formData,
    }).then(async res => {
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Upload failed')
      if (data.files) {
        const newImages = data.files.map(f => f.path)
        setForm(prev => ({ ...prev, images: [...prev.images, ...newImages] }))
      }
      return data.message || 'Images uploaded'
    })

    toast.promise(promise, {
      loading: 'Uploading images...',
      success: (msg) => msg,
      error: (err) => err.message,
    })

    try {
      await promise
    } catch (err) {
      // already handled
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/projects', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing ? { _id: editing, ...form } : form),
      })
      
      const data = await res.json()
      
      if (res.ok && data.success) {
        toast.success(data.message)
        setForm(EMPTY_FORM)
        setEditing(null)
        setShowForm(false)
        fetchProjects()
      } else {
        toast.error(data.error || 'Something went wrong')
      }
    } catch (err) {
      toast.error('Connection error')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (project) => {
    setForm({
      name: project.name || '',
      description: project.description || '',
      liveLink: project.liveLink || '',
      frontend: project.frontend || '',
      backend: project.backend || '',
      images: project.images || [],
      techStack: project.techStack || [],
    })
    setEditing(project._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project permanently?')) return
    
    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(data.message)
        fetchProjects()
      } else {
        toast.error(data.error || 'Delete failed')
      }
    } catch {
      toast.error('Connection error')
    }
  }

  const handleCancel = () => {
    setForm(EMPTY_FORM)
    setEditing(null)
    setShowForm(false)
    setTechInput('')
    setImageInput('')
  }

  const addImage = () => {
    const val = imageInput.trim()
    if (val) {
      setForm({ ...form, images: [...form.images, val] })
      setImageInput('')
      toast.info('Image URL added')
    }
  }

  const removeImage = (index) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) })
    toast.info('Image removed')
  }

  const addTech = () => {
    const val = techInput.trim()
    if (val && !form.techStack.includes(val)) {
      setForm({ ...form, techStack: [...form.techStack, val] })
      setTechInput('')
    }
  }

  const removeTech = (index) => {
    setForm({ ...form, techStack: form.techStack.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-500 text-sm mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''} (Drag cards to sort order)</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">{editing ? 'Edit Project' : 'New Project'}</h3>
            <button onClick={handleCancel} className="p-1 text-gray-400 hover:text-gray-900 rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Name</label>
              <input
                type="text"
                placeholder="My Awesome Project"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                placeholder="Describe what this project does..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                rows="3"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Live URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={form.liveLink}
                  onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Frontend Repo</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={form.frontend}
                  onChange={(e) => setForm({ ...form, frontend: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Backend Repo</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={form.backend}
                  onChange={(e) => setForm({ ...form, backend: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tech Stack</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, MongoDB"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addTech}
                  disabled={!techInput.trim()}
                  className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors disabled:opacity-40"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Press Enter or + to add each tech. These show as tags on your project card.</p>
              {form.techStack.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {form.techStack.map((tech, i) => (
                    <div key={i} className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 bg-gray-900 text-white rounded-full text-xs font-medium">
                      {tech}
                      <button type="button" onClick={() => removeTech(i)} className="text-gray-300 hover:text-white transition-colors rounded p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Project Images</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Upload Section */}
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={loading}
                  />
                  <div className="flex flex-col items-center">
                    {loading ? (
                      <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                    ) : (
                      <UploadCloud className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    )}
                    <p className="mt-2 text-sm font-medium text-gray-700">Click or drag to upload</p>
                    <p className="text-xs text-gray-500 mt-1">Multiple images allowed</p>
                  </div>
                </div>

                {/* Manual URL Input */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Or enter image URL manualy..."
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={addImage}
                      disabled={!imageInput.trim()}
                      className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors disabled:opacity-40"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {form.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 max-h-[140px] overflow-y-auto pr-1">
                      {form.images.map((img, index) => (
                        <div key={index} className="relative aspect-video bg-gray-100 border border-gray-200 rounded-lg overflow-hidden group/img">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1 bg-white/90 shadow-sm text-red-500 rounded opacity-0 group-hover/img:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : (editing ? 'Update Project' : 'Add Project')}
              </button>
              <button type="button" onClick={handleCancel} className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No projects yet</p>
          <p className="text-gray-400 text-sm mt-1">Click &quot;Add Project&quot; to get started</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="projects">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {projects.map((project, index) => (
                  <Draggable key={project._id} draggableId={project._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors shadow-sm"
                      >
                        <div className="flex items-center gap-2 p-5">
                          {/* Drag Handle */}
                          <div {...provided.dragHandleProps} className="p-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors">
                            <GripVertical className="w-5 h-5" />
                          </div>

                          <div className="flex-1 min-w-0 flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{project.name}</h3>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-1 leading-relaxed">{project.description}</p>
                              <div className="flex flex-wrap items-center gap-3 mt-3">
                                {project.liveLink && (
                                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline">
                                    <Globe className="w-3 h-3" /> Live
                                  </a>
                                )}
                                {project.images?.length > 0 && (
                                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                    <ImageIcon className="w-3 h-3" /> {project.images.length} image{project.images.length > 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => handleEdit(project)}
                                className="p-2 border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-900 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(project._id)}
                                className="p-2 border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-300 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  )
}
