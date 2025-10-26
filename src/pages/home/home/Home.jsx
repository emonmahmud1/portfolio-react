import React from "react";
import profile from "/profile.jpg";
import Projects from "../projects/Projects";
import MySkills from "../../MySkills/MySkills";
import SocialMedia from "../../../components/SocialMedia";
import Footer from "../../../components/Footer";
import ScrollToTop from "../../../components/ScrollToTop";
import Navigation from "../../../components/Navigation";
import CursorEffect from "../../../components/CursorEffect";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div id="home" className="relative overflow-hidden pt-16">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-20">
            {/* Text Content */}
            <div className="text-center lg:text-left max-w-2xl space-y-6 md:space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Available for new opportunities
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                  Transforming Ideas into 
                  <span className="block text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                    Full-Stack Solutions
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed">
                  I craft modern, scalable web applications that deliver exceptional user experiences and drive business growth.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  View My Work
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300">
                  Download CV
                </button>
              </div>

              <SocialMedia />
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl rotate-6 opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl -rotate-6 opacity-20"></div>
                
                {/* Main image */}
                <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce">
                  ⚡
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold animate-bounce delay-500">
                  🚀
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20 lg:space-y-24">
        <div id="skills">
          <MySkills />
        </div>
        <div id="projects">
          <Projects />
        </div>
      </div>
      
      {/* Footer */}
      <div id="contact">
        <Footer />
      </div>
      
      {/* Scroll to top button */}
      <ScrollToTop />
      
      {/* Cursor effect */}
      <CursorEffect />
    </div>
  );
};

export default Home;
