
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ProjectStyleSelectProps {
  style: string;
  onStyleChange: (style: string) => void;
  hasConcept: boolean;
  hasScript: boolean;
}

export const ProjectStyleSelect: React.FC<ProjectStyleSelectProps> = ({
  style,
  onStyleChange,
  hasConcept,
  hasScript
}) => {
  const { toast } = useToast();

  const handleStyleChange = (value: string) => {
    onStyleChange(value);
    
    // If we already have a concept, suggest generating a script
    if (hasConcept && !hasScript) {
      toast({
        title: "Style updated",
        description: "Click 'Generate Script' to create a script based on your concept and this style.",
      });
    }
  };

  return (
    <div>
      <Label htmlFor="style" className="mb-2 block">Video Style</Label>
      <Select 
        value={style}
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
  );
};
