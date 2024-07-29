import apiConfig from "../configs/api";
import api from "../configs/axios";
import { Question } from "../pages/DSAPracticeList/QuestionsList";

export enum RUNNING_STATE {
  PENDING = "pending",
  COMPLETED = "completed",
}

export type TestCaseResult = {
  inputs: string;
  output: string;
  expected: string;
  error: string;
  passed: boolean;
};

export type GetStatusResponse = {
  test_cases: TestCaseResult[];
  state: RUNNING_STATE;
};

export type GetQuestionsResponse = {
  questions: Question[];
  topics: string[];
  companies: string[];
};

export type GetStateResponse = {
  attempted_questions: {
    question_id: number;
    code: string;
  }[];
};

export type GetReport = {
  top?: {
    student_name: string;
    date_of_session: string;
    title_of_the_dsa_problem: string;
    difficulty_level_and_tags: string;
  };
  total_score?: {
    score: number;
    overall_feedback: string;
  };
  detailed_performance_analysis?: {
    correctness: {
      score: number;
      feedback: string;
    };
    efficiency: {
      score: number;
      time_complexity: string;
      space_complexity: string;
      optimum_time_complexity: string;
    };
    code_quality: {
      score: number;
      code_readability: string;
      variable_naming: string;
      code_structure: string;
      usage_of_comments: string;
    };
    improvement_and_learning: {
      score: number;
      feedback: string;
    };
  };
  session_insights: {
    key_strengths: string;
    areas_for_improvement: string;
  };
  footer: {
    encouraging_note: string;
  };
  revision_topics: string;
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
  getQuestions: async function (): Promise<GetQuestionsResponse> {
    console.log("Calling DSAPracticeAPI.getQuestions");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dsa-questions-list`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
  createAttempt: async function (questionId: number) {
    console.log("Calling DSAPracticeAPI.createAttempt");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/generate-dsa-practice-attempt?question_id=${questionId}`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
  getReport: async function (assessmentId: number): Promise<GetReport> {
    console.log("Calling DSAPracticeAPI.getReport");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dsa-practice-report?assessment_id=${assessmentId}`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
  getState: async function (assessmentId: string): Promise<GetStateResponse> {
    console.log("Calling DSAPracticeAPI.getState");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/fetch-assessment-state?assessment_id=${assessmentId}`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
  postIssue: async function (
    assessmentId: number,
    issue: string,
    issueDetails: string,
    questionId: number
  ) {
    console.log("Calling DSAPracticeAPI.postIssue");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/submit-question-report`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        assessment_attempt_id: assessmentId,
        type_of_issue: issue,
        question_id: questionId,
        description: issueDetails,
      },
    });

    console.log(response.data);

    return response.data.data;
  },
  getHistory: async function () {
    console.log("Calling DSAPracticeAPI.getHistory");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dsa-practice-report-history`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },
};

export default DSAPracticeAPI;
