'use client'

import { useState, useEffect, useRef } from 'react'
import Title from '@/components/Title'
import SkillCard from '@/features/skills/_components/SkillCard'
import { skillSets } from '@/data/skillSets'
import { renderIcon } from '@/data/iconMap'

export default function MySkills() {
  const [skills, setSkills] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skills')
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          // Map DB skills → { _id, title, description, icon }
          setSkills(data.map(s => ({
            _id: s._id,
            title: s.title,
            description: s.description,
            icon: renderIcon(s.iconName, s.iconColor),
          })))
        } else {
          // Fallback to hardcoded skillSets
          setSkills(skillSets.map((s, i) => ({ _id: i, title: s.title, description: s.description, icon: s.icon })))
        }
      } catch {
        setSkills(skillSets.map((s, i) => ({ _id: i, title: s.title, description: s.description, icon: s.icon })))
      }
    }
    fetchSkills()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current) }
  }, [])

  // Each card animates from a different direction for visual interest
  const getInitialTransform = (index) => {
    const directions = [
      '-translate-y-10 opacity-0',
      'translate-x-10 opacity-0',
      'translate-y-10 opacity-0',
      '-translate-x-10 opacity-0',
    ]
    return directions[index % 4]
  }

  return (
    <div ref={sectionRef} className="py-8 sm:py-12 md:py-16">
      {/* Header */}
      <div className="mb-10 sm:mb-14 text-center px-4">
        <Title text="Skills" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-4">
          Technical Expertise
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-xl mx-auto">
          Technologies and tools I use to build reliable, scalable, and well-tested software.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 px-4">
        {skills?.map((skill, index) => (
          <div
            key={skill._id}
            className={`transition-all duration-600 ease-out ${
              isVisible
                ? 'translate-x-0 translate-y-0 opacity-100'
                : getInitialTransform(index)
            }`}
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <SkillCard
              logo={skill.icon}
              cardTitle={skill.title}
              CardText={skill.description}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
