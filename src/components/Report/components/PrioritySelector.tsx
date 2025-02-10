import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

type PrioritySelectorProps = {
  control: Control<any>;
  name: string;
  error?: FieldError;
};

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  control,
  name,
  error,
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label>Bug priority</Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button">
            <CircleHelp className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            Choose the priority level of the bug: High/Medium/Low.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className="flex gap-4">
          {["high", "medium", "low"].map((priority) => (
            <div key={priority} className="flex items-center space-x-2">
              <Checkbox
                id={priority}
                checked={value === priority}
                onCheckedChange={() => onChange(priority)}
              />
              <Label
                htmlFor={priority}
                className={`${
                  priority === "high"
                    ? "text-red-500"
                    : priority === "medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                } font-medium`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
              </Label>
            </div>
          ))}
        </div>
      )}
    />
    {error && (
      <p className="text-sm text-red-500">
        {typeof error === "string" ? error : error.message}
      </p>
    )}
  </div>
);

export default PrioritySelector;
