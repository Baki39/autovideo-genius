
import { useState } from "react";
import { RunwayService } from "@/services/runway-service";
import { useToast } from "@/hooks/use-toast";

export interface ProjectData {
  title: string;
  concept: string;
  duration: number;
  style: string;
  voiceId: string;
  backgroundMusic: string;
  musicVolume: number;
  script: string;
  runwayApiKey: string;
}

export const useVideoGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const generateVideo = async (projectData: ProjectData) => {
    if (!projectData.runwayApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Runway AI API key in the Project Details tab.",
        variant: "destructive"
      });
      return;
    }

    if (!projectData.script) {
      toast({
        title: "Script Required",
        description: "Please generate or enter a script before generating a video.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const prompt = `Create a ${projectData.duration}-second ${projectData.style} video about: ${projectData.concept}`;
      
      // Use the Runway AI service
      const runwayService = new RunwayService(projectData.runwayApiKey);
      const generatedVideoUrl = await runwayService.generateVideo({
        apiKey: projectData.runwayApiKey,
        prompt,
        style: projectData.style,
        script: projectData.script
      });
      
      setVideoUrl(generatedVideoUrl);
      
      toast({
        title: "Video Generated",
        description: "Your AI video has been successfully generated.",
      });
      
      return generatedVideoUrl;
    } catch (error) {
      console.error("Video generation error:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate video. Please check your API key and try again.",
        variant: "destructive"
      });
      
      // For testing purposes, use a placeholder video URL
      setVideoUrl("/placeholder.svg");
      return "/placeholder.svg";
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    videoUrl,
    setVideoUrl,
    generateVideo
  };
};
