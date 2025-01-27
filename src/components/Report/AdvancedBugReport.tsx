import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BugTypeSelector from "./components/BugTypeSelector";
import DescriptionInput from "./components/DescriptionInput";
import PrioritySelector from "./components/PrioritySelector";
import AdditionalInfoInput from "./components/AdditionalInfoInput";
import { Toaster } from "../ui/toaster";
import { BugIcon } from "lucide-react";
import { generateReportLink } from "@/utils/mailTo";
import { auth } from "@/configs/firebase";

type FormData = {
  bugType: BugType | null;
  priority: Priority | null;
  description: string;
  additionalInfo: string;
};

export type BugType =
  | "Functionality Issue"
  | "Visual/Aesthetic Issue"
  | "Performance Issue"
  | "Security Issue"
  | "Data/Content Issue"
  | "Crash/Error Issue"
  | "Localization/Internationalization Issue"
  | "Usability/UX Issue"
  | "Other";

export type Priority = "high" | "medium" | "low";

export default function AdvancedBugReport() {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<FormData>({
    bugType: null,
    priority: null,
    description: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.bugType) {
      newErrors.bugType = "Please select a bug type";
      toast({
        variant: "destructive",
        title: "Bug Type Required",
        description: "Please select the type of bug you're reporting.",
      });
    }
    if (!formData.priority) {
      newErrors.priority = "Please select a priority level";
      toast({
        variant: "destructive",
        title: "Priority Required",
        description: "Please indicate the priority level of this bug.",
      });
    }
    if (!formData.description.trim()) {
      newErrors.description = "Please provide a description";
      toast({
        variant: "destructive",
        title: "Description Required",
        description: "Please provide a detailed description of the bug.",
      });
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
      toast({
        variant: "destructive",
        title: "Description Too Short",
        description: "Please provide a more detailed description of the bug.",
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let submitError: Error | null = null;

    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Invalid Form",
        description: "Please fill in all required fields correctly.",
      });
      return;
    }

    const Data = {
      bugType: formData.bugType,
      priority: formData.priority,
      description: formData.description,
      additionalInfo: formData.additionalInfo,
    };

    try {
      toast({
        title: "Submitting Report",
        description: "Please wait while we process your bug report...",
      });

      const response = await fetch(
        import.meta.env.VITE_GOOGLE_SHEET_BUG_REPORT_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Report Submitted",
          description: "Your bug report has been successfully submitted.",
          className: "bg-green-500",
        });
      } else {
        throw new Error(result.error || "Failed to save data");
      }
    } catch (error) {
      submitError = error as Error;
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Redirecting to email as backup...",
      });
    } finally {
      const emailSubject = `Bug report: lms.sakshm.com`;
      const emailBody = `
Bug Report Details
-----------------
Type: ${formData.bugType}
Priority: ${formData.priority}
Reporter: ${auth.currentUser?.email || "Not logged in"}
Date: ${new Date().toLocaleString()}

Description
----------
${formData.description}

Additional Information
--------------------
${formData.additionalInfo || "None provided"}

Steps to Reproduce
----------------
1. [Add specific steps]
2. [Continue steps]
3. [Final step]

Expected Result: [What should happen]
Actual Result: [What actually happens]

Contact Information
-----------------
Email: ${auth.currentUser?.email || "[Please provide email]"}
Phone: [Optional contact number]

Note: Please attach any relevant screenshots or error messages.
`;

      const supportEmail = "contact@sakshm.com";
      const CC =
        "sanchitsharma@blendnet.ai,yasir@blendnet.ai,vitika@blendnet.ai,abhishekpatil@blendnet.ai";

      const gmailLink = generateReportLink(
        supportEmail,
        CC,
        emailSubject,
        emailBody
      );

      window.open(gmailLink, "_blank");

      // Reset form
      setFormData({
        bugType: null,
        priority: null,
        description: "",
        additionalInfo: "",
      });

      setErrors({});
      window.location.reload();
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
      <DialogContent className="max-w-2xl max-h-[700px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal">Bug Report</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <BugTypeSelector
            selectedBugType={formData.bugType}
            onSelect={(type) => setFormData({ ...formData, bugType: type })}
            error={errors.bugType}
          />
          <DescriptionInput
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            error={errors.description}
          />
          <PrioritySelector
            selectedPriority={formData.priority}
            onSelect={(priority) => setFormData({ ...formData, priority })}
            error={errors.priority}
          />
          <AdditionalInfoInput
            value={formData.additionalInfo}
            onChange={(e) =>
              setFormData({ ...formData, additionalInfo: e.target.value })
            }
          />
          <Button type="submit" className="w-full mt-4">
            Submit Report
          </Button>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
