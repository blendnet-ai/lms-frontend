import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { Priority } from "../AdvancedBugReport";

type PrioritySelectorProps = {
  selectedPriority: Priority | null;
  onSelect: (priority: Priority) => void;
  error: string | undefined;
};

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onSelect,
  error,
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label>Bug priority</Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CircleHelp className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            Choose the priority level of the bug: High/Medium/Low.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <div className="flex gap-4">
      {["high", "medium", "low"].map((priority) => (
        <div key={priority} className="flex items-center space-x-2">
          <Checkbox
            id={priority}
            checked={selectedPriority === priority}
            onCheckedChange={() => onSelect(priority as Priority)}
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
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

export default PrioritySelector;
