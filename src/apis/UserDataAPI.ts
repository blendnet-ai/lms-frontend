import api from "../configs/axios";
import apiConfig from "../configs/api";

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
  telegram_link: string;
};

export type GetOnboardedUserData = {
  has_lab: boolean;
  onboarding_status: boolean;
  data: [
    {
      user_data: string | null;
    }
  ];
  entire_data: [
    {
      id: number;
      user_id_id: number;
      user_data: string | null;
      onboarding_complete: boolean;
      form_name_id: number;
      name: string | null;
      email: string | null;
      institute_roll_number: number | null;
      age: number | null;
      gender: string | null;
      languages: string[] | null;
      phone: number | null;
      city: string | null;
      country: string | null;
      interests: string | null;
      daily_streak: number;
      longest_streak: number;
      last_task_date: string | null;
      total_chat_count: number;
      created_at: string;
      updated_at: string;
      otp: number | null;
      cv_details: string | null;
      cv_score: number | null;
      form_response: string | null;
      institute_id: number | null;
    }
  ];
};

const UserDataAPI = {
  getUserData: async function (): Promise<GetUserDataResponse> {
    console.log("Calling UserDataAPI.getUserData");

    const response = await api.request({
      url: `${apiConfig.AI_LEARNING_URL}/user-data`,
      method: "GET",
    });

    console.log(response.data);

    return response.data.data;
  },

  updateUserData: async function (updateData: any) {
    console.log("Calling UserDataAPI.updateUserData");

    const response = await api.request({
      url: `${apiConfig.AI_LEARNING_URL}/user-data/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(updateData),
    });

    console.log(response.data);
  },

  getOnboardedUserData: async function (): Promise<GetOnboardedUserData> {
    const response = await api.request({
      url: `${apiConfig.AUTH}/user-data`,
      method: "GET",
    });

    return response.data.data;
  },
};

export default UserDataAPI;
