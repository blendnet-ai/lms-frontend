import React from "react";
import { Button } from "@/components/ui/button";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { BugType } from "../AdvancedBugReport";

type BugTypeSelectorProps = {
  selectedBugType: BugType | null;
  onSelect: (type: BugType) => void;
  error: string | undefined;
};

const BugTypeSelector: React.FC<BugTypeSelectorProps> = ({
  selectedBugType,
  onSelect,
  error,
}) => {
  const bugTypes: BugType[] = [
    "Functionality Issue",
    "Visual/Aesthetic Issue",
    "Performance Issue",
    "Security Issue",
    "Data/Content Issue",
    "Crash/Error Issue",
    "Localization/Internationalization Issue",
    "Usability/UX Issue",
    "Other",
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label>Reason for reporting this bug?</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleHelp className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              Select the main category that best describes the issue
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-wrap gap-2">
        {bugTypes.map((type) => (
          <Button
            key={type}
            type="button"
            variant={selectedBugType === type ? "default" : "light"}
            className="rounded-full"
            onClick={() => onSelect(type)}
          >
            {type}
          </Button>
        ))}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default BugTypeSelector;
