import { ViewDay } from "@mui/icons-material";
import api from "../configs/axios";
import apiConfig from "../configs/api";

type getChatMessagesResponse = {
  messages: ChatMessage[];
};

enum Sender {
  USER = "user",
  BOT = "bot",
}

export type ChatMessage = {
  message: string;
  id: number;
  type: Sender;
};

const ChatAPI = {
  getChatMessages: async function (
    videoId: string
  ): Promise<getChatMessagesResponse> {
    console.log("Calling ChatAPI.getChatMessages");

    const response = await api.request({
      url: `${apiConfig.AI_LEARNING_URL}/chat-history?video_id=${videoId}`,
      method: "GET",
    });

    console.log(response.data);

    return {
      messages: response.data.data,
    };
  },
};

export default ChatAPI;
