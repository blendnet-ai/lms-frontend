import { ViewDay } from "@mui/icons-material";
import api from "../configs/axios";

export type GetUserDataResponse = {
  name: string;
  email: string;
  age: number;
  gender: string;
  languages: string;
  phone: string;
  city: string;
  country: string;
  interests: string;
};

const UserDataAPI = {
  getUserData: async function (): Promise<GetUserDataResponse> {
    console.log("Calling UserDataAPI.getUserData");

    const response = await api.request({
      url: `/user-data`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },

  updateUserData: async function (updateData: any) {
    console.log("Calling UserDataAPI.updateUserData");

    const response = await api.request({
      url: `/user-data/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(updateData),
    });

    console.log(response.data);
  },
};

export default UserDataAPI;
