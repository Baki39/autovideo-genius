
import React from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { ArrowRight } from "lucide-react";

const workflowSteps = [
  {
    number: "01",
    title: "Define Your Content Needs",
    description:
      "Choose your niche, target audience, and content style. Set your automation preferences and customization level.",
  },
  {
    number: "02",
    title: "AI Research & Script Generation",
    description:
      "Our AI system researches trending topics in your niche and generates professional scripts optimized for engagement.",
  },
  {
    number: "03",
    title: "Visual Content Creation",
    description:
      "AI transforms scripts into complete videos with synchronized voiceovers, visuals, animations, and branding elements.",
  },
  {
    number: "04",
    title: "Review & Approve",
    description:
      "Preview your video and make any desired adjustments before publishing. Or enable fully autonomous mode.",
  },
  {
    number: "05",
    title: "Optimize & Publish",
    description:
      "AI creates optimized titles, descriptions, tags, and thumbnails, then schedules publishing at peak times.",
  },
  {
    number: "06",
    title: "Analyze & Improve",
    description:
      "Track performance and get AI-powered suggestions to continuously improve content and grow your channel.",
  },
];

export const WorkflowSection = () => {
  return (
    <section id="workflow" className="bg-gray-50 dark:bg-gray-900">
      <div className="section-container">
        <div className="text-center mb-16">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Content Workflow, Automated
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              From concept to publishing, AutoTube handles every step with
              minimal input required from you.
            </p>
          </RevealAnimation>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workflowSteps.map((step, index) => (
              <RevealAnimation
                key={step.number}
                delay={index * 100}
                animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}
              >
                <BlurCard className="h-full p-8 relative overflow-visible" hoverEffect>
                  {/* Connector line */}
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute z-10">
                      {index % 2 === 0 ? (
                        <div className="w-12 h-[2px] bg-autotube-200 dark:bg-autotube-800 absolute -right-12 top-12 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-autotube-500 absolute -right-1" />
                        </div>
                      ) : (
                        <div className="w-12 h-[2px] bg-autotube-200 dark:bg-autotube-800 absolute -left-12 top-12 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-autotube-500 absolute -left-5 rotate-180" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <span className="text-4xl font-bold text-autotube-500 mr-4 font-display">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-foreground/70">{step.description}</p>
                    </div>
                  </div>
                </BlurCard>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
