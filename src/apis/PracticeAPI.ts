import apiConfig from "../configs/api";
import api from "../configs/axios";

export type GetQuestionResponse = {
  id: string;
  question: string;
  time_limit: number;
  hints: string;
  audio_url: string;
};

export const PracticeAPI = {
  getQuestion: async function (): Promise<GetQuestionResponse> {
    console.log("Calling PracticeAPI.getQuestion");
    const response = await api.request({
      url: `${apiConfig.PRACTICE_URL}/questions`,
      params: { type: "IP" },
      method: "GET",
    });

    return response.data.data[0];
  },
};
