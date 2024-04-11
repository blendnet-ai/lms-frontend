import env from "react-dotenv";

const apiConfig = {
  BASE_URL: env.BACKEND_BASE_URL,
  WEB_SOCKET_URL: env.BACKEND_WEBSOCKET_URL,
};

export default apiConfig;
