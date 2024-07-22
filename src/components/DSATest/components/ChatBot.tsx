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

type BotContextType = {
  ws: WebSocket | null;
};

export const BotContext = createContext<BotContextType | null>(null);

type ChatBotProps = {
  isChatBotOpen: boolean;
  setIsChatBotOpen: (value: boolean) => void;
  questionId: number;
  assessmentId: number;
};

export default function ChatBot({
  isChatBotOpen,
  setIsChatBotOpen,
  questionId,
  assessmentId,
}: ChatBotProps) {
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

  const floatingAdditionalStyles = {
    display: isChatBotOpen ? "inline" : "none",
  };

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
      const messgaes = await ChatAPI.getDSAChatMessages(
        questionId,
        assessmentId
      );
      setChatMessages(messgaes);
    })();
  }, []);

  useEffect(() => {
    const socket = new WebSocket(apiConfig.DSA_BOT_WS_URL);
    setWs(socket);

    socket.onopen = () => {
      console.log("Websocket connection successfull!");
    };

    socket.onclose = () => {
      console.log("Websocket disconnected.");
    };

    return () => {
      socket.close();
    };
  }, []);

  const chatMessageValidator = (input: string) => {
    if (input.length > 0) return true;
    return false;
  };

  const fabStyles = {
    margin: 0,
    top: "auto",
    width: 70,
    height: 70,
    right: 40,
    bottom: 40,
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
      {chatMessages && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className="Popover"
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...floatingAdditionalStyles }}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <BotContext.Provider value={{ ws }}>
              <Chatbot
                headerText="Discuss with Disha"
                config={config}
                messageHistory={chatMessages}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
                saveMessages={setChatMessages}
                disableScrollToBottom
                validator={chatMessageValidator}
              />
            </BotContext.Provider>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
