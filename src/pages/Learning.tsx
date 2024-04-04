import ReactPlayer from "react-player";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
} from "@floating-ui/react";
import Chatbot from "react-chatbot-kit";
import { useEffect, useRef, useState } from "react";
import "react-chatbot-kit/build/main.css";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";

import "./../styles/Learning.css";
import "./../App.css";
import config from "../configs/chatbotConfig";
import MessageParser from "../chatbot/MessageParser";
import ActionProvider from "../chatbot/ActionProvider";
import VideoDataAPI from "../apis/VideoDataAPI";
import { Chapter } from "../apis/VideoDataAPI";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
interface Props {
  url: string;
}

type ChapterIdentifier = {
  chapterId: string;
  startTime: number; // in secs
  endTime: number; // in secs
};

function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:\?|&)v=([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function getTimeDifference(startTime: string, endTime: string): number {
  let timeDiffInSecs = getTimeInSeconds(endTime) - getTimeInSeconds(startTime);
  let timeDiffInMins = timeDiffInSecs / 60;
  return Math.round(timeDiffInMins);
}

function getTimeInSeconds(time: string): number {
  const timeComponents = time.split(":").map(Number);
  const hoursInSeconds = timeComponents[0] * 3600;
  const minutesInSeconds = timeComponents[1] * 60;
  const seconds = timeComponents[2];
  return hoursInSeconds + minutesInSeconds + seconds;
}

function Learning({ url }: Props) {
  useEffect(() => {
    (async () => {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        const videData = await VideoDataAPI.getVideoData(videoId);
        setTranscript(videData.transcript);
        setChapters(videData.chapters);

        let chapterIdentifiers = [];

        for (let i = 0; i < videData.chapters.length; i++) {
          let chapterIdentifier: ChapterIdentifier = {
            chapterId: videData.chapters[i].id,
            startTime: getTimeInSeconds(videData.chapters[i].start_time),
            endTime: getTimeInSeconds(videData.chapters[i].end_time),
          };

          chapterIdentifiers.push(chapterIdentifier);
        }
        setChapterIdentifiers(chapterIdentifiers);
      }
    })();
  }, []);

  const [transcript, setTranscript] = useState<string>("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentChapter, setCurrentChapter] = useState<Chapter>();

  const [chaperIndetifiers, setChapterIdentifiers] = useState<
    ChapterIdentifier[]
  >([]);

  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    strategy: "fixed",
    open: isChatBotOpen,
    onOpenChange: setIsChatBotOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const [videoPlayedDuration, setVideoPlayedDuration] = useState(0);

  const playerRef = useRef<any>();

  const setPlayerTimeStamp = (timeStamp: string) => {
    setIsPlaying(true);
    playerRef.current.seekTo(getTimeInSeconds(timeStamp), "seconds");
  };

  const findChapterByTimeStamp = (timeStamp: number) => {
    for (let i = 0; i < chaperIndetifiers.length; i++) {
      if (
        chaperIndetifiers[i].startTime <= timeStamp &&
        chaperIndetifiers[i].endTime > timeStamp
      ) {
        return chaperIndetifiers[i].chapterId;
      }
    }
    return null;
  };

  const findChapterById = (chapterId: string) => {
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].id == chapterId) {
        return chapters[i];
      }
    }
    return null;
  };

  const onVideoPlayerTimestampChanged = (timeStamp: number) => {
    let currentChapterId = findChapterByTimeStamp(timeStamp);

    if (currentChapterId) {
      let chapter = findChapterById(currentChapterId);
      if (chapter) {
        setCurrentChapter(chapter);
      }
    }
    setVideoPlayedDuration(timeStamp);
  };

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  const fabStyles = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  return (
    <div className="Learning">
      <div className="player-wrapper">
        <ReactPlayer
          ref={playerRef}
          className="react-player"
          pip
          width="100%"
          onProgress={(progress) => {
            onVideoPlayerTimestampChanged(progress.playedSeconds);
          }}
          playing={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          url={url}
          controls
        />
      </div>
      <div className="chapter-buttons-container">
        {chapters.map((chapter, i) => (
          <Button
            startIcon={<CloudUploadIcon />}
            sx={{ marginX: "5vw", borderRadius: 10, textTransform: "none" }}
            className="chapter-button"
            variant="contained"
            onClick={() => {
              setPlayerTimeStamp(chapter.start_time);
              setCurrentChapter(chapter);
            }}
          >
            <div className="chapter-button-content">
              <div className="chapter-button-title">{`Ch ${i + 1}: ${
                chapter.title
              }`}</div>
              <div>{`(${getTimeDifference(
                chapter.start_time,
                chapter.end_time
              )} mins)`}</div>
            </div>
          </Button>
        ))}
      </div>
      <div>{transcript}</div>
      {currentChapter && (
        <div>
          <div>{currentChapter.title}</div>
          <div>{currentChapter.ques[0].text}</div>
          <div>{currentChapter.ques[0].options[0]}</div>
          <div>{currentChapter.ques[0].options[1]}</div>
          <div>{currentChapter.ques[0].options[2]}</div>
          <div>{currentChapter.ques[0].options[3]}</div>
        </div>
      )}
      <Fab
        sx={fabStyles}
        ref={refs.setReference}
        {...getReferenceProps()}
        color="primary"
        aria-label="add"
      ></Fab>
      {isChatBotOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={floatingStyles}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
}

export default Learning;
