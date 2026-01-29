import { cn } from "@/lib/utils";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar = ({ step, totalSteps, className }: ProgressBarProps) => {
  const percentage = Math.round((step / totalSteps) * 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-mono font-medium text-foreground tracking-wider">
          STEP {step} OF {totalSteps}
        </span>
        <span className="text-sm font-mono font-medium text-primary">
          {percentage}%
        </span>
      </div>
      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="progress-bar h-full rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
