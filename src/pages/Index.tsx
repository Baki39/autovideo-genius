
import React, { useEffect } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeatureSection } from "@/components/feature-section";
import { WorkflowSection } from "@/components/workflow-section";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";
import { RevealAnimation } from "@/components/ui/reveal-animation";

const Index = () => {
  // Reset scroll position when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        <WorkflowSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
