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
import { CircularProgress, Fab, Button } from "@mui/material";
import { createContext, useEffect, useRef, useState } from "react";
import { icons } from "../../assets";
import ChatAPI, { ChatMessage, Sender } from "../../apis/ChatAPI";
import apiConfig from "../../configs/api";
import ChatBot from "./ChatBot";
import { CalculationsUtil } from "../../utils/calculations";
import { GetStatusResponse } from "../../apis/DSAPracticeAPI";
import { auth } from "../../configs/firebase";
import { useNavigate } from "react-router-dom";

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
  is_superuser: boolean;
};

export default function ChatBotWrapper({
  isChatBotOpen,
  setIsChatBotOpen,
  questionId,
  assessmentId,
  code,
  language,
  testCasesRunData,
  is_superuser,
}: ChatBotProps) {
  const navigate = useNavigate();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [ws, setWs] = useState<WebSocket | null>(null);

  const proactiveMsgTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

      if (messgaes.length === 1) {
        const messgae = messgaes[0];

        const processMessage = () => {
          setChatMessages(messgaes);
          if (messgae.open_chat_window) setIsChatBotOpen(true);
        };

        if (messgae.is_proactive_message) {
          if (proactiveMsgTimeoutRef.current !== null) {
            clearTimeout(proactiveMsgTimeoutRef.current);
          }

          proactiveMsgTimeoutRef.current = setTimeout(
            processMessage,
            messgae.delay ? messgae.delay * 1000 : 10000
          );
        } else {
          processMessage();
        }
      } else {
        if (messgaes[0].is_proactive_message)
          setChatMessages(messgaes.slice(1));
        else setChatMessages(messgaes);
      }
    })();
    return () => {
      if (proactiveMsgTimeoutRef.current !== null) {
        clearTimeout(proactiveMsgTimeoutRef.current);
        proactiveMsgTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const socket = new WebSocket(apiConfig.DSA_BOT_WS_URL);
    setWs(socket);

    socket.onopen = () => {
      console.log("Websocket connection successfull!");
      socket.send(
        JSON.stringify({ assessment_id: assessmentId, for_init: true })
      );
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
    const eventData = JSON.parse(event.data);

      let messageContent;
      let toolData;
      if (typeof eventData.message === 'object') {
        messageContent = eventData.message.message;
        toolData=eventData.message.tool_data;
      } else {
        messageContent = eventData.message;
      }

      const botMessage = {
        tool_data: toolData,
        message: messageContent,
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
      tool_data:{},
      message: "...",
      id: CalculationsUtil.generate12DigitRandomId(),
      type: Sender.BOT,
    };

    const newMessage = {
      tool_data:{},
      message: text,
      id: CalculationsUtil.generate12DigitRandomId(),
      type: Sender.USER,
    };

    console.log("USER");
    setChatMessages((prev) =>
      prev ? [...prev, newMessage, newBotMessage] : [newMessage, newBotMessage]
    );

    if (proactiveMsgTimeoutRef.current !== null) {
      clearTimeout(proactiveMsgTimeoutRef.current);
      proactiveMsgTimeoutRef.current = null;
    }
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
              <ChatBot
                is_superuser={is_superuser}
                messages={chatMessages}
                sendMessage={sendMessage}
                closeChatBot={setIsChatBotOpen}
              />
              {is_superuser && (
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(`/admin-chat-view/${questionId}/${assessmentId}`)
                  }
                >
                  View All Chat Data
                </Button>
              )}
            </BotContext.Provider>
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}
