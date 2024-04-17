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
};
