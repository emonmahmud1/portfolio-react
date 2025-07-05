import React from "react";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { TbBrandLinkedin } from "react-icons/tb";

const SocialMedia = () => {
  return (
    <div className="p-4 flex justify-center lg:justify-start gap-6">
      {/* GitHub */}
      <a
        href="https://github.com/emonmahmud1"
        target="_blank"
        rel="noopener noreferrer"
        className="text-3xl transition-transform hover:scale-110"
        aria-label="GitHub"
      >
        <ImGithub className="text-orange-600 " />
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com/emmoon01"
        target="_blank"
        rel="noopener noreferrer"
        className="text-3xl transition-transform hover:scale-110"
        aria-label="Facebook"
      >
        <FaFacebook className="text-[#4286F7]" />
      </a>

      {/* LinkedIn */}
      <a
        href="https://linkedin.com/in/mdemonmahmud"
        target="_blank"
        rel="noopener noreferrer"
        className="text-3xl transition-transform hover:scale-110"
        aria-label="LinkedIn"
      >
        <TbBrandLinkedin className="text-[#0077B5]" />
      </a>
    </div>
  );
};

export default SocialMedia;
