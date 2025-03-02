
import React from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Mic, Save } from "lucide-react";

interface AudioOptionsProps {
  projectData: {
    voiceId: string;
    backgroundMusic: string;
    musicVolume: number;
  };
  onProjectDataChange: (data: Partial<{
    voiceId: string;
    backgroundMusic: string;
    musicVolume: number;
  }>) => void;
  onSave: () => void;
}

export const AudioOptions: React.FC<AudioOptionsProps> = ({
  projectData,
  onProjectDataChange,
  onSave
}) => {
  return (
    <BlurCard className="p-6">
      <div className="space-y-6">
        <div>
          <Label htmlFor="voice" className="mb-2 block">
            <Mic className="w-4 h-4 inline mr-2 text-youtube-red" />
            Voiceover
          </Label>
          <Select 
            value={projectData.voiceId}
            onValueChange={(value) => onProjectDataChange({ voiceId: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Roger">Roger (Male, Professional)</SelectItem>
              <SelectItem value="Sarah">Sarah (Female, Friendly)</SelectItem>
              <SelectItem value="Charlie">Charlie (Male, Casual)</SelectItem>
              <SelectItem value="Laura">Laura (Female, Enthusiastic)</SelectItem>
              <SelectItem value="George">George (Male, Authoritative)</SelectItem>
            </SelectContent>
          </Select>
          <div className="mt-2">
            <Button variant="outline" className="w-full">
              Preview Voice
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="music" className="mb-2 block">
            <Music className="w-4 h-4 inline mr-2 text-youtube-red" />
            Background Music
          </Label>
          <Select 
            value={projectData.backgroundMusic}
            onValueChange={(value) => onProjectDataChange({ backgroundMusic: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select background music" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="upbeat">Upbeat</SelectItem>
              <SelectItem value="cinematic">Cinematic</SelectItem>
              <SelectItem value="ambient">Ambient</SelectItem>
              <SelectItem value="corporate">Corporate</SelectItem>
              <SelectItem value="inspirational">Inspirational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {projectData.backgroundMusic !== 'none' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="musicVolume">Music Volume</Label>
              <span>{projectData.musicVolume}%</span>
            </div>
            <Slider
              id="musicVolume"
              min={0}
              max={100}
              step={5}
              value={[projectData.musicVolume]}
              onValueChange={(value) => onProjectDataChange({ musicVolume: value[0] })}
            />
            <div className="mt-2">
              <Button variant="outline" className="w-full">
                Preview Music
              </Button>
            </div>
          </div>
        )}

        <Button 
          onClick={onSave} 
          className="w-full bg-youtube-red hover:bg-youtube-darkred text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Audio Settings
        </Button>
      </div>
    </BlurCard>
  );
};
