
import { useState } from "react";
import { MinimaxService } from "@/services/minimax-service";
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
  minimaxApiKey: string;
}

export const useVideoGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const generateVideo = async (projectData: ProjectData) => {
    console.log("🎬 Starting video generation with data:", projectData);
    if (!projectData.minimaxApiKey) {
      console.log("❌ No MiniMax API key provided");
      toast({
        title: "API Key Required",
        description: "Please enter your MiniMax API key in the Project Details tab.",
        variant: "destructive"
      });
      return;
    }

    if (!projectData.script) {
      console.log("❌ No script provided");
      toast({
        title: "Script Required",
        description: "Please generate or enter a script before generating a video.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    console.log("🚀 Starting video generation process");
    
    try {
      const prompt = `Create a ${projectData.duration}-second ${projectData.style} video about: ${projectData.concept}`;
      console.log("📝 Generated prompt:", prompt);
      
      // Use the MiniMax AI service
      const minimaxService = new MinimaxService(projectData.minimaxApiKey);
      console.log("🔧 MiniMax service initialized");
      const generatedVideoUrl = await minimaxService.generateVideo({
        apiKey: projectData.minimaxApiKey,
        prompt,
        style: projectData.style,
        script: projectData.script
      });
      console.log("✅ Video generation completed, URL:", generatedVideoUrl);
      
      setVideoUrl(generatedVideoUrl);
      
      toast({
        title: "Video Generated",
        description: "Your AI video has been successfully generated.",
      });
      
      return generatedVideoUrl;
    } catch (error) {
      console.error("❌ Video generation error:", error);
      console.log("Error details:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate video. Please check your API key and try again.",
        variant: "destructive"
      });
      
      // For testing purposes, use a placeholder video URL
      setVideoUrl("/placeholder.svg");
      return "/placeholder.svg";
    } finally {
      console.log("🏁 Video generation process finished");
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
