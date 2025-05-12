import apiConfig from "@/configs/api";
import api from "@/configs/axios";

const AccountsAPI = {
  getCourseProvider: async () => {
    const response = await api.request({
      url: `${apiConfig.ACCOUNTS_URL}/get-course-provider`,
      method: "GET",
    });
    return response.data;
  },
  getLecturers: async (courseProviderId: number) => {
    const response = await api.request({
      url: `${apiConfig.ACCOUNTS_URL}/course-provider/${courseProviderId}/lecturers/`,
      method: "GET",
    });
    return response.data;
  },
};

export default AccountsAPI;
