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

export type PersonalityQuestionResponse = {
  question_id: number;
  answer_type: number;
  question: string;
  options: string[];
};

type GetDataResponse = {
  type: number;
  has_sections: boolean;
  question_list: number[];
};

export type GetTestsResponse = {
  heading: string;
  img_url: string;
  name: string;
};

export type GetRoutesResponse = {
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
  getPersonalityQuestion: async function (
    questionId: number,
    assessmentId: number
  ): Promise<PersonalityQuestionResponse> {
    console.log("Calling EvalAPI.getPersonalityQuestion");

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
  getData: async function (assessmentId: number): Promise<GetDataResponse> {
    console.log("Calling EvalAPI.getData");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/fetch-assessment-state?assessment_id=${assessmentId}`,
      method: "GET",
    });

    console.log(response.data);

    // const response = {
    //   type: 0,
    //   has_sections: false,
    //   question_list: [
    //     361, 328, 374, 356, 347, 349, 373, 324, 377, 357, 341, 337, 313, 371,
    //     330, 351, 372, 327, 345, 334, 362, 321, 322, 332, 358, 336, 323, 353,
    //     359, 350, 366, 316, 320, 354, 335, 343, 365, 329, 314, 317, 360, 340,
    //     319, 370, 352, 312, 369, 355, 342, 333, 344, 311, 325, 364, 368, 338,
    //     378, 326, 346, 367, 375, 331, 309, 315, 310, 318, 376, 339, 363, 348,
    //   ],
    // };

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
