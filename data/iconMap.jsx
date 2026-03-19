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

export function renderIcon(iconName, iconColor = 'text-gray-600', sizeClass = 'text-4xl') {
  if (!iconName) return <span className="text-gray-300 text-4xl italic">?</span>
  
  // 1. Check if it is a URL or a public static path
  const isImage = iconName.match(/\.(png|jpg|jpeg|svg|webp|gif)$/i) || 
                  iconName.includes('/') || 
                  iconName.startsWith('http') ||
                  iconName.startsWith('blob:')
  
  if (isImage) {
    const size = sizeClass.includes('2xl') ? 'w-8 h-8' : 
                 sizeClass.includes('3xl') ? 'w-10 h-10' : 
                 sizeClass.includes('4xl') ? 'w-12 h-12' : 'w-8 h-8'
    return (
      <div className={`${size} flex items-center justify-center overflow-hidden rounded-md`}>
        <img 
          src={iconName} 
          alt="icon" 
          className="w-full h-full object-contain" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://cdn-icons-png.flaticon.com/512/1243/1243560.png"; // Fallback placeholder
          }}
        />
      </div>
    )
  }

  // 2. Check if it's a known React Icon
  const IconComponent = iconComponents[iconName]
  if (IconComponent) {
    return <IconComponent className={`${iconColor} ${sizeClass} transition-colors duration-300`} />
  }

  // 3. Fallback: Try to render the string itself if it's short, or a placeholder
  return (
    <div className={`${sizeClass} font-bold text-gray-400 opacity-50 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg w-12 h-12`}>
      {iconName.slice(0, 2).toUpperCase()}
    </div>
  )
}
