import { FaFigma, FaGitAlt, FaHtml5, FaLaravel, FaNodeJs, FaReact, FaPython, FaGithub, FaCss3Alt } from 'react-icons/fa6'
import { SiExpress, SiFirebase, SiJavascript, SiMongodb, SiNextdotjs, SiPostman, SiRedux, SiTailwindcss, SiSelenium, SiJest, SiCypress, SiPandas, SiPytest, SiTypescript } from 'react-icons/si'
import { RiPhpLine } from 'react-icons/ri'

export const iconComponents = {
  FaReact,
  SiNextdotjs,
  FaNodeJs,
  SiExpress,
  SiMongodb,
  FaPython,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  FaGitAlt,
  FaGithub,
  SiFirebase,
  SiRedux,
  FaHtml5,
  FaCss3Alt,
  RiPhpLine,
  FaLaravel,
  FaFigma,
  SiSelenium,
  SiJest,
  SiCypress,
  SiPostman,
  SiPandas,
  SiPytest,
}

export function renderIcon(iconName, iconColor, sizeClass = 'text-4xl') {
  const IconComponent = iconComponents[iconName]
  if (!IconComponent) return <span className="text-gray-400 text-4xl">?</span>
  return <IconComponent className={`${iconColor} ${sizeClass}`} />
}
