import api from "../configs/axios";
import apiConfig from "../configs/api";

export interface GetStudentsResponse {
  students: Student[];
  total_count: number;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  batch_id: number;
  batch_title: string;
  course_id: number;
  course_title: string;
  enrollment_date: string;
}

export interface GetStudentDetails {
  user_stats: StudentDetails;
  courses_enrolled: CourseDetails[];
  engagement_stats: {
    total_learning_time: number;
    last_login_date: string;
    last_login_time: string;
  };
}

export interface StudentDetails {
  user_id: string;
  name: string;
  email: string;
  age: number;
  college: string;
  phone: string;
  gender: string;
}

export interface CourseDetails {
  batch_id: string;
  course_id: string;
  attendance: number;
  course_name: string;
  assessments_attempted: number;
  total_assessments: number;
  videos_watched: number;
  total_videos: number;
}

export interface AssessmentReportResponse {
  data: {
    assessment_info: {
      assessment_id: string;
      assessment_name: string;
    };
    performance_overview: {
      feedback: string;
      score: number;
    };
    performance_metrics: CategoryPerformance[];
    sections: AssessmentResultSection[];
  };
  status: ReportStatus;
}

export enum ReportStatus {
  CREATION_PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  EVALUATION_PENDING = 3,
  ABANDONED = 4,
}

export interface CategoryPerformance {
  category: string;
  score: number;
}

export interface AssessmentResultSection {
  name: string;
  metrics: Metric[];
}

export interface Metric {
  name: string;
  total_score: number;
  obtained_score: string;
}

const LMSAPI = {
  getOnboardingStatus: async function () {
    const response = await api.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/status`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Onboarding status:", response.data);
    return response.data;
  },
  getOnboardingStep: async function () {
    const response = await api.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/step`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Onboarding step:", response.data);
    return response.data;
  },
  getOnboardingForm: async function () {
    const response = await api.request({
      url: `${apiConfig.LMS_BASE_URL}/custom_auth/form?form_name=onboarding`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Onboarding form:", response.data);
    return response.data.data;
  },
  submitOnboardingForm: async function (formData: any) {
    const response = await api.request({
      url: `${apiConfig.LMS_BASE_URL}/custom_auth/form?form_name=onboarding`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        form_name: "onboarding",
        user_data: { data: formData },
      },
      withCredentials: true,
    });

    // console.log("Onboarding form submitted:", response.data);
    return response.data;
  },
  sendOtp: async function (phone: string) {
    const response = await api.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/send-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        phone_number: phone,
      },
      withCredentials: true,
    });

    // console.log("OTP sent:", response.data);
    return response.data;
  },
  verifyOtp: async function (phone: string, otp: string) {
    console.log("phone:", phone, "otp:", otp);
    const response = await api.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/verify-otp`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        phone_number: phone,
        otp_value: otp,
      },
      withCredentials: true,
    });

    // console.log("OTP verified:", response.data);
    return response.data;
  },
  getBatchesByCourseId: async function (courseId: string | null) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/${courseId}/get-batches/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  },
  getAssessmentsResults: async function () {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/fetch-assessment-history`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Assessments results:", response.data);
    return response.data.data;
  },
  getSasUrl: async function (recordingId: string) {
    const response = await api.request({
      url: `https://lms.sakshm.com/backend/en/programs/course/resource/get-sas-url/?blob_url=${recordingId}/`,
      // url: `${apiConfig.LMS_BASE_URL}/programs/course/resource/get-sas-url/?blob_url=${recordingId}/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  },
  getStudentList: async function (): Promise<GetStudentsResponse> {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/students-list/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  getStudentDetails: async function (
    studentId: number
  ): Promise<GetStudentDetails> {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/student-details/${studentId}/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("Student details:", response.data);
    return response.data;
  },
  getSasUrlToUploadResume: async function () {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/generate-azure-storage-url`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  },
  uploadCvDetails: async function (data: any) {
    const response = await api.request({
      url: `${apiConfig.LMS_BASE_URL}/custom_auth/onboarding/upload-cv`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    });

    return response.data;
  },
  resourseEventLogging: async function (data: any) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/event-logger/log-event`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    });

    return response.data;
  },
  getSingleAssessmentsResult: async function (
    assessmentId: string
  ): Promise<AssessmentReportResponse> {
    const response = await api.request({
      url: `${apiConfig.EVAL_URL_LMS}/fetch-report?assessmentId=${assessmentId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Assessments results:", response.data);
    return response.data.data;
  },
  skipTelegramOnboarding: async function () {
    const response = await api.request({
      url: `${apiConfig.LMS_ONBOARDING_URL}/skip-telegram-onboarding`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Onboarding status:", response.data);
    return response.data;
  },
  getBeaconUrl: () => {
    return `${apiConfig.LIVE_CLASS_URL}/event-logger/log-event`;
  },
};

export default LMSAPI;
