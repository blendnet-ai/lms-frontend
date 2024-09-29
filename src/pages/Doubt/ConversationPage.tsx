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

  useEffect(() => {
    // Fetch conversations
    const fetchConversations = async () => {
      const response = await DoubtSolvingAPI.getChatHistory(
        context?.userId,
        conversationId
      );

      console.log("ConversationPage", response?.data?.chat_history);
      setData(response?.data);
    };

    fetchConversations();
  }, [conversationId]);

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
          borderRadius: "10px 10px 0 0",
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
            <IconButton onClick={() => navigate("/doubt-solving")}>
              <CreateIcon
                sx={{
                  color: "#fff",
                  fontSize: "1.5rem",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* chat module  */}
      <PanelGroup direction="horizontal">
        <IntegratedChatHistory open={showHistory} />
        <ChatModule chats={data?.chat_history} chatID={conversationId} />
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
