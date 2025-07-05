import React from "react";
import profile from "/profile.jpg";
import Projects from "../projects/Projects";
import MySkills from "../../MySkills/MySkills";
import SocialMedia from "../../../components/SocialMedia";

const Home = () => {
  return (
    <div className="w-full max-w-[1444px] mx-auto py-5 poppins">
      {/*  banner*/}

      <div className="overflow-hidden bg-base-100 py-10 md:py-20 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <div className="text-center lg:text-left max-w-xl">
            <h1 className="text-3xl poppins-semibold md:text-5xl lg:text-6xl text-gray-800">
              Transforming Ideas into Full-Stack Web Solutions
            </h1>
            <p className="py-4 text-gray-500 text-xl">
              Code. Deploy. Scale. I build full-stack apps that perform.
            </p>

              <SocialMedia />
          </div>

          {/* Image */}
          <div className="w-full relative h-50 md:h-80">
            <img
              src={profile}
              alt="Profile"
              className=" rounded-bl-full rounded-tl-full w-xl shadow-lg object-cover absolute -right-10 top-0"
            />
          </div>
        </div>
      </div>

      {/* <Projects /> */}
      <div className="px-2">
        <MySkills />
      </div>
      <div className="px-2">
        <Projects />
      </div>
    </div>
  );
};

export default Home;
