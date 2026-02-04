const SkillCard = ({ logo, cardTitle, CardText }) => {
  return (
    <div className="group relative bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-gray-900 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
        {logo}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {cardTitle}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {CardText}
      </p>
    </div>
  );
};

export default SkillCard;
