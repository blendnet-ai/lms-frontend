import api from "../configs/axios";

type submitMCQResponseResponse = {
  score_added: number;
};

export type GetUserDataResponse = {
  videos_watched: number;
  daily_streak: number;
  longest_streak: number;
  time_spent: string;
  quizzes_attempted: number;
};

const DashboardAPI = {
  getUserData: async function (): Promise<GetUserDataResponse> {
    console.log("Calling DashboardAPI.getUserData");

    const response = await api.request({
      url: "/user-data",
      method: "GET",
    });

    if (response.status != 200) {
      console.log("User not found, returning stats with 0 as values");
      return {
        videos_watched: 0,
        daily_streak: 0,
        longest_streak: 0,
        time_spent: "0 min",
        quizzes_attempted: 0,
      };
    }

    console.log(response.data);

    return response.data.data;
  },
};

export default DashboardAPI;
