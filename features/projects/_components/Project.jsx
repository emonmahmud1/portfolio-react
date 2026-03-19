'use client'

import { useState } from 'react'
import GitHubLinkDetails from './GitHubLinkDetails'
import ImageCarousel from './ImageCarousel'
import { Globe, ImageOff } from 'lucide-react'

export default function Project({ data }) {
  const [imgError, setImgError] = useState(false)

  const hasImages = data?.images && data.images.length > 0
  const techStack = data?.techStack || []

  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-400 hover:shadow-2xl transition-all duration-400 transform hover:-translate-y-2 h-full">
      
      {/* Image / Carousel Section */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
        {hasImages && !imgError ? (
          <div className="w-full h-full transform transition-transform duration-500 group-hover:scale-105">
            <ImageCarousel image={data.images} />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
            <ImageOff className="w-10 h-10 opacity-30" />
            <span className="text-xs font-medium opacity-50">No preview</span>
          </div>
        )}

        {/* Live badge */}
        {data?.liveLink && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-500 text-white text-[11px] font-semibold rounded-full shadow-lg">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Live
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-snug line-clamp-1">
          {data?.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
          {data?.description}
        </p>

        {/* Tech Stack Tags */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-full border border-gray-200 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Repo type badges */}
        <div className="flex gap-2">
          {data?.frontend && (
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-full border border-emerald-200">
              Frontend
            </span>
          )}
          {data?.backend && (
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-full border border-blue-200">
              Backend
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <GitHubLinkDetails frontend={data?.frontend} backend={data?.backend} />

          {data?.liveLink && (
            <a
              href={data?.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
            >
              <Globe className="w-3.5 h-3.5" />
              View Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
