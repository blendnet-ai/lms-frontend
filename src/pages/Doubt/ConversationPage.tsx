import {
  Box,
  CardMedia,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { icons, images } from "../../assets";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChatModule from "./Components/ChatModule";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import IntegratedChatHistory from "./Components/IntegratedChatHistory";
import { useContext, useEffect, useState } from "react";
import DoubtSolvingAPI from "./Apis/DoubtSolvingAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { DoubtSolvingContext } from "./Context/DoubtContext";
import ViewerPanel from "./Components/ViewerPanel";

export default function ConversationPage() {
  const context = useContext(DoubtSolvingContext);
  const location = useLocation();
  const navigate = useNavigate();
  const conversationId = Number(location.pathname.split("/")[2]);

  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const [conversationLoading, setConversationLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch conversations
    const fetchConversations = async () => {
      setConversationLoading(true);
      const response = await DoubtSolvingAPI.getChatHistory(
        context?.userId,
        conversationId
      );

      console.log("ConversationPage", response?.data?.chat_history);
      setData(response?.data);
      setConversationLoading(false);
    };

    fetchConversations();
  }, [conversationId]);

  const toggleCreateThread = () => {
    context?.setReferenceObject(null);
    context?.setReferenceOpen(false);
    context?.setSelectedCourse(null);
    context?.setSelectedMode(null);
    if (isFullscreen) {
      toggleFullScreen();
    }
    navigate("/doubt-solving");
  };

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false); // Track fullscreen state
  // Function to toggle fullscreen
  const toggleFullScreen = () => {
    const elem = document.documentElement;
    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.requestFullscreen) {
        elem.requestFullscreen(); // For Safari
      } else if (elem.requestFullscreen) {
        elem.requestFullscreen(); // For IE/Edge
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen(); // For Safari
      } else if (document.exitFullscreen) {
        document.exitFullscreen(); // For IE/Edge
      }
    }
    setIsFullscreen(!isFullscreen); // Update state
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        padding: "10px",
      }}
    >
      {/* header  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#225bef",
          borderRadius: "10px",
        }}
      >
        {/* left items  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Tooltip title="Show History">
            <IconButton onClick={() => setShowHistory(!showHistory)}>
              <HistoryToggleOffIcon
                sx={{
                  color: "#fff",
                  fontSize: "1.5rem",
                }}
              />
            </IconButton>
          </Tooltip>

          <CardMedia
            component="img"
            image={images.dishaMadam}
            alt="avatar"
            sx={{ width: 40, height: 40, borderRadius: "50%" }}
          />

          <Typography
            sx={{
              color: "#fff",
              fontSize: "1.2rem",
              fontWeight: 600,
              marginLeft: "10px",
            }}
          >
            Disha Ma'am
          </Typography>
        </Box>

        {/* center items  */}
        <Typography
          sx={{
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: 600,
          }}
        >
          {data?.course_name}
        </Typography>

        {/* right items  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <AssignmentIcon sx={{ color: "#fff", fontSize: "1.5rem" }} />
          <Typography
            sx={{
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {data?.mode}
          </Typography>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              backgroundColor: "#fff",
            }}
          />

          <Tooltip title="Create new thread">
            <IconButton onClick={toggleCreateThread}>
              <CreateIcon
                sx={{
                  color: "#fff",
                  fontSize: "1.5rem",
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <IconButton
              onClick={toggleFullScreen}
              sx={{
                p: "10px",
              }}
              aria-label="fullscreen"
            >
              {isFullscreen ? (
                <CardMedia
                  component="img"
                  image={icons.fullScreenExit}
                  alt="fullscreen"
                  sx={{
                    width: 24,
                    height: 24,
                  }}
                />
              ) : (
                <CardMedia
                  component="img"
                  image={icons.fullScreen}
                  alt="fullscreen"
                  sx={{ width: 24, height: 24 }}
                />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* chat module  */}
      <PanelGroup direction="horizontal">
        <IntegratedChatHistory open={showHistory} />
        <ChatModule
          chats={data?.chat_history}
          chatID={conversationId}
          isHistoryTabOpen={showHistory}
          loading={conversationLoading}
        />
        <PanelResizeHandle
          style={{
            backgroundColor: "#EFF6FF",
            width: "10px",
          }}
        />
        <ViewerPanel
          referenceObject={context?.referenceObject}
          isOpen={context?.referenceOpen}
        />
      </PanelGroup>
    </Box>
  );
}
