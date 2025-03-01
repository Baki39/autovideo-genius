
import React from "react";
import { Button } from "@/components/ui/button";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Youtube, Layers, Sparkles, Zap } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative pt-24 overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-autotube-100/30 dark:bg-autotube-950/20 blur-3xl"></div>
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] rounded-full bg-blue-100/30 dark:bg-blue-900/10 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[20%] h-[20%] rounded-full bg-indigo-100/20 dark:bg-indigo-900/10 blur-3xl"></div>
      </div>

      <div className="section-container relative z-10 pb-16 md:pb-24">
        <div className="flex flex-col items-center text-center">
          <RevealAnimation>
            <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-autotube-100 dark:bg-autotube-900/40 border border-autotube-200 dark:border-autotube-800">
              <Sparkles className="w-4 h-4 mr-2 text-autotube-500" />
              <span className="text-sm font-medium text-autotube-800 dark:text-autotube-300">
                AI-Powered YouTube Automation
              </span>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight max-w-3xl">
              Create Stunning YouTube Videos{" "}
              <span className="text-gradient">Automatically</span>
            </h1>
          </RevealAnimation>

          <RevealAnimation delay={200}>
            <p className="text-lg text-foreground/80 mb-8 max-w-2xl">
              AutoTube uses advanced AI to research, write, produce, and publish
              high-quality videos for your YouTube channel, saving you time and
              maximizing your reach.
            </p>
          </RevealAnimation>

          <RevealAnimation delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button className="button-gradient h-12 px-8 text-base">
                Get Started Free
              </Button>
              <Button variant="outline" className="h-12 px-8 text-base">
                See How It Works
              </Button>
            </div>
          </RevealAnimation>

          <RevealAnimation delay={400}>
            <BlurCard className="w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden transition-all">
              <div className="w-full h-full bg-gradient-to-br from-autotube-500/10 to-autotube-600/5 flex items-center justify-center">
                <div className="p-16 flex flex-col items-center justify-center gap-4">
                  <div className="rounded-full bg-autotube-500 p-4 mb-4 animate-pulse-subtle">
                    <Youtube className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-medium">
                    Channel Automation Dashboard
                  </h3>
                  <p className="text-sm text-foreground/70 text-center max-w-md">
                    View a demo of AutoTube's intuitive dashboard that manages your entire YouTube workflow
                  </p>
                </div>
              </div>
            </BlurCard>
          </RevealAnimation>

          <RevealAnimation delay={500}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-autotube-100 dark:bg-autotube-900/40 mb-4">
                  <Zap className="w-6 h-6 text-autotube-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">10x Faster</h3>
                <p className="text-sm text-foreground/70">
                  Produce videos in minutes, not days
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-autotube-100 dark:bg-autotube-900/40 mb-4">
                  <Layers className="w-6 h-6 text-autotube-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">Full Automation</h3>
                <p className="text-sm text-foreground/70">
                  From concept to publishing
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-autotube-100 dark:bg-autotube-900/40 mb-4">
                  <Sparkles className="w-6 h-6 text-autotube-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">AI Quality</h3>
                <p className="text-sm text-foreground/70">
                  Professional results every time
                </p>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};
