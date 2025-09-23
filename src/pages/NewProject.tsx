
import React, { useState } from "react";
import { Header } from "@/components/header";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { ProjectDetails } from "@/components/project-details";
import { VideoPreview } from "@/components/video-preview";
import { AudioOptions } from "@/components/audio-options";
import { useToast } from "@/hooks/use-toast";
import { ProjectHeader } from "@/components/project/project-header";
import { ProjectStepsNav } from "@/components/project/project-steps-nav";
import { useVideoGenerator, ProjectData } from "@/hooks/use-video-generator";

const NewProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"details" | "preview" | "audio">("details");
  const { isGenerating, videoUrl, generateVideo } = useVideoGenerator();
  
  const [projectData, setProjectData] = useState<ProjectData>({
    title: "",
    concept: "",
    duration: 60,
    style: "educational",
    voiceId: "Roger",
    backgroundMusic: "upbeat",
    musicVolume: 30,
    script: "",
    heilouApiKey: "",
  });

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleProjectDataChange = (data: Partial<ProjectData>) => {
    setProjectData(prev => ({ ...prev, ...data }));
  };

  const handleGenerateVideo = async () => {
    const url = await generateVideo(projectData);
    if (url) {
      setStep("preview");
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
          <ProjectHeader onBackClick={handleBackToDashboard} />

          <ProjectStepsNav 
            step={step} 
            onStepChange={setStep} 
            videoUrl={videoUrl} 
          />

          <Tabs value={step} className="mb-8">
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
