import React from "react";

const SkillCard = ({ logo, cardTitle, CardText }) => {
  return (
    <>
      <div className="card bg-[#FFFFFF14] w-[280px] md:w-[320px] my-3 shadow-sm rounded-3xl max-h-[220px]  hover:rotate-7 transition-all duration-300 ">
        <div className="border-red-400 flex text-6xl mt-6 ml-6">{logo}</div>
        <div className="card-body">
          <h2 className="card-title text-3xl">{cardTitle}</h2>
          <p>{CardText}</p>
        </div>
      </div>
    </>
  );
};

export default SkillCard;
