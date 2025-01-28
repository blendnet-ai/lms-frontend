import { FormData } from "@/components/Report/AdvancedBugReport";

type EmailBody = string;

function generateEmailBody(
  formData: Required<Pick<FormData, "bugType" | "priority" | "description">> &
    Partial<Pick<FormData, "additionalInfo">>,
  userEmail?: string
): EmailBody {
  const timestamp: string = new Date().toLocaleString();
  const additionalInfo: string = formData.additionalInfo || "None provided";
  const reporterEmail: string = userEmail || "Not logged in";

  return `
Bug Report Details
-----------------
Type: ${formData.bugType}
Priority: ${formData.priority}
Reporter: ${reporterEmail}
Date: ${timestamp}

Description
----------
${formData.description}

Additional Information
--------------------
${additionalInfo}

Steps to Reproduce
----------------
1. [Add specific steps]
2. [Continue steps]
3. [Final step]

Expected Result: [What should happen]
Actual Result: [What actually happens]

Contact Information
-----------------
Email: ${userEmail || "[Please provide email]"}
Phone: [Optional contact number]

Note: Please attach any relevant screenshots or error messages.
`;
}

export default generateEmailBody;
