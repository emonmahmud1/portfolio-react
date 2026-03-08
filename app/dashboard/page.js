'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProjectsManager from './_components/ProjectsManager'
import SkillsManager from './_components/SkillsManager'
import HeroManager from './_components/HeroManager'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('projects')
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/dashboard/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Portfolio Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'hero' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'projects' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'skills' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
          >
            Skills
          </button>
        </div>

        {activeTab === 'hero' && <HeroManager />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'skills' && <SkillsManager />}
      </div>
    </div>
  )
}
