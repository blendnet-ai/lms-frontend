import { PlayArrow } from "@mui/icons-material";
import "./../styles/VideoHistory.css";
import { useEffect, useState } from "react";
import VideoHistoryAPI, { VideoHistoryType } from "../apis/VideoHistoryAPI";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

type VideoCardProps = {
  title: string;
  duration: string;
  url: string;
  thumbnail: string;
};

function VideoCard({ title, duration, url, thumbnail }: VideoCardProps) {
  const navigate = useNavigate();

  const routeToLearning = (url: string) => {
    navigate(`/?url=${url}`);
  };

  return (
    <div className="video-card" onClick={() => routeToLearning(url)}>
      <div className="video-card-inner">
        <img className="thumbnail" src={thumbnail} alt="" />
        <div className="video-card-text-container">
          <div>{title}</div>
          <div>{duration}</div>
        </div>
      </div>

      <PlayArrow className="play-icon" />
    </div>
  );
}

function VideoHistory() {
  const [history, setHistroy] = useState<VideoHistoryType[] | null>(null);

  useEffect(() => {
    (async () => {
      const history = await VideoHistoryAPI.getVideoHistory();
      setHistroy(history);
    })();
  }, []);

  const getHistoryCards = () => {
    if (!history) {
      return <CircularProgress sx={{ alignSelf: "center" }} />;
    }
    let prevElementDate: string | null = null; // Variable to store the previous date
    return history?.map((element) => {
      const currentElementDate = element.updated_at;
      const shouldRenderDate = currentElementDate !== prevElementDate; // Check if the current date is different from the previous one
      prevElementDate = currentElementDate; // Update the previous date for the next iteration

      return (
        <>
          {shouldRenderDate && <div className="day">{element.updated_at}</div>}
          <VideoCard
            thumbnail={element.thumbnail}
            title={element.title}
            duration={element.duration}
            url={element.url}
          />
        </>
      );
    });
  };

  return (
    <div className="VideoHistory">
      <h2 className="heading">Videos Watched</h2>
      {getHistoryCards()}
    </div>
  );
}

export default VideoHistory;
