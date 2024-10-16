import {
  Alert,
  Box,
  Button,
  CardMedia,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { icons } from "../../../assets";
import { Clear } from "@mui/icons-material";
// import MicIcon from "@mui/icons-material/Mic";
import { useContext, useEffect, useRef, useState } from "react";
import { Panel } from "react-resizable-panels";
import apiConfig from "../../../configs/api";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import MessageLoader from "../Loaders/MessageLoader";
import ChatsLoader from "../Loaders/ChatsLoader";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";
import formattedChats from "../Utils/chatMessageFormatter";
import { useLocation } from "react-router-dom";
import { extractCodeFromString } from "../Utils/extractCodeFromString";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Markdown from "react-markdown";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ChatModule({
  chats,
  chatID,
  chatsLoading,
  error,
  isAdmin,
}: {
  chats: any[];
  chatID: string | null;
  chatsLoading: boolean;
  error: any;
  isAdmin: boolean | null;
}) {
  // consts and hooks
  const context = useContext(DoubtSolvingContext);
  let retryCount = 0;
  const maxRetries = 3;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // states
  const [frontendChat, setFrontendChat] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("assistant_prompt");
  const [isPromptGiven, setIsPromptGiven] = useState<boolean>(false);
  const [ifWriteOwnPrompt, setIfWriteOwnPrompt] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [websocketError, setWebSocketError] = useState<string>("");
  const [openIsAdminModal, setOpenIsAdminModal] = useState(false);
  const handleOpenIsAdminModal = () => setOpenIsAdminModal(true);
  const handleCloseIsAdminModal = () => setOpenIsAdminModal(false);

  // Scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll to bottom of chat when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // handle query change
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrontendChat(event.target.value);
  };

  // clear query
  const handleClearQuery = () => {
    setFrontendChat("");
  };

  // WebSocket retry logic
  useEffect(() => {
    if (!context?.userUUID) {
      console.error("User ID is not available");
      return;
    }

    let socketUrl;
    if (isAdmin && isPromptGiven && context?.promptTemplate !== null) {
      socketUrl = `${apiConfig.DOUBT_SOLVING_WS_URL}?user-key=${context?.userKey}&user-id=${context?.userUUID}&conversation-id=${chatID}&prompt-template-name=${context?.promptTemplate}`;
    } else {
      socketUrl = `${apiConfig.DOUBT_SOLVING_WS_URL}?user-key=${context?.userKey}&user-id=${context?.userUUID}&conversation-id=${chatID}&prompt-template-name=assistant_prompt`;
    }

    const connectWebSocket = () => {
      if (socketUrl) {
        console.log("Attempting WebSocket connection, URL:", socketUrl);
        const socket = new WebSocket(socketUrl);
        setWs(socket);

        socket.onopen = () => {
          console.log("WebSocket connection successful!", socketUrl);
          retryCount = 0; 
          setWebSocketError("");
          setMessageLoading(false);
          setOpenSnackbar(false); 
        };

        socket.onclose = () => {
          console.log("WebSocket disconnected.");
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`WebSocket reconnect attempt ${retryCount}...`);
            setTimeout(connectWebSocket, 1000 * retryCount);
            setWebSocketError(
              `Experiencing issues, Trying to reconnect... ${retryCount}`
            );
            setOpenSnackbar(true);
          } else {
            setWebSocketError(
              "Connection failed. Please Refresh the page to try again."
            );
            setOpenSnackbar(true);
          }
        };

        socket.onerror = (error) => {
          if (retryCount >= maxRetries) {
            setWebSocketError(
              "Connection failed. Please Refresh the page to try again."
            );
            setOpenSnackbar(true);
          }
        };

        return () => {
          socket.close();
        };
      }
    };

    if (chatID === null) {
      console.error("Chat ID is not available");
      return;
    }

    connectWebSocket();
  }, [context?.userUUID, context?.promptTemplate, chatID]);

  // Listen for messages from WebSocket
  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      const { response, references, completed } = eventData;

      // console.log("WebSocket message received:", eventData);

      if (eventData.error as string) {
        setWebSocketError(eventData.error);

        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", content: eventData.error },
        ]);
        return;
      }

      setMessages((prevMessages) => {
        if (
          prevMessages.length === 0 ||
          prevMessages[prevMessages.length - 1].role !== "assistant"
        ) {
          return [
            ...prevMessages,
            { role: "assistant", content: response, references },
          ];
        }

        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...updatedMessages[updatedMessages.length - 1],
          content: response,
          references,
        };
        return updatedMessages;
      });

      if (completed) {
        setMessageLoading(false);
      } else {
        setMessageLoading(true);
      }
    };

    return () => {
      ws.onmessage = null;
    };
  }, [ws]);

  // Send a message through WebSocket
  const sendMessage = async () => {
    setMessageLoading(true);
    if (ws && ws?.readyState === WebSocket.OPEN && frontendChat.trim()) {
      const userObject = {
        id: context?.userUUID,
        role: "user",
        content: frontendChat,
      };

      ws.send(JSON.stringify({ query: frontendChat }));
      setMessages((prevMessages) => [...prevMessages, userObject]);
      handleClearQuery(); // Clear input after sending
    }
  };

  // Prevent page reload on form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  // Format chats
  useEffect(() => {
    if (chats) {
      setMessages(formattedChats(chats));
    }
  }, [chats]);

  // Open modal if is_admin
  useEffect(() => {
    if (isAdmin && !context?.promptTemplate) {
      handleOpenIsAdminModal();
    }
  }, [isAdmin, chatID]);

  // Set prompt
  const submitPrompt = () => {
    context?.setPromptTemplate(prompt);
    setIsPromptGiven(true);
    handleCloseIsAdminModal();
  };

  return (
    <Panel
      style={{
        display: "inline",
      }}
      defaultSize={70}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          height: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          gap: "20px",
          overflowY: "auto",
        }}
      >
        {/* Snackbar for websocket error */}
        <Snackbar
          open={openSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
              {websocketError}
            </Alert>
          </Box>
        </Snackbar>

        {/* conversations */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
            gap: "40px",
            my: "auto",
            position: "relative",
          }}
        >
          {/* welcome message */}
          {messages?.length === 0 &&
            !messageLoading &&
            !error &&
            !chatsLoading && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    backgroundColor: "#EFF6FF",
                    width: "fit-content",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  No conversations yet, start a new one by typing in the chat
                  bar.
                </Typography>
              </Box>
            )}

          {/* chat messages */}
          {messages?.length > 0 &&
            !error &&
            !chatsLoading &&
            messages?.map((chat, index) => {
              const isCodeExists = extractCodeFromString(chat.content).code
                ? true
                : false;

              return chat.role === "user" ? (
                <UserMessage key={index} message={chat.content} />
              ) : (
                <BotMessage key={index} data={chat} isCode={isCodeExists} />
              );
            })}

          {/* Show loader when chats are loading */}
          {messages && chatsLoading && !error && !messageLoading && (
            <Box>
              <ChatsLoader />
            </Box>
          )}

          {/* Show error message when chats fail to load */}
          {error && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  backgroundColor: "#EFF6FF",
                  width: "fit-content",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          {/* Show loader when messages are loading */}
          {messages && messageLoading && !chatsLoading && !error && (
            <Box>
              <MessageLoader />
            </Box>
          )}

          {/* This is a dummy div to scroll to */}
          <div ref={messagesEndRef} />

          {/* opaque background if websocket is not connected */}
          {websocketError !== "" && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                cursor: "not-allowed",
              }}
            />
          )}
        </Box>

        {/* search bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "",
            width: "100%",
            gap: "20px",
          }}
        >
          {/* Input  */}
          <Box
            component="form"
            onSubmit={handleFormSubmit} // Handle form submit
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: "2px 4px",
              alignItems: "center",
              backgroundColor: "#fff",
              boxShadow: "none",
              border: "2px solid #EFF6FF",
              // border: "2px solid #000",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <InputBase
              value={frontendChat}
              onChange={handleQueryChange}
              disabled={websocketError !== ""}
              sx={{
                flex: 1,
                padding: "0.8rem",
                "&:hover": {
                  cursor: messageLoading ? "not-allowed" : "text",
                },
                "& .MuiInputBase-input": {
                  fontSize: "1.2rem",
                  color: "#000",
                },
              }}
              placeholder="Ask Disha Ma’am"
              inputProps={{ "aria-label": "search Query" }}
            />
            {frontendChat.length > 0 && (
              <Tooltip title="Clear">
                <IconButton
                  type="button"
                  onClick={handleClearQuery}
                  sx={{
                    p: "10px",
                  }}
                  aria-label="search"
                >
                  <Clear />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="send">
              <IconButton
                disabled={websocketError !== ""}
                type="button"
                onClick={sendMessage}
                sx={{
                  p: "10px",
                }}
                aria-label="send"
              >
                <CardMedia
                  component="img"
                  image={icons.send}
                  alt="search"
                  sx={{ width: 20, height: 20 }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          {/* voice search */}
          {/* <Tooltip title="Voice Search">
          <IconButton
            sx={{
              marginTop: "10px",
            }}
            aria-label="search"
          >
            <MicIcon />
          </IconButton>
        </Tooltip> */}
        </Box>
      </Box>

      {/* if is_admin then show a modal   */}
      <Box>
        <Modal
          open={openIsAdminModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#000",
                mb: "20px",
              }}
            >
              Set Prompt for better assistance
            </Typography>

            {!ifWriteOwnPrompt && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Prompt Selection
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={prompt}
                  label="Prompt Selection"
                  onChange={(e) => setPrompt(e.target.value)}
                >
                  <MenuItem value={"assistant_prompt"}>
                    Give Response in Json format (Streaming : Disabled)
                  </MenuItem>
                  <MenuItem value={"yasir_doubt_solving_streaming"}>
                    Give Response in stream format (Streaming : Enabled)
                  </MenuItem>
                </Select>
              </FormControl>
            )}

            {ifWriteOwnPrompt && (
              <TextField
                id="prompt"
                label="Prompt Template"
                variant="outlined"
                fullWidth
                value={prompt}
                sx={{
                  mt: "20px",
                }}
                onChange={(e) => setPrompt(e.target.value)}
              />
            )}

            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: "20px",
                width: "100%",
              }}
              onClick={() => setIfWriteOwnPrompt(!ifWriteOwnPrompt)}
            >
              {ifWriteOwnPrompt ? "Select from list" : "Write your own prompt"}
            </Button>

            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: "20px",
                width: "100%",
              }}
              onClick={submitPrompt}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      </Box>
    </Panel>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
