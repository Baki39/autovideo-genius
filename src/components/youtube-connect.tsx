
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Youtube, RefreshCw, CheckCircle2, XCircle } from "lucide-react";

interface YouTubeConnectProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (channelId: string, apiKey: string) => void;
}

export const YouTubeConnect: React.FC<YouTubeConnectProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  const { toast } = useToast();
  const [channelId, setChannelId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [channelDetails, setChannelDetails] = useState<{
    title: string;
    thumbnailUrl: string;
    subscriberCount: string;
    videoCount: string;
  } | null>(null);

  const handleTestConnection = async () => {
    if (!channelId || !apiKey) {
      toast({
        title: "Missing information",
        description: "Please enter both Channel ID and API Key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setConnectionStatus("loading");

    try {
      // Construct the YouTube API URL to fetch channel data
      const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Failed to connect to YouTube API");
      }
      
      if (!data.items || data.items.length === 0) {
        throw new Error("Channel not found. Please check your Channel ID.");
      }
      
      const channel = data.items[0];
      
      setChannelDetails({
        title: channel.snippet.title,
        thumbnailUrl: channel.snippet.thumbnails.default.url,
        subscriberCount: new Intl.NumberFormat().format(parseInt(channel.statistics.subscriberCount)),
        videoCount: new Intl.NumberFormat().format(parseInt(channel.statistics.videoCount)),
      });
      
      setConnectionStatus("success");
      
      toast({
        title: "Connection successful!",
        description: `Connected to "${channel.snippet.title}"`,
        variant: "default",
      });
    } catch (error) {
      console.error("YouTube API connection error:", error);
      setConnectionStatus("error");
      
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Failed to connect to YouTube API",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = () => {
    if (connectionStatus === "success" && channelId && apiKey) {
      onConnect(channelId, apiKey);
      toast({
        title: "YouTube channel connected",
        description: "Your YouTube channel has been successfully connected",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-youtube-red" />
            Connect YouTube Channel
          </DialogTitle>
          <DialogDescription>
            Enter your YouTube Channel ID and API Key to connect your channel to AutoTube.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="channel-id">YouTube Channel ID</Label>
            <Input
              id="channel-id"
              placeholder="e.g. UC1234567890abcdefghijk"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              disabled={isLoading || connectionStatus === "success"}
            />
            <p className="text-xs text-muted-foreground">
              You can find your Channel ID in your YouTube account settings or in the URL of your channel page.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">YouTube API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Your YouTube API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isLoading || connectionStatus === "success"}
            />
            <p className="text-xs text-muted-foreground">
              Create an API Key in the Google Cloud Console by enabling the YouTube Data API v3.
            </p>
          </div>

          {connectionStatus === "success" && channelDetails && (
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900/30 dark:bg-green-900/20">
              <div className="flex items-center gap-3">
                <img
                  src={channelDetails.thumbnailUrl}
                  alt="Channel thumbnail"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-300">
                    {channelDetails.title}
                  </h4>
                  <div className="flex text-xs text-green-700 dark:text-green-400 mt-1 gap-3">
                    <span>{channelDetails.subscriberCount} subscribers</span>
                    <span>{channelDetails.videoCount} videos</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {connectionStatus === "error" && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/30 dark:bg-red-900/20">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
                <XCircle className="h-5 w-5" />
                <p>Connection failed. Please check your Channel ID and API Key and try again.</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {connectionStatus !== "success" ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleTestConnection}
              disabled={isLoading || !channelId || !apiKey}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Testing Connection
                </>
              ) : (
                "Test Connection"
              )}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleConnect}
              className="w-full sm:w-auto bg-youtube-red hover:bg-youtube-darkred text-white"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Connect Channel
            </Button>
          )}
          <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
