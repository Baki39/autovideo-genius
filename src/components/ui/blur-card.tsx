
import React from "react";
import { cn } from "@/lib/utils";

interface BlurCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const BlurCard = ({ 
  children, 
  className,
  hoverEffect = false,
  ...props 
}: BlurCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/80 dark:bg-gray-950/50 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-glass overflow-hidden transition-all duration-300",
        hoverEffect && "hover:shadow-glass-strong hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
