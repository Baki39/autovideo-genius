
import React, { useState } from "react";
import { Header } from "@/components/header";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowLeft, 
  Wand2, 
  Music, 
  VideoIcon, 
  Mic, 
  FileText,
  Play,
  Pause,
  RotateCcw,
  Save,
  Upload
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProjectDetails } from "@/components/project-details";
import { VideoPreview } from "@/components/video-preview";
import { AudioOptions } from "@/components/audio-options";

const NewProject = () => {
  const navigate = useNavigate();
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
  });
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleProjectDataChange = (data: Partial<typeof projectData>) => {
    setProjectData(prev => ({ ...prev, ...data }));
  };

  const handleGenerateVideo = async () => {
    setIsGenerating(true);
    // Simulate AI video generation
    setTimeout(() => {
      setIsGenerating(false);
      setVideoUrl("/placeholder.svg"); // In a real app, this would be the actual video URL
      setStep("preview");
    }, 3000);
  };

  const handleSaveProject = () => {
    // Here you would save the project to your backend
    alert("Project saved successfully!");
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
