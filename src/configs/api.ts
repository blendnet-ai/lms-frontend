const apiConfig = {
  BASE_URL: window.env.VITE_LMS_BASE_URL,
  LMS_BASE_URL: window.env.VITE_LMS_BASE_URL,
  EVAL_URL_LMS: `${window.env.VITE_LMS_BASE_URL}/evaluation`,
  LIVE_CLASS_URL: `${window.env.VITE_LMS_BASE_URL}/en`,
  LMS_ONBOARDING_URL: `${window.env.VITE_LMS_BASE_URL}/custom_auth/onboarding`,
  FIREBASE_API_KEY: window.env.VITE_FIREBASE_API_KEY,
  GOOGLE_SHEETS_URL: import.meta.env.VITE_GOOGLE_SHEET_BUG_REPORT_URL,
};

export default apiConfig;
