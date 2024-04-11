import { ViewDay } from "@mui/icons-material";
import api from "../configs/axios";

export type VideoHistoryType = {
  video_id: string;
  title: string;
  url: string;
  duration: string;
  updated_at: string;
};

const VideoHistoryAPI = {
  getVideoHistory: async function (): Promise<VideoHistoryType[]> {
    console.log("Calling VideoHistoryAPI.getVideoHistory");

    const response = await api.request({
      url: `videos-watched-history`,
      method: "GET",
    });

    // const response = {
    //   data: [
    //     {
    //       video_id: "9rEUUmH9Dg8",
    //       title: "Sample Video Title 1",
    //       url: "https://www.youtube.com/watch?v=9rEUUmH9Dg8",
    //       duration: "5 mins 9 secs",
    //       updated_at: "11th April 2024",
    //     },
    //     {
    //       video_id: "9rEUUmH9Dg8",
    //       title: "Sample Video Title 1",
    //       url: "https://www.youtube.com/watch?v=9rEUUmH9Dg8",
    //       duration: "5 mins 9 secs",
    //       updated_at: "10th April 2024",
    //     },
    //     {
    //       video_id: "9rEUUmH9Dg8",
    //       title: "Sample Video Title 1",
    //       url: "https://www.youtube.com/watch?v=9rEUUmH9Dg8",
    //       duration: "5 mins 9 secs",
    //       updated_at: "10th April 2024",
    //     },
    //   ],
    // };

    console.log(response.data);

    return response.data.data;
  },
};

export default VideoHistoryAPI;
