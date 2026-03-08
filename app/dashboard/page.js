'use client'

import { useState } from 'react'
import DashboardSidebar from './_components/DashboardSidebar'
import Overview from './_components/Overview'
import ProjectsManager from './_components/ProjectsManager'
import SkillsManager from './_components/SkillsManager'
import HeroManager from './_components/HeroManager'
import CVManager from './_components/CVManager'
import ImagesManager from './_components/ImagesManager'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-10">
          <div className="max-w-5xl mx-auto">
            {activeTab === 'overview' && <Overview setActiveTab={setActiveTab} />}
            {activeTab === 'hero' && <HeroManager />}
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'skills' && <SkillsManager />}
            {activeTab === 'cv' && <CVManager />}
            {activeTab === 'images' && <ImagesManager />}
          </div>
        </div>
      </main>
    </div>
  )
}

