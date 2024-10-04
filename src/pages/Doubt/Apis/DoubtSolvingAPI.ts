import apiConfig from "../../../configs/api";
import api from "../../../configs/DoubtSolvingConfig";

export type GetAllCoursesResponse = {
  data: {
    id: number;
    name: string;
    description: string;
  }[];
};


const DoubtSolvingAPI = {
  getAllCourses: async function (
    userUUID: string | null,
    userKey: string | null

  ): Promise<GetAllCoursesResponse> {
    // console.log("Calling DoubtSolvingAPI.getAllCourses");

    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/get-all-courses`,
      method: "GET",
      headers: {
        "user-key": userKey,
        "user-id": userUUID,
      },
    });

    // console.log(response.data);

    return response.data;
  },
  getCoursesForUser: async function (
    userUUID: string | null,
    userKey: string | null
  ): Promise<GetAllCoursesResponse> {
    // console.log("Calling DoubtSolvingAPI.getCoursesForUser");

    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/get-courses-for-user`,
      method: "GET",
      headers: {
        "user-key": userKey,
        "user-id": userUUID,
      },
    });

    // console.log(response.data);

    return response.data;
  },
  getConversations: async function (
    userUUID: string | null,
    userKey: string | null
  ): Promise<any> {
    // console.log("Calling DoubtSolvingAPI.getConversations");
    
    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/get-conversations`,
      method: "GET",
      headers: {
        "user-key": userKey,
        "user-id": userUUID,
      },
    });

    // console.log(response.data);

    return response.data;
  },
  createConversation: async function (
    userUUID: string | null,
    userKey: string | null,
    courseId: number | null,
    mode: number | null
  ): Promise<any> {
    // console.log("Calling DoubtSolvingAPI.createConversation");
    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/create-conversation`,
      method: "POST",
      headers: {
        "user-key": userKey,
        "user-id": userUUID,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        "course_id":courseId,
        "mode":mode,
        "context_variables": {}
      })
    });

    console.log(response.data);

    return response.data;
  },
  getChatHistory: async function (
    userUUID: string | null,
    userKey: string | null,
    conversationId: string | null
  ): Promise<any> {
    // console.log("Calling DoubtSolvingAPI.getChatHistory");

    try {
      const response = await api.request({
        url: `${apiConfig.DOUBT_SOLVING}/get-chat-history?conversation_id=${conversationId}`,
        method: "GET",
        headers: {
          "user-key": userKey,
          "user-id": userUUID,
        },
      });

      // console.log(response.data);

      return response.data;
    } catch (error: any) {
      return error.response;
    }
  },
  deleteConversation: async function (
    userUUID: string | null,
    userKey: string | null,
    conversationId: number | null
  ): Promise<any> {
    // console.log("Calling DoubtSolvingAPI.deleteConversation");

    const response = await api.request({
      url: `${apiConfig.DOUBT_SOLVING}/delete-conversation?conversation_id=${conversationId}`,
      method: "DELETE",
      headers: {
        "user-key": userKey,
        "user-id": userUUID,
      },
    });

    // console.log(response.data);

    return response.data;
  },
};

export default DoubtSolvingAPI;
