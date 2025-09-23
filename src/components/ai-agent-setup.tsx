import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Clock, Calendar, Settings, Zap, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIAgentConfig {
  openaiApiKey: string;
  niche: string;
  videoPrompt: string;
  workDuration: string;
  videosPerDay: string;
  publishTimes: string[];
  scheduleDuration: string;
}

export const AIAgentSetup = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<AIAgentConfig>({
    openaiApiKey: "",
    niche: "",
    videoPrompt: "",
    workDuration: "7",
    videosPerDay: "1",
    publishTimes: ["10:00"],
    scheduleDuration: "7"
  });
  const [isActive, setIsActive] = useState(false);
  const [publishTime1, setPublishTime1] = useState("10:00");
  const [publishTime2, setPublishTime2] = useState("18:00");

  const handleConfigChange = (field: keyof AIAgentConfig, value: string | string[]) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handlePublishTimesUpdate = () => {
    const times = [publishTime1];
    if (config.videosPerDay === "2") {
      times.push(publishTime2);
    }
    handleConfigChange("publishTimes", times);
  };

  const handleActivateAgent = async () => {
    if (!config.openaiApiKey || !config.niche || !config.videoPrompt) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to activate the AI Agent.",
        variant: "destructive",
      });
      return;
    }

    // Store configuration
    localStorage.setItem("ai_agent_config", JSON.stringify(config));
    localStorage.setItem("ai_agent_active", "true");
    
    setIsActive(true);
    toast({
      title: "AI Agent Activated",
      description: `Your AI Agent is now working on ${config.niche} content for the next ${config.scheduleDuration} days.`,
    });
  };

  const handleDeactivateAgent = () => {
    localStorage.removeItem("ai_agent_active");
    setIsActive(false);
    toast({
      title: "AI Agent Deactivated",
      description: "Your AI Agent has been stopped.",
    });
  };

  React.useEffect(() => {
    const savedConfig = localStorage.getItem("ai_agent_config");
    const agentActive = localStorage.getItem("ai_agent_active");
    
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
    if (agentActive === "true") {
      setIsActive(true);
    }
  }, []);

  React.useEffect(() => {
    handlePublishTimesUpdate();
  }, [config.videosPerDay, publishTime1, publishTime2]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              <span className="text-youtube-black dark:text-white">AI </span>
              <span className="text-youtube-red">Agent</span>
            </h2>
            <p className="text-sm text-foreground/70">Automate your YouTube content creation</p>
          </div>
        </div>
        {isActive && (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Active
          </Badge>
        )}
      </div>

      {isActive ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Agent Status</span>
              <Button variant="destructive" onClick={handleDeactivateAgent}>
                Stop Agent
              </Button>
            </CardTitle>
            <CardDescription>Your AI Agent is currently running</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Video className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Niche</p>
                <p className="text-xs text-foreground/70">{config.niche}</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium">Videos/Day</p>
                <p className="text-xs text-foreground/70">{config.videosPerDay}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Clock className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Publish Times</p>
                <p className="text-xs text-foreground/70">{config.publishTimes.join(", ")}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Zap className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                <p className="text-sm font-medium">Duration</p>
                <p className="text-xs text-foreground/70">{config.scheduleDuration} days</p>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-2">Current Video Prompt:</h4>
              <p className="text-sm text-foreground/70 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                {config.videoPrompt}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>AI Configuration</span>
              </CardTitle>
              <CardDescription>
                Set up your AI Agent for autonomous content creation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key *</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  value={config.openaiApiKey}
                  onChange={(e) => handleConfigChange("openaiApiKey", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="niche">Video Niche *</Label>
                <Input
                  id="niche"
                  placeholder="e.g., Insect Robot, Tech Reviews, Cooking"
                  value={config.niche}
                  onChange={(e) => handleConfigChange("niche", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-prompt">Video Concept Prompt *</Label>
                <Textarea
                  id="video-prompt"
                  placeholder="Describe the type of YouTube videos you want for the next 7 days. Example: Create engaging animated videos about insect robots, focusing on their unique abilities and real-world applications..."
                  value={config.videoPrompt}
                  onChange={(e) => handleConfigChange("videoPrompt", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Work Duration on This Niche</Label>
                <Select value={config.workDuration} onValueChange={(value) => handleConfigChange("workDuration", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="14">14 Days</SelectItem>
                    <SelectItem value="30">1 Month</SelectItem>
                    <SelectItem value="60">2 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Scheduling Settings</span>
              </CardTitle>
              <CardDescription>
                Configure when and how often to publish videos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Videos Per Day</Label>
                <Select value={config.videosPerDay} onValueChange={(value) => handleConfigChange("videosPerDay", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Video Daily</SelectItem>
                    <SelectItem value="2">2 Videos Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>First Publish Time</Label>
                <Input
                  type="time"
                  value={publishTime1}
                  onChange={(e) => setPublishTime1(e.target.value)}
                />
              </div>

              {config.videosPerDay === "2" && (
                <div className="space-y-2">
                  <Label>Second Publish Time</Label>
                  <Input
                    type="time"
                    value={publishTime2}
                    onChange={(e) => setPublishTime2(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Schedule Duration</Label>
                <Select value={config.scheduleDuration} onValueChange={(value) => handleConfigChange("scheduleDuration", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="14">14 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                onClick={handleActivateAgent}
              >
                <Brain className="w-4 h-4 mr-2" />
                Activate AI Agent
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};