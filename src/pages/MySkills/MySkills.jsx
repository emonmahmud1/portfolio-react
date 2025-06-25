import React from "react";
import Title from "../../components/Title";
import skillSets from "../../../public/skillSets";
import SkillCard from "../../components/SkillCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination } from "swiper/modules";

const MySkills = () => {
  return (
    <div className=" bg-black rounded-4xl p-5 md:p-10 text-white">
      <div>
        <Title text="My Skills" />
      </div>
      <div className=" p-4 flex flex-col md:flex-row gap-10 md:justify-between">
        <div className="max-w-md">
          <h1 className="text-3xl md:text-6xl text-wrap font-semibold w-full">
            My Extensive List of Skills
          </h1>
        </div>
        <div className="max-w-md text-end">
          <p className="text-xl">
            Building the worlds best marketing Your trusted partner for
            strategy, design, and dev.
          </p>
          <hr className="mt-8 border-dotted" />
        </div>
      </div>
      <div className="mt-10 md:mt-20 ">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          modules={[Navigation]}
          className=""
        >
          {skillSets?.map((skill, index) => (
            <SwiperSlide key={index} className="!w-fit">
              <SkillCard
                logo={skill.icon}
                cardTitle={skill.title}
                CardText={skill.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MySkills;
