import api from "../configs/axios";

type submitMCQResponseResponse = {
  score_added: number;
};

const SubmitQuestionResponse = {
  submitMCQResponse: async function (
    videoId: string,
    questionId: string,
    userResponse: string
  ): Promise<submitMCQResponseResponse> {
    console.log("Calling SubmitQuestionResponse.submitMCQResponse");

    const getScore = () => {
      if (userResponse == "one") return 0;
      return 10;
    };
    // TODO: unhardcode this
    const response = {
      data: {
        score_added: getScore(),
      },
    };

    console.log(response.data);

    return response.data;
  },
};

export default SubmitQuestionResponse;
