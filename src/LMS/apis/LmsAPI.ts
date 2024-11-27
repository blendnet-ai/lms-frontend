import axios from "axios";
import apiConfig from "../../configs/api";

const LMSAPI = {
  getOnboardingStatus: async function () {
    const response = await axios.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/status`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Onboarding status:", response.data);
    return response.data;
  },
  getOnboardingStep: async function () {
    const response = await axios.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/step`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Onboarding step:", response.data);
    return response.data;
  },
  getOnboardingForm: async function () {
    const response = await axios.request({
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
    const response = await axios.request({
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
  sendOtp: async function (phone: string) {
    const response = await axios.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/send-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        phone_number: phone,
      },
      withCredentials: true,
    });

    // console.log("OTP sent:", response.data);
    return response.data;
  },
  verifyOtp: async function (phone: string, otp: string) {
    console.log("phone:", phone, "otp:", otp);
    const response = await axios.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/verify-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        phone_number: phone,
        otp_value: otp,
      },
      withCredentials: true,
    });

    // console.log("OTP verified:", response.data);
    return response.data;
  },
};

export default LMSAPI;
