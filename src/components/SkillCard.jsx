import React from "react";

const SkillCard = ({ logo, cardTitle, CardText, index }) => {
  return (
    <div className="group relative">
      {/* Card */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 h-64 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/25">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
            <div className="text-4xl group-hover:animate-pulse">{logo}</div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
            {cardTitle}
          </h3>
          
          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed flex-1 group-hover:text-gray-200 transition-colors duration-300">
            {CardText}
          </p>
          
          {/* Decorative element */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></div>
        </div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
      </div>
    </div>
  );
};

export default SkillCard;
