import axios from "axios";
import apiConfig from "../configs/api";
import { BugType, Priority } from "@/components/Report/AdvancedBugReport";

interface IFormData {
  bugType: BugType | null;
  priority: Priority | null;
  description: string;
  additionalInfo: string;
}

const submitData = async (formData: IFormData) => {
  const urlGoogleSheets = `${apiConfig.GOOGLE_SHEETS_URL}`;

  const form = new FormData();

  // Map the form fields to match sheet headers exactly
  form.append("Bug Type", formData.bugType ?? "");
  form.append("Priority", formData.priority ?? "");
  form.append("Description", formData.description ?? "");
  form.append("Additional Info", formData.additionalInfo ?? "");

  console.log("Form data", form);

  try {
    const response = await axios.post(urlGoogleSheets, form);

    if (response.status !== 200) {
      console.error("Error: Response status is not 200", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error: Request failed", error);
    return false;
  }
};

export default submitData;
