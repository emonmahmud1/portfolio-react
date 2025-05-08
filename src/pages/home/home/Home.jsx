import React from "react";
import profile from "/public/profilePic.png"
import Projects from "../projects/Projects";

const Home = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-5">
      {/*  banner*/}
    
        <div className="overflow-hidden hero bg-base-100 sm:min-h-screen lg:min-h-2/3 w-full">
          <div className="hero-content flex-col lg:flex-row-reverse lg:justify-between w-full">
            <img
              src={profile}
              className="max-w-sm content-cover w-full"
            />
            <div className=" text-balance lg:max-w-2/5">
              <h1 className="text-xl md:text-4xl font-bold ">Transforming Ideas into Full-Stack Web Solutions</h1>
              <p className="py-3 text-gray-500 text-sm md:text-md">Code. Deploy. Scale. I build full-stack apps that perform.
              </p>
              <button className="btn btn-seondery border-none">Download cv</button>
            </div>
          </div>
        </div>
      

        {/* <Projects /> */}
        <div className="px-2">
        <Projects />
        </div>
     
    </div>
  );
};

export default Home;
