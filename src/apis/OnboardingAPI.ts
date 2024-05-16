import apiConfig from "../configs/api";
import api from "../configs/axios";

type Field = {
  label: string;
  description?: string;
  required: boolean;
  type: string;
  options?: string[];
  name: string;
  value?: string;
};

export type Section = {
  heading: string;
  description: string;
  fields: Field[];
};

export type Form = {
  sections: Section[];
};

const OnboardingAPI = {
  getOnboardingData: async function (): Promise<Form> {
    console.log("Calling OnboardingAPI.getOnboardingData");

    const response = await api.request({
      url: `${apiConfig.USER_FROMS}/form?form_name=onboarding`,
      method: "GET",
    });

    console.log(response.data.data);

    return response.data.data;
  },
  submitOnboardingData: async function (form: Form) {
    console.log("Calling OnboardingAPI.submitOnboardingData");

    const response = await api.request({
      url: `${apiConfig.USER_FROMS}/form`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        form_name: "onboarding",
        user_data: {
          data: form,
        },
      },
    });

    console.log(response.data);
  },
};

export default OnboardingAPI;
