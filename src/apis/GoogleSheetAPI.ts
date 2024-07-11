import axios from "axios";
import apiConfig from "../configs/api";

interface IFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const submitData = async (formData: IFormData) => {
  const urlGoogleSheets = `${apiConfig.GOOGLE_SHEETS_URL}`;

  const form = new FormData();
  for (const key in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, key)) {
      form.append(key, formData[key as keyof IFormData]);
    }
  }

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
