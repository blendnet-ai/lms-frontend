// src/configs/api.ts

const apiConfig = {
  // This is the only variable this file should be responsible for.
  BASE_URL: import.meta.env.VITE_LMS_BASE_URL,
  LIVE_CLASS_URL: import.meta.env.VITE_LMS_BASE_URL, 
  ACCOUNTS_URL: import.meta.env.VITE_LMS_BASE_URL,
  LMS_BASE_URL: import.meta.env.VITE_LMS_BASE_URL,
  WEBSOCKET_URL: import.meta.env.BACKEND_WEBSOCKET_URL,

};

export default apiConfig;