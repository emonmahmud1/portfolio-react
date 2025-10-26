import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-white/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Enhanced Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('home')}
              className={`group flex items-center space-x-2 text-2xl md:text-3xl font-bold transition-all duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              <div className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EMON
                </span>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? isScrolled
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-blue-200 bg-white/10'
                      : isScrolled 
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item}
                  {activeSection === item.toLowerCase() && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-2 bg-white/98 backdrop-blur-xl rounded-2xl mt-2 shadow-2xl border border-white/20">
              {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                    activeSection === item.toLowerCase()
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;