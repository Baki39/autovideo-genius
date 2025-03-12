
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
import { Youtube, RefreshCw, CheckCircle2, XCircle, ExternalLink } from "lucide-react";

// Define a proper error interface to fix type errors
interface YouTubeApiError {
  message: string;
  code?: number;
  isApiDisabled?: boolean;
  isKeyInvalid?: boolean;
  isChannelNotFound?: boolean;
  activationUrl?: string;
}

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
  const [errorDetails, setErrorDetails] = useState<YouTubeApiError | null>(null);
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
    setErrorDetails(null);

    try {
      // Construct the YouTube API URL to fetch channel data
      const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      // Handle specific error cases
      if (!response.ok) {
        let errorInfo: YouTubeApiError = {
          message: data.error?.message || "Failed to connect to YouTube API",
          code: data.error?.code
        };
        
        // Check specific error codes
        switch (data.error?.code) {
          case 400:
            errorInfo.isKeyInvalid = true;
            errorInfo.message = "The API key is invalid. Please check your API key and try again.";
            break;
          case 403:
            if (data.error.message?.includes("API has not been used") || 
                data.error.message?.includes("API v3 has not been used") || 
                data.error.message?.includes("disabled")) {
              
              errorInfo.isApiDisabled = true;
              
              // Extract activation URL if present
              const urlMatch = data.error.message.match(/https:\/\/console\.developers\.google\.com\/apis\/api\/youtube\.googleapis\.com\/overview\?project=[0-9]+/);
              if (urlMatch) {
                errorInfo.activationUrl = urlMatch[0];
              } else {
                errorInfo.activationUrl = "https://console.cloud.google.com/apis/library/youtube.googleapis.com";
              }
            } else {
              errorInfo.isKeyInvalid = true;
              errorInfo.message = "Access denied. Your API key might be incorrect or restricted.";
            }
            break;
          case 404:
            errorInfo.isChannelNotFound = true;
            errorInfo.message = "Channel not found. Please check your Channel ID.";
            break;
        }
        
        throw errorInfo;
      }
      
      if (!data.items || data.items.length === 0) {
        throw {
          message: "Channel not found. Please check your Channel ID.",
          isChannelNotFound: true
        } as YouTubeApiError;
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
    } catch (error: any) {
      console.error("YouTube API connection error:", error);
      setConnectionStatus("error");
      
      // Handle the error details - ensure it matches our YouTubeApiError type
      setErrorDetails({
        message: error.message || "Failed to connect to YouTube API",
        code: error.code,
        isApiDisabled: error.isApiDisabled,
        isKeyInvalid: error.isKeyInvalid,
        isChannelNotFound: error.isChannelNotFound,
        activationUrl: error.activationUrl
      });
      
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to YouTube API",
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

  const renderErrorMessage = () => {
    if (!errorDetails) return null;

    if (errorDetails.isApiDisabled) {
      return (
        <div className="flex flex-col gap-2 text-red-800 dark:text-red-300">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            <p>YouTube Data API is not enabled for your API key</p>
          </div>
          
          <div className="mt-2 pl-7">
            <p className="mb-2 text-sm">You need to enable the YouTube Data API v3 for your project:</p>
            <ol className="ml-5 list-decimal text-sm space-y-1">
              <li>Go to the Google Cloud Console</li>
              <li>Enable the YouTube Data API v3 for your project</li>
              <li>Wait a few minutes for changes to take effect</li>
              <li>Try connecting again</li>
            </ol>
            {errorDetails.activationUrl && (
              <a 
                href={errorDetails.activationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center text-sm font-medium text-youtube-red hover:underline"
              >
                Open Google Cloud Console
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      );
    }

    if (errorDetails.isKeyInvalid) {
      return (
        <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
          <XCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p>Invalid API Key</p>
            <p className="text-sm mt-1">Please check that your API key is correct and has the proper permissions.</p>
          </div>
        </div>
      );
    }

    if (errorDetails.isChannelNotFound) {
      return (
        <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
          <XCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <p>Channel not found</p>
            <p className="text-sm mt-1">The Channel ID you provided could not be found. Please verify your Channel ID is correct.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
        <XCircle className="h-5 w-5 flex-shrink-0" />
        <p>{errorDetails.message}</p>
      </div>
    );
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
              {renderErrorMessage()}
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
