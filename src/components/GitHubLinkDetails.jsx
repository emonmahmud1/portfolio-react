import React from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const GitHubLinkDetails = ({ frontend, backend }) => {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">GitHub</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-60">
          <div className="flex justify-between space-x-4">
            {frontend && (
              <a
                href={frontend}
                target="_blank"
                className="text-green-600 hover:underline text-sm"
              >
                Front-End
              </a>
            )}
            {backend && (
              <a
                href={backend}
                target="_blank"
                className="text-blue-600 hover:underline text-sm"
              >
                Back-End
              </a>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default GitHubLinkDetails;
