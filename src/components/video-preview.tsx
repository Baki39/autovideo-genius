
import React, { useState, useRef } from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Save } from "lucide-react";

interface VideoPreviewProps {
  videoUrl: string;
  title: string;
  onSave: () => void;
  onEdit: () => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoUrl,
  title,
  onSave,
  onEdit
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <BlurCard className="p-6">
      <h3 className="text-xl font-semibold mb-4">
        <span className="text-youtube-black dark:text-white">Preview: </span>
        <span className="text-youtube-red">{title}</span>
      </h3>

      <div className="relative rounded-lg overflow-hidden bg-youtube-darkblack mb-6 aspect-video">
        {videoUrl.endsWith('.svg') ? (
          <div className="absolute inset-0 flex items-center justify-center bg-youtube-darkblack">
            <div className="text-center">
              <p className="text-white mb-2">Video Preview</p>
              <p className="text-sm text-gray-400">Your generated video will appear here</p>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={handlePlayPause}
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-youtube-red" />
          ) : (
            <Play className="h-5 w-5 text-youtube-red" />
          )}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleRestart}
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
        >
          <RotateCcw className="h-5 w-5 text-youtube-red" />
        </Button>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={onEdit}
          className="flex-1"
        >
          Edit Project
        </Button>
        
        <Button 
          onClick={onSave} 
          className="flex-1 bg-youtube-red hover:bg-youtube-darkred text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Project
        </Button>
      </div>
    </BlurCard>
  );
};
