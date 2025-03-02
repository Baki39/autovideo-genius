
import React from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Clock } from "lucide-react";

interface ProjectDetailsProps {
  projectData: {
    title: string;
    concept: string;
    duration: number;
    style: string;
  };
  onProjectDataChange: (data: Partial<{ 
    title: string;
    concept: string;
    duration: number;
    style: string;
  }>) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  projectData,
  onProjectDataChange,
  onGenerate,
  isGenerating
}) => {
  return (
    <BlurCard className="p-6">
      <div className="space-y-6">
        <div>
          <Label htmlFor="title" className="mb-2 block">Project Title</Label>
          <Input
            id="title"
            placeholder="Enter a title for your video"
            value={projectData.title}
            onChange={(e) => onProjectDataChange({ title: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="concept" className="mb-2 block">Video Concept</Label>
          <Textarea
            id="concept"
            placeholder="Describe your video concept in detail. What is it about? Who is it for? What should it include?"
            className="min-h-32"
            value={projectData.concept}
            onChange={(e) => onProjectDataChange({ concept: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="style" className="mb-2 block">Video Style</Label>
          <Select 
            value={projectData.style}
            onValueChange={(value) => onProjectDataChange({ style: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="educational">Educational</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="tutorial">Tutorial/How-to</SelectItem>
              <SelectItem value="vlog">Vlog Style</SelectItem>
              <SelectItem value="news">News/Report</SelectItem>
              <SelectItem value="promotional">Promotional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="duration">Video Duration</Label>
            <span>{projectData.duration} seconds</span>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="text-youtube-red w-5 h-5" />
            <Slider
              id="duration"
              min={30}
              max={300}
              step={15}
              value={[projectData.duration]}
              onValueChange={(value) => onProjectDataChange({ duration: value[0] })}
              className="flex-1"
            />
          </div>
        </div>

        <Button 
          onClick={onGenerate} 
          disabled={isGenerating || !projectData.concept || !projectData.title}
          className="w-full bg-youtube-red hover:bg-youtube-darkred text-white"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Generating Video...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate AI Video
            </>
          )}
        </Button>
      </div>
    </BlurCard>
  );
};
