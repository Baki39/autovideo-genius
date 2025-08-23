
import React, { useState } from "react";
import { Header } from "@/components/header";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Brain, 
  FileText, 
  VideoIcon, 
  UploadIcon, 
  BarChart3, 
  Search,
  Calendar,
  Lightbulb,
  PenLine,
  Wand2,
  Settings,
  SlidersHorizontal,
  Tags,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ContentEditorToolbar } from "@/components/content-editor-toolbar";
import { ContentWorkspace } from "@/components/content-workspace";
import { TrendAnalyzer } from "@/components/trend-analyzer";
import { ContentPlanner } from "@/components/content-planner";

const ContentStudio = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("research");
  const [studioMode, setStudioMode] = useState<"beginner" | "advanced">("beginner");
  const [searchQuery, setSearchQuery] = useState("");
  const [idealLength, setIdealLength] = useState<string>("medium");

  const contentLengthOptions = {
    short: "3-5 minutes",
    medium: "8-12 minutes",
    long: "15-20 minutes"
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-youtube-darkblack dark:to-youtube-black">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="section-container max-w-7xl mx-auto">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard}
              className="flex gap-2 items-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>

            <div className="flex items-center gap-4">
              <Select 
                value={studioMode} 
                onValueChange={(value) => setStudioMode(value as "beginner" | "advanced")}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Studio Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner Mode</SelectItem>
                  <SelectItem value="advanced">Advanced Mode</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Studio Settings
              </Button>
            </div>
          </div>

          <RevealAnimation>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-youtube-black dark:text-white">Content </span>
              <span className="text-youtube-red">Studio</span>
            </h1>
            <p className="text-foreground/80 mb-8 max-w-2xl">
              Research, plan, write, and optimize your YouTube content using AI-powered tools
            </p>
          </RevealAnimation>

          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="lg:col-span-1">
              <BlurCard className="p-4 h-full">
                <TabsList className="flex flex-col items-stretch h-auto w-full space-y-1 bg-transparent">
                  <TabsTrigger 
                    value="research" 
                    className="justify-start text-left w-full px-3 py-3"
                  >
                    <Brain className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                    Research & Trends
                  </TabsTrigger>
                  <TabsTrigger 
                    value="planning" 
                    className="justify-start text-left w-full px-3 py-3"
                  >
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                    Content Planning
                  </TabsTrigger>
                  <TabsTrigger 
                    value="scripting" 
                    className="justify-start text-left w-full px-3 py-3"
                  >
                    <FileText className="w-4 h-4 mr-2 text-purple-600 dark:text-purple-400" />
                    Script & Storyboard
                  </TabsTrigger>
                  <TabsTrigger 
                    value="production" 
                    className="justify-start text-left w-full px-3 py-3"
                  >
                    <VideoIcon className="w-4 h-4 mr-2 text-rose-600 dark:text-rose-400" />
                    Video Production
                  </TabsTrigger>
                  <TabsTrigger 
                    value="optimization" 
                    className="justify-start text-left w-full px-3 py-3"
                  >
                    <Tags className="w-4 h-4 mr-2 text-amber-600 dark:text-amber-400" />
                    SEO & Metadata
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="justify-start text-left w-full px-3 py-3"
                  >
                    <BarChart3 className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                    Performance Analytics
                  </TabsTrigger>
                </TabsList>
              </BlurCard>
            </div>

            <div className="lg:col-span-3">
              {/* Research & Trends Tab */}
              <TabsContent value="research" className="m-0">
                <TrendAnalyzer />
              </TabsContent>

              {/* Content Planning Tab */}
              <TabsContent value="planning" className="m-0">
                <ContentPlanner />
              </TabsContent>

              {/* Script & Storyboard Tab */}
              <TabsContent value="scripting" className="m-0">
                <BlurCard className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Script Creation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="video-type" className="mb-2 block">Video Type</Label>
                        <Select defaultValue="tutorial">
                          <SelectTrigger id="video-type">
                            <SelectValue placeholder="Select video type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tutorial">Tutorial / How-to</SelectItem>
                            <SelectItem value="review">Product Review</SelectItem>
                            <SelectItem value="vlog">Vlog</SelectItem>
                            <SelectItem value="educational">Educational</SelectItem>
                            <SelectItem value="entertainment">Entertainment</SelectItem>
                            <SelectItem value="commentary">Commentary</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="video-length" className="mb-2 block">Ideal Video Length</Label>
                        <Select 
                          value={idealLength} 
                          onValueChange={setIdealLength}
                        >
                          <SelectTrigger id="video-length">
                            <SelectValue placeholder="Select ideal length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">{contentLengthOptions.short}</SelectItem>
                            <SelectItem value="medium">{contentLengthOptions.medium}</SelectItem>
                            <SelectItem value="long">{contentLengthOptions.long}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="video-topic" className="mb-2 block">Video Topic/Title</Label>
                      <Input 
                        id="video-topic" 
                        placeholder="Enter the main topic or working title for your video"
                        className="mb-4"
                      />
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="video-outline" className="mb-2 block">Key Points (Outline)</Label>
                      <Textarea 
                        id="video-outline" 
                        placeholder="List the main points you want to cover in your video"
                        className="min-h-32"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      <Button className="gap-2 bg-youtube-red hover:bg-youtube-darkred text-white">
                        <Wand2 className="w-4 h-4" />
                        Generate Script
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Get Script Ideas
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Advanced Options
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Script Draft</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <PenLine className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">Save Draft</Button>
                      </div>
                    </div>
                    
                    <ContentEditorToolbar />
                    <ContentWorkspace />
                  </div>
                </BlurCard>
              </TabsContent>

              {/* Video Production Tab */}
              <TabsContent value="production" className="m-0">
                <BlurCard className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Video Production</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">Generate Video from Script</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor="script-source" className="mb-2 block">Script Source</Label>
                          <Select defaultValue="current">
                            <SelectTrigger id="script-source">
                              <SelectValue placeholder="Select script source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="current">Current Script Draft</SelectItem>
                              <SelectItem value="upload">Upload Script File</SelectItem>
                              <SelectItem value="previous">Previous Saved Script</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="visual-style" className="mb-2 block">Visual Style</Label>
                          <Select defaultValue="professional">
                            <SelectTrigger id="visual-style">
                              <SelectValue placeholder="Select visual style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="casual">Casual/Vlog Style</SelectItem>
                              <SelectItem value="animated">Animated</SelectItem>
                              <SelectItem value="cinematic">Cinematic</SelectItem>
                              <SelectItem value="minimalist">Minimalist</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="production-quality" className="mb-2 block">Production Quality</Label>
                          <Select defaultValue="standard">
                            <SelectTrigger id="production-quality">
                              <SelectValue placeholder="Select quality level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft (Fast Generation)</SelectItem>
                              <SelectItem value="standard">Standard Quality</SelectItem>
                              <SelectItem value="premium">Premium Quality (Slower)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Button className="w-full gap-2 bg-youtube-red hover:bg-youtube-darkred text-white">
                        <Sparkles className="w-4 h-4" />
                        Generate Video
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Preview & Customize</h3>
                      
                      <div className="bg-youtube-darkblack rounded-lg aspect-video flex items-center justify-center mb-4">
                        <div className="text-center">
                          <VideoIcon className="w-10 h-10 text-youtube-red/50 mx-auto mb-2" />
                          <p className="text-white">Video Preview</p>
                          <p className="text-sm text-gray-400">Generate a video to see preview here</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="gap-2" disabled>
                          <Settings className="w-4 h-4" />
                          Edit Video
                        </Button>
                        <Button variant="outline" className="gap-2" disabled>
                          <UploadIcon className="w-4 h-4" />
                          Export Video
                        </Button>
                      </div>
                    </div>
                  </div>
                </BlurCard>
              </TabsContent>

              {/* SEO & Metadata Tab */}
              <TabsContent value="optimization" className="m-0">
                <BlurCard className="p-6">
                  <h2 className="text-xl font-semibold mb-6">SEO & Metadata Optimization</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="final-title" className="mb-2 block">Video Title</Label>
                        <Input 
                          id="final-title" 
                          placeholder="Enter final video title"
                          className="mb-1"
                        />
                        <p className="text-xs text-foreground/70">60 characters maximum (0/60)</p>
                      </div>
                      
                      <div>
                        <Label htmlFor="video-description" className="mb-2 block">Video Description</Label>
                        <Textarea 
                          id="video-description" 
                          placeholder="Enter detailed video description"
                          className="min-h-32 mb-1"
                        />
                        <p className="text-xs text-foreground/70">5000 characters maximum (0/5000)</p>
                      </div>
                      
                      <div>
                        <Label htmlFor="video-tags" className="mb-2 block">Tags (Comma-separated)</Label>
                        <Input 
                          id="video-tags" 
                          placeholder="tag1, tag2, tag3"
                          className="mb-1"
                        />
                        <p className="text-xs text-foreground/70">500 characters maximum (0/500)</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="p-4 border border-border rounded-lg mb-6">
                        <h3 className="font-medium mb-3">SEO Suggestions</h3>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start text-left">
                            <Wand2 className="w-4 h-4 mr-2 text-youtube-red" />
                            Generate Optimized Title
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <Wand2 className="w-4 h-4 mr-2 text-youtube-red" />
                            Generate SEO Description
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <Wand2 className="w-4 h-4 mr-2 text-youtube-red" />
                            Generate Relevant Tags
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <Search className="w-4 h-4 mr-2 text-youtube-red" />
                            Keyword Analysis
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          AI Insights
                        </h3>
                        <p className="text-sm text-foreground/80 mb-3">
                          Enter your video details to get AI-powered SEO insights and recommendations.
                        </p>
                        <div className="text-sm space-y-2 text-foreground/70">
                          <p>• Use 3-5 relevant tags</p>
                          <p>• Include target keywords in first 100 characters</p>
                          <p>• Add timestamps to your description</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline">Save Metadata</Button>
                    <Button className="gap-2 bg-youtube-red hover:bg-youtube-darkred text-white">
                      <UploadIcon className="w-4 h-4" />
                      Prepare for Upload
                    </Button>
                  </div>
                </BlurCard>
              </TabsContent>

              {/* Performance Analytics Tab */}
              <TabsContent value="analytics" className="m-0">
                <BlurCard className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Performance Analytics</h2>
                  
                  <div className="p-8 border border-dashed border-border rounded-lg flex flex-col items-center justify-center">
                    <BarChart3 className="w-12 h-12 text-foreground/30 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Connect YouTube Channel</h3>
                    <p className="text-center text-foreground/70 max-w-md mb-6">
                      Connect your YouTube channel to see analytics and performance data for your videos
                    </p>
                    <Button className="gap-2 bg-youtube-red hover:bg-youtube-darkred text-white">
                      Connect YouTube Channel
                    </Button>
                  </div>
                </BlurCard>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ContentStudio;
