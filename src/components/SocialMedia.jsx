import React from "react";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { TbBrandLinkedin } from "react-icons/tb";

const SocialMedia = () => {
  return (
    <div className="flex justify-center lg:justify-start gap-4 mt-8">
      {/* GitHub */}
      <a
        href="https://github.com/emonmahmud1"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        aria-label="GitHub"
      >
        <ImGithub className="text-2xl text-gray-700 group-hover:text-orange-600 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com/emmoon01"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        aria-label="Facebook"
      >
        <FaFacebook className="text-2xl text-gray-700 group-hover:text-[#4286F7] transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </a>

      {/* LinkedIn */}
      <a
        href="https://linkedin.com/in/mdemonmahmud"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        aria-label="LinkedIn"
      >
        <TbBrandLinkedin className="text-2xl text-gray-700 group-hover:text-[#0077B5] transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </a>
    </div>
  );
};

export default SocialMedia;
