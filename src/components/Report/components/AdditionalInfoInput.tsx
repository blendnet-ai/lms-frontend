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

type AdditionalInfoInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const AdditionalInfoInput: React.FC<AdditionalInfoInputProps> = ({
  value,
  onChange,
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label>Additional information</Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <CircleHelp className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            Include any additional information that might be helpful in
            resolving the bug
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <Textarea
      value={value}
      onChange={onChange}
      placeholder="Provide any additional information such as environment, browser version, or screenshots"
      className="min-h-[100px]"
    />
    <div className="flex justify-between text-sm">
      <p className="text-muted-foreground">{value.length} characters</p>
    </div>
  </div>
);

export default AdditionalInfoInput;
