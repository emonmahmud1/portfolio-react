import React from "react";
import { Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const GitHubLinkDetails = ({ frontend, backend }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="group border-gray-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
        >
          <Github className="w-4 h-4 mr-2 group-hover:animate-pulse" />
          Code
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 p-4 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 text-sm">Repository Links</h4>
          <div className="space-y-2">
            {frontend && (
              <a
                href={frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors duration-200 group"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 group-hover:animate-pulse"></div>
                Frontend Repository
                <svg className="ml-auto w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {backend && (
              <a
                href={backend}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200 group"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 group-hover:animate-pulse"></div>
                Backend Repository
                <svg className="ml-auto w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default GitHubLinkDetails;
