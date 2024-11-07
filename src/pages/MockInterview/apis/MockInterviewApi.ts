import apiConfig from "../../../configs/api";
import api from "../../../configs/axios";

export enum ReportStatus {
  CREATION_PENDING = 0, // Not Started
  IN_PROGRESS = 1, // In Progress
  COMPLETED = 2, // Completed
  EVALUATION_PENDING = 3, // Evaluation Pending
  ABANDONED = 4, // Abandoned
}

type QuestionResponse = {
  question_id: number;
  answer_type: number;
  question: string;
  hint: string[];
  topics: string[];
  answer_audio_url: string;
  assessment_mode: number;
  is_superuser: boolean;
};

export type QuestionObject = {
  question_id: number;
  emotion_score: number;
  fluency_score: number;
  question_text: string;
  user_response: string;
  ideal_response: string;
  coherence_score: number;
};

export type GetReport = {
  status: ReportStatus;
  qualified: boolean;
  total_score: number | null;
  overall_summary: string | null;
  total_emotion_score: number | null;
  total_fluency_score: number | null;
  total_coherence_score: number | null;
  questions_analysis: QuestionObject[];
};

const MockInterviewAPI = {
  getInterviews: async function () {
    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/available-interview-types`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
  startAssessment: async function (type: number, role: string, level: string) {
    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/start-assessment`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        assessment_generation_id: type,
        assessment_generation_details: {
          role: role,
          difficulty_level: level,
        },
      },
    });

    console.log(response.data);

    return response.data.data;
  },
  getQuestion: async function (
    questionId: number,
    assessmentId: number
  ): Promise<QuestionResponse> {
    try {
      const response = await api.request({
        url: `${apiConfig.EVAL_V2_URL}/fetch-question?question_id=${questionId}&assessment_id=${assessmentId}`,
        method: "GET",
      });

      console.log(response);
      return response.data.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if ((error as any).response) {
          console.log((error as any).response.data);
        } else {
          console.log(error.message);
        }
      } else {
        console.log("An unknown error occurred");
      }
      throw (error as any).response.data;
    }
  },
  closeAssessment: async function (assessmentId: number) {
    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/close-assessment`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        assessment_id: assessmentId,
      },
    });

    console.log(response.data);
  },
  abandonAssessment: async function (assessmentId: number) {
    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/exit-assessment`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        assessment_id: assessmentId,
      },
    });

    console.log(response.data);
  },
  submitSpeaking: async function (questionId: number, assessmentId: number) {
    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/submit-assessment-answer-voice`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        question_id: questionId,
        assessment_id: assessmentId,
      },
    });

    console.log(response.data);

    return response.data.data;
  },
  getReport: async function (assessmentId: number): Promise<GetReport> {
    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/mock-interview-behavioural-report?assessment_id=${assessmentId}`,
      method: "GET",
    });

    // response.data.status = ReportStatus.COMPLETED;

    return response.data.data;
  },
};

export default MockInterviewAPI;
