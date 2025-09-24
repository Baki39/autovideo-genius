
import React from "react";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface ProjectGenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
  isDisabled: boolean;
}

export const ProjectGenerateButton: React.FC<ProjectGenerateButtonProps> = ({
  onGenerate,
  isGenerating,
  isDisabled
}) => {
  return (
    <Button 
      onClick={onGenerate} 
      disabled={isGenerating || isDisabled}
      className="w-full bg-youtube-red hover:bg-youtube-darkred text-white"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
          Generating Video with HailoAI...
        </>
      ) : (
        <>
          <Wand2 className="w-4 h-4 mr-2" />
          Generate AI Video
        </>
      )}
    </Button>
  );
};
