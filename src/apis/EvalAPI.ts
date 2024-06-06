import apiConfig from "../configs/api";
import api from "../configs/axios";

export enum Assessment {
  LOGICAL = 1,
  LANGUAGE = 2,
  PERSONALITY = 3,
}

type SubmitAssessmentReponse = {
  questions: number[];
  total_number: number;
  assessment_id: number;
};

export type MMCQQuestionResponse = {
  question_id: number;
  audio_url: string;
  answer_type: number;
  paragraph: string;
  questions: {
    question: string;
    options: string[];
  }[];
  image_url?: string[];
};

export type MCQQuestionResponse = {
  question_id: number;
  answer_type: number;
  question: string;
  options: string[];
  image_url?: string[];
};

export type WritingQuestionResponse = {
  question_id: number;
  answer_type: number;
  question: string;
};

export type SpeakingQuestionResponse = {
  question_id: number;
  answer_type: number;
  question: string;
  hint: string;
  answer_audio_url: string;
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

export type GetRoutesResponse = {
  assessment_generation_id: number;
  test: {
    heading: string;
  };
  welcome: {
    heading: string;
    heading_inner: string;
    instructions: string;
    img_url: string;
  };
  eval_home: {
    heading: string;
    img_url: string;
  };
  name: string;
};

export type GetEvalHistoryReponse = {
  filter_options: {
    name: string;
    type: number;
    shortForm: string;
  }[];
  attempted_list: {
    type: number;
    assessment_id: number;
    percentage?: number;
    last_attempted?: string;
    short_description?: string;
  }[];
};

export type GetDashboardDataResponse = {
  assessment_attempt_id: number;
  assessment_display_name: string;
  assessment_generation_id: number;
  latest_time: string;
  max_attempts: number;
  number_of_attempts: number;
  status: string;
  name: string;
  img_url: string;
};

const EvalAPI = {
  startAssessment: async function (
    type: Assessment
  ): Promise<SubmitAssessmentReponse> {
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
  getQuestion: async function (
    questionId: number,
    assessmentId: number
  ): Promise<
    | MCQQuestionResponse
    | MMCQQuestionResponse
    | WritingQuestionResponse
    | SpeakingQuestionResponse
  > {
    console.log("Calling EvalAPI.getQuestion");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/fetch-question?question_id=${questionId}&assessment_id=${assessmentId}`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
  submitMCQ: async function (
    questionId: number,
    assessmentId: number,
    mcqAnswer: number
  ) {
    console.log("Calling EvalAPI.submitMCQ");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/submit-assessment-answer-mcq`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        question_id: questionId,
        assessment_id: assessmentId,
        mcq_answer: mcqAnswer,
      },
    });

    console.log(response.data);
  },
  submitWriting: async function (
    questionId: number,
    assessmentId: number,
    writingAnswer: string
  ) {
    console.log("Calling EvalAPI.submitWriting");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/submit-assessment-answer-subjective`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        question_id: questionId,
        assessment_id: assessmentId,
        answer_text: writingAnswer,
      },
    });

    console.log(response.data);
  },
  submitSpeaking: async function (questionId: number, assessmentId: number) {
    console.log("Calling EvalAPI.submitWriting");

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
  },
  submitMMCQ: async function (
    questionId: number,
    assessmentId: number,
    mmcqAnswer: (number | null)[]
  ) {
    console.log("Calling EvalAPI.submitMCQ");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/submit-assessment-answer-mmcq`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        question_id: questionId,
        assessment_id: assessmentId,
        multiple_mcq_answer: mmcqAnswer,
      },
    });

    console.log(response.data);
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
  exitAssessment: async function (assessmentId: number) {
    console.log("Calling EvalAPI.exitAssessment");

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
  getRoutes: async function (): Promise<GetRoutesResponse[]> {
    console.log("Calling EvalAPI.getTestRoutes");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/assessment-display-data`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
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
      return Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
    } else {
      const response = await api.request({
        url: urlToGetAllReports,
        method: "GET",
      });

      return Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
    }
  },
  getEvalHistory: async (): Promise<GetEvalHistoryReponse> => {
    console.log("Calling EvalAPI.getDashboardData");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/fetch-assessment-history`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
  getDashboardData: async (): Promise<GetDashboardDataResponse[]> => {
    console.log("Calling EvalAPI.getDashboardData");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dashboard-data`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
};

export default EvalAPI;
