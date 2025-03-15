
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { RevealAnimation } from "@/components/ui/reveal-animation";

interface ProjectHeaderProps {
  onBackClick: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onBackClick }) => {
  return (
    <>
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          onClick={onBackClick}
          className="mr-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <RevealAnimation>
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-youtube-black dark:text-white">New </span>
          <span className="text-youtube-red">Project</span>
        </h1>
      </RevealAnimation>
    </>
  );
};
