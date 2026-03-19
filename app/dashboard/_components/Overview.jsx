'use client'

import { useState, useEffect } from 'react'
import { FolderKanban, Wrench, Home, FileText, Image, ExternalLink, ArrowRight, Activity, Database, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

function StatCard({ icon: Icon, label, value, color, onClick }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
  }
  return (
    <div
      onClick={onClick}
      className={`bg-white border rounded-xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200 ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
    >
      <div className={`p-3 rounded-xl border ${colors[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

export default function Overview({ setActiveTab }) {
  const [stats, setStats] = useState({ projects: '—', skills: '—', cv: '—', images: '—' })
  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(null)
  const [force, setForce] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/projects').then(r => r.json()).catch(() => []),
      fetch('/api/skills').then(r => r.json()).catch(() => []),
      fetch('/api/hero').then(r => r.json()).catch(() => ({})),
      fetch('/api/cv').then(r => r.json()).catch(() => []),
      fetch('/api/images').then(r => r.json()).catch(() => []),
    ]).then(([projects, skills, heroData, cvFiles, images]) => {
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        skills: Array.isArray(skills) ? skills.length : 0,
        cv: Array.isArray(cvFiles) ? cvFiles.length : 0,
        images: Array.isArray(images) ? images.length : 0,
      })
      setHero(heroData)
      setLoading(false)
    })
  }, [])

  const handleSeed = async (type) => {
    const actionText = force ? 'DELETE existing data and re-seed' : 'seed'
    if (!confirm(`Are you sure you want to ${actionText} ${type}?`)) return
    
    setSeeding(type)
    const promise = fetch('/api/seed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, force })
    }).then(async res => {
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Seed failed')
      
      // Refresh stats
      const [p, s] = await Promise.all([
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/skills').then(r => r.json())
      ])
      setStats(prev => ({ ...prev, projects: Array.isArray(p) ? p.length : prev.projects, skills: Array.isArray(s) ? s.length : prev.skills }))
      
      const parts = []
      if (data.results.skills) {
        if (data.results.skills.skipped) parts.push(`Skills: skipped`)
        else parts.push(`Skills: ${data.results.skills.inserted} inserted`)
      }
      if (data.results.projects) {
        if (data.results.projects.skipped) parts.push(`Projects: skipped`)
        else parts.push(`Projects: ${data.results.projects.inserted} inserted`)
      }
      return parts.join(' · ') || 'Done!'
    })

    toast.promise(promise, {
      loading: `Seeding ${type}...`,
      success: (msg) => `Success: ${msg}`,
      error: (err) => `Error: ${err.message}`,
    })

    try {
      await promise
    } catch (err) {
      // already handled by toast
    } finally {
      setSeeding(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1 text-sm">Manage your portfolio content from here</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Portfolio
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Home} label="Hero Section" value="Active" color="blue" onClick={() => setActiveTab('hero')} />
        <StatCard icon={FolderKanban} label="Total Projects" value={loading ? '…' : stats.projects} color="green" onClick={() => setActiveTab('projects')} />
        <StatCard icon={Wrench} label="Total Skills" value={loading ? '…' : stats.skills} color="purple" onClick={() => setActiveTab('skills')} />
        <StatCard icon={FileText} label="CV Files" value={loading ? '…' : stats.cv} color="blue" onClick={() => setActiveTab('cv')} />
        <StatCard icon={Image} label="Images" value={loading ? '…' : stats.images} color="green" onClick={() => setActiveTab('images')} />
      </div>

      {/* Hero Preview */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-gray-500" />
            Current Hero Section
          </h3>
          <button
            onClick={() => setActiveTab('hero')}
            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            Edit <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-5 bg-gray-100 rounded w-1/2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
            <div className="h-3 bg-gray-100 rounded w-3/4 mt-3"></div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-lg font-bold text-gray-900">{hero?.title || 'Not set'}</p>
            <p className="text-gray-600">{hero?.subtitle || 'Not set'}</p>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mt-1">{hero?.description || 'No description'}</p>
            {hero?.cvOptions?.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-3">
                {hero.cvOptions.map((cv, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    📄 {cv.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Edit Hero Section', tab: 'hero', desc: 'Update title, description, CV links', icon: Home },
            { label: 'Add New Project', tab: 'projects', desc: 'Add a project to your portfolio', icon: FolderKanban },
            { label: 'Manage Skills', tab: 'skills', desc: 'Add or edit your skill cards', icon: Wrench },
            { label: 'Upload CV / Resume', tab: 'cv', desc: 'Upload PDF files for download', icon: FileText },
            { label: 'Image Library', tab: 'images', desc: 'Upload and manage project images', icon: Image },
          ].map(({ label, tab, desc, icon: Icon }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="text-left p-4 border border-gray-200 rounded-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 group"
            >
              <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-900 mb-2 transition-colors" />
              <p className="font-medium text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Seed Data */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Database className="w-4 h-4 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Seed Default Data to MongoDB</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Import your existing static skills and projects into MongoDB. <br/>
          <span className="text-gray-400 text-xs">Safe mode skips if data already exists. Use <strong>Force Overwrite</strong> to replace everything.</span>
        </p>

        {/* Force Toggle */}
        <label className="flex items-center gap-2 mb-4 cursor-pointer w-fit select-none">
          <div
            onClick={() => setForce(f => !f)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${force ? 'bg-red-500' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${force ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
          <span className={`text-sm font-medium ${force ? 'text-red-600' : 'text-gray-600'}`}>
            {force ? '⚠️ Force Overwrite — will DELETE existing data first!' : 'Safe Mode (skip if data exists)'}
          </span>
        </label>

        {/* Seed Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleSeed('skills')}
            disabled={!!seeding}
            className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            {seeding === 'skills' ? <Loader2 size={14} className="animate-spin" /> : <Wrench size={14} />}
            Seed Skills (21 items)
          </button>
          <button
            onClick={() => handleSeed('projects')}
            disabled={!!seeding}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {seeding === 'projects' ? <Loader2 size={14} className="animate-spin" /> : <FolderKanban size={14} />}
            Seed Projects (5 items)
          </button>
          <button
            onClick={() => handleSeed('both')}
            disabled={!!seeding}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {seeding === 'both' ? <Loader2 size={14} className="animate-spin" /> : <Database size={14} />}
            Seed Both
          </button>
        </div>
      </div>

    </div>
  )
}
