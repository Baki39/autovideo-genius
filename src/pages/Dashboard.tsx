import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { YouTubeConnect } from "@/components/youtube-connect";
import { useToast } from "@/hooks/use-toast";
import { 
  Youtube, 
  Layers, 
  Sparkles, 
  Zap, 
  BarChart3, 
  Calendar, 
  Clapperboard, 
  Settings,
  PlusCircle,
  Clock,
  TrendingUp,
  Brain,
  FileText,
  VideoIcon,
  UploadIcon,
  PenSquare,
  Bell,
  MessageSquare,
  ThumbsUp,
  Eye,
  CheckCircle2
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const activityItems = [
  {
    id: 1,
    type: 'welcome',
    title: 'Welcome to AutoTube!',
    description: 'Get started by connecting your YouTube channel',
    icon: <Youtube className="w-4 h-4 text-youtube-red" />,
    timestamp: new Date(),
    read: false
  },
  {
    id: 2,
    type: 'tip',
    title: 'Pro Tip: Research Trends',
    description: 'Use the Content Studio to research trending topics in your niche',
    icon: <Sparkles className="w-4 h-4 text-blue-500" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false
  },
  {
    id: 3,
    type: 'notification',
    title: 'New Features Available',
    description: 'Check out our new AI-powered script generator in Content Studio',
    icon: <Bell className="w-4 h-4 text-purple-500" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: true
  },
  {
    id: 4,
    type: 'progress',
    title: 'Project "Getting Started" Created',
    description: 'Your new project is ready for content creation',
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true
  },
  {
    id: 5,
    type: 'engagement',
    title: 'Engagement Alert',
    description: 'Your latest video received 10 new comments',
    icon: <MessageSquare className="w-4 h-4 text-amber-500" />,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activities, setActivities] = useState(activityItems);
  const [activeTab, setActiveTab] = useState("all");
  const [isYouTubeConnectOpen, setIsYouTubeConnectOpen] = useState(false);
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [channelStats, setChannelStats] = useState({
    subscribers: 0,
    views: 0,
    videos: 0,
    channelName: ""
  });

  const handleStartNewProject = () => {
    navigate("/new-project");
  };

  const handleGoToContentStudio = () => {
    navigate("/content-studio");
  };

  const handleMarkAsRead = (id: number) => {
    setActivities(activities.map(item => 
      item.id === id ? { ...item, read: true } : item
    ));
  };

  const handleMarkAllAsRead = () => {
    setActivities(activities.map(item => ({ ...item, read: true })));
  };

  const handleYouTubeConnect = (channelId: string, apiKey: string) => {
    localStorage.setItem("youtube_channel_id", channelId);
    localStorage.setItem("youtube_api_key", apiKey);
    
    setYoutubeConnected(true);
    setIsYouTubeConnectOpen(false);
    
    const newActivity = {
      id: Date.now(),
      type: 'progress',
      title: 'YouTube Channel Connected',
      description: `Successfully connected to YouTube channel`,
      icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
      timestamp: new Date(),
      read: false
    };
    
    setActivities([newActivity, ...activities]);
    
    fetchChannelStats(channelId, apiKey);
  };
  
  const fetchChannelStats = async (channelId: string, apiKey: string) => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const channel = data.items[0];
        setChannelStats({
          subscribers: parseInt(channel.statistics.subscriberCount) || 0,
          views: parseInt(channel.statistics.viewCount) || 0,
          videos: parseInt(channel.statistics.videoCount) || 0,
          channelName: channel.snippet.title || ""
        });
      }
    } catch (error) {
      console.error("Error fetching channel stats:", error);
    }
  };
  
  useEffect(() => {
    const channelId = localStorage.getItem("youtube_channel_id");
    const apiKey = localStorage.getItem("youtube_api_key");
    
    if (channelId && apiKey) {
      setYoutubeConnected(true);
      fetchChannelStats(channelId, apiKey);
    }
  }, []);

  const filteredActivities = () => {
    if (activeTab === "all") return activities;
    if (activeTab === "unread") return activities.filter(item => !item.read);
    if (activeTab === "notifications") return activities.filter(item => item.type === 'notification' || item.type === 'engagement');
    if (activeTab === "system") return activities.filter(item => item.type === 'welcome' || item.type === 'tip' || item.type === 'progress');
    return activities;
  };

  const getActivityIcon = (activity: typeof activities[0]) => {
    return (
      <div className={`p-2 rounded-full ${getIconBgColor(activity.type)}`}>
        {activity.icon}
      </div>
    );
  };

  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'welcome': return 'bg-youtube-red/10';
      case 'tip': return 'bg-blue-100 dark:bg-blue-900/40';
      case 'notification': return 'bg-purple-100 dark:bg-purple-900/40';
      case 'progress': return 'bg-green-100 dark:bg-green-900/40';
      case 'engagement': return 'bg-amber-100 dark:bg-amber-900/40';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-youtube-darkblack dark:to-youtube-black">
      <Header />
      <main className="flex-grow pt-24">
        <div className="section-container">
          <div className="mb-8">
            <RevealAnimation>
              <h1 className="text-3xl font-bold mb-2">
                <span className="text-youtube-black dark:text-white">Welcome to </span> 
                <span className="text-youtube-black dark:text-white">Auto</span><span className="text-youtube-red">Tube</span>
                <span className="text-youtube-black dark:text-white"> Dashboard</span>
              </h1>
              <p className="text-foreground/80">
                Manage and automate your YouTube content creation process
              </p>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <RevealAnimation delay={100}>
              <BlurCard className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">
                      <span className="text-youtube-black dark:text-white">Channel </span>
                      <span className="text-youtube-red">Stats</span>
                    </h3>
                    <BarChart3 className="w-5 h-5 text-youtube-red" />
                  </div>
                  <div className="space-y-4 flex-grow">
                    {youtubeConnected ? (
                      <>
                        {channelStats.channelName && (
                          <div className="mb-4">
                            <p className="text-sm text-foreground/60">Channel</p>
                            <p className="text-md font-semibold">{channelStats.channelName}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-foreground/60">Subscribers</p>
                          <p className="text-2xl font-bold">{channelStats.subscribers.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60">Total Views</p>
                          <p className="text-2xl font-bold">{channelStats.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60">Videos</p>
                          <p className="text-2xl font-bold">{channelStats.videos.toLocaleString()}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-sm text-foreground/60">Subscribers</p>
                          <p className="text-2xl font-bold">0</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60">Total Views</p>
                          <p className="text-2xl font-bold">0</p>
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60">Videos</p>
                          <p className="text-2xl font-bold">0</p>
                        </div>
                        <div className="mt-4">
                          <Button 
                            className="w-full bg-youtube-red hover:bg-youtube-darkred text-white"
                            onClick={() => setIsYouTubeConnectOpen(true)}
                          >
                            <Youtube className="w-4 h-4 mr-2" />
                            Connect Channel
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </BlurCard>
            </RevealAnimation>

            <RevealAnimation delay={200}>
              <BlurCard className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">
                      <span className="text-youtube-black dark:text-white">Upcoming </span>
                      <span className="text-youtube-red">Videos</span>
                    </h3>
                    <Calendar className="w-5 h-5 text-youtube-red" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-foreground/70 mb-4">No upcoming videos scheduled</p>
                    <Button className="w-full bg-youtube-red hover:bg-youtube-darkred text-white">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Schedule Video
                    </Button>
                  </div>
                </div>
              </BlurCard>
            </RevealAnimation>

            <RevealAnimation delay={300}>
              <BlurCard className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">
                      <span className="text-youtube-black dark:text-white">Recent </span>
                      <span className="text-youtube-red">Performance</span>
                    </h3>
                    <TrendingUp className="w-5 h-5 text-youtube-red" />
                  </div>
                  <div className="flex-grow">
                    <div className="h-32 flex items-center justify-center">
                      <p className="text-sm text-foreground/70">No data available yet</p>
                    </div>
                  </div>
                </div>
              </BlurCard>
            </RevealAnimation>

            <RevealAnimation delay={400}>
              <BlurCard className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">
                      <span className="text-youtube-black dark:text-white">Quick </span>
                      <span className="text-youtube-red">Actions</span>
                    </h3>
                    <Zap className="w-5 h-5 text-youtube-red" />
                  </div>
                  <div className="space-y-3 flex-grow">
                    <Button variant="outline" className="w-full justify-start">
                      <Sparkles className="w-4 h-4 mr-2 text-youtube-red" />
                      Create New Video
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2 text-youtube-red" />
                      Channel Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2 text-youtube-red" />
                      Schedule Content
                    </Button>
                  </div>
                </div>
              </BlurCard>
            </RevealAnimation>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RevealAnimation delay={500} className="lg:col-span-2">
              <BlurCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">
                    <span className="text-youtube-black dark:text-white">Content </span>
                    <span className="text-youtube-red">Studio</span>
                  </h3>
                  <Clapperboard className="w-5 h-5 text-youtube-red" />
                </div>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <BlurCard 
                      className="p-4 cursor-pointer hover:scale-[1.02] transition-all"
                      onClick={handleGoToContentStudio}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-lg">
                          <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            <span className="text-youtube-black dark:text-white">Research & </span>
                            <span className="text-youtube-red">Planning</span>
                          </h4>
                          <p className="text-sm text-foreground/70">Analyze trends and topics</p>
                        </div>
                      </div>
                    </BlurCard>

                    <BlurCard 
                      className="p-4 cursor-pointer hover:scale-[1.02] transition-all"
                      onClick={handleGoToContentStudio}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-lg">
                          <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            <span className="text-youtube-black dark:text-white">Script </span>
                            <span className="text-youtube-red">Creation</span>
                          </h4>
                          <p className="text-sm text-foreground/70">Generate compelling scripts</p>
                        </div>
                      </div>
                    </BlurCard>

                    <BlurCard 
                      className="p-4 cursor-pointer hover:scale-[1.02] transition-all"
                      onClick={handleGoToContentStudio}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-lg">
                          <VideoIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            <span className="text-youtube-black dark:text-white">Production & </span>
                            <span className="text-youtube-red">Editing</span>
                          </h4>
                          <p className="text-sm text-foreground/70">Assemble and edit videos</p>
                        </div>
                      </div>
                    </BlurCard>

                    <BlurCard 
                      className="p-4 cursor-pointer hover:scale-[1.02] transition-all"
                      onClick={handleGoToContentStudio}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-rose-100 dark:bg-rose-900/40 p-3 rounded-lg">
                          <UploadIcon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            <span className="text-youtube-black dark:text-white">Publishing & </span>
                            <span className="text-youtube-red">Scheduling</span>
                          </h4>
                          <p className="text-sm text-foreground/70">Optimize upload timing</p>
                        </div>
                      </div>
                    </BlurCard>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button 
                      className="flex-1 bg-youtube-red hover:bg-youtube-darkred text-white"
                      onClick={handleStartNewProject}
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Start New Project
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1 gap-2"
                      onClick={handleGoToContentStudio}
                    >
                      <PenSquare className="w-4 h-4" />
                      Content Studio
                    </Button>
                  </div>
                </div>
              </BlurCard>
            </RevealAnimation>

            <RevealAnimation delay={600}>
              <BlurCard className="p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">
                    <span className="text-youtube-black dark:text-white">Activity </span>
                    <span className="text-youtube-red">Feed</span>
                  </h3>
                  <Layers className="w-5 h-5 text-youtube-red" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="unread">Unread</TabsTrigger>
                        <TabsTrigger value="notifications">Alerts</TabsTrigger>
                        <TabsTrigger value="system">System</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      className="text-xs px-2 py-1 h-auto"
                      onClick={handleMarkAllAsRead}
                    >
                      Mark all as read
                    </Button>
                  </div>
                  
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {filteredActivities().length > 0 ? (
                      filteredActivities().map((activity) => (
                        <div 
                          key={activity.id}
                          className={`flex items-start space-x-3 p-3 rounded-lg transition-all ${
                            activity.read ? 'bg-gray-50 dark:bg-youtube-black/30' : 'bg-gray-100 dark:bg-youtube-black/60 border-l-2 border-youtube-red'
                          }`}
                        >
                          {getActivityIcon(activity)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium truncate">{activity.title}</p>
                              <span className="text-xs text-foreground/50 whitespace-nowrap ml-2">
                                {formatTimestamp(activity.timestamp)}
                              </span>
                            </div>
                            <p className="text-xs text-foreground/70 mt-1">
                              {activity.description}
                            </p>
                          </div>
                          {!activity.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleMarkAsRead(activity.id)}
                            >
                              <Eye className="h-3 w-3" />
                              <span className="sr-only">Mark as read</span>
                            </Button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-foreground/50">
                        <p>No activities for this filter</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsYouTubeConnectOpen(true)}
                    >
                      <Youtube className="w-4 h-4 mr-2 text-youtube-red" />
                      {youtubeConnected ? "Manage YouTube Channel" : "Connect YouTube Channel"}
                    </Button>
                  </div>
                </div>
              </BlurCard>
            </RevealAnimation>
          </div>
        </div>
      </main>
      
      <YouTubeConnect 
        isOpen={isYouTubeConnectOpen}
        onClose={() => setIsYouTubeConnectOpen(false)}
        onConnect={handleYouTubeConnect}
      />
    </div>
  );
};

export default Dashboard;
