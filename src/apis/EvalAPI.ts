import apiConfig from "../configs/api";
import api from "../configs/axios";

const EvalAPI = {
  startAssessment: async function (type: number) {
    console.log(type);

    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/start-assessment`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        assessment_generation_id: type,
      },
      withCredentials: true,
    });

    console.log(response.data);

    return response.data.data;
  },
  getAllAssessmentsData: async function () {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/assessment-display-data`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data.data;
  },
  getQuestions: async function (assessmentId: number, questionId: number) {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/fetch-question?assessment_id=${assessmentId}&question_id=${questionId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data.data;
  },
  getState: async function (assessmentId: number) {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/fetch-assessment-state?assessment_id=${assessmentId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data.data;
  },
  submitAnswer: async function (
    assessmentId: number,
    questionId: number,
    answer: string,
    section: number
  ) {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/submit-assessment-answer-mcq`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        assessment_id: assessmentId,
        question_id: questionId,
        mcq_answer: answer,
        section: section,
      },
      withCredentials: true,
    });

    return response.data.data;
  },
  submitAnswerWriteUp: async function (
    assessmentId: number,
    questionId: number,
    answer: string,
    section: number
  ) {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/submit-assessment-answer-subjective`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        question_id: questionId,
        answer_text: answer,
        assessment_id: assessmentId,
        section: section,
      },
      withCredentials: true,
    });

    return response.data.data;
  },
  submitAnswerMMCQ: async function (
    questionId: number,
    assessmentId: number,
    multiple_mcq_answer: number[],
    section: number
  ) {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/submit-assessment-answer-mmcq`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        question_id: questionId,
        assessment_id: assessmentId,
        multiple_mcq_answer: multiple_mcq_answer,
        section: section,
      },
      withCredentials: true,
    });

    return response.data.data;
  },
  exitAssessment: async function (assessmentId: number) {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/close-assessment`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        assessment_id: assessmentId,
      },
      withCredentials: true,
    });

    return response.data.data;
  },
};

export default EvalAPI;
