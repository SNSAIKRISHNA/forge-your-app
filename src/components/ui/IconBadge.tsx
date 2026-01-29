import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconBadgeProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'accent' | 'muted';
  className?: string;
}

export const IconBadge = ({ icon: Icon, size = 'md', variant = 'primary', className }: IconBadgeProps) => {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-10 h-10",
  };

  const variants = {
    primary: "icon-container",
    accent: "bg-accent",
    muted: "bg-muted",
  };

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center",
        sizes[size],
        variants[variant],
        className
      )}
    >
      <Icon className={cn(iconSizes[size], "text-primary-foreground")} />
    </div>
  );
};
