import * as React from "react";
import { CircleHelp, BugIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

type BugType =
  | "Functionality Issue"
  | "Visual/Aesthetic Issue"
  | "Performance Issue"
  | "Security Issue"
  | "Data/Content Issue"
  | "Crash/Error Issue"
  | "Localization/Internationalization Issue"
  | "Usability/UX Issue"
  | "Other";

type Priority = "high" | "medium" | "low";

type FormData = {
  bugType: BugType | null;
  priority: Priority | null;
  description: string;
  additionalInfo: string;
  files: File[];
};

export default function AdvancedBugReport() {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<FormData>({
    bugType: null,
    priority: null,
    description: "",
    additionalInfo: "",
    files: [],
  });
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.bugType) newErrors.bugType = "Please select a bug type";
    if (!formData.priority)
      newErrors.priority = "Please select a priority level";
    if (!formData.description.trim())
      newErrors.description = "Please provide a description";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles = formData.files.length + selectedFiles.length;

    if (totalFiles > 5) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You can only upload up to 5 files",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...selectedFiles],
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      // Reset form after successful submission
      setFormData({
        bugType: null,
        priority: null,
        description: "",
        additionalInfo: "",
        files: [],
      });
      // Close dialog or show success message
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="fixed bottom-4 right-4 z-50">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg 
            bg-gradient-to-r from-cyan-500 to-blue-500 
            hover:scale-110 hover:rotate-3
            transition-all duration-300 ease-out"
        >
          <BugIcon className="h-6 w-6 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal">Bug Report</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              {[
                "Functionality Issue",
                "Visual/Aesthetic Issue",
                "Performance Issue",
                "Security Issue",
                "Data/Content Issue",
                "Crash/Error Issue",
                "Localization/Internationalization Issue",
                "Usability/UX Issue",
                "Other",
              ].map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={formData.bugType === type ? "default" : "light"}
                  className="rounded-full"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      bugType: type as BugType,
                    }))
                  }
                >
                  {type}
                </Button>
              ))}
            </div>
            {errors.bugType && (
              <p className="text-sm text-red-500">{errors.bugType}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>
                Can you provide clarity on the issue? Help us understand
              </Label>
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
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Provide a detailed description of the bug including steps to reproduce it, expected behavior, and actual behavior. Include any relevant information or observations."
              className={`min-h-[100px] ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

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
                    Priority indicates the urgency and impact of the bug.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="high"
                  checked={formData.priority === "high"}
                  onCheckedChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: formData.priority === "high" ? null : "high",
                    }))
                  }
                />
                <Label htmlFor="high" className="text-red-500 font-medium">
                  High Priority
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="medium"
                  checked={formData.priority === "medium"}
                  onCheckedChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      priority:
                        formData.priority === "medium" ? null : "medium",
                    }))
                  }
                />
                <Label htmlFor="medium" className="text-yellow-500 font-medium">
                  Medium Priority
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="low"
                  checked={formData.priority === "low"}
                  onCheckedChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: formData.priority === "low" ? null : "low",
                    }))
                  }
                />
                <Label htmlFor="low" className="text-green-500 font-medium">
                  Low Priority
                </Label>
              </div>
            </div>
            {errors.priority && (
              <p className="text-sm text-red-500">{errors.priority}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Attach files (Max 5)</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Upload up to 5 files (images/screenshots)
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <input
              type="file"
              id="files"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              className="w-[150px]"
              onClick={() => document.getElementById("files")?.click()}
            >
              Choose files
            </Button>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.files.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="danger"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100"
                    onClick={() => removeFile(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>

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
              value={formData.additionalInfo}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  additionalInfo: e.target.value,
                }))
              }
              placeholder="Include any additional information that might be helpful in resolving the bug, such as error logs, console outputs, or relevant URLs."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-between">
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogTrigger>
            <Button
              type="submit"
              className="bg-[#0D7490] hover:bg-[#0D7490]/90"
            >
              Submit report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
