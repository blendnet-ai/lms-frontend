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
import { Control, Controller, FieldError } from "react-hook-form";

type AdditionalInfoInputProps = {
  control: Control<any>;
  name: string;
  error?: FieldError;
};

const AdditionalInfoInput: React.FC<AdditionalInfoInputProps> = ({
  control,
  name,
  error,
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label>Additional information</Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button">
            <CircleHelp className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            Include any additional information that might be helpful in
            resolving the bug
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <>
          <Textarea
            value={value || ""}
            onChange={onChange}
            placeholder="Provide any additional information such as environment, browser version, or screenshots"
            className="min-h-[100px]"
          />
          <div className="flex justify-between text-sm">
            <p className="text-muted-foreground">
              {(value || "").length} characters
            </p>
          </div>
        </>
      )}
    />
    {error && (
      <p className="text-sm text-red-500">
        {typeof error === "string" ? error : error.message}
      </p>
    )}
  </div>
);

export default AdditionalInfoInput;
