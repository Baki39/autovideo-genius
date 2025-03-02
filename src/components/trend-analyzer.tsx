
import React, { useState } from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, TrendingUp, BarChart3, Target, ArrowUpRight, Sparkles } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export const TrendAnalyzer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [analysisTab, setAnalysisTab] = useState("trending");
  
  const trendingTopics = [
    {
      title: "iPhone 15 Pro Review",
      category: "Tech",
      trendScore: 98,
      competition: "High",
      potential: "Very High",
      growth: "+145%"
    },
    {
      title: "5 AI Tools Every Creator Needs",
      category: "Tech",
      trendScore: 92,
      competition: "Medium",
      potential: "High",
      growth: "+87%"
    },
    {
      title: "Morning Routine for Productivity",
      category: "Lifestyle",
      trendScore: 86,
      competition: "High",
      potential: "Medium",
      growth: "+32%"
    },
    {
      title: "Budget Travel Guide 2023",
      category: "Travel",
      trendScore: 84,
      competition: "Medium",
      potential: "High",
      growth: "+54%"
    },
    {
      title: "Healthy Meal Prep in 30 Minutes",
      category: "Food",
      trendScore: 79,
      competition: "High",
      potential: "Medium",
      growth: "+28%"
    },
  ];

  return (
    <BlurCard className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Research & Trend Analysis</h2>
        <p className="text-foreground/80">
          Research trending topics and analyze the YouTube landscape to find video
          opportunities with the highest potential
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search topics, keywords, or channels"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="gaming">Gaming</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="food">Food</SelectItem>
          </SelectContent>
        </Select>
        <Button className="shrink-0 gap-2 bg-youtube-red hover:bg-youtube-darkred text-white">
          <Sparkles className="w-4 h-4" />
          Generate Ideas
        </Button>
      </div>

      <Tabs value={analysisTab} onValueChange={setAnalysisTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending Topics
          </TabsTrigger>
          <TabsTrigger value="competition">
            <Target className="w-4 h-4 mr-2" />
            Competition Analysis
          </TabsTrigger>
          <TabsTrigger value="predictions">
            <BarChart3 className="w-4 h-4 mr-2" />
            Growth Predictions
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <TabsContent value="trending" className="m-0 space-y-4">
        <div className="relative overflow-x-auto rounded-lg border">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3">Topic</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Trend Score</th>
                <th scope="col" className="px-6 py-3">Competition</th>
                <th scope="col" className="px-6 py-3">Potential</th>
                <th scope="col" className="px-6 py-3">Growth</th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {trendingTopics.map((topic, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                    {topic.title}
                  </th>
                  <td className="px-6 py-4">{topic.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">{topic.trendScore}</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-youtube-red rounded-full" 
                          style={{ width: `${topic.trendScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{topic.competition}</td>
                  <td className="px-6 py-4">{topic.potential}</td>
                  <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400">{topic.growth}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" className="gap-2">
            <Search className="w-4 h-4" />
            Load More Results
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="competition" className="m-0">
        <div className="p-8 border border-dashed border-border rounded-lg flex flex-col items-center justify-center">
          <Target className="w-12 h-12 text-foreground/30 mb-4" />
          <h3 className="text-lg font-medium mb-2">Competition Analysis</h3>
          <p className="text-center text-foreground/70 max-w-md mb-6">
            Enter a topic above to see detailed competition analysis for your niche
          </p>
          <Button variant="outline">Analyze Competition</Button>
        </div>
      </TabsContent>

      <TabsContent value="predictions" className="m-0">
        <div className="p-8 border border-dashed border-border rounded-lg flex flex-col items-center justify-center">
          <BarChart3 className="w-12 h-12 text-foreground/30 mb-4" />
          <h3 className="text-lg font-medium mb-2">Growth Predictions</h3>
          <p className="text-center text-foreground/70 max-w-md mb-6">
            Enter a topic above to see growth predictions and trend forecasts
          </p>
          <Button variant="outline">Generate Predictions</Button>
        </div>
      </TabsContent>
    </BlurCard>
  );
};
