import { ViewDay } from "@mui/icons-material";
import api from "../configs/axios";

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

    let response = await api.request({
      url: `/chat-history?video_id=${videoId}`,
      method: "GET",
    });

    for (let i = 0; i < response.data.data.length; i++) {
      response.data.data[i].id = i;
    }
    console.log(response.data);

    return {
      messages: response.data.data,
    };
  },
};

export default ChatAPI;
