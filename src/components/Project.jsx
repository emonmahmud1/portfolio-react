import ImageCarousel from '../../src/components/ImageCarousel'
import GitHubLinkDetails from "./GitHubLinkDetails";

const Project = ({ data }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="h-56 overflow-hidden">
        <div className="transform transition-transform duration-500 group-hover:scale-110">
          <ImageCarousel image={data.images} />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
          {data?.name}
        </h3>
        
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {data?.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {data?.frontend && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full group-hover:bg-gray-900 group-hover:text-white transition-colors">
              Frontend
            </span>
          )}
          {data?.backend && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full group-hover:bg-gray-900 group-hover:text-white transition-colors">
              Backend
            </span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <GitHubLinkDetails frontend={data?.frontend} backend={data?.backend} />
          
          {data?.liveLink && (
            <a
              href={data?.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              View Live
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
