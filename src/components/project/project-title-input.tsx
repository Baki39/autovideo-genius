
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProjectTitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
}

export const ProjectTitleInput: React.FC<ProjectTitleInputProps> = ({
  title,
  onTitleChange
}) => {
  return (
    <div>
      <Label htmlFor="title" className="mb-2 block">Project Title</Label>
      <Input
        id="title"
        placeholder="Enter a title for your video"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
    </div>
  );
};
