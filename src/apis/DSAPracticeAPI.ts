import { TestCase } from "../components/DSATest/DSATest";
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

export type CodeStubs = {
  [key: string]: string;
};

export type GetStateResponse = {
  attempted_questions: {
    question_id: number;
    code: string;
    code_stubs: CodeStubs;
  }[];
  test_duration: number;
  time_left: number;
  start_time: string;
};

export enum ReportStatus {
  PENDING = 3,
  COMPLETED = 2,
}

export type GetReport = {
  status: ReportStatus;
  top?: {
    student_name: string | null;
    date_of_session: string | null;
    title_of_the_dsa_problem: string | null;
    difficulty_level_and_tags: string | null;
  };
  total_score?: {
    score: number | null;
    overall_feedback: string | null;
  };
  detailed_performance_analysis?: {
    correctness: {
      score: number | null;
      feedback: string | null;
    };
    efficiency: {
      score: number | null;
      time_complexity: string | null;
      space_complexity: string | null;
      optimum_time_complexity: string | null;
    };
    code_quality: {
      score: number | null;
      code_readability: string | null;
      variable_naming: string | null;
      code_structure: string | null;
      usage_of_comments: string | null;
    };
    improvement_and_learning: {
      score: number | null;
      feedback: string | null;
    };
  };
  session_insights: {
    key_strengths: string | null;
    areas_for_improvement: string | null;
  };
  footer: {
    encouraging_note: string | null;
  };
  revision_topics: string | null | string[];
  resources: {
    article_link: string | null;
    video_link: string | null;
  };
};

const DSAPracticeAPI = {
  runSolution: async function (
    questionId: number,
    assessmentId: number,
    type: string,
    language: string,
    code: string,
    customTestCases?: TestCase[]
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
        custom_testcases: customTestCases,
      },
    });

    // console.log(response);

    // console.log("Calling DSAPracticeAPI.runSolution");
  },

  getStatus: async function (
    questionId: number,
    assessmentId: number
  ): Promise<GetStatusResponse> {
    // console.log("Calling DSAPracticeAPI.getStatus");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dsa-execution-status?question_id=${questionId}&assessment_attempt_id=${assessmentId}`,
      method: "GET",
    });

    // console.log(response.data);

    return response.data.data;
  },
  getQuestions: async function (): Promise<GetQuestionsResponse> {
    // console.log("Calling DSAPracticeAPI.getQuestions");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dsa-questions-list`,
      method: "GET",
    });

    // console.log(response.data);

    return response.data.data;
  },
  createAttempt: async function (questionId: number) {
    // console.log("Calling DSAPracticeAPI.createAttempt");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/generate-dsa-practice-attempt?question_id=${questionId}`,
      method: "GET",
    });

    // console.log(response.data);

    return response.data.data;
  },
  getReport: async function (assessmentId: number): Promise<GetReport> {
    // console.log("Calling DSAPracticeAPI.getReport");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dsa-practice-report?assessment_id=${assessmentId}`,
      method: "GET",
    });

    // console.log(response.data);
    response.data.status = ReportStatus.COMPLETED;

    return response.data.data;
  },
  getState: async function (assessmentId: string): Promise<GetStateResponse> {
    // console.log("Calling DSAPracticeAPI.getState");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/fetch-assessment-state?assessment_id=${assessmentId}`,
      method: "GET",
    });

    // console.log(response.data);

    return response.data.data;
  },
  postIssue: async function (
    assessmentId: number,
    issue: string,
    issueDetails: string,
    questionId: number
  ) {
    // console.log("Calling DSAPracticeAPI.postIssue");

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

    // console.log(response.data);

    return response.data.data;
  },
  getHistory: async function () {
    // console.log("Calling DSAPracticeAPI.getHistory");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dsa-practice-report-history`,
      method: "GET",
    });

    // console.log(response.data);

    return response.data.data;
  },
};

export default DSAPracticeAPI;
