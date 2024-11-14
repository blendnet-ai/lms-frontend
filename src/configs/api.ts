const apiConfig = {
  BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL,
  WEB_SOCKET_URL: import.meta.env.VITE_BACKEND_WEBSOCKET_URL,
  DSA_BOT_WS_URL: import.meta.env.VITE_BACKEND_DSA_BOT_WS_URL,
  PRACTICE_URL: "/practice",
  AI_LEARNING_URL: "/ai_learning",
  EVAL_URL: "/practice/eval",
  AUTH: "/auth",
  EVAL_V2_URL: "/evaluation",
  EVAL_URL_LMS: `${import.meta.env.VITE_LMS_BASE_URL}/evaluation`,
  FEEDBACK_URL: "/feedback",
  STATS: "/stats",
  CONFIG: "/data",
  GOOGLE_SHEETS_URL: import.meta.env.VITE_GOOGLE_SHEETS_URL,
  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  DOUBT_SOLVING: "/doubt_solving",
  DOUBT_SOLVING_WS_URL: import.meta.env.VITE_BACKEND_DOUBT_SOLVING_URL,
};

export default apiConfig;
