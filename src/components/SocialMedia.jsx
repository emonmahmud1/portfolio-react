import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="flex gap-4">
      <a
        href="https://github.com/emonmahmud1"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white hover:border-white transition-all duration-300 hover:scale-110"
        aria-label="GitHub"
      >
        <FaGithub className="text-2xl text-white group-hover:text-gray-900 transition-colors" />
        <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-10 blur transition-opacity"></div>
      </a>

      <a
        href="https://facebook.com/emmoon01"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white hover:border-white transition-all duration-300 hover:scale-110"
        aria-label="Facebook"
      >
        <FaFacebook className="text-2xl text-white group-hover:text-gray-900 transition-colors" />
        <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-10 blur transition-opacity"></div>
      </a>

      <a
        href="https://linkedin.com/in/mdemonmahmud"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white hover:border-white transition-all duration-300 hover:scale-110"
        aria-label="LinkedIn"
      >
        <FaLinkedin className="text-2xl text-white group-hover:text-gray-900 transition-colors" />
        <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-10 blur transition-opacity"></div>
      </a>
    </div>
  );
};

export default SocialMedia;
