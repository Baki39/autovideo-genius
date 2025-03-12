
import React, { useState } from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2, Clock, FileText, RefreshCw, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectDetailsProps {
  projectData: {
    title: string;
    concept: string;
    duration: number;
    style: string;
    script?: string;
    runwayApiKey?: string;
  };
  onProjectDataChange: (data: Partial<{ 
    title: string;
    concept: string;
    duration: number;
    style: string;
    script?: string;
    runwayApiKey?: string;
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
  const [scriptTab, setScriptTab] = useState<"concept" | "script">("concept");
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const { toast } = useToast();

  const generateScript = async () => {
    if (!projectData.concept) {
      toast({
        title: "Video concept required",
        description: "Please enter a video concept first.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingScript(true);
    
    try {
      // Simulate OpenAI API call with a timeout
      // In a real implementation, this would be a fetch call to your API
      setTimeout(() => {
        const generatedScript = generateScriptFromConcept(projectData.concept, projectData.style);
        onProjectDataChange({ script: generatedScript });
        setScriptTab("script");
        toast({
          title: "Script generated",
          description: "Your video script has been created based on your concept.",
        });
        setIsGeneratingScript(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Script generation failed",
        description: "An error occurred while generating your script. Please try again.",
        variant: "destructive"
      });
      setIsGeneratingScript(false);
    }
  };

  // This is a placeholder function that simulates AI script generation
  // In a real implementation, this would be replaced with an API call to OpenAI
  const generateScriptFromConcept = (concept: string, style: string): string => {
    const styleText = style === "educational" ? "educational and informative" :
                      style === "entertainment" ? "entertaining and engaging" :
                      style === "tutorial" ? "step-by-step tutorial" :
                      style === "vlog" ? "personal vlog style" :
                      style === "news" ? "news report format" :
                      "promotional and persuasive";
    
    // Generate a basic script based on the concept and style
    const intro = `# ${concept.split('.')[0]}\n\n## Introduction (0:00 - 0:30)\n- Welcome to this ${styleText} video\n- Brief overview of what viewers will learn\n`;
    const middle = `\n## Main Content (0:30 - ${Math.floor(projectData.duration / 2)}:00)\n- Key point 1 about ${concept.substring(0, 30)}...\n- Key point 2 with detailed explanation\n- Visual demonstration of concepts\n`;
    const end = `\n## Conclusion (${Math.floor(projectData.duration / 2)}:00 - ${projectData.duration}:00)\n- Summary of main points\n- Call to action for viewers\n- Thank viewers for watching\n`;
    
    return intro + middle + end;
  };

  const handleStyleChange = (value: string) => {
    onProjectDataChange({ style: value });
    
    // If we already have a concept, suggest generating a script
    if (projectData.concept && !projectData.script) {
      toast({
        title: "Style updated",
        description: "Click 'Generate Script' to create a script based on your concept and this style.",
      });
    }
  };

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
          <Label htmlFor="runwayApiKey" className="mb-2 block flex items-center">
            <Key className="w-4 h-4 mr-2 text-youtube-red" />
            Runware AI API Key
          </Label>
          <Input
            id="runwayApiKey"
            type="password"
            placeholder="Enter your Runware AI API key"
            value={projectData.runwayApiKey || ""}
            onChange={(e) => onProjectDataChange({ runwayApiKey: e.target.value })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Get your API key from <a href="https://runware.ai" target="_blank" rel="noopener noreferrer" className="text-youtube-red hover:underline">Runware AI</a>
          </p>
        </div>

        <Tabs value={scriptTab} onValueChange={(value) => setScriptTab(value as "concept" | "script")}>
          <TabsList className="grid w-full grid-cols-2 mb-2">
            <TabsTrigger value="concept">
              Video Concept
            </TabsTrigger>
            <TabsTrigger value="script" disabled={!projectData.script}>
              Generated Script
            </TabsTrigger>
          </TabsList>

          <TabsContent value="concept">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="concept">Video Concept</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={generateScript}
                  disabled={isGeneratingScript || !projectData.concept}
                  className="text-xs h-8"
                >
                  {isGeneratingScript ? (
                    <>
                      <div className="animate-spin mr-2 h-3 w-3 border-2 border-current border-t-transparent rounded-full"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="w-3 h-3 mr-1" />
                      Generate Script
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="concept"
                placeholder="Describe your video concept in detail. What is it about? Who is it for? What should it include?"
                className="min-h-32"
                value={projectData.concept}
                onChange={(e) => onProjectDataChange({ concept: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="script">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="script">Generated Script</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={generateScript}
                  disabled={isGeneratingScript}
                  className="text-xs h-8"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Regenerate
                </Button>
              </div>
              <Textarea
                id="script"
                className="min-h-64 font-mono text-sm"
                value={projectData.script || ""}
                onChange={(e) => onProjectDataChange({ script: e.target.value })}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div>
          <Label htmlFor="style" className="mb-2 block">Video Style</Label>
          <Select 
            value={projectData.style}
            onValueChange={handleStyleChange}
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
          disabled={isGenerating || !projectData.concept || !projectData.title || !projectData.runwayApiKey || !projectData.script}
          className="w-full bg-youtube-red hover:bg-youtube-darkred text-white"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Generating Video with Runware AI...
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
