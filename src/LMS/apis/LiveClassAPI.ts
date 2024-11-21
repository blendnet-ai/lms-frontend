import axios from "axios";
import apiConfig from "../../configs/api";

export interface CourseProvider {
  id: number;
  name: string;
}

const LiveClassAPI = {
  getLiveClasses: async function (startDate: string, endDate: string) {
    const response = await axios.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/class/?start_date=${startDate}&end_date=${endDate}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },
  getCourseProvider: async function () {
    const response = await axios.request({
      url: `${apiConfig.LIVE_CLASS_URL}/accounts/get-course-provider`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },
  getCoursesForCourseProvider: async function (courseProviderId: number) {
    const response = await axios.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course-provider/${courseProviderId}/get-courses`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },
  getBatchesByCourseProviderId: async function (courseProviderId: number) {
    const response = await axios.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/${courseProviderId}/get-batches`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },
  createLiveClasses: async function (data: any) {
    const response = await axios.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/live_classes/series/create/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    return response.data;
  },
  getCoursesList: async function () {
    const response = await axios.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/user-courses-list`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },
  getModulesData: async function (courseId: number) {
    const response = await axios.request({
      url: `${apiConfig.LIVE_CLASS_URL}/programs/course/${courseId}/get-modules-data/`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  },
};

export default LiveClassAPI;
