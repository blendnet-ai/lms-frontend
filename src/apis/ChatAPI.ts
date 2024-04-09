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

    const response = {
      data: {
        messages: [
          {
            message: "Message by bot",
            type: Sender.BOT,
            id: 1,
          },
          {
            message: "Message by user",
            type: Sender.USER,
            id: 2,
          },
        ],
      },
    };

    console.log(response.data);

    return response.data;
  },
};

export default ChatAPI;
