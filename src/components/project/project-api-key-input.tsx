
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key } from "lucide-react";

interface ProjectApiKeyInputProps {
  apiKey: string | undefined;
  onApiKeyChange: (apiKey: string) => void;
}

export const ProjectApiKeyInput: React.FC<ProjectApiKeyInputProps> = ({
  apiKey,
  onApiKeyChange
}) => {
  return (
    <div>
      <Label htmlFor="minimaxApiKey" className="mb-2 block flex items-center">
        <Key className="w-4 h-4 mr-2 text-youtube-red" />
        MiniMax API Key
      </Label>
      <Input
        id="minimaxApiKey"
        type="password"
        placeholder="Enter your MiniMax API key"
        value={apiKey || ""}
        onChange={(e) => onApiKeyChange(e.target.value)}
      />
      <p className="text-xs text-muted-foreground mt-1">
        Get your API key from <a href="https://aimlapi.com/app/keys" target="_blank" rel="noopener noreferrer" className="text-youtube-red hover:underline">AIML API</a>
      </p>
    </div>
  );
};
