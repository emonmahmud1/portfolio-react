import React from "react";
import ImageCarousel from '../../src/components/ImageCarousel'
import GitHubLinkDetails from "./GitHubLinkDetails";

const Project = ({ data }) => {
  return (
    <div className="group relative bg-white/90 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden hover:-translate-y-4 hover:rotate-1 mx-2 sm:mx-0">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-3xl h-48 sm:h-56 md:h-64">
        <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-1000">
          <ImageCarousel image={data.images} />
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Floating badge */}
        <div className="absolute top-4 left-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
            {String(data.id).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-6 sm:p-8 space-y-6">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
          {data?.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
          {data?.description}
        </p>
        
        {/* Tech stack indicators */}
        <div className="flex flex-wrap gap-2 pt-2">
          {data?.frontend && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs font-semibold rounded-full">
              ⚛️ Frontend
            </span>
          )}
          {data?.backend && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs font-semibold rounded-full">
              🔧 Backend
            </span>
          )}
          {data?.liveLink && (
            <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 text-xs font-semibold rounded-full">
              🚀 Live
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-100">
          <GitHubLinkDetails frontend={data?.frontend} backend={data?.backend} />
          
          {data?.liveLink && (
            <a
              href={data?.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <span>View Live</span>
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  );
};

export default Project;
