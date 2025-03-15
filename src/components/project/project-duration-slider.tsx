
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Clock } from "lucide-react";

interface ProjectDurationSliderProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

export const ProjectDurationSlider: React.FC<ProjectDurationSliderProps> = ({
  duration,
  onDurationChange
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Label htmlFor="duration">Video Duration</Label>
        <span>{duration} seconds</span>
      </div>
      <div className="flex items-center gap-4">
        <Clock className="text-youtube-red w-5 h-5" />
        <Slider
          id="duration"
          min={30}
          max={300}
          step={15}
          value={[duration]}
          onValueChange={(value) => onDurationChange(value[0])}
          className="flex-1"
        />
      </div>
    </div>
  );
};
