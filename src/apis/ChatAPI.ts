import { ViewDay } from "@mui/icons-material";
import api from "../configs/axios";
import apiConfig from "../configs/api";

type getChatMessagesResponse = {
  messages: ChatMessage[];
};

export enum Sender {
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

  getDSAChatMessages: async function (
    dsaQuestionId: string
  ): Promise<getChatMessagesResponse> {
    console.log("Calling ChatAPI.getDSAChatMessages");

    // const response = await api.request({
    //   url: `${apiConfig.AI_LEARNING_URL}/chat-history?dsa_question_id=${dsaQuestionId}`,
    //   method: "GET",
    // });

    const response = {
      data: [
        {
          message: "Some msg",
          id: 1,
          type: Sender.USER,
        },
        {
          message: "Some msg",
          id: 2,
          type: Sender.BOT,
        },
        {
          message: "Some msg",
          id: 3,
          type: Sender.USER,
        },
        {
          message: "Some msg",
          id: 4,
          type: Sender.BOT,
        },
      ],
    };

    console.log(response.data);

    return {
      messages: response.data,
    };
  },
};

export default ChatAPI;
