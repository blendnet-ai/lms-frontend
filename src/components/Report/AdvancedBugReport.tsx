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
import submitData from "@/apis/GoogleSheetsApi";
import { useForm } from "react-hook-form";
import generateEmailBody from "@/utils/generateEmailBody";

export type FormData = {
  bugType: BugType;
  priority: Priority;
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

  const form = useForm<FormData>({
    defaultValues: {
      bugType: undefined,
      priority: undefined,
      description: "",
      additionalInfo: "",
    },
  });

  const { handleSubmit, formState } = form;
  const { errors } = formState;

  const handleSubmitForm = async (formData: any) => {
    try {
      toast({
        title: "Submitting Report",
        description: "Please wait while we process your bug report...",
      });

      const response = await submitData(formData);
      console.log("response", response);

      if (!response) {
        throw new Error("Failed to submit the report");
      }

      toast({
        title: "Report Submitted",
        description: "Your bug report has been successfully submitted.",
        className: "bg-green-500",
      });

      // Create email backup
      const emailData = {
        subject: `Bug report: lms.sakshm.com`,
        body: generateEmailBody(formData, auth.currentUser?.email ?? ""),
        supportEmail: "contact@sakshm.com",
        cc: "sanchitsharma@blendnet.ai,yasir@blendnet.ai,vitika@blendnet.ai,abhishekpatil@blendnet.ai",
      };

      const gmailLink = generateReportLink(
        emailData.supportEmail,
        emailData.cc,
        emailData.subject,
        emailData.body
      );

      window.open(gmailLink, "_blank");
      form.reset();
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Redirecting to email as backup...",
      });
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

        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="space-y-6"
          noValidate
        >
          <BugTypeSelector
            control={form.control}
            name="bugType"
            error={errors.bugType}
          />
          <DescriptionInput
            control={form.control}
            name="description"
            error={errors.description}
          />
          <PrioritySelector
            control={form.control}
            name="priority"
            error={errors.priority}
          />
          <AdditionalInfoInput
            control={form.control}
            name="additionalInfo"
            error={errors.additionalInfo}
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
