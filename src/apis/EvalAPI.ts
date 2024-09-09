import { Difficulty } from "../components/DifficultyChip/DifficultyChip";
import { TestCase } from "../components/DSATest/DSATest";
import apiConfig from "../configs/api";
import api from "../configs/axios";

export enum AssessmentMode {
  EVALUATION = 0,
  PRACTICE = 1,
}

export enum Assessment {
  LOGICAL = 1,
  LANGUAGE = 2,
  PERSONALITY = 3,
  DSA_PRACTICE = 5,
}

export type DSACodingQuestionResponse = {
  question_id: number;
  answer_type: number;
  question: string;
  hints: string[];
  questionTitle: string;
  exampleTestcases: TestCase[];
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
  assessment_mode: AssessmentMode;
};
export type ReportScoreSubSection = {
  name: string;
  percentage: number;
};
export type ReportInnerData = {
  correct?: number;
  incorrect?: number;
  not_attempted?: number;
  sections?: {
    name: string;
    percentage: number;
    emoji: string;
    sections?: ReportScoreSubSection[];
  }[];
};

export enum ReportStatus {
  IN_PROGRESS = 1,
  COMPLETED = 2,
  EVALUATION_PENDING = 3,
  ABANDONED = 4,
}

export type GetReportResponse = {
  heading: string;
  status: ReportStatus;
  type: number;
  percentage?: number;
  last_attempt: string;
  score_text?:
    | "INTJ"
    | "INTP"
    | "ENTJ"
    | "ENTP"
    | "INFJ"
    | "INFP"
    | "ENFJ"
    | "ENFP"
    | "ISTJ"
    | "ISFJ"
    | "ESTJ"
    | "ESFJ"
    | "ISTP"
    | "ISFP"
    | "ESTP"
    | "ESFP";
  short_description?: string;
  performance_tag?: string;
  additional_data?: ReportInnerData;
};

type GetDataResponse = {
  type: number;
  question_list: {
    questions: number[];
    section: string;
    skippable: boolean;
  }[];
  attempted_questions: {
    question_id: number;
    section: number;
    mcq_answer: number | null;
    multiple_mcq_answer: (number | null)[] | null;
    answer_text: string | null;
    answer_audio_url: string | null;
  }[];
  eval_home: {
    heading: string;
    img_url: string;
  };
  time_left: number;
  start_time: string;
  test_duration: string;
};

const EvalAPI = {
  startAssessment: async function (type: Assessment) {
    console.log("Calling EvalAPI.getUserData");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/start-assessment`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        assessment_generation_id: type,
      },
    });

    console.log(response.data);

    return response.data.data;
  },
  getData: async function (assessmentId: number): Promise<GetDataResponse> {
    console.log("Calling EvalAPI.getData");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/fetch-assessment-state?assessment_id=${assessmentId}`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
  getQuestion: async function (
    questionId: number,
    assessmentId: number
  ): Promise<DSACodingQuestionResponse> {
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
    console.log("Calling EvalAPI.submitMCQ");

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
  getReport: async (
    assessmentId: string | null
  ): Promise<GetReportResponse[]> => {
    console.log("Calling EvalAPI.getReport");

    let urlToGetSingleReport = `${apiConfig.EVAL_V2_URL}/fetch-individual-scorecard`;
    let urlToGetAllReports = `${apiConfig.EVAL_V2_URL}/fetch-scorecard`;
    if (assessmentId) {
      urlToGetSingleReport += `?assessment_id=${assessmentId}`;
      const response = await api.request({
        url: urlToGetSingleReport,
        method: "GET",
      });
      console.log("urlToGetSingleReport");
      return Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
    } else {
      const response = await api.request({
        url: urlToGetAllReports,
        method: "GET",
      });

      console.log("urlToGetAllReports");
      return response.data.data;
    }
  },
};

export default EvalAPI;
