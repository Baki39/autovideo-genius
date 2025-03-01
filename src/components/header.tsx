
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BlurCard } from "@/components/ui/blur-card";
import { Menu, X, Youtube } from "lucide-react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <BlurCard
        className={`mx-4 sm:mx-8 transition-all duration-300 ${
          scrolled ? "shadow-glass" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="text-autotube-500 flex items-center">
                <Youtube className="h-6 w-6" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                AutoTube
              </span>
            </a>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Workflow
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button className="button-gradient">Get Started</Button>
          </nav>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </BlurCard>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <BlurCard className="mx-4 sm:mx-8 mt-2 py-4 px-6 md:hidden animate-scale-in">
          <nav className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#workflow"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workflow
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <div className="pt-2 flex flex-col space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
              <Button className="button-gradient w-full">Get Started</Button>
            </div>
          </nav>
        </BlurCard>
      )}
    </header>
  );
};
