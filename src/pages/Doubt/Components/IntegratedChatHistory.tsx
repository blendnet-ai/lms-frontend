import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Panel } from "react-resizable-panels";
import DoubtSolvingAPI from "../Apis/DoubtSolvingAPI";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import HistoryCard from "../Helpers/HistoryCard";
import { useLocation } from "react-router-dom";

export default function IntegratedChatHistory({ open }: { open: boolean }) {
  const context = useContext(DoubtSolvingContext);
  const location = useLocation();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);

  useEffect(() => {
    // Fetch conversations
    const fetchConversations = async () => {
      setLoadingConversations(true); // Set loading to true before making the API call
      try {
        const response = await DoubtSolvingAPI.getConversations(
          context?.userId
        );
        setConversations(response?.conversations);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      } finally {
        setLoadingConversations(false); // Ensure loading is set to false after the API call finishes (either success or failure)
      }
    };

    fetchConversations();
  }, [context?.userId]);

  return (
    <Box
      sx={{
        display: open ? "flex" : "none",
        flexDirection: "column",
        padding: "20px",
        height: "100%",
        backgroundColor: "#fff",
        gap: "20px",
        width: "20%",
        borderRight: "2px solid #e0e0e0",
        overflowY: "scroll",
      }}
    >
      {/* time  */}
      <Typography
        sx={{
          color: "#000",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Today
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        {conversations.length > 0 &&
          conversations.map((conversation) => (
            <HistoryCard
              conversationId={conversation.conversation_id}
              courseId={conversation.course_id}
              mode={conversation.mode}
              createdAt={conversation.created_at}
              updatedAt={conversation.updated_at}
              isSelected={
                conversation.conversation_id ===
                Number(location.pathname.split("/")[2])
              }
            />
          ))}
      </Box>
    </Box>
  );
}
