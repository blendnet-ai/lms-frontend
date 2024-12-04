import api from "../configs/axios";
import apiConfig from "../configs/api";

export interface CourseProvider {
  id: number;
  name: string;
}

const LiveClassAPI = {
  getLiveClasses: async function (startDate: string, endDate: string) {
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
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course-provider/${courseProviderId}/get-courses`,
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
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/${courseProviderId}/get-batches`,
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
  getCoursesList: async function () {
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
  getModulesData: async function (courseId: number, batchId: number) {
    const response = await api.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/${courseId}/batch/${batchId}/get-modules-data/`,
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
      url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/series/${classId}/details`,
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
};

export default LiveClassAPI;
