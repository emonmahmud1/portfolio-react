import React, { useEffect, useState } from "react";
import Title from "../../../components/Title";
import Project from "../../../components/Project";

const Projects = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/projectsData.json");
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-10 w-full">
      <Title text="Projects" />
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">{
        data && data.map((d)=>(<Project key={d.id} data={d}/>))
        }
        
      </div>
    </div>
  );
};

export default Projects;
