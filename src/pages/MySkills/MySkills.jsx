import React from "react";
import Title from "../../components/Title";
import skillSets from "../../../public/skillSets";
import SkillCard from "../../components/SkillCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const MySkills = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <Title text="My Skills" />
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:justify-between items-center mb-16">
          <div className="max-w-2xl text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight mb-6">
              Technical Expertise & Skills
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Crafting exceptional digital experiences with cutting-edge technologies and modern development practices.
            </p>
          </div>
          
          <div className="flex flex-col items-center lg:items-end space-y-4">
            <div className="flex items-center space-x-2 text-lg">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-400 font-semibold">15+ Technologies</span>
            </div>
            <div className="flex items-center space-x-2 text-lg">
              <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></span>
              <span className="text-blue-400 font-semibold">Full-Stack Development</span>
            </div>
            <div className="flex items-center space-x-2 text-lg">
              <span className="w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-700"></span>
              <span className="text-purple-400 font-semibold">Modern Frameworks</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="pb-12"
          >
            {skillSets?.map((skill, index) => (
              <SwiperSlide key={index}>
                <SkillCard
                  logo={skill.icon}
                  cardTitle={skill.title}
                  CardText={skill.description}
                  index={index}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MySkills;
