import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import apiConfig from "./api";
import { auth } from "./firebase";
import mitt from "mitt";

export const modalEventEmitter = mitt();

const api = axios.create({
  baseURL: apiConfig.BASE_URL,
  withCredentials: true, 
});

const setAuthorizationHeader = async (
  config: InternalAxiosRequestConfig<any>
) => {
  try {
    const user = auth.currentUser;
    console.log("Current Firebase user:", user?.email);
    
    if (user) {
      const token = await user.getIdToken(true); // Force refresh the token
      console.log("Firebase token obtained:", token ? "Token present" : "No token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Authorization header set for URL:", config.url);
      } else {
        console.error("Failed to get Firebase token");
      }
    } else {
      console.error("No Firebase user found");
    }
  } catch (error) {
    console.error("Error setting authorization header:", error);
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
