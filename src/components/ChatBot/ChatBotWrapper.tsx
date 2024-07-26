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
import { icons } from "../../assets";
import ChatAPI, { ChatMessage, Sender } from "../../apis/ChatAPI";
import apiConfig from "../../configs/api";
import ChatBot from "./ChatBot";
import { CalculationsUtil } from "../../utils/calculations";
import { GetStatusResponse } from "../../apis/DSAPracticeAPI";
import { auth } from "../../configs/firebase";

const RESPONSE_WAIT_MSG = "...";

type BotContextType = {
  ws: WebSocket | null;
};

export const BotContext = createContext<BotContextType | null>(null);

type ChatBotProps = {
  isChatBotOpen: boolean;
  setIsChatBotOpen: (value: boolean) => void;
  questionId: number;
  assessmentId: number;
  code: string;
  language: string;
  testCasesRunData: GetStatusResponse | null;
};

export default function ChatBotWrapper({
  isChatBotOpen,
  setIsChatBotOpen,
  questionId,
  assessmentId,
  code,
  language,
  testCasesRunData,
}: ChatBotProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

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

  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (event) => {
      const botMessage = {
        message: JSON.parse(event.data).message,
        type: Sender.BOT,
        id: CalculationsUtil.generate12DigitRandomId(),
      };

      const lastMessageIndex = chatMessages?.length - 1;
      const lastMessage = chatMessages[lastMessageIndex];

      if (
        lastMessage.message === RESPONSE_WAIT_MSG &&
        lastMessage.type === "bot"
      ) {
        // If the last message is RESPONSE_WAIT_MSG and is a bot message then remove it and add the received botMessage
        setChatMessages((prev) => [...prev.slice(0, -1), botMessage]);
      } else {
        // If the last message is not "..." then just add the received botMessage
        setChatMessages((prev) => [...prev, botMessage]);
      }
      console.log("BOT");
    };
  }, [ws, chatMessages]);

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

  const sendMessage = async (text: string) => {
    if (!ws) return;
    if (!auth.currentUser) return;

    const codeWithLineNumbers = code
      .split("\n")
      .map((line, index) => `${index + 1}: ${line}`)
      .join("\n");

    ws.send(
      JSON.stringify({
        message: text,
        question_id: questionId,
        assessment_id: assessmentId,
        code: codeWithLineNumbers,
        language: language,
        token: await auth.currentUser.getIdToken(),
        run_result: testCasesRunData ? testCasesRunData.test_cases : [],
      })
    );

    const newBotMessage = {
      message: "...",
      id: CalculationsUtil.generate12DigitRandomId(),
      type: Sender.BOT,
    };

    const newMessage = {
      message: text,
      id: CalculationsUtil.generate12DigitRandomId(),
      type: Sender.USER,
    };

    console.log("USER");
    setChatMessages((prev) =>
      prev ? [...prev, newMessage, newBotMessage] : [newMessage, newBotMessage]
    );
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
              <ChatBot messages={chatMessages} sendMessage={sendMessage} />
            </BotContext.Provider>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
