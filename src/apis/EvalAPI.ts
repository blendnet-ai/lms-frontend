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

type GetDataResponse = {
  type: number;
  has_sections: boolean;
  question_list: number[];
  attempted_questions: {
    question_id: number;
    section: number;
    mcq_answer: number | null;
    multiple_mcq_answer: (number | null)[] | null;
    answer_text: string | null;
    answer_audio_url: string | null;
  }[];
  time_left: number;
};

export type GetTestsResponse = {
  heading: string;
  img_url: string;
  name: string;
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
  name: string;
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
  ): Promise<MCQQuestionResponse> {
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
  getTests: async function (): Promise<GetTestsResponse[]> {
    console.log("Calling EvalAPI.getTests");

    const response = [
      {
        heading: "Communication Skills",
        name: "communication",
        img_url: "",
      },
      {
        heading: "Quantitative Ability",
        name: "quant",
        img_url: "",
      },
      {
        heading: "Psychometric Assessment",
        name: "psychometric",
        img_url: "",
      },
    ];

    return response;
  },
  getRoutes: async function (): Promise<GetRoutesResponse[]> {
    console.log("Calling EvalAPI.getTestRoutes");

    const response = [
      {
        assessment_generation_id: 1,
        test: {
          heading: "Quantitative test",
        },
        welcome: {
          heading: "Welcome to quantitative test",
          heading_inner: "Welcome to your quantitative test",
          instructions: "sample text",
          img_url: "",
        },
        eval_home: {
          heading: "Quantitative Ability",
          img_url: "",
        },
        name: "quant",
      },
      {
        assessment_generation_id: 3,
        test: {
          heading: "Psychometric test",
        },
        welcome: {
          heading: "Welcome to psychometric test",
          heading_inner: "Welcome to your psychometric test",
          instructions: "sample text",
          img_url: "",
        },
        eval_home: {
          heading: "Psychometric Assessment",
          img_url: "",
        },
        name: "psychometric",
      },
      {
        assessment_generation_id: 2,
        test: {
          heading: "Communication test",
        },
        welcome: {
          heading: "Welcome to communication test",
          heading_inner: "Welcome to your communication test",
          instructions:
            "This test will have total 4 sections. Speaking, reading writing, reading, listening. each section will have 20 questions. 30 mins for each section.",
          img_url: "",
        },
        eval_home: {
          heading: "Communication Skills",
          img_url: "",
        },
        name: "communication",
      },
    ];

    return response;
  },
};

export default EvalAPI;
