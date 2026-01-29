import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface StepDefinition {
  id: number;
  label: string;
  icon: LucideIcon;
}

interface StepperProps {
  steps: StepDefinition[];
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick?: (stepIndex: number) => void;
}

export function Stepper({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: StepperProps) {
  return (
    <nav className="w-full">
      <ol className="flex items-start">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.has(step.id);
          const isCurrent = currentStep === step.id;
          const isUpcoming = !isCompleted && !isCurrent;
          const isLast = index === steps.length - 1;
          const isClickable = onStepClick && (isCompleted || isCurrent);

          return (
            <li
              key={step.id}
              className={cn("flex items-start", !isLast && "flex-1")}
            >
              <div
                className={cn(
                  "flex flex-col items-center gap-2",
                  isClickable && "cursor-pointer"
                )}
                onClick={isClickable ? () => onStepClick(step.id) : undefined}
              >
                {/* Circle */}
                <div
                  className={cn(
                    "h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isCompleted && "bg-green-100 border-green-500",
                    isCurrent &&
                      "bg-blue-100 border-blue-600 ring-4 ring-blue-50",
                    isUpcoming && "bg-slate-100 border-slate-300"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                  ) : (
                    <span
                      className={cn(
                        "text-xs md:text-sm font-bold",
                        isCurrent && "text-blue-700",
                        isUpcoming && "text-slate-400"
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    "text-xs whitespace-nowrap transition-colors duration-300 hidden sm:block",
                    isCompleted && "text-green-700 font-medium",
                    isCurrent && "text-blue-700 font-semibold",
                    isUpcoming && "text-slate-400"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mt-4 md:mt-5 mx-2 md:mx-3 transition-colors duration-300 rounded-full",
                    isCompleted ? "bg-green-500" : "bg-slate-200"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
