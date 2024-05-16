import env from "react-dotenv";

const apiConfig = {
  BASE_URL: env.BACKEND_BASE_URL,
  WEB_SOCKET_URL: env.BACKEND_WEBSOCKET_URL,
  PRACTICE_URL: "/practice",
  AI_LEARNING_URL: "/ai_learning",
  EVAL_URL: "/practice/eval",
  USER_FROMS: "/user_forms",
};

export default apiConfig;
