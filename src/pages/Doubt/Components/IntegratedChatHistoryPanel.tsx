import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DoubtSolvingAPI from "../Apis/DoubtSolvingAPI";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import HistoryCard from "../Helpers/HistoryCard";
import { useLocation } from "react-router-dom";
import categorizeConversations from "../Utils/conversationsCategorizer";
("../Utils/conversationsCategorizer");

interface Conversations {
  total: number;
  [key: string]: any;
  data: any[];
}

export default function IntegratedChatHistory({ open }: { open: boolean }) {
  const context = useContext(DoubtSolvingContext);
  const location = useLocation();
  const [conversations, setConversations] = useState<Conversations>({
    total: 0,
    data: [],
  });
  const [loadingConversations, setLoadingConversations] = useState(false);

  useEffect(() => {
    // Fetch conversations
    const fetchConversations = async () => {
      setLoadingConversations(true); // Set loading to true before making the API call
      try {
        const response = await DoubtSolvingAPI.getConversations(
          context?.userUUID,
          context?.userKey
        );
        const sorted = categorizeConversations(response?.data);
        setConversations(sorted);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      } finally {
        setLoadingConversations(false); // Ensure loading is set to false after the API call finishes (either success or failure)
      }
    };

    fetchConversations();
  }, [context?.userUUID]);

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
        {/* when conversations are available */}
        {conversations.total > 0 &&
          conversations.data.map((conversation) => (
            <Box>
              {/* time  */}
              {conversation.total > 0 && (
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "16px",
                    fontWeight: "bold",
                    mt: "20px",
                  }}
                >
                  {conversation.type}
                </Typography>
              )}

              {/* conversation cards  */}
              {conversation.history.length > 0 &&
                conversation.history.map((item: any) => (
                  <HistoryCard
                    key={item.conversation_id}
                    conversationId={item.conversation_id}
                    courseId={item.course_id}
                    courseName={item.course_name}
                    mode={item.mode}
                    createdAt={item.created_at}
                    updatedAt={item.updated_at}
                    isSelected={
                      item.conversation_id ===
                      Number(location.pathname.split("/")[2])
                    }
                  />
                ))}
            </Box>
          ))}
      </Box>
    </Box>
  );
}
