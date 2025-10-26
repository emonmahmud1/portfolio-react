import React, { useEffect, useState } from "react";
import Title from "../../../components/Title";
import Project from "../../../components/Project";

const Projects = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/projectsData.json");
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="py-16 md:py-20 lg:py-24">
      {/* Section Header */}
      <div className="text-center mb-16">
        <Title text="Featured Projects" />
        <div className="max-w-3xl mx-auto mt-6">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Bringing Ideas to <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Life</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Explore my portfolio of full-stack applications, each crafted with modern technologies and best practices.
          </p>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4 sm:px-0">
        {data && data.map((project, index) => (
          <div 
            key={project.id} 
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
          >
            <Project data={project} />
          </div>
        ))}
      </div>
      
      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 font-medium mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
          More projects on GitHub
        </div>
        <div>
          <a 
            href="https://github.com/emonmahmud1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            View All Projects
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
