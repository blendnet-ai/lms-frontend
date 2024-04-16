import apiConfig from "../configs/api";
import api from "../configs/axios";

type submitMCQResponseResponse = {
  score_added: number;
};

const SubmitQuestionResponse = {
  submitMCQResponse: async function (
    videoId: string,
    chapterId: string,
    questionId: string,
    userResponse: number
  ): Promise<submitMCQResponseResponse> {
    console.log("Calling SubmitQuestionResponse.submitMCQResponse");

    const response = await api.request({
      url: `${apiConfig.AI_LEARNING_URL}/submit-question-response/?type=in-video&video_id=${videoId}&chapter_id=${chapterId}&question_id=${questionId}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        response: userResponse,
      }),
    });

    console.log(response.data);

    return response.data.data;
  },
};

export default SubmitQuestionResponse;
