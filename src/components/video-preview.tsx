
import React, { useState, useRef, useEffect } from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsVideoLoaded(false);
    setIsVideoError(false);
    setIsPlaying(false);
  }, [videoUrl]);

  const handlePlayPause = () => {
    if (!videoRef.current || isVideoError) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(error => {
        console.error("Error playing video:", error);
        toast({
          title: "Playback Error",
          description: "Could not play the video. The format may be unsupported.",
          variant: "destructive"
        });
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (!videoRef.current || isVideoError) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(error => {
      console.error("Error playing video:", error);
    });
    setIsPlaying(true);
  };

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    setIsVideoError(false);
  };

  const handleVideoError = () => {
    setIsVideoLoaded(false);
    setIsVideoError(true);
    setIsPlaying(false);
    console.error("Error loading video from URL:", videoUrl);
    toast({
      title: "Video Error",
      description: "There was an error loading the video. The URL may be invalid or the format unsupported.",
      variant: "destructive"
    });
  };

  return (
    <BlurCard className="p-6">
      <h3 className="text-xl font-semibold mb-4">
        <span className="text-youtube-black dark:text-white">Preview: </span>
        <span className="text-youtube-red">{title}</span>
      </h3>

      <div className="relative rounded-lg overflow-hidden bg-youtube-darkblack mb-6 aspect-video">
        {videoUrl.endsWith('.svg') || isVideoError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-youtube-darkblack">
            <div className="text-center">
              <p className="text-white mb-2">Video Preview</p>
              <p className="text-sm text-gray-400">
                {isVideoError 
                  ? "Error loading video. Please try generating again." 
                  : "Your generated video will appear here"}
              </p>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            onEnded={() => setIsPlaying(false)}
            controls={false}
          />
        )}
        
        {!isVideoLoaded && !isVideoError && !videoUrl.endsWith('.svg') && (
          <div className="absolute inset-0 flex items-center justify-center bg-youtube-darkblack bg-opacity-70">
            <div className="animate-spin h-8 w-8 border-4 border-youtube-red border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={handlePlayPause}
          className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
          disabled={isVideoError || videoUrl.endsWith('.svg')}
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
          disabled={isVideoError || videoUrl.endsWith('.svg')}
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
