import React, { useState } from "react";
import { Header } from "@/components/header";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  Video,
  FileText,
  Zap,
  Target,
  Users,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

// Mock content calendar data
const contentItems = [
  {
    id: 1,
    title: "Complete Guide to YouTube Analytics",
    type: "educational",
    status: "published",
    scheduledDate: "2024-01-15",
    publishedDate: "2024-01-15",
    description: "Deep dive into YouTube analytics and how to use data to grow your channel",
    tags: ["analytics", "education", "growth"],
    estimatedViews: 15000,
    actualViews: 15420,
    priority: "high",
    scriptStatus: "completed",
    thumbnailStatus: "completed",
    videoStatus: "completed"
  },
  {
    id: 2,
    title: "Top 10 AI Tools for Content Creators",
    type: "listicle",
    status: "scheduled",
    scheduledDate: "2024-01-22",
    description: "Comprehensive review of AI tools that can boost productivity for creators",
    tags: ["ai", "tools", "productivity"],
    estimatedViews: 20000,
    priority: "high",
    scriptStatus: "completed",
    thumbnailStatus: "in-progress",
    videoStatus: "not-started"
  },
  {
    id: 3,
    title: "How to Optimize Video Thumbnails",
    type: "tutorial",
    status: "in-progress",
    scheduledDate: "2024-01-25",
    description: "Step-by-step guide to creating click-worthy thumbnails",
    tags: ["thumbnails", "design", "tutorial"],
    estimatedViews: 12000,
    priority: "medium",
    scriptStatus: "in-progress",
    thumbnailStatus: "not-started",
    videoStatus: "not-started"
  },
  {
    id: 4,
    title: "YouTube Shorts Strategy 2024",
    type: "strategy",
    status: "draft",
    scheduledDate: "2024-01-28",
    description: "How to leverage YouTube Shorts for channel growth",
    tags: ["shorts", "strategy", "growth"],
    estimatedViews: 25000,
    priority: "high",
    scriptStatus: "draft",
    thumbnailStatus: "not-started",
    videoStatus: "not-started"
  },
  {
    id: 5,
    title: "Live Streaming Setup Guide",
    type: "tutorial",
    status: "ideas",
    scheduledDate: "2024-02-01",
    description: "Complete guide to setting up professional live streams",
    tags: ["live-streaming", "setup", "equipment"],
    estimatedViews: 8000,
    priority: "low",
    scriptStatus: "not-started",
    thumbnailStatus: "not-started",
    videoStatus: "not-started"
  }
];

const ContentCalendar = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("calendar");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newContent, setNewContent] = useState({
    title: "",
    type: "educational",
    description: "",
    scheduledDate: "",
    priority: "medium",
    tags: ""
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
      case "scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
      case "in-progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
      case "draft": return "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300";
      case "ideas": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published": return <CheckCircle2 className="w-4 h-4" />;
      case "scheduled": return <Clock className="w-4 h-4" />;
      case "in-progress": return <RefreshCw className="w-4 h-4" />;
      case "draft": return <FileText className="w-4 h-4" />;
      case "ideas": return <Zap className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getProgressStatus = (scriptStatus: string, thumbnailStatus: string, videoStatus: string) => {
    const statuses = [scriptStatus, thumbnailStatus, videoStatus];
    const completed = statuses.filter(s => s === "completed").length;
    return Math.round((completed / 3) * 100);
  };

  const handleCreateContent = () => {
    if (!newContent.title || !newContent.scheduledDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in the title and scheduled date.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Content Created",
      description: "New content has been added to your calendar.",
    });

    setNewContent({
      title: "",
      type: "educational",
      description: "",
      scheduledDate: "",
      priority: "medium",
      tags: ""
    });
    setIsDialogOpen(false);
  };

  const filteredContent = contentItems.filter(item => 
    filterStatus === "all" || item.status === filterStatus
  );

  const upcomingContent = contentItems
    .filter(item => new Date(item.scheduledDate) > new Date())
    .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-youtube-darkblack dark:to-youtube-black">
      <Header />
      <main className="flex-grow pt-24">
        <div className="section-container max-w-7xl">
          {/* Header Section */}
          <div className="mb-8">
            <RevealAnimation>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    <span className="text-youtube-black dark:text-white">Content </span>
                    <span className="text-youtube-red">Calendar</span>
                  </h1>
                  <p className="text-foreground/80">
                    Plan, schedule, and manage your YouTube content pipeline
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ideas">Ideas</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-youtube-red hover:bg-youtube-darkred text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        New Content
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Content</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={newContent.title}
                            onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                            placeholder="Enter video title..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="type">Content Type</Label>
                            <Select value={newContent.type} onValueChange={(value) => setNewContent({...newContent, type: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="educational">Educational</SelectItem>
                                <SelectItem value="tutorial">Tutorial</SelectItem>
                                <SelectItem value="listicle">Listicle</SelectItem>
                                <SelectItem value="strategy">Strategy</SelectItem>
                                <SelectItem value="review">Review</SelectItem>
                                <SelectItem value="vlog">Vlog</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="priority">Priority</Label>
                            <Select value={newContent.priority} onValueChange={(value) => setNewContent({...newContent, priority: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="scheduled-date">Scheduled Date</Label>
                          <Input
                            id="scheduled-date"
                            type="date"
                            value={newContent.scheduledDate}
                            onChange={(e) => setNewContent({...newContent, scheduledDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newContent.description}
                            onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                            placeholder="Brief description of the content..."
                            className="min-h-20"
                          />
                        </div>
                        <div>
                          <Label htmlFor="tags">Tags (comma-separated)</Label>
                          <Input
                            id="tags"
                            value={newContent.tags}
                            onChange={(e) => setNewContent({...newContent, tags: e.target.value})}
                            placeholder="tags, keywords, topics"
                          />
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleCreateContent} className="bg-youtube-red hover:bg-youtube-darkred text-white">
                            Create Content
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </RevealAnimation>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <RevealAnimation delay={100}>
              <BlurCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">12</h3>
                    <p className="text-sm text-foreground/70">Total Planned</p>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
              </BlurCard>
            </RevealAnimation>

            <RevealAnimation delay={200}>
              <BlurCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">3</h3>
                    <p className="text-sm text-foreground/70">Scheduled</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </BlurCard>
            </RevealAnimation>

            <RevealAnimation delay={300}>
              <BlurCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">5</h3>
                    <p className="text-sm text-foreground/70">In Progress</p>
                  </div>
                  <RefreshCw className="w-8 h-8 text-purple-500" />
                </div>
              </BlurCard>
            </RevealAnimation>

            <RevealAnimation delay={400}>
              <BlurCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">8</h3>
                    <p className="text-sm text-foreground/70">Published</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
              </BlurCard>
            </RevealAnimation>
          </div>

          {/* Main Content */}
          <Tabs value={selectedView} onValueChange={setSelectedView} className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8">
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="pipeline">Content Pipeline</TabsTrigger>
              <TabsTrigger value="analytics">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <RevealAnimation>
                  <BlurCard className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Content Calendar</h3>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </BlurCard>
                </RevealAnimation>

                {/* Upcoming Content */}
                <RevealAnimation delay={200} className="lg:col-span-2">
                  <BlurCard className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Upcoming Content</h3>
                    <div className="space-y-4">
                      {upcomingContent.map((item) => (
                        <BlurCard key={item.id} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-medium">{item.title}</h4>
                                <Badge className={getStatusColor(item.status)}>
                                  {getStatusIcon(item.status)}
                                  <span className="ml-1">{item.status}</span>
                                </Badge>
                                <Badge className={getPriorityColor(item.priority)}>
                                  {item.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-foreground/70 mb-2">{item.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-foreground/60">
                                <div className="flex items-center">
                                  <CalendarIcon className="w-4 h-4 mr-1" />
                                  {new Date(item.scheduledDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Eye className="w-4 h-4 mr-1" />
                                  {item.estimatedViews?.toLocaleString()} est. views
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>{getProgressStatus(item.scriptStatus, item.thumbnailStatus, item.videoStatus)}%</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className={`p-2 rounded text-center ${item.scriptStatus === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" : item.scriptStatus === "in-progress" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                                Script
                              </div>
                              <div className={`p-2 rounded text-center ${item.thumbnailStatus === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" : item.thumbnailStatus === "in-progress" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                                Thumbnail
                              </div>
                              <div className={`p-2 rounded text-center ${item.videoStatus === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" : item.videoStatus === "in-progress" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                                Video
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </BlurCard>
                      ))}
                    </div>
                  </BlurCard>
                </RevealAnimation>
              </div>
            </TabsContent>

            <TabsContent value="pipeline">
              <RevealAnimation>
                <BlurCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Content Pipeline</h3>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <Select value="newest" onValueChange={() => {}}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="oldest">Oldest</SelectItem>
                          <SelectItem value="priority">Priority</SelectItem>
                          <SelectItem value="status">Status</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {filteredContent.map((item) => (
                      <BlurCard key={item.id} className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-lg">{item.title}</h4>
                              <Badge className={getStatusColor(item.status)}>
                                {getStatusIcon(item.status)}
                                <span className="ml-1 capitalize">{item.status}</span>
                              </Badge>
                              <Badge className={getPriorityColor(item.priority)}>
                                {item.priority} priority
                              </Badge>
                            </div>
                            <p className="text-foreground/70 mb-3">{item.description}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
                                <span>
                                  {item.status === "published" ? "Published" : "Scheduled"}: {" "}
                                  {new Date(item.publishedDate || item.scheduledDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-2 text-green-500" />
                                <span>
                                  {item.actualViews ? `${item.actualViews.toLocaleString()} views` : `${item.estimatedViews?.toLocaleString()} est.`}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Video className="w-4 h-4 mr-2 text-purple-500" />
                                <span className="capitalize">{item.type}</span>
                              </div>
                              <div className="flex items-center">
                                <BarChart3 className="w-4 h-4 mr-2 text-orange-500" />
                                <span>{getProgressStatus(item.scriptStatus, item.thumbnailStatus, item.videoStatus)}% complete</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className={`p-3 rounded-lg ${item.scriptStatus === "completed" ? "bg-green-100 dark:bg-green-900/40" : item.scriptStatus === "in-progress" ? "bg-yellow-100 dark:bg-yellow-900/40" : "bg-gray-100 dark:bg-gray-800"}`}>
                              <FileText className="w-5 h-5 mx-auto mb-1" />
                              <p className="text-sm font-medium">Script</p>
                              <p className="text-xs text-foreground/60 capitalize">{item.scriptStatus.replace("-", " ")}</p>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className={`p-3 rounded-lg ${item.thumbnailStatus === "completed" ? "bg-green-100 dark:bg-green-900/40" : item.thumbnailStatus === "in-progress" ? "bg-yellow-100 dark:bg-yellow-900/40" : "bg-gray-100 dark:bg-gray-800"}`}>
                              <Target className="w-5 h-5 mx-auto mb-1" />
                              <p className="text-sm font-medium">Thumbnail</p>
                              <p className="text-xs text-foreground/60 capitalize">{item.thumbnailStatus.replace("-", " ")}</p>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className={`p-3 rounded-lg ${item.videoStatus === "completed" ? "bg-green-100 dark:bg-green-900/40" : item.videoStatus === "in-progress" ? "bg-yellow-100 dark:bg-yellow-900/40" : "bg-gray-100 dark:bg-gray-800"}`}>
                              <Video className="w-5 h-5 mx-auto mb-1" />
                              <p className="text-sm font-medium">Video</p>
                              <p className="text-xs text-foreground/60 capitalize">{item.videoStatus.replace("-", " ")}</p>
                            </div>
                          </div>
                        </div>
                      </BlurCard>
                    ))}
                  </div>
                </BlurCard>
              </RevealAnimation>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevealAnimation>
                  <BlurCard className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Content Performance</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Educational Content</span>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Best</Badge>
                        </div>
                        <p className="text-sm text-foreground/60 mb-2">Average 15K views per video</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: "85%"}}></div>
                        </div>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Tutorial Videos</span>
                          <Badge variant="secondary">Good</Badge>
                        </div>
                        <p className="text-sm text-foreground/60 mb-2">Average 12K views per video</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: "72%"}}></div>
                        </div>
                      </div>
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Strategy Content</span>
                          <Badge variant="outline">Average</Badge>
                        </div>
                        <p className="text-sm text-foreground/60 mb-2">Average 8K views per video</p>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: "58%"}}></div>
                        </div>
                      </div>
                    </div>
                  </BlurCard>
                </RevealAnimation>

                <RevealAnimation delay={200}>
                  <BlurCard className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Publishing Schedule Insights</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-3">Best Publishing Days</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Tuesday</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div className="w-full h-2 bg-green-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">Best</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Thursday</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div className="w-4/5 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">Good</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Sunday</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div className="w-3/5 h-2 bg-yellow-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">Fair</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Optimal Time Slots</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 border border-border rounded-lg text-center">
                            <Clock className="w-6 h-6 mx-auto mb-2 text-green-500" />
                            <p className="text-sm font-medium">2-4 PM</p>
                            <p className="text-xs text-foreground/60">Peak performance</p>
                          </div>
                          <div className="p-3 border border-border rounded-lg text-center">
                            <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                            <p className="text-sm font-medium">7-9 PM</p>
                            <p className="text-xs text-foreground/60">Good engagement</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BlurCard>
                </RevealAnimation>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ContentCalendar;