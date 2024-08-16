import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import apiConfig from "./api";
import { auth } from "./firebase";
import EventEmitter from "events";

export const modalEventEmitter = new EventEmitter();

const api = axios.create({
  baseURL: apiConfig.BASE_URL,
});

const setAuthorizationHeader = async (
  config: InternalAxiosRequestConfig<any>
) => {
  const token = await auth.currentUser?.getIdToken();
  // console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
};

const errorHandler = (error: any) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

api.interceptors.request.use(
  async (config) => {
    await setAuthorizationHeader(config); // Set the Authorization header before the request is sent
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const pending_feedback_assessment_id =
      response.data?.pending_feedback_assessment_id;
    if (pending_feedback_assessment_id) {
      modalEventEmitter.emit("pendingFeedbackAssessmentFound", {
        assessmentId: pending_feedback_assessment_id,
      });
    }
    return response;
  },
  (error) => {
    return errorHandler(error);
  }
);

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

export default api;
