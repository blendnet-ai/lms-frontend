import apiConfig from "../../../configs/api";
import api from "../../../configs/axios";

export type GetAllCoursesResponse = {
  courses: {
    id: number;
    name: string;
    description: string;
  }[];
};

const DoubtSolvingAPI = {
  getAllCourses: async function (
    userId: number | null
  ): Promise<GetAllCoursesResponse> {
    // console.log("Calling DoubtSolvingAPI.getAllCourses");

    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/get-all-courses`,
      method: "GET",
      headers: {
        "api-key": import.meta.env.VITE_DOUBT_API_KEY,
        "user-id": userId,
      },
    });

    // console.log(response.data);

    return response.data;
  },
  getCoursesForUser: async function (
    userId: number
  ): Promise<GetAllCoursesResponse> {
    // console.log("Calling DoubtSolvingAPI.getCoursesForUser");

    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/get-courses-for-user`,
      method: "GET",
      headers: {
        "api-key": import.meta.env.VITE_DOUBT_API_KEY,
        "user-id": userId,
      },
    });

    // console.log(response.data);

    return response.data.data;
  },
  getConversations: async function (userId: number | null): Promise<any> {
    // console.log("Calling DoubtSolvingAPI.getConversations");

    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/get-conversations`,
      method: "GET",
      headers: {
        "api-key": import.meta.env.VITE_DOUBT_API_KEY,
        "user-id": userId,
      },
    });

    // console.log(response.data);

    return response.data;
  },
  createConversation: async function (
    userId: number | null,
    courseId: number | null,
    mode: number | null
  ): Promise<any> {
    // console.log("Calling DoubtSolvingAPI.createConversation");
    console.log(userId, courseId, mode);
    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/create-conversation?course=${courseId}&mode=${mode}`,
      method: "POST",
      headers: {
        "api-key": import.meta.env.VITE_DOUBT_API_KEY,
        "user-id": userId,
      },
    });

    console.log(response.data);

    return response.data.data;
  },
};

export default DoubtSolvingAPI;
