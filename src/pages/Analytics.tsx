import React, { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Clock,
  Users,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Target,
  Zap,
  Award,
  Globe
} from "lucide-react";

// Mock analytics data
const analyticsData = {
  overview: {
    totalViews: 1234567,
    totalSubscribers: 45678,
    totalVideos: 89,
    engagementRate: 8.5,
    averageViewDuration: "4:32",
    clickThroughRate: 12.3
  },
  recentVideos: [
    {
      id: 1,
      title: "How to Create Amazing YouTube Content with AI",
      thumbnail: "/placeholder.svg",
      publishedAt: "2024-01-15",
      views: 15420,
      likes: 892,
      comments: 156,
      shares: 78,
      watchTime: "5:24",
      ctr: 14.2,
      engagement: 9.1,
      revenue: 45.67
    },
    {
      id: 2,
      title: "Top 10 YouTube Automation Tools for 2024",
      thumbnail: "/placeholder.svg",
      publishedAt: "2024-01-12",
      views: 23150,
      likes: 1203,
      comments: 287,
      shares: 145,
      watchTime: "7:18",
      ctr: 16.8,
      engagement: 10.4,
      revenue: 78.23
    },
    {
      id: 3,
      title: "Complete Guide to YouTube SEO",
      thumbnail: "/placeholder.svg",
      publishedAt: "2024-01-08",
      views: 8940,
      likes: 567,
      comments: 94,
      shares: 34,
      watchTime: "6:45",
      ctr: 11.3,
      engagement: 7.8,
      revenue: 32.11
    }
  ],
  demographics: {
    ageGroups: [
      { range: "18-24", percentage: 25 },
      { range: "25-34", percentage: 35 },
      { range: "35-44", percentage: 22 },
      { range: "45-54", percentage: 12 },
      { range: "55+", percentage: 6 }
    ],
    topCountries: [
      { country: "United States", percentage: 35 },
      { country: "United Kingdom", percentage: 18 },
      { country: "Canada", percentage: 12 },
      { country: "Australia", percentage: 8 },
      { country: "Germany", percentage: 7 }
    ],
    devices: [
      { device: "Mobile", percentage: 65 },
      { device: "Desktop", percentage: 28 },
      { device: "Tablet", percentage: 7 }
    ]
  }
};

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const [selectedMetric, setSelectedMetric] = useState("views");
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getChangeIndicator = (value: number) => {
    const isPositive = value > 0;
    return (
      <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span className="ml-1 text-sm font-medium">{Math.abs(value)}%</span>
      </div>
    );
  };

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
                    <span className="text-youtube-black dark:text-white">Analytics </span>
                    <span className="text-youtube-red">Dashboard</span>
                  </h1>
                  <p className="text-foreground/80">
                    Track your channel performance and optimize content strategy
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="1year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={handleRefreshData}
                    disabled={isLoading}
                    className="px-3"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button className="bg-youtube-red hover:bg-youtube-darkred text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </RevealAnimation>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <RevealAnimation delay={100}>
              <BlurCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  {getChangeIndicator(12.5)}
                </div>
                <h3 className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalViews)}</h3>
                <p className="text-sm text-foreground/70">Total Views</p>
              </BlurCard>
            </RevealAnimation>

            <RevealAnimation delay={200}>
              <BlurCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
                    <Users className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  {getChangeIndicator(8.3)}
                </div>
                <h3 className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalSubscribers)}</h3>
                <p className="text-sm text-foreground/70">Subscribers</p>
              </BlurCard>
            </RevealAnimation>

            <RevealAnimation delay={300}>
              <BlurCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                    <ThumbsUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  {getChangeIndicator(15.2)}
                </div>
                <h3 className="text-2xl font-bold">{analyticsData.overview.engagementRate}%</h3>
                <p className="text-sm text-foreground/70">Engagement Rate</p>
              </BlurCard>
            </RevealAnimation>

            <RevealAnimation delay={400}>
              <BlurCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  {getChangeIndicator(5.8)}
                </div>
                <h3 className="text-2xl font-bold">{analyticsData.overview.averageViewDuration}</h3>
                <p className="text-sm text-foreground/70">Avg. Watch Time</p>
              </BlurCard>
            </RevealAnimation>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Videos Performance */}
                <RevealAnimation className="lg:col-span-2">
                  <BlurCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Recent Videos Performance</h3>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {analyticsData.recentVideos.map((video) => (
                        <BlurCard key={video.id} className="p-4">
                          <div className="flex items-start space-x-4">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-20 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{video.title}</h4>
                              <p className="text-sm text-foreground/60 mb-2">
                                Published: {new Date(video.publishedAt).toLocaleDateString()}
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center">
                                  <Eye className="w-4 h-4 mr-1 text-blue-500" />
                                  {formatNumber(video.views)}
                                </div>
                                <div className="flex items-center">
                                  <ThumbsUp className="w-4 h-4 mr-1 text-green-500" />
                                  {formatNumber(video.likes)}
                                </div>
                                <div className="flex items-center">
                                  <MessageSquare className="w-4 h-4 mr-1 text-purple-500" />
                                  {video.comments}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1 text-orange-500" />
                                  {video.watchTime}
                                </div>
                              </div>
                              <div className="mt-3 flex flex-wrap gap-2">
                                <Badge variant="secondary">CTR: {video.ctr}%</Badge>
                                <Badge variant="secondary">Engagement: {video.engagement}%</Badge>
                                <Badge variant="secondary">${video.revenue}</Badge>
                              </div>
                            </div>
                          </div>
                        </BlurCard>
                      ))}
                    </div>
                  </BlurCard>
                </RevealAnimation>

                {/* Top Performing Content */}
                <RevealAnimation delay={200}>
                  <BlurCard className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Top Performing Content</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Educational Content</span>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                            <Award className="w-3 h-3 mr-1" />
                            Top
                          </Badge>
                        </div>
                        <Progress value={85} className="mb-2" />
                        <p className="text-sm text-foreground/60">85% engagement rate</p>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Tutorial Videos</span>
                          <Badge variant="secondary">Good</Badge>
                        </div>
                        <Progress value={72} className="mb-2" />
                        <p className="text-sm text-foreground/60">72% engagement rate</p>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Product Reviews</span>
                          <Badge variant="outline">Average</Badge>
                        </div>
                        <Progress value={58} className="mb-2" />
                        <p className="text-sm text-foreground/60">58% engagement rate</p>
                      </div>
                    </div>
                  </BlurCard>
                </RevealAnimation>
              </div>
            </TabsContent>

            <TabsContent value="audience">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Demographics */}
                <RevealAnimation>
                  <BlurCard className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Audience Demographics</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-4">Age Distribution</h4>
                        <div className="space-y-3">
                          {analyticsData.demographics.ageGroups.map((group) => (
                            <div key={group.range} className="flex items-center justify-between">
                              <span className="text-sm">{group.range}</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={group.percentage} className="w-20" />
                                <span className="text-sm font-medium w-8">{group.percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-4">Device Usage</h4>
                        <div className="space-y-3">
                          {analyticsData.demographics.devices.map((device) => (
                            <div key={device.device} className="flex items-center justify-between">
                              <span className="text-sm">{device.device}</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={device.percentage} className="w-20" />
                                <span className="text-sm font-medium w-8">{device.percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </BlurCard>
                </RevealAnimation>

                {/* Geographic Data */}
                <RevealAnimation delay={200}>
                  <BlurCard className="p-6">
                    <h3 className="text-xl font-semibold mb-6">Geographic Distribution</h3>
                    <div className="space-y-4">
                      {analyticsData.demographics.topCountries.map((country, index) => (
                        <div key={country.country} className="flex items-center space-x-4">
                          <div className="flex items-center justify-center w-8 h-8 bg-youtube-red/10 rounded-full">
                            <span className="text-sm font-bold text-youtube-red">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{country.country}</span>
                              <span className="text-sm font-medium">{country.percentage}%</span>
                            </div>
                            <Progress value={country.percentage} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Globe className="w-4 h-4 text-youtube-red" />
                        <span className="font-medium">Global Reach</span>
                      </div>
                      <p className="text-sm text-foreground/70">
                        Your content reaches viewers in 47 countries worldwide
                      </p>
                    </div>
                  </BlurCard>
                </RevealAnimation>
              </div>
            </TabsContent>

            <TabsContent value="revenue">
              <RevealAnimation>
                <BlurCard className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Revenue Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-4 border border-border rounded-lg">
                      <h4 className="text-2xl font-bold text-green-600">$156.01</h4>
                      <p className="text-sm text-foreground/70">Total Revenue (30 days)</p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <h4 className="text-2xl font-bold text-blue-600">$0.12</h4>
                      <p className="text-sm text-foreground/70">RPM (Revenue per Mille)</p>
                    </div>
                    <div className="text-center p-4 border border-border rounded-lg">
                      <h4 className="text-2xl font-bold text-purple-600">2.1K</h4>
                      <p className="text-sm text-foreground/70">Monetized Playbacks</p>
                    </div>
                  </div>
                  <div className="text-center py-8">
                    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-foreground/30" />
                    <p className="text-foreground/70 mb-4">Revenue chart visualization would appear here</p>
                    <Button variant="outline">
                      <Target className="w-4 h-4 mr-2" />
                      Set Revenue Goals
                    </Button>
                  </div>
                </BlurCard>
              </RevealAnimation>
            </TabsContent>

            <TabsContent value="optimization">
              <RevealAnimation>
                <BlurCard className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Content Optimization Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">SEO Recommendations</h4>
                      <div className="space-y-3">
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Zap className="w-5 h-5 text-yellow-500 mt-1" />
                            <div>
                              <p className="font-medium">Optimize video titles</p>
                              <p className="text-sm text-foreground/70">Include trending keywords in your titles</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Zap className="w-5 h-5 text-yellow-500 mt-1" />
                            <div>
                              <p className="font-medium">Improve thumbnails</p>
                              <p className="text-sm text-foreground/70">A/B test different thumbnail designs</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Zap className="w-5 h-5 text-yellow-500 mt-1" />
                            <div>
                              <p className="font-medium">Post timing</p>
                              <p className="text-sm text-foreground/70">Best upload time: Tuesday 2-4 PM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Content Strategy</h4>
                      <div className="space-y-3">
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                            <div>
                              <p className="font-medium">Focus on educational content</p>
                              <p className="text-sm text-foreground/70">85% engagement rate</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                            <div>
                              <p className="font-medium">Create more series</p>
                              <p className="text-sm text-foreground/70">Series get 40% more views</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                            <div>
                              <p className="font-medium">Collaborate with others</p>
                              <p className="text-sm text-foreground/70">Cross-promotion opportunities</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </BlurCard>
              </RevealAnimation>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Analytics;