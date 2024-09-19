import apiConfig from "../configs/api";
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
  chat_count: number;
};

export type GetActivityDataResponse = {
  longest_streak: number;
  current_streak: number;
  activity_status: boolean[];
};

const DashboardAPI = {
  getUserData: async function (): Promise<GetUserDataResponse> {
    // console.log("Calling DashboardAPI.getUserData");

    const response = await api.request({
      url: `${apiConfig.AI_LEARNING_URL}/dashboard-data`,
      method: "GET",
    });

    if (response.status != 200) {
      // console.log("User not found, returning stats with 0 as values");
      return {
        videos_watched: 0,
        daily_streak: 0,
        longest_streak: 0,
        time_spent: "0 min",
        quizzes_attempted: 0,
        chat_count: 0,
      };
    }

    // console.log(response.data);

    return response.data.data;
  },
  getDashboard: async function () {
    // console.log("Calling DSAPracticeAPI.getHistory");

    const response = await api.request({
      url: `${apiConfig.EVAL_V2_URL}/dashboard-details`,
      method: "GET",
    });

    // console.log(response.data);

    return response.data.data;
  },
  getActivityData: async function (): Promise<GetActivityDataResponse> {
    const response = await api.request({
      url: `${apiConfig.AUTH}/activity-data`,
      method: "GET",
    });

    return response.data;
  },
  getLeaderboardData: async function () {

    const response = await api.request({
      url: `${apiConfig.STATS}/get-leaderboard-data`,
      method: "GET",
    });

    return response.data.data;
  },
};

export default DashboardAPI;
