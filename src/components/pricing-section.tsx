
import React from "react";
import { Button } from "@/components/ui/button";
import { BlurCard } from "@/components/ui/blur-card";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$29",
    description: "Perfect for content creators just getting started",
    features: [
      "5 AI-generated videos per month",
      "Basic research and scripting",
      "720p video quality",
      "Standard voice options",
      "Basic analytics",
      "Email support",
    ],
    highlighted: false,
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "$79",
    description: "For growing channels that need more content and quality",
    features: [
      "15 AI-generated videos per month",
      "Advanced research and scripting",
      "1080p video quality",
      "Premium voice options",
      "Detailed analytics and insights",
      "Priority email support",
      "Custom intro/outro",
      "Thumbnail optimization",
    ],
    highlighted: true,
    buttonText: "Get Started",
    badge: "Popular",
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "Unlimited content automation for professional creators",
    features: [
      "Unlimited AI-generated videos",
      "Expert-level research and scripting",
      "4K video quality",
      "All voice options",
      "Advanced analytics with predictions",
      "Dedicated support",
      "Custom branding package",
      "Multi-channel management",
      "White-label exports",
    ],
    highlighted: false,
    buttonText: "Contact Sales",
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="bg-white dark:bg-gray-950">
      <div className="section-container">
        <div className="text-center mb-16">
          <RevealAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
          </RevealAnimation>
          <RevealAnimation delay={100}>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Choose the plan that fits your channel's needs and scale as you grow.
              All plans include core automation features.
            </p>
          </RevealAnimation>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <RevealAnimation
              key={plan.name}
              delay={index * 100}
              animation="fade-in-up"
            >
              <BlurCard
                className={`h-full relative ${
                  plan.highlighted
                    ? "ring-2 ring-autotube-500 dark:ring-autotube-400"
                    : ""
                }`}
                hoverEffect
              >
                {plan.highlighted && plan.badge && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <div className="px-4 py-1 bg-autotube-500 text-white text-xs font-medium rounded-full">
                      {plan.badge}
                    </div>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-foreground/70 ml-2">/month</span>
                  </div>
                  <p className="text-foreground/70 mb-6">{plan.description}</p>
                  <Button
                    className={`w-full mb-8 ${
                      plan.highlighted ? "button-gradient" : ""
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 text-autotube-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
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
