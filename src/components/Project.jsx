import React from "react";
import ImageCarousel from '../../src/components/ImageCarousel'
import GitHubLinkDetails from "./GitHubLinkDetails";

const Project = ({ data }) => {
  console.log(data);
  return (
    <>
      {/* Project Card */}
      <div className="bg-white w-full rounded-2xl shadow-md">
        <div className="flex justify-center px-2">
          {
            <ImageCarousel image={data.images} />
          }
        </div>

        <div className="md:px-4 mt-4">
          <h2 className="text-xl font-semibold mb-2">{data?.name}</h2>
          <p className="text-gray-600 text-sm mb-4">
            {data?.description}
          </p>
          <div className="flex gap-4 items-center">
            <div>
              {
                <GitHubLinkDetails frontend={data?.frontend} backend={data?.backend} />
              }
            </div>
            {data?.liveLink &&<a
              href={data?.liveLink}
              target="_blank"
              className="text-green-600 hover:underline text-sm"
            >
              Live Site
            </a>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
