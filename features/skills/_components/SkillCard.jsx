export default function SkillCard({ logo, cardTitle, CardText }) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      
      {/* Subtle gradient hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

      {/* Icon */}
      <div className="relative text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 w-fit">
        {logo}
      </div>

      {/* Title */}
      <h3 className="relative text-base font-bold text-gray-900 mb-1.5 group-hover:text-gray-800 transition-colors leading-snug">
        {cardTitle}
      </h3>

      {/* Description */}
      <p className="relative text-xs text-gray-500 leading-relaxed line-clamp-3">
        {CardText}
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-900 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
    </div>
  )
}
