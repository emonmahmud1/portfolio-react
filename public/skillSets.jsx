import { FaFigma, FaGitAlt, FaHtml5, FaLaravel, FaNodeJs, FaReact, FaPython } from "react-icons/fa6";
import { SiExpress, SiFirebase, SiJavascript, SiMongodb, SiNextdotjs, SiPostman, SiRedux, SiTailwindcss, SiSelenium, SiJest, SiCypress, SiNumpy, SiPandas, SiPytest } from 'react-icons/si';
import { RiPhpLine } from "react-icons/ri";
import { TbTestPipe } from "react-icons/tb";

const skillSets = [
  // Development Skills
  {
    title: "React.js",
    icon: <FaReact className="text-blue-500" />,
    description:
      "A powerful JavaScript library for building interactive user interfaces using components.",
  },
  {
    title: "Next.js",
    icon: <SiNextdotjs className="text-gray-300" />,
    description:
      "Full-stack React framework with SSR, routing, and API routes for modern web apps.",
  },
  {
    title: "Node.js",
    icon: <FaNodeJs className="text-green-600" />,
    description:
      "JavaScript runtime for building fast and scalable backend applications.",
  },
  {
    title: "Express.js",
    icon: <SiExpress className="text-gray-300" />,
    description:
      "Fast, minimalist web framework for building backend APIs with Node.js.",
  },
  {
    title: "MongoDB",
    icon: <SiMongodb className="text-green-500" />,
    description:
      "Flexible NoSQL database used to store and query JSON-like documents.",
  },
  {
    title: "Python",
    icon: <FaPython className="text-blue-600" />,
    description:
      "Versatile programming language for automation, testing, and data analysis.",
  },
  {
    title: "Numpy & Pandas",
    icon: <SiPandas className="text-blue-700" />,
    description:
      "Python libraries for data manipulation, analysis, and numerical computing.",
  },
  
  // Testing & QA Skills
  {
    title: "Selenium",
    icon: <SiSelenium className="text-green-600" />,
    description:
      "Automated testing framework for web applications across multiple browsers.",
  },
  {
    title: "Pytest",
    icon: <SiPytest className="text-blue-500" />,
    description:
      "Python testing framework for writing simple and scalable test cases.",
  },
  {
    title: "Jest",
    icon: <SiJest className="text-red-600" />,
    description:
      "JavaScript testing framework with focus on simplicity and performance.",
  },
  {
    title: "Cypress",
    icon: <SiCypress className="text-gray-700" />,
    description:
      "Modern end-to-end testing framework for web applications.",
  },
  {
    title: "Postman",
    icon: <SiPostman className="text-orange-600" />,
    description:
      "API testing tool for debugging, documenting, and managing REST APIs.",
  },
  
  // Other Skills
  {
    title: "PHP",
    icon: <RiPhpLine className="text-indigo-600" />,
    description:
      "Scripting language used to create dynamic and server-side web applications.",
  },
  {
    title: "Laravel",
    icon: <FaLaravel className="text-red-500" />,
    description:
      "Elegant PHP framework for building structured and scalable web apps.",
  },
  {
    title: "JavaScript",
    icon: <SiJavascript className="text-yellow-400" />,
    description:
      "Core web language enabling dynamic, interactive functionality in browsers.",
  },
  {
    title: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-400 " />,
    description:
      "Utility-first CSS framework to build fully responsive and custom UIs efficiently.",
  },
  {
    title: "Git & GitHub",
    icon: <FaGitAlt className="text-orange-500" />,
    description:
      "Version control tools to manage code history and collaborate efficiently.",
  },
  {
    title: "Firebase",
    icon: <SiFirebase className="text-yellow-500" />,
    description:
      "Google's BaaS platform offering auth, real-time database, and hosting.",
  },
  {
    title: "Redux",
    icon: <SiRedux className="text-purple-500" />,
    description:
      "Centralized state management for predictable React application behavior.",
  },
  {
    title: "HTML & CSS",
    icon: <FaHtml5 className="text-orange-600" />,
    description:
      "Fundamentals of web structure and styling for responsive page design.",
  },
  {
    title: "Figma",
    icon: <FaFigma className="text-pink-500" />,
    description:
      "Collaborative design tool for crafting responsive UI and UX prototypes.",
  },
];

export default skillSets;
