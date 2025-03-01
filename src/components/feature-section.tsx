
import React from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import {
  Brain,
  Calendar,
  LineChart,
  FileText,
  Video,
  Upload,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    title: "Content Research & Planning",
    description: "AI analyzes trends and audience preferences to identify optimal content topics.",
    icon: Brain,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    checks: [
      "Trend analysis in your niche",
      "Keyword research for SEO",
      "Competitor content evaluation",
      "Topic and structure generation",
    ],
  },
  {
    title: "Script & Storyboard Creation",
    description: "Automatically generate compelling scripts and visual storyboards for your videos.",
    icon: FileText,
    color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
    checks: [
      "Professional script writing",
      "Storyboard visualization",
      "Voiceover synthesis",
      "Visual element planning",
    ],
  },
  {
    title: "Production & Editing",
    description: "Transform scripts into fully produced videos with synchronized audio and visuals.",
    icon: Video,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400",
    checks: [
      "Automated video assembly",
      "Audio-visual synchronization",
      "Transitions and effects",
      "Branding elements",
    ],
  },
  {
    title: "Publishing & Scheduling",
    description: "Optimize upload timing and metadata to maximize audience reach and engagement.",
    icon: Upload,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
    checks: [
      "Metadata optimization",
      "Thumbnail generation",
      "Best time scheduling",
      "Cross-platform publishing",
    ],
  },
  {
    title: "Performance Analytics",
    description: "Track video performance and get AI-driven insights for continuous improvement.",
    icon: LineChart,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
    checks: [
      "Real-time view tracking",
      "Audience retention analysis",
      "Engagement metrics",
      "Performance comparisons",
    ],
  },
  {
    title: "Content Calendar",
    description: "Maintain a consistent publishing schedule with automated content planning.",
    icon: Calendar,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
    checks: [
      "Visual content calendar",
      "Drag-and-drop scheduling",
      "Content pipeline management",
      "Season and series planning",
    ],
  },
];

export const FeatureSection = () => {
  return (
    <section id="features" className="bg-white dark:bg-gray-950 relative">
      <div className="section-container">
        <div className="text-center mb-16">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete YouTube Automation
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Everything you need to create, publish, and grow your YouTube
              channel without the hours of manual work.
            </p>
          </RevealAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <RevealAnimation
              key={feature.title}
              delay={index * 100}
              animation="fade-in-up"
            >
              <BlurCard className="h-full p-8 flex flex-col" hoverEffect>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${feature.color}`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70 mb-6">{feature.description}</p>
                <div className="mt-auto">
                  <ul className="space-y-2">
                    {feature.checks.map((check) => (
                      <li key={check} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-autotube-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurCard>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};
