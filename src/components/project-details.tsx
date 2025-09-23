import React from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { ProjectTitleInput } from "@/components/project/project-title-input";
import { ProjectApiKeyInput } from "@/components/project/project-api-key-input";
import { ProjectScriptSection } from "@/components/project/project-script-section";
import { ProjectStyleSelect } from "@/components/project/project-style-select";
import { ProjectDurationSlider } from "@/components/project/project-duration-slider";
import { ProjectGenerateButton } from "@/components/project/project-generate-button";

interface ProjectDetailsProps {
  projectData: {
    title: string;
    concept: string;
    duration: number;
    style: string;
    script?: string;
    heilouApiKey?: string;
  };
  onProjectDataChange: (data: Partial<{ 
    title: string;
    concept: string;
    duration: number;
    style: string;
    script?: string;
    heilouApiKey?: string;
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
        <ProjectTitleInput 
          title={projectData.title} 
          onTitleChange={(title) => onProjectDataChange({ title })} 
        />

        <ProjectApiKeyInput 
          apiKey={projectData.heilouApiKey} 
          onApiKeyChange={(heilouApiKey) => onProjectDataChange({ heilouApiKey })} 
        />

        <ProjectScriptSection 
          concept={projectData.concept}
          script={projectData.script}
          style={projectData.style}
          onConceptChange={(concept) => onProjectDataChange({ concept })}
          onScriptChange={(script) => onProjectDataChange({ script })}
          onScriptGenerate={() => {
            // This is a placeholder. In the actual implementation, we would call
            // the script generation function directly from the parent component.
          }}
        />

        <ProjectStyleSelect 
          style={projectData.style}
          onStyleChange={(style) => onProjectDataChange({ style })}
          hasConcept={!!projectData.concept}
          hasScript={!!projectData.script}
        />

        <ProjectDurationSlider 
          duration={projectData.duration}
          onDurationChange={(duration) => onProjectDataChange({ duration })}
        />

        <ProjectGenerateButton 
          onGenerate={onGenerate}
          isGenerating={isGenerating}
          isDisabled={!projectData.concept || !projectData.title || !projectData.heilouApiKey || !projectData.script}
        />
      </div>
    </BlurCard>
  );
};
