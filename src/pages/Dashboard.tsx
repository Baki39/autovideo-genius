import React from "react";
import { Header } from "@/components/header";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Button } from "@/components/ui/button";
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
  UploadIcon
} from "lucide-react";

const Dashboard = () => {
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
                    <BlurCard className="p-4 cursor-pointer hover:scale-[1.02] transition-all">
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

                    <BlurCard className="p-4 cursor-pointer hover:scale-[1.02] transition-all">
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

                    <BlurCard className="p-4 cursor-pointer hover:scale-[1.02] transition-all">
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

                    <BlurCard className="p-4 cursor-pointer hover:scale-[1.02] transition-all">
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

                  <Button className="w-full bg-youtube-red hover:bg-youtube-darkred text-white">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Start New Project
                  </Button>
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
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-youtube-black/30 rounded-lg">
                    <div className="bg-youtube-red/10 p-2 rounded-full">
                      <Youtube className="w-4 h-4 text-youtube-red" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Welcome to AutoTube!</p>
                      <p className="text-xs text-foreground/70">Get started by connecting your YouTube channel</p>
                      <p className="text-xs text-foreground/50 mt-1">Just now</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Connect YouTube Channel
                  </Button>
                </div>
              </BlurCard>
            </RevealAnimation>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
