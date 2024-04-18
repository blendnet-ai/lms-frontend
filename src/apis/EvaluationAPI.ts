import api from "../configs/axios";
import apiConfig from "../configs/api";

type EvalField = {
  score: number;
};

type VocabEvalField = {
  score: string;
};

type IdeaEvalField = {
  isComputed: boolean;
};

type EvalType = {
  Fluency: EvalField;
  Pronunciation: EvalField;
  Grammar: EvalField;
  Vocab: VocabEvalField;
  Cefr: EvalField;
  Coherence: EvalField;
  Emotion: EvalField;
  Ideal: IdeaEvalField;
};

export type GetEvaluationAPIResponse = {
  status: string;
  overall_score?: number;
  overall_performance?: string;
  summary?: string;
  audio_url?: string;
  evaluation_response: EvalType;
};

export type GetReviewResponseResponse = {
  question_text: string;
  user_response: string;
  ideal_response: string;
};

export const EvaluationAPI = {
  getEvaluation: async function (
    questionId: string
  ): Promise<GetEvaluationAPIResponse> {
    const response = await api.request({
      url: `${apiConfig.PRACTICE_URL}/question_evaluation/${questionId}`,
      method: "GET",
    });

    console.log(response.data);

    return response.data;
  },
  getReviewResponse: async function (
    questionId: string
  ): Promise<GetReviewResponseResponse> {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL}/review_response/${questionId}`,
      method: "GET",
    });

    console.log(response.data);
    return response.data;
  },
};
