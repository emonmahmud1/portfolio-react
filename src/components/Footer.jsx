import { useState, useEffect, useRef } from 'react';
import SocialMedia from './SocialMedia';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-16 sm:mt-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main content with animation */}
        <div className={`text-center space-y-6 sm:space-y-8 transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Name with gradient effect */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Emon Mahmud
            </h3>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-gray-500"></div>
              <p className="text-gray-400 text-xs sm:text-sm">Full-Stack Developer & SQA Engineer</p>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-gray-500"></div>
            </div>
          </div>
          
          {/* Social Media with stagger animation */}
          <div className={`flex justify-center transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <SocialMedia />
          </div>
          
          {/* CTA Section */}
          <div className={`space-y-4 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <p className="text-gray-300 text-base sm:text-lg px-4">
              Let's build something amazing together
            </p>
            <a 
              href="mailto:emonmahmud083@gmail.com" 
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Bottom section with animation */}
        <div className={`mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-700 transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2025 Emon Mahmud. All rights reserved.
            </p>
            <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400 flex-wrap justify-center">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"></div>
    </footer>
  );
};

export default Footer;