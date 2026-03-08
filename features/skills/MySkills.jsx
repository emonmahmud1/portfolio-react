'use client'

import { useState, useEffect, useRef } from 'react'
import Title from '@/components/Title'
import SkillCard from '@/features/skills/_components/SkillCard'
import { skillSets } from '@/data/skillSets'

export default function MySkills() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const getDirection = (index) => {
    const directions = ['top', 'right', 'bottom', 'left']
    return directions[index % 4]
  }

  const getInitialTransform = (direction) => {
    switch(direction) {
      case 'top':
        return '-translate-y-32'
      case 'bottom':
        return 'translate-y-32'
      case 'left':
        return '-translate-x-32'
      case 'right':
        return 'translate-x-32'
      default:
        return ''
    }
  }

  return (
    <div ref={sectionRef} className="py-8 sm:py-12 md:py-16">
      <div className="mb-8 sm:mb-12 md:mb-16 px-4">
        <Title text="Skills" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mt-4">
          Technical Expertise
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4">
        {skillSets?.map((skill, index) => {
          const direction = getDirection(index)
          return (
            <div
              key={index}
              className={`transition-all duration-700 ease-out ${
                isVisible 
                  ? 'translate-x-0 translate-y-0 opacity-100' 
                  : `${getInitialTransform(direction)} opacity-0`
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              <SkillCard
                logo={skill.icon}
                cardTitle={skill.title}
                CardText={skill.description}
                index={index}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
