import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bug, HelpCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { auth } from "../configs/firebase";
import { generateReportLink } from "../utils/mailTo";

export default function BugReport() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const restrictedRoutes = [""];

  const Body = `
Hi Team,

I would like to report the following bug:

Bug Description: [Define the bug here]

Steps to Reproduce:
1. [Step one]
2. [Step two]
3. [Step three]

(Optional) Attached are screenshots of the issue for your reference.

Thank you for your attention to this matter.

Contact Details : 
- Logged In Email : ${auth.currentUser?.email}
- Phone Number : [Your Phone Number, in case we need to reach out to you]

Best regards,
[Your Name]
`;

  const supportEmail = "contact@sakshm.com";
  const CC =
    "sanchitsharma@blendnet.ai,yasir@blendnet.ai,vitika@blendnet.ai,abhishekpatil@blendnet.ai";
  const Subject = "Bug report: lms.sakshm.com";

  const handleReport = () => {
    const gmailLink = generateReportLink(supportEmail, CC, Subject, Body);
    window.open(gmailLink, "_blank");
    setOpen(false);
  };

  if (restrictedRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="rounded-full h-14 w-14 md:h-16 md:w-16">
            <HelpCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report a Bug</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <Button variant="default" className="w-full" onClick={handleReport}>
              <Bug className="mr-2 h-4 w-4" />
              Report Bug
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
