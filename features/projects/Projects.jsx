'use client'

import { useEffect, useState, useRef } from 'react'
import Title from '@/components/Title'
import Project from './_components/Project'
import { Github } from 'lucide-react'

export default function Projects() {
  const [data, setData] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/projects')
        const json = await res.json()
        if (Array.isArray(json) && json.length > 0) {
          setData(json)
        } else {
          // Fallback to static JSON if DB is empty
          const fallback = await fetch('/projectsData.json')
          const fallbackData = await fallback.json()
          setData(fallbackData)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  return (
    <div ref={sectionRef} className="py-8 sm:py-12 md:py-16 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl -z-10" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-40 -z-10" />

      <div className="relative z-10 px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <Title text="Projects" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-4">
            Featured Work
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            A collection of projects I've built — from full-stack web apps to automation tools.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {data && data.map((project, index) => (
            <div
              key={project._id || project.id}
              className={`transition-all duration-700 ease-out ${
                isVisible
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-14 opacity-0 scale-95'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <Project data={project} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {data.length > 0 && (
          <div
            className={`text-center mt-12 transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${data.length * 120 + 100}ms` }}
          >
            <a
              href="https://github.com/emonmahmud1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-700 hover:scale-105 transition-all duration-300 text-sm sm:text-base shadow-md"
            >
              <Github className="w-4 h-4" />
              View All on GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
