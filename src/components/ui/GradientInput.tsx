import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const GradientInput = React.forwardRef<HTMLInputElement, GradientInputProps>(
  ({ className, label, helperText, error, type = "text", ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        {helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        <input
          type={type}
          className={cn(
            "input-dark w-full px-4 py-3.5 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none font-sans",
            error && "border-destructive focus:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

GradientInput.displayName = "GradientInput";
