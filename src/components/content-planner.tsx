
import React, { useState } from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Filter, 
  CheckCircle2, 
  Brain, 
  FileText, 
  Clock, 
  MoreHorizontal, 
  Sparkles,
  Users
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ContentStatus = "planned" | "in-progress" | "completed";

interface ContentItem {
  id: number;
  title: string;
  status: ContentStatus;
  date: Date;
  type: string;
  audience: string;
  duration: string;
}

export const ContentPlanner: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const contentItems: ContentItem[] = [
    {
      id: 1,
      title: "iPhone 15 Pro Review - Worth the Upgrade?",
      status: "planned",
      date: new Date(2023, 8, 25),
      type: "Review",
      audience: "Tech Enthusiasts",
      duration: "12-15 min"
    },
    {
      id: 2,
      title: "5 AI Tools Every YouTube Creator Needs in 2023",
      status: "in-progress",
      date: new Date(2023, 8, 18),
      type: "Tutorial",
      audience: "Content Creators",
      duration: "8-10 min"
    },
    {
      id: 3,
      title: "How to Make $1000/Month Passive Income",
      status: "completed",
      date: new Date(2023, 8, 10),
      type: "Educational",
      audience: "Entrepreneurs",
      duration: "15-18 min"
    },
    {
      id: 4,
      title: "The Ultimate Home Office Setup 2023",
      status: "planned",
      date: new Date(2023, 8, 30),
      type: "Guide",
      audience: "Work-from-home",
      duration: "10-12 min"
    },
  ];

  const filteredItems = filterStatus === "all" 
    ? contentItems 
    : contentItems.filter(item => item.status === filterStatus);

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case "planned": return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "in-progress": return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
      case "completed": return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400";
      default: return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusLabel = (status: ContentStatus) => {
    switch (status) {
      case "planned": return "Planned";
      case "in-progress": return "In Progress";
      case "completed": return "Completed";
      default: return status;
    }
  };

  return (
    <BlurCard className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Content Planning</h2>
        <p className="text-foreground/80">
          Organize your content pipeline and schedule your video production workflow
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <div className="flex flex-wrap gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-[180px] gap-2">
              <Filter className="w-4 h-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Content</SelectItem>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Brain className="w-4 h-4" />
            Get Content Ideas
          </Button>
          <Button className="gap-2 bg-youtube-red hover:bg-youtube-darkred text-white">
            <Plus className="w-4 h-4" />
            New Content
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <BlurCard key={item.id} className="p-4 hover:border-youtube-red transition-colors">
              <div className="flex flex-wrap gap-4 justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium line-clamp-1">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/70">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      {format(item.date, "MMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {item.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {item.audience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                  
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </BlurCard>
          ))
        ) : (
          <div className="py-8 text-center text-foreground/70">
            <p>No content items match your filter.</p>
          </div>
        )}
      </div>

      <div className="mt-8 p-6 border border-dashed border-border rounded-lg bg-muted/30">
        <div className="flex items-start gap-4">
          <div className="bg-youtube-red/10 p-3 rounded-full">
            <Sparkles className="w-5 h-5 text-youtube-red" />
          </div>
          
          <div>
            <h3 className="font-medium mb-2">AI Content Schedule Optimization</h3>
            <p className="text-sm text-foreground/80 mb-4">
              Let AI analyze your audience and optimize your content schedule for maximum engagement.
            </p>
            <Button variant="outline" className="gap-2">
              <Brain className="w-4 h-4" />
              Optimize Schedule
            </Button>
          </div>
        </div>
      </div>
    </BlurCard>
  );
};
