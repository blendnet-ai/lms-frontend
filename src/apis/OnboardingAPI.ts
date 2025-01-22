import api from "../configs/axios";
import apiConfig from "../configs/api";

const ONBOARDINGAPI = {
  getOnboardingStatus: async function () {
    const response = await api.request({
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
    const response = await api.request({
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
  sendOtp: async function (phone: string) {
    const response = await api.request({
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
  verifyOtp: async function (code: string, otp: string, phone: string) {
    const response = await api.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/verify-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        code: code,
        otp_value: otp,
        phone_number: phone,
      },
      withCredentials: true,
    });

    // console.log("OTP verified:", response.data);
    return response.data;
  },
  skipTelegramOnboarding: async function () {
    const response = await api.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/skip-telegram-onboarding`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Onboarding status:", response.data);
    return response.data;
  },
};

export default ONBOARDINGAPI;
