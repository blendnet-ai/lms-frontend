import api from "../configs/axios";
import apiConfig from "../configs/api";
import { JSX } from "react/jsx-runtime";

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
};

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

const LiveClassAPI = {
  getLiveClasses: async function (startDate: string,endDate: string): Promise<GetLiveClassesResponse[]> {
    const response = await api.request({
      // url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/class/?start_date=${startDate}&end_date=${endDate}`,
      url: `https://lms.sakshm.com/backend/en/programs/live_classes/class/?start_date=${startDate}&end_date=${endDate}`,
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
      url: `https://lms.sakshm.com/backend/en/accounts/get-course-provider`,
      // url: `${apiConfig.LIVE_CLASS_URL}/accounts/get-course-provider`,
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
      url: `https://lms.sakshm.com/backend/en/programs/course-provider/${courseProviderId}/get-courses`,
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
      // url: `${apiConfig.LIVE_CLASS_URL}/programs/course/${courseProviderId}/get-batches`,
      url: `https://lms.sakshm.com/backend/en/programs/course/${courseProviderId}/get-batches`,
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
      // url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/series/create/`,
      url: `https://lms.sakshm.com/backend/en/programs/live_classes/series/create/`,
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
      url: `https://lms.sakshm.com/backend/en/programs/course/user-courses-list`,
      // url: `${apiConfig.LIVE_CLASS_URL}/programs/course/user-courses-list`,
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
      // url: `${apiConfig.LIVE_CLASS_URL}/programs/course/${courseId}/get-modules-data/`,
      url: `https://lms.sakshm.com/backend/en/programs/course/${courseId}/get-modules-data/`,
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
      // url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/series/${classId}/details`,
      url: `https://lms.sakshm.com/backend/en/programs/live_classes/series/${classId}/details`,
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
      // url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/class/${classId}/update/`,
      url: `https://lms.sakshm.com/backend/en/programs/live_classes/class/${classId}/update/`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      withCredentials: true,
    });

    return response.data;
  },
  getRecordings: async function () {
    const response = await api.request({
      // url: `${apiConfig.LIVE_CLASS_URL}/programs/course/get-recordings/`,
      url: `https://lms.sakshm.com/backend/en/programs/course/get-recordings/`,
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
