
import React, { useState } from "react";
import { Header } from "@/components/header";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Wand2, 
  Music, 
  VideoIcon, 
  Mic, 
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProjectDetails } from "@/components/project-details";
import { VideoPreview } from "@/components/video-preview";
import { AudioOptions } from "@/components/audio-options";
import { useToast } from "@/hooks/use-toast";

// RunwareService for AI video generation
class RunwareService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async generateVideo(prompt: string): Promise<string> {
    try {
      // For now, this is a placeholder. In a real implementation, 
      // this would call the Runware API
      console.log("Generating video with Runware AI using prompt:", prompt);
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, this would return the video URL from Runware
      return "/placeholder.svg";
    } catch (error) {
      console.error("Error generating video with Runware AI:", error);
      throw error;
    }
  }
}

const NewProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"details" | "preview" | "audio">("details");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "",
    concept: "",
    duration: 60,
    style: "educational",
    voiceId: "Roger",
    backgroundMusic: "upbeat",
    musicVolume: 30,
    script: "",
    runwayApiKey: "",  // Added for Runware API key
  });
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleProjectDataChange = (data: Partial<typeof projectData>) => {
    setProjectData(prev => ({ ...prev, ...data }));
  };

  const handleGenerateVideo = async () => {
    if (!projectData.runwayApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Runware AI API key in the Project Details tab.",
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
      // Initialize the Runware service with the API key
      const runwareService = new RunwareService(projectData.runwayApiKey);
      
      // Generate the video using the script as the prompt
      const generatedVideoUrl = await runwareService.generateVideo(
        `Create a ${projectData.duration}-second ${projectData.style} video about: ${projectData.concept}. 
         Script: ${projectData.script.substring(0, 500)}...`
      );
      
      setVideoUrl(generatedVideoUrl);
      setStep("preview");
      
      toast({
        title: "Video Generated",
        description: "Your AI video has been successfully generated.",
      });
    } catch (error) {
      console.error("Video generation error:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate video. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveProject = () => {
    // Here you would save the project to your backend
    toast({
      title: "Project Saved",
      description: "Your project has been saved successfully!",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-youtube-darkblack dark:to-youtube-black">
      <Header />
      <main className="flex-grow pt-24">
        <div className="section-container max-w-5xl mx-auto">
          <div className="mb-6 flex items-center">
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard}
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

          <Tabs 
            value={step} 
            onValueChange={(value) => setStep(value as typeof step)}
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

            <TabsContent value="details">
              <ProjectDetails 
                projectData={projectData}
                onProjectDataChange={handleProjectDataChange}
                onGenerate={handleGenerateVideo}
                isGenerating={isGenerating}
              />
            </TabsContent>

            <TabsContent value="preview">
              <VideoPreview 
                videoUrl={videoUrl || ""} 
                title={projectData.title}
                onSave={handleSaveProject}
                onEdit={() => setStep("details")}
              />
            </TabsContent>

            <TabsContent value="audio">
              <AudioOptions 
                projectData={projectData}
                onProjectDataChange={handleProjectDataChange}
                onSave={handleSaveProject}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default NewProject;
