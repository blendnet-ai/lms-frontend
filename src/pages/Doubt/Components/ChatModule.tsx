import {
  Box,
  Button,
  CardMedia,
  IconButton,
  InputBase,
  Modal,
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

export default function ChatModule({
  chats,
  chatID,
  chatsLoading,
  error,
  isAdmin,
}: {
  chats: any[];
  chatID: string;
  chatsLoading: boolean;
  error: any;
  isAdmin: boolean;
}) {
  const [frontendChat, setFrontendChat] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const context = useContext(DoubtSolvingContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("doubt_solving_json");
  const [isPromptGiven, setIsPromptGiven] = useState<boolean>(false);
  const location = useLocation();
  const conversationId = String(location.pathname.split("/")[2]);

  // Experimental feature
  const [websocketError, setWebSocketError] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null); // Reference for the end of the chat

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

  // Connect to WebSocket
  useEffect(() => {
    if (!context?.userUUID) {
      console.error("User ID is not available");
      return;
    }
    if (isAdmin && isPromptGiven && context?.promptTemplate !== null) {
      const socketUrl = `${apiConfig.DOUBT_SOLVING_WS_URL}?user-key=${context?.userKey}&user-id=${context?.userUUID}&conversation-id=${chatID}&prompt-template-name=${context?.promptTemplate}`;

      const socket = new WebSocket(socketUrl);

      setWs(socket);

      socket.onopen = () => {
        console.log("WebSocket connection successful!, url", socketUrl);
      };

      socket.onclose = () => {
        console.log("WebSocket disconnected.");
        setWebSocketError("WebSocket disconnected, please refresh the page.");
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }
  }, [context?.userUUID, context?.promptTemplate]);

  // Listen for messages from WebSocket
  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log("WebSocket message received:", eventData);
      const assistantObject = {
        id: "1",
        role: "assistant",
        content: eventData.response,
        references: eventData.references,
      };
      setMessages((prevMessages) => [...prevMessages, assistantObject]);
      setMessageLoading(false);
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
      setMessages((prevMessages) => [...prevMessages, userObject]); // Add the message to the list
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

  // IsAdmin Modal states
  const [openIsAdminModal, setOpenIsAdminModal] = useState(false);
  const handleOpenIsAdminModal = () => setOpenIsAdminModal(true);
  const handleCloseIsAdminModal = () => setOpenIsAdminModal(false);

  // Open modal if is_admin
  useEffect(() => {
    if (isAdmin && !context?.promptTemplate) {
      handleOpenIsAdminModal();
    }
  }, [isAdmin, conversationId]);

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
        {/* conversations */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "flex-start",
            gap: "40px",
            my: "auto",
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
                  No conversations yet, start a new one by typing in the search
                  bar.
                </Typography>
              </Box>
            )}

          {/* chat messages */}
          {messages?.length > 0 &&
            !error &&
            !chatsLoading &&
            messages?.map((chat, index) => {
              return chat.role === "user" ? (
                <UserMessage key={index} message={chat.content} />
              ) : (
                <BotMessage key={index} data={chat} />
              );
            })}

          {/* Show loader when chats are loading */}
          {messages && chatsLoading && !error && !messageLoading && (
            <Box>
              <ChatsLoader />
            </Box>
          )}

          {/* Experimental feature */}
          {websocketError && (
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
                  backgroundColor: "#FFD6DD",
                  width: "fit-content",
                  padding: "10px 30px",
                  borderRadius: "10px",
                }}
              >
                {websocketError}
              </Typography>

              {/* button  */}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  ml: "10px",
                  height: "100%",
                  borderRadius: "50px",
                }}
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
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
              disabled={messageLoading}
              sx={{
                flex: 1,
                padding: "0.8rem",
                "&:hover": {
                  cursor: messageLoading ? "not-allowed" : "text",
                },
              }}
              placeholder="search"
              inputProps={{ "aria-label": "search google maps" }}
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
                disabled={messageLoading}
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

            <TextField
              id="prompt"
              label="Prompt Template"
              variant="outlined"
              fullWidth
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
