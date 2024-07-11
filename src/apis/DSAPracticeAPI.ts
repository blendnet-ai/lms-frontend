import apiConfig from "../configs/api";
import api from "../configs/axios";

export enum RUNNING_STATE {
  PENDING = "pending",
  COMPLETED = "completed",
}

export type GetStatusResponse = {
  test_cases: {
    inputs: string;
    output: string;
    expected: string;
    error: string;
    passed: boolean;
  }[];
  state: RUNNING_STATE;
};

const DSAPracticeAPI = {
  runSolution: async function (
    questionId: number,
    assessmentId: number,
    type: string,
    language: string,
    code: string
  ) {
    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dsa-execute`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        question_id: questionId,
        assessment_attempt_id: assessmentId,
        type_of_evaluation: type,
        language: language,
        code: code,
      },
    });

    console.log(response);

    console.log("Calling DSAPracticeAPI.runSolution");
  },

  getStatus: async function (
    questionId: number,
    assessmentId: number
  ): Promise<GetStatusResponse> {
    console.log("Calling DSAPracticeAPI.getStatus");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dsa-execution-status?question_id=${questionId}&assessment_attempt_id=${assessmentId}`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
};

export default DSAPracticeAPI;
