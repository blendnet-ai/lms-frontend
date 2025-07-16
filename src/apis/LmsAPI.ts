import api from "../configs/axios";
import apiConfig from "../configs/api";

const LMSAPI = {
  getOnboardingForm: async function () {
    const response = await api.request({
      url: `${apiConfig.LMS_BASE_URL}/custom_auth/form?form_name=onboarding`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Onboarding form:", response.data);
    return response.data.data;
  },
  submitOnboardingForm: async function (formData: any) {
    const response = await api.request({
      url: `${apiConfig.LMS_BASE_URL}/custom_auth/form?form_name=onboarding`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        form_name: "onboarding",
        user_data: { data: formData },
      },
      withCredentials: true,
    });

    // console.log("Onboarding form submitted:", response.data);
    return response.data;
  },
  getSasUrl: async function (recordingId: string) {
    const response = await api.request({
      url: `${apiConfig.LMS_BASE_URL}/programs/course/resource/get-sas-url/?blob_url=${encodeURIComponent(recordingId)}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  },
  uploadCvDetails: async function (data: any) {
    const response = await api.request({
      url: `${apiConfig.LMS_BASE_URL}/custom_auth/onboarding/upload-cv`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    });

    return response.data;
  },
};

export default LMSAPI;
