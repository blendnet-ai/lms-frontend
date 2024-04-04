import api from "../configs/axios";

type GetVideoDataResponse = {
  transcript: string;
  chapters: Chapter[];
};

type InVideoQues = {
  type: string;
  id: string;
  text: string;
  options: string[];
};

export type Chapter = {
  title: string;
  id: string;
  ques: InVideoQues[];
  start_time: string;
  end_time: string;
};

const VideoDataAPI = {
  getVideoList: async function (): Promise<string[]> {
    console.log("Calling VideoDataAPI.getVideoList");

    const response = await api.request({
      url: "/video-list",
      method: "GET",
    });
    console.log(response.data);

    return response.data;
  },
  getVideoData: async function (
    videoId: string
  ): Promise<GetVideoDataResponse> {
    console.log("Calling VideoDataAPI.getVideoData");
    console.log(`/video-data/${videoId}`);

    const response = await api.request({
      url: `/video-data/${videoId}`,
      method: "GET",
    });
    console.log(response.data);

    return response.data;
  },
};

export default VideoDataAPI;
