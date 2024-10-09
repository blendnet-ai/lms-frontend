import { useContext, useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, useNavigate } from "react-router-dom";
import DoubtSolvingAPI from "../Apis/DoubtSolvingAPI";
import { DoubtSolvingContext } from "../Context/DoubtContext";
import longToShortForm from "../Utils/shortForm";

interface HistoryProps {
  conversationId: number;
  courseId: number | null;
  createdAt: string;
  mode: string;
  updatedAt: string;
  isSelected: boolean;
  courseName: string | null;
}

export default function HistoryCard(props: HistoryProps) {
  const navigate = useNavigate();
  const context = useContext(DoubtSolvingContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDropdown = Boolean(anchorEl);

  const handleOpenDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleNavigate = () => {
    navigate(`/conversation/${props.conversationId}`);
    context?.setPromptTemplate(null);
  };

  // // delete a conversation
  // const deleteConversation = async (conversationId: number) => {
  //   try {
  //     await DoubtSolvingAPI.deleteConversation(
  //       context?.userId,
  //       conversationId,
  //       props.courseId,
  //       props.mode === "Doubts" ? 1 : 2
  //     );
  //   } catch (error) {
  //     console.error("Failed to delete conversation", error);
  //   }
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: props.isSelected ? "#EFF6FF" : "#fff",
        border: "none",
        borderRadius: "10px",
        transition: "all 0.3s",
        "&:hover": {
          backgroundColor: "#EFF6FF",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "10px 10px 0px 10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <a
            onClick={handleNavigate}
            style={{
              color: "#000",
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "left",
              textDecoration: "none",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            {props?.courseName
              ? `${longToShortForm(props?.courseName).toLocaleUpperCase()} : ${
                  props.conversationId
                }`
              : `${props.mode} : ${props.conversationId}`}
          </a>
        </Box>
        <IconButton onClick={handleOpenDropdown}>
          <MoreHorizIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openDropdown}
          onClose={handleCloseDropdown}
        >
          <MenuItem
            onClick={() => {
              // deleteConversation(props.conversationId);
              handleCloseDropdown();
            }}
            disabled
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <DeleteForeverIcon sx={{ color: "red" }} />
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "red",
              }}
            >
              Delete
            </Typography>
          </MenuItem>
        </Menu>
      </Box>

      {/* footer  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "0 10px 10px 10px",
          mt: "10px",
        }}
      >
        <Typography
          sx={{
            color: "#007d99",
            fontSize: "16px",
            padding: "4px 8px",
            backgroundColor: "#CCE7FF",
          }}
        >
          Doubts
        </Typography>
      </Box>
    </Box>
  );
}
