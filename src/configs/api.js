import env from "react-dotenv";

const apiConfig = {
  BASE_URL: env.BACKEND_BASE_URL,
  WEB_SOCKET_URL: env.BACKEND_WEBSOCKET_URL,
  DSA_BOT_WS_URL: env.BACKEND_DSA_BOT_WS_URL,
  PRACTICE_URL: "/practice",
  AI_LEARNING_URL: "/ai_learning",
  EVAL_URL: "/practice/eval",
  AUTH: "/auth",
  EVAL_V2_URL: "/evaluation",
  GOOGLE_SHEETS_URL: env.GOOGLE_SHEETS_URL
};

export default apiConfig;
