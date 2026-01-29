import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SelectionCardProps {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  features: string[];
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const SelectionCard = ({
  icon: Icon,
  label,
  title,
  description,
  features,
  selected = false,
  onClick,
  className,
}: SelectionCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "selection-card rounded-xl p-8 gradient-bar-bottom",
        selected && "selected",
        className
      )}
    >
      <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      
      <span className="text-xs font-mono font-semibold tracking-widest text-primary uppercase">
        {label}
      </span>
      
      <h3 className="font-display text-2xl font-bold text-foreground mt-2 mb-3">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        {description}
      </p>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};
