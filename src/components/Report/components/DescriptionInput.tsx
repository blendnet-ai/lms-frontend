import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

type DescriptionInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string | undefined;
};

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChange,
  error,
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label>Can you provide clarity on the issue? Help us understand</Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CircleHelp className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            Provide a detailed description of the bug including steps to
            reproduce it
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <Textarea
      value={value}
      onChange={onChange}
      placeholder="Provide a detailed description of the bug including steps to reproduce it, expected behavior, and actual behavior. Include any relevant information or observations."
      className={`min-h-[100px] ${error ? "border-red-500" : ""}`}
    />
    <div className="flex justify-between text-sm">
      <p className={`${value.length < 20 ? "text-red-500" : "text-green-500"}`}>
        {value.length}/20 characters minimum
      </p>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  </div>
);

export default DescriptionInput;
