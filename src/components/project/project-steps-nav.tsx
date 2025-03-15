
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, VideoIcon, Music } from "lucide-react";

interface ProjectStepsNavProps {
  step: "details" | "preview" | "audio";
  onStepChange: (value: "details" | "preview" | "audio") => void;
  videoUrl: string | null;
}

export const ProjectStepsNav: React.FC<ProjectStepsNavProps> = ({
  step,
  onStepChange,
  videoUrl
}) => {
  return (
    <Tabs 
      value={step} 
      onValueChange={(value) => onStepChange(value as "details" | "preview" | "audio")}
      className="mb-8"
    >
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="details">
          <FileText className="w-4 h-4 mr-2" />
          Project Details
        </TabsTrigger>
        <TabsTrigger value="preview" disabled={!videoUrl}>
          <VideoIcon className="w-4 h-4 mr-2" />
          Video Preview
        </TabsTrigger>
        <TabsTrigger value="audio" disabled={!videoUrl}>
          <Music className="w-4 h-4 mr-2" />
          Audio Options
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
