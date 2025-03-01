
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealAnimationProps {
  children: React.ReactNode;
  className?: string;
  animation?: 
    | "fade-in-up" 
    | "fade-in" 
    | "scale-in"
    | "slide-in-right"
    | "slide-in-left";
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export const RevealAnimation = ({
  children,
  className,
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.1,
  once = true,
}: RevealAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isVisible ? `animate-${animation}` : "opacity-0",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
};
