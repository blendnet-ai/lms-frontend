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

    const response = await fetch("http://192.168.1.7:5001");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Assuming the response is JSON data
    console.log(data); // Handle the JSON response data
    return {
      messages: data,
    };
  },
};

export default ChatAPI;
