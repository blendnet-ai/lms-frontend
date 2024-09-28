import {
  Box,
  CardMedia,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
} from "@mui/material";
import { icons } from "../../../assets";
import { Clear } from "@mui/icons-material";
// import MicIcon from "@mui/icons-material/Mic";
import { useContext, useEffect, useState } from "react";
import { Panel } from "react-resizable-panels";
import apiConfig from "../../../configs/api";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import Loader from "../Helpers/Loader";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";

export default function ChatModule({
  chats,
  chatID,
}: {
  chats: any[];
  chatID: number;
}) {
  const [frontendChat, setFrontendChat] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const context = useContext(DoubtSolvingContext);
  const [messages, setMessages] = useState<any[]>(chats);
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  // handle query change
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrontendChat(event.target.value);
  };

  // clear query
  const handleClearQuery = () => {
    setFrontendChat("");
  };

  useEffect(() => {
    if (!context?.userId) {
      console.error("User ID is not available");
      return;
    }

    const socketUrl = `${
      apiConfig.DOUBT_SOLVING_WS_URL
    }?api-key=${"1234"}&user-id=${context?.userId?.toString()}&conversation-id=${chatID}`;

    const socket = new WebSocket(socketUrl);

    setWs(socket);

    console.log("Connecting to WebSocket server...", socketUrl);

    socket.onopen = () => {
      console.log("WebSocket connection successful!");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // return () => {
    //   if (socket.readyState === WebSocket.OPEN) {
    //     socket.close();
    //   }
    // };
    return () => {
      socket.close();
    };
  }, [context?.userId]);

  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      console.log("Message received:", eventData);

      // Simulate delay for bot response
      setLoading(true);
      setTimeout(() => {
        const assistantObject = {
          id: "1",
          role: "assistant",
          content: eventData,
        };
        console.log("Messages before setting recieved", messages);
        setMessages((prevMessages) => [...prevMessages, assistantObject]);
        console.log("Messages after setting recieved", messages);
        setLoading(false); // Stop loading after message is added
      }, 2000); // 2 seconds delay
    };
  }, [ws]);

  // Send a message through WebSocket
  const sendMessage = async () => {
    if (ws && ws.readyState === WebSocket.OPEN && frontendChat.trim()) {
      const userObject = {
        id: context?.userId,
        role: "user",
        content: frontendChat,
      };

      ws.send(JSON.stringify({ query: frontendChat }));
      setMessages((prevMessages) => [...prevMessages, userObject]); // Add the message to the list
      console.log("Messages", messages);
      handleClearQuery(); // Clear input after sending
    }
  };

  // Prevent page reload on form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
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
            // height: "100%",
            gap: "40px",
            my: "auto",
          }}
        >
          {/* welcome message */}
          {messages?.length === 0 && (
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
          {messages?.map((chat, index) => {
            return chat.role === "user" ? (
              <UserMessage key={index} message={chat.content} />
            ) : (
              <BotMessage key={index} data={chat.content} />
            );
          })}
          {/* Show Loader if loading */}
          {loading && (
            <Box>
              <Loader />
            </Box>
          )}
          {/* Show loader when loading */}
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
              backgroundColor: "transparent",
              boxShadow: "none",
              border: "2px solid #EFF6FF",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <InputBase
              value={frontendChat}
              onChange={handleQueryChange}
              disabled={loading} // Disable input when loading
              sx={{
                flex: 1,
                padding: "0.8rem",
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
                type="button"
                onClick={sendMessage}
                sx={{
                  p: "10px",
                }}
                aria-label="send"
                disabled={loading} // Disable input when loading
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
    </Panel>
  );
}

const UserMessage = ({ message }: { message: string }) => {
  useEffect(() => {
    console.log("User Message:", message);
  }, [message]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Typography
        sx={{
          color: "#000",
          fontSize: "1rem",
          padding: "10px",
          backgroundColor: "#EFF6FF",
          borderRadius: "10px",
        }}
      >
        {message}
      </Typography>
      <CardMedia
        component="img"
        image={icons.avatar1}
        alt="avatar"
        sx={{ width: 40, height: 40, borderRadius: "50%" }}
      />
    </Box>
  );
};

interface BotDataResponse {
  message: string;
  references: [
    {
      title: string;
      start_time?: string | null;
      page_label?: string | null;
      link: string;
    }
  ];
}

const BotMessage = ({ data }: { data: BotDataResponse }) => {
  const context = useContext(DoubtSolvingContext);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <CardMedia
          component="img"
          image={icons.avatar3}
          alt="avatar"
          sx={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        <Typography
          sx={{
            color: "#000",
            fontSize: "1rem",
            padding: "10px",
            backgroundColor: "#EFF6FF",
            borderRadius: "10px",
          }}
        >
          {data.message}
        </Typography>
      </Box>

      {/* resources  */}
      {data.references && data.references.length > 0 && (
        <Typography
          sx={{
            color: "#000",
            fontSize: "1rem",
            fontWeight: 700,
            padding: "10px 50px",
            borderRadius: "10px",
          }}
        >
          Resources
        </Typography>
      )}

      {/* reference cards  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          margin: "10px 50px",
        }}
      >
        {data.references.map((reference) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              backgroundColor: "#EFF6FF",
              borderRadius: "10px",
              gap: "10px",
              width: "max-content",
            }}
          >
            {/* title  */}
            <Typography
              sx={{
                color: "#000",
                fontSize: "1rem",
              }}
            >
              {reference.title}
            </Typography>

            {/* link  */}
            <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <ArticleIcon />
              <Link
                onClick={() => {
                  context?.setLink(reference.link);
                  context?.setLinkOpen(true);
                }}
                to={""}
              >
                Link to the resource
              </Link>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
