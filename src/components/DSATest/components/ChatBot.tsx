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
import { CircularProgress, Fab } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import ChatAPI, { ChatMessage } from "../../../apis/ChatAPI";
import { icons } from "../../../assets";
import Chatbot from "react-chatbot-kit";
import config from "../../../configs/chatbotConfig";
import ActionProvider from "../../../chatbot/ActionProvider";
import MessageParser from "../../../chatbot/MessageParser";
import "./../../../App.css";
import apiConfig from "../../../configs/api";
type BotContentType = {
  ws: WebSocket | null;
  videoId: string | null;
  videoPlayedDuration: number;
};

export const BotContext = createContext<BotContentType | null>(null);

type ChatBotProps = {
  isChatBotOpen: boolean;
  setIsChatBotOpen: (value: boolean) => void;
};

export default function ChatBot({
  isChatBotOpen,
  setIsChatBotOpen,
}: ChatBotProps) {
  const [videoPlayedDuration, setVideoPlayedDuration] = useState(0);
  const [videoId, setVideoId] = useState<string>("");

  const [chatMessages, setChatMessages] = useState<ChatMessage[] | null>(null);

  const [ws, setWs] = useState<WebSocket | null>(null);

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
  const headingId = useId();

  useEffect(() => {
    (async () => {
      setChatMessages((await ChatAPI.getDSAChatMessages(videoId)).messages);
    })();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(apiConfig.WEB_SOCKET_URL);
    setWs(socket);

    socket.onopen = () => {
      console.log("Websocket connection successfull!");
    };

    socket.onclose = () => {
      console.log("Couldn't not establisb websocket connection.");
    };

    return () => {
      socket.close();
    };
  }, []);

  const fabStyles = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    padding: "2px",
    left: "auto",
    position: "fixed",
  };

  return (
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
            src={icons.bot}
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
            <BotContext.Provider value={{ ws, videoId, videoPlayedDuration }}>
              <Chatbot
                headerText="Discuss with Disha"
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
  );
}
