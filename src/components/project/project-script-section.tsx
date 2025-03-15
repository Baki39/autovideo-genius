
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectScriptSectionProps {
  concept: string;
  script: string | undefined;
  style: string;
  onConceptChange: (concept: string) => void;
  onScriptChange: (script: string) => void;
  onScriptGenerate: () => void;
}

export const ProjectScriptSection: React.FC<ProjectScriptSectionProps> = ({
  concept,
  script,
  style,
  onConceptChange,
  onScriptChange,
  onScriptGenerate
}) => {
  const [scriptTab, setScriptTab] = useState<"concept" | "script">("concept");
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const { toast } = useToast();

  const generateScript = async () => {
    if (!concept) {
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
        const generatedScript = generateScriptFromConcept(concept, style);
        onScriptChange(generatedScript);
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
    const middle = `\n## Main Content (0:30 - 2:00)\n- Key point 1 about ${concept.substring(0, 30)}...\n- Key point 2 with detailed explanation\n- Visual demonstration of concepts\n`;
    const end = `\n## Conclusion (2:00 - 3:00)\n- Summary of main points\n- Call to action for viewers\n- Thank viewers for watching\n`;
    
    return intro + middle + end;
  };

  return (
    <Tabs value={scriptTab} onValueChange={(value) => setScriptTab(value as "concept" | "script")}>
      <TabsList className="grid w-full grid-cols-2 mb-2">
        <TabsTrigger value="concept">
          Video Concept
        </TabsTrigger>
        <TabsTrigger value="script" disabled={!script}>
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
              disabled={isGeneratingScript || !concept}
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
            value={concept}
            onChange={(e) => onConceptChange(e.target.value)}
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
            value={script || ""}
            onChange={(e) => onScriptChange(e.target.value)}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};
