import apiConfig from "../../../configs/api";
import api from "../../../configs/axios";

export type GetAllCoursesResponse = {
  courses: {
    id: number;
    name: string;
    description: string;
  }[];
};

const hardcodedAPI = "1234";

const DoubtSolvingAPI = {
  getAllCourses: async function (
    userId: number | null
  ): Promise<GetAllCoursesResponse> {
    // console.log("Calling DoubtSolvingAPI.getAllCourses");

    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/get-all-courses`,
      method: "GET",
      headers: {
        "api-key": hardcodedAPI,
        "user-id": userId,
      },
    });

    // console.log(response.data);

    return response.data;
  },
  getCoursesForUser: async function (
    userId: number | null
  ): Promise<GetAllCoursesResponse> {
    // console.log("Calling DoubtSolvingAPI.getCoursesForUser");

    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/get-courses-for-user`,
      method: "GET",
      headers: {
        "api-key": hardcodedAPI,
        "user-id": userId,
      },
    });

    // console.log(response.data);

    return response.data;
  },
  getConversations: async function (userId: number | null): Promise<any> {
    // console.log("Calling DoubtSolvingAPI.getConversations");

    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/get-conversations`,
      method: "GET",
      headers: {
        "api-key": hardcodedAPI,
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
        "api-key": hardcodedAPI,
        "user-id": userId,
      },
    });

    console.log(response.data);

    return response.data;
  },
  getChatHistory: async function (
    userId: number | null,
    conversationId: number | null
  ): Promise<any> {
    // console.log("Calling DoubtSolvingAPI.getChatHistory");

    try {
      const response = await api.request({
        url: `${apiConfig.DOUBT_SOLVING}/get-chat-history?conversation_id=${conversationId}`,
        method: "GET",
        headers: {
          "api-key": hardcodedAPI,
          "user-id": userId,
        },
      });

      // console.log(response.data);

      return response.data;
    } catch (error: any) {
      return error.response;
    }
  },
  deleteConversation: async function (
    userId: number | null,
    conversationId: number | null,
    courseId: number | null,
    mode: number | null
  ): Promise<any> {
    // console.log("Calling DoubtSolvingAPI.deleteConversation");

    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/delete-conversation?course=${courseId}&mode=${mode}&conversation-id=${conversationId}`,
      method: "DELETE",
      headers: {
        "api-key": hardcodedAPI,
        "user-id": userId,
      },
    });

    // console.log(response.data);

    return response.data;
  },
};

export default DoubtSolvingAPI;
