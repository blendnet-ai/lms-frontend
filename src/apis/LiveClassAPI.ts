import api from "../configs/axios";
import apiConfig from "../configs/api";

export interface CourseProvider {
  id: number;
  name: string;
}

export type GetCourseListResponse = {
  courses: Course[];
  role: string;
};

export type GetModulesDataResponse = {
  module_data: Module[];
};

interface GetLiveClassesResponse {
  type: number;
  title: string;
  meeting_id: number;
  series_id: number;
  start_date: string;
  start_timestamp: string;
  end_timestamp: string;
  link: string;
  start_time: string;
  duration: string;
  batch: string;
  course: string;
}

export type GetRecordingsResponse = {
  recordings: Recording[];
};

export interface Recording {
  batch_id: number;
  batch_name: string;
  course_id: number;
  course_name: string;
  blob_url: string;
  meeting_id: number;
  meeting_date: string;
  meeting_title: string;
}

export interface Module {
  id: number;
  order_in_course: number;
  title: string;
  resources_reading: Resource[];
  resources_video: Resource[];
  assessment_generation_configs: number[];
}

export interface Resource {
  type: string; // reading, video, recording
  id: number;
  title: string;
  url: string;
}

export interface Course {
  no_of_batches?: number;
  id: number;
  slug: string;
  title: string;
  code: string;
  credit: number;
  summary: string;
  level: string;
  year: number;
  semester: string;
  is_elective: boolean;
  assessment_generation_ids: number[];
  course_provider_id: number;
  drive_folder_link: string;
  lecturer_full_name: string;
  batch_id: number;
}

export interface GetStudentsResponse {
  students: Student[];
  total_count: number;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  status: string;
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
  status: string;
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

export interface Lecturer {
  id: number;
  full_name: string;
}

const LiveClassAPI = {
  getLiveClasses: async function (
    startDate: string,
    endDate: string
  ): Promise<GetLiveClassesResponse[]> {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/class/?start_date=${startDate}&end_date=${endDate}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  },
  getCourseProvider: async function () {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/accounts/get-course-provider`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  getCoursesForCourseProvider: async function (courseProviderId: number) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course-provider/${courseProviderId}/get-courses/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  getBatchesByCourseProviderId: async function (courseProviderId: number) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/${courseProviderId}/get-batches/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  createLiveClasses: async function (data: any) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/series/create/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    });

    return response.data;
  },
  getCoursesList: async function (): Promise<GetCourseListResponse> {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/user-courses-list`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  getModulesData: async function (
    courseId: number
  ): Promise<GetModulesDataResponse> {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/${courseId}/get-modules-data/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  getLiveClassDetails: async function (classId: number) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/class/${classId}/details`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  updateLiveClass: async function (data: any, classId: number) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/class/${classId}/update/`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    });

    return response.data;
  },
  deleteLiveClass: async function (classId: number) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/class/${classId}/delete/`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  getRecordings: async function () {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/get-recordings/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  getMeetingJoinLink: async function () {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/meeting/get-meeting-url/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  postNotifications: async function (data: any) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/send-batch-message`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    });

    return response.data;
  },
  getAssessmentConfigs: async function (courseId: number, moduleId: number) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/${courseId}/get-assessment-configs/${moduleId}/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
  postStudentMessage: async function (data: any) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/send-personal-message`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    });

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
  getStudentDashboard: async function (): Promise<any> {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/student-dashboard/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // console.log("Student Dazshboard:", response.data);
    return response.data;
  },
  getLecturersForCourseProvider: async function (
    courseProviderId: number
  ): Promise<Lecturer[]> {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course-provider/${courseProviderId}/get-lecturers/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  },
};

export default LiveClassAPI;
