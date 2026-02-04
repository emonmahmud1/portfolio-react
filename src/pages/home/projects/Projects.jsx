import { useEffect, useState, useRef } from "react";
import Title from "../../../components/Title";
import Project from "../../../components/Project";

const Projects = () => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Alternating animation pattern
  const getAnimationClass = (index) => {
    const patterns = [
      'scale-75 -rotate-3',  // Scale + rotate left
      'scale-75 rotate-3',   // Scale + rotate right
      'scale-90',            // Just scale
    ];
    return patterns[index % 3];
  };
  
  return (
    <div ref={sectionRef} className="py-8 sm:py-12 md:py-16 relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl sm:rounded-3xl -z-10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gray-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gray-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="relative z-10 px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <Title text="Projects" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mt-4">
            Featured Work
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data && data.map((project, index) => (
            <div
              key={project.id}
              className={`transition-all duration-700 ease-out ${
                isVisible 
                  ? 'translate-y-0 opacity-100 scale-100 rotate-0' 
                  : `translate-y-12 opacity-0 ${getAnimationClass(index)}`
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <Project data={project} />
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-8 sm:mt-12 transition-all duration-700 ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
        style={{
          transitionDelay: `${data.length * 150}ms`
        }}>
          <a 
            href="https://github.com/emonmahmud1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
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
