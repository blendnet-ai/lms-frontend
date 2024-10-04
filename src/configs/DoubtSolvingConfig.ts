import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import apiConfig from "./api";
import { auth } from "./firebase";
import mitt from "mitt";
import api from "./axios"

export const modalEventEmitter = mitt();

const doubtSolvingApi = axios.create({
  baseURL: apiConfig.BASE_URL,
});

const setAuthorizationHeader = async (config: InternalAxiosRequestConfig<any>) => {
  const token = await auth.currentUser?.getIdToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return token; // Return the token for further use
};


const isUserKeyValid = () => {
  const expirationTime = localStorage.getItem('token_expiration_time');
  const userUUID=localStorage.getItem('user_uuid');
  const userKey= localStorage.getItem('user_key');
  if (!expirationTime || !userKey || !userUUID) {
    return false;
  }
  const expirationDate = new Date(expirationTime);

// Get the current date and time
  const now = new Date();

// Compare the current date and time with the expiration date
  const isBeforeExpiration = now < expirationDate;
  console.log(isBeforeExpiration)
  return isBeforeExpiration
};

const setItems = async (config: InternalAxiosRequestConfig<any>) => {
    if(!isUserKeyValid())
    {
      const response = await api.get(`${apiConfig.AUTH}/get-doubt-solving-token`, {
        headers: {
          'Authorization': config.headers.authorization
        }
      });
      
      const { user_id, user_key, expiration_time } = response.data.data;
      // Set new values in local storage
      localStorage.setItem('user_uuid', user_id);
      localStorage.setItem('user_key', user_key);
      localStorage.setItem('token_expiration_time', expiration_time);
      return { user_id, user_key, expiration_time }; 
    }
};

const errorHandler = (error: any) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

doubtSolvingApi.interceptors.request.use(
  async (config) => {
    await setAuthorizationHeader(config);
    setItems(config);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

doubtSolvingApi.interceptors.response.use(
  (response) => {
    const pending_feedback_assessment_id = response.data?.pending_feedback_assessment_id;
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

// Ensure errorHandler is applied in all cases
doubtSolvingApi.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});

export default doubtSolvingApi; 