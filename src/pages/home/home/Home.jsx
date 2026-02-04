import { useState } from "react";
import profile from "/profile.jpg";
import Projects from "../projects/Projects";
import MySkills from "../../MySkills/MySkills";
import SocialMedia from "../../../components/SocialMedia";
import Footer from "../../../components/Footer";
import ScrollToTop from "../../../components/ScrollToTop";
import Navigation from "../../../components/Navigation";

const Home = () => {
  const [showCVMenu, setShowCVMenu] = useState(false);

  const cvOptions = [
    { label: "Developer CV", file: "/cv/Emon_Mahmud.pdf" },
    { label: "SQA Engineer CV", file: "/cv/Emon_Mahmud_sqa.pdf" },
  ];

  const handleCVDownload = (file) => {
    window.open(file, '_blank');
    setShowCVMenu(false);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <div id="home" className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left w-full">
              <div className="space-y-4 sm:space-y-6">
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Full-Stack Developer
                  <span className="block text-gray-700 mt-2">& SQA Engineer</span>
                </h1>
                
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Building modern web applications with clean code and ensuring quality through comprehensive testing. 
                  Skilled in development, automation, and quality assurance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View Projects
                </button>
                
                {/* CV Dropdown Button */}
                <div className="relative w-full sm:w-auto">
                  <button 
                    onClick={() => setShowCVMenu(!showCVMenu)}
                    className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-900 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Download CV
                    <svg 
                      className={`w-4 h-4 transition-transform ${showCVMenu ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showCVMenu && (
                    <div className="absolute top-full mt-2 w-full sm:w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                      {cvOptions.map((cv, index) => (
                        <button
                          key={index}
                          onClick={() => handleCVDownload(cv.file)}
                          className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {cv.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <SocialMedia />
              </div>
            </div>

            {/* Image */}
            <div className="flex-shrink-0 w-full sm:w-auto flex justify-center">
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 py-8 sm:py-16">
        <div id="skills">
          <MySkills />
        </div>
        <div id="projects">
          <Projects />
        </div>
      </div>
      
      <div id="contact">
        <Footer />
      </div>
      
      <ScrollToTop />
    </div>
  );
};

export default Home;
