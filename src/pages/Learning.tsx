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
import { createContext, useEffect, useRef, useState } from "react";
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
import {
  SmartToy,
  Highlight,
  Quiz,
  FormatListBulleted,
  Visibility,
  QuestionMark,
  Fullscreen,
  Height,
  AccountBox,
  History,
  NoSim,
  Dashboard,
} from "@mui/icons-material";
import { CircularProgress, FormControlLabel, IconButton } from "@mui/material";
import QuizDialog from "../components/QuizDialog";
import ToggleButton from "@mui/material/ToggleButton";
import Switch from "@mui/material/Switch";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Floating from "../components/Floating";
import MyHighlights from "./MyHighlights";
import FsHighlights from "../components/FsHighlights";
import FsChapters from "../components/FsChapters";
import ChatAPI, { ChatMessage } from "../apis/ChatAPI";
import FsChatBotWrapper from "../components/FsChatBotWrapper";
import { auth } from "../configs/firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiConfig from "../configs/api";

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

export function getTimeDifference(startTime: string, endTime: string): number {
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

type BotContentType = {
  ws: WebSocket | null;
  videoId: string | null;
};

export const BotContext = createContext<BotContentType | null>(null);

function Learning({ url }: Props) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[] | null>(null);

  useEffect(() => {
    const socket = new WebSocket(apiConfig.WEB_SOCKET_URL);
    setWs(socket);

    socket.onopen = () => {
      console.log("CONNECTED!");
    };

    socket.onclose = () => {
      console.log("DISCONNECTED!");
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", (event) =>
      onFullScreenChanged(document.fullscreenElement !== null)
    );

    (async () => {
      console.log(await auth.currentUser?.getIdToken());
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        setVideoId(videoId);
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

        setChatMessages((await ChatAPI.getChatMessages(videoId)).messages);
      }
    })();
  }, []);

  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false);

  const handleQuizDialogOpen = () => {
    setIsQuizDialogOpen(true);
  };
  const handleQuizDialogClose = () => {
    setIsQuizDialogOpen(false);
  };

  const [videoId, setVideoId] = useState<string>("");

  const [transcript, setTranscript] = useState<string>("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentChapter, setCurrentChapter] = useState<Chapter>();

  const scrollToChapter = (index: number) => {
    const subComponentRef = chaptersContainerRef.current.childNodes[index];
    if (subComponentRef) {
      subComponentRef.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const [chaperIndetifiers, setChapterIdentifiers] = useState<
    ChapterIdentifier[]
  >([]);

  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isFsFabOpen, setIsFsFabOpen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [isTranscriptOn, setIsTranscripOn] = useState(true);

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

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const [fullScreen, setFullScreen] = useState(false);

  const {
    refs: fullScreenRefs,
    floatingStyles: fullScreenFloatingStyles,
    context: fullScreenContext,
  } = useFloating({
    strategy: "fixed",
    open: isFsFabOpen,
    onOpenChange: setIsFsFabOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const fsClick = useClick(fullScreenContext);
  const fsDismiss = useDismiss(fullScreenContext);
  const fsScreenrole = useRole(fullScreenContext);

  const {
    getReferenceProps: fsGetReferenceProps,
    getFloatingProps: fsGetFloatingProps,
  } = useInteractions([fsClick, fsDismiss, fsScreenrole]);

  const [videoPlayedDuration, setVideoPlayedDuration] = useState(0);

  const playerRef = useRef<any>();

  const setPlayerTimeStamp = (timeStamp: string) => {
    setIsPlaying(true);
    playerRef.current.seekTo(getTimeInSeconds(timeStamp), "seconds");
  };

  const findChapterByTimeStamp = (
    timeStamp: number
  ): [string | null, number | null] => {
    for (let i = 0; i < chaperIndetifiers.length; i++) {
      if (
        chaperIndetifiers[i].startTime <= timeStamp &&
        Math.round(chaperIndetifiers[i].endTime) >= Math.round(timeStamp)
      ) {
        return [chaperIndetifiers[i].chapterId, chaperIndetifiers[i].endTime];
      }
    }
    return [null, null];
  };

  const hasChapterEnded = (
    chapterEndTimeStamp: number,
    currentTimeStamp: number
  ) => {
    return Math.round(chapterEndTimeStamp) == Math.round(currentTimeStamp);
  };

  const findChapterById = (
    chapterId: string
  ): [chapter: Chapter | null, index: number] => {
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].id == chapterId) {
        return [chapters[i], i];
      }
    }
    return [null, -1];
  };

  const onVideoPlayerTimestampChanged = (timeStamp: number) => {
    let [currentChapterId, currentChapterEndTimeStamp] =
      findChapterByTimeStamp(timeStamp);

    if (currentChapterId) {
      let [chapter, chapterIndex] = findChapterById(currentChapterId);
      if (chapter && (!currentChapter || chapter.id != currentChapter.id)) {
        setCurrentChapter(chapter);
        scrollToChapter(chapterIndex);
      }
      if (chapter) {
        if (isQuizEnabled && currentChapterEndTimeStamp) {
          if (hasChapterEnded(currentChapterEndTimeStamp, timeStamp)) {
            if (!chapter.ques[0].user_score) {
              handleQuizDialogOpen();
              setIsPlaying(false);
            }
          }
        }
      }
    }

    setVideoPlayedDuration(timeStamp);
  };

  const [isQuizEnabled, setQuizEnabled] = useState(true);

  const headingId = useId();
  const fsHeadingId = useId();

  const fabStyles = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    padding: "2px",
    left: "auto",
    position: "fixed",
  };
  const fullScreenFabStyles = {
    margin: 0,
    top: "auto",
    right: 40,
    bottom: 100,
    padding: "2px",
    left: "auto",
    position: "fixed",
    visibility: fullScreen ? "visible" : "hidden",
  };

  const fullScreenFabStyles2 = {
    margin: 0,
    top: "auto",
    right: 80,
    bottom: 100,
    left: "auto",
    position: "fixed",
    visibility: fullScreen ? "visible" : "hidden",
  };
  const onFullScreenChanged = (isEnabled: boolean) => {
    if (!isEnabled) {
      setFullScreen(false);
    }
  };

  const onChapterClicked = (chapter: Chapter) => {
    setPlayerTimeStamp(chapter.start_time);
    setCurrentChapter(chapter);
  };

  const handle = useFullScreenHandle();

  const enterFullScreen = () => {
    setFullScreen(true);
    handle.enter();

    try {
      window.screen.orientation.lock("landscape"); // not supported for all browsers, will give compile time error
    } catch (error) {
      console.error(error);
    }
  };

  const [visibleInnerFsFab, setVisibleInnerFsFab] = useState<number | null>(
    null
  );

  const isVisibleFab = (id: number) => {
    if (!fullScreen) {
      return false;
    }
    if (visibleInnerFsFab == null) {
      return true;
    }
    return id == visibleInnerFsFab;
  };

  const fsRef = useRef<any>();

  const chaptersContainerRef = useRef<any>();

  return (
    <div className="Learning">
      <FullScreen handle={handle}>
        <div ref={fsRef}>
          <>
            <Fab
              sx={fullScreenFabStyles}
              ref={fullScreenRefs.setReference}
              {...fsGetReferenceProps()}
              color="primary"
              aria-label="add"
              disabled={!chatMessages}
            >
              {chatMessages && (
                <img
                  style={{ width: "100%", borderRadius: "100px" }}
                  src="/icons/bot.jpg"
                  alt=""
                />
              )}
              {!chatMessages && <CircularProgress color="inherit" />}
            </Fab>
            {isFsFabOpen && fullScreen && chatMessages && (
              <FloatingFocusManager context={fullScreenContext} modal={false}>
                <div
                  className="Popover"
                  ref={fullScreenRefs.setFloating}
                  style={fullScreenFloatingStyles}
                  aria-labelledby={fsHeadingId}
                  {...fsGetFloatingProps()}
                >
                  {isFsFabOpen && (
                    <BotContext.Provider value={{ ws, videoId }}>
                      <FsChatBotWrapper
                        config={config}
                        messageHistory={chatMessages}
                        messageParser={MessageParser}
                        actionProvider={ActionProvider}
                        saveMessages={setChatMessages}
                      />
                    </BotContext.Provider>
                  )}
                  {/* <Floating
                  icon={<Highlight />}
                  onClose={() => setIsFsFabOpen(false)}
                  onVisible={setVisibleInnerFsFab}
                  id={1}
                  visible={isVisibleFab(1)}
                  right={10}
                  bottom={100}
                  component={
                    <Chatbot
                      config={config}
                      messageParser={MessageParser}
                      actionProvider={ActionProvider}
                    />
                  }
                />
                {currentChapter && (
                  <Floating
                    icon={<QuestionMark />}
                    onClose={() => setIsFsFabOpen(false)}
                    id={2}
                    onVisible={setVisibleInnerFsFab}
                    visible={isVisibleFab(2)}
                    right={80}
                    bottom={60}
                    component={
                      <QuizDialog
                        container={fsRef}
                        question={currentChapter.ques[0]}
                        videoId={videoId}
                        isOpen={isQuizDialogOpen}
                        onClose={handleQuizDialogClose}
                      />
                    }
                  />
                )}

                <Floating
                  icon={<SmartToy />}
                  onClose={() => setIsFsFabOpen(false)}
                  id={3}
                  onVisible={setVisibleInnerFsFab}
                  visible={isVisibleFab(3)}
                  right={80}
                  bottom={-10}
                  component={<FsHighlights />}
                />
                <Floating
                  icon={<CloudUploadIcon />}
                  onClose={() => setIsFsFabOpen(false)}
                  id={4}
                  onVisible={setVisibleInnerFsFab}
                  visible={isVisibleFab(4)}
                  right={10}
                  bottom={-50}
                  component={
                    <FsChapters
                      chapters={chapters}
                      onChapterClicked={onChapterClicked}
                    />
                  }
                /> */}
                </div>
              </FloatingFocusManager>
            )}
          </>
          <h3>Bussiness Communication</h3>
          <div className="player-wrapper">
            <ReactPlayer
              style={{ aspectRatio: fullScreen ? 20 / 9 : 16 / 9 }}
              id="player"
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
            {/* <img
              className="profile-img"
              src="https://www.vhv.rs/dpng/d/106-1068444_rotate-your-phone-icon-hd-png-download.png"
            /> */}
          </div>
        </div>
      </FullScreen>
      <Button
        sx={{ borderRadius: 10, textTransform: "none" }}
        variant="contained"
        onClick={enterFullScreen}
      >
        Enter fullscreen with learning mode
      </Button>
      <FormControlLabel
        control={<Switch checked={isQuizEnabled} />}
        onClick={() => setQuizEnabled(!isQuizEnabled)}
        label="Quiz"
      />

      <div className="chapter-buttons-container" ref={chaptersContainerRef}>
        {chapters.map((chapter, i) => (
          <Button
            sx={{ marginX: "5vw", borderRadius: 10, textTransform: "none" }}
            className="chapter-button"
            variant="contained"
            onClick={() => onChapterClicked(chapter)}
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
      {/* <div id="highlight-row-container">
        <div id="old-highlights-button-wrapper">
          {" "}
          <button id="old-highlights-button">
            <div id="old-highlights-button-inner-container">
              <div>4</div>
            </div>
          </button>
        </div>
        <Button
          id="highlight-button"
          variant="contained"
          startIcon={<Highlight />}
        >
          Highlight
        </Button>

        <div
          id="old-highlights-button-wrapper"
          style={{ visibility: "hidden" }}
        >
          <button id="old-highlights-button">
            <div id="old-highlights-button-inner-container">
              <div>4</div>
            </div>
          </button>
        </div>
      </div> */}
      {currentChapter &&
        chapters.map((chapter) => (
          <QuizDialog
            container={fsRef}
            question={chapter.ques[0]}
            chapterId={chapter.id}
            videoId={videoId}
            isOpen={isQuizDialogOpen && chapter.id == currentChapter.id}
            onClose={handleQuizDialogClose}
          />
        ))}
      {isQuizEnabled && (
        <Button
          id="quiz-button"
          variant="contained"
          startIcon={<Quiz />}
          onClick={handleQuizDialogOpen}
        >
          Quiz
        </Button>
      )}

      <Button
        sx={{ borderRadius: 10, textTransform: "none" }}
        variant="contained"
        color={isTranscriptOn ? "primary" : "secondary"}
        onClick={() => {
          setIsTranscripOn(!isTranscriptOn);
        }}
      >
        Transcript
      </Button>

      {isTranscriptOn && (
        <div className="transcript-container">{transcript}</div>
      )}

      <>
        <Fab
          sx={fabStyles}
          ref={refs.setReference}
          {...getReferenceProps()}
          color="primary"
          aria-label="add"
          disabled={!chatMessages}
        >
          {chatMessages && (
            <img
              style={{ width: "100%", borderRadius: "100px" }}
              src="/icons/bot.jpg"
              alt=""
            />
          )}
          {!chatMessages && <CircularProgress color="inherit" />}
        </Fab>
        {isChatBotOpen && chatMessages && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              className="Popover"
              ref={refs.setFloating}
              style={floatingStyles}
              aria-labelledby={headingId}
              {...getFloatingProps()}
            >
              <BotContext.Provider value={{ ws, videoId }}>
                <Chatbot
                  config={config}
                  messageHistory={chatMessages}
                  messageParser={MessageParser}
                  actionProvider={ActionProvider}
                  saveMessages={setChatMessages}
                />
              </BotContext.Provider>
            </div>
          </FloatingFocusManager>
        )}
      </>
    </div>
  );
}

function LearningWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setValidURL(urlParam);
    } else {
      (async () => {
        const videList = await VideoDataAPI.getVideoList();
        for (let i = 0; i < videList.length; i++) {
          if (videList[i].video_id == "tQPkLroBiGM") {
            setValidURL(videList[i].url);
            console.log("done");
          }
        }
      })();
    }
  }, []);

  const [urlInputValue, setURLInputValue] = useState("");
  const [validURL, setValidURL] = useState("");

  const validateAndSetURL = (url: string) => {
    if (isValidYoutubeUrl(url)) {
      setValidURL(url);
    }
  };

  return (
    <div className="LearningWrapper">
      <div>
        {validURL == "" && (
          <div>
            {/* <TextField
            id="outlined-basic"
            label="Youtube Video URL"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setURLInputValue(event.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              validateAndSetURL(urlInputValue);
            }}
          >
            Done
          </Button> */}
            <CircularProgress />
          </div>
        )}
        {validURL != "" && <Learning url={validURL} />}
      </div>
    </div>
  );
}

function isValidYoutubeUrl(url: string) {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)[\w-]{11}$/;

  return youtubeRegex.test(url);
}

export default LearningWrapper;
