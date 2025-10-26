import React from 'react';
import { FaHeart } from 'react-icons/fa';
import SocialMedia from './SocialMedia';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main content */}
        <div className="text-center space-y-8">
          {/* Logo/Name */}
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Emon Mahmud
            </h3>
            <p className="text-gray-300 mt-2">Full-Stack Developer</p>
          </div>
          
          {/* Social Media */}
          <div className="flex justify-center">
            <SocialMedia />
          </div>
          
          {/* Contact info */}
          <div className="space-y-2">
            <p className="text-gray-300">
              Ready to bring your ideas to life?
            </p>
            <a 
              href="mailto:your.email@example.com" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Let's Work Together
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Emon Mahmud. All rights reserved.
            </p>
            {/* <div className="flex items-center text-gray-400 text-sm">
              <span>Made By </span>
              <span> Emon</span>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;