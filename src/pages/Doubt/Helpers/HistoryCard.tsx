import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface HistoryProps {
  conversationId: number;
  courseId: number;
  createdAt: string;
  mode: string;
  updatedAt: string;
}

export default function HistoryCard(props: HistoryProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openDropdown = Boolean(anchorEl);

  const handleOpenDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const [selected, setSelected] = useState(false);

  return (
    <Box
      component={"button"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: selected ? "#EFF6FF" : "#fff",
        border: "none",
        borderRadius: "10px",
        "&:hover": {
          backgroundColor: "#EFF6FF",
          cursor: "pointer",
        },
      }}
      onClick={() => setSelected(!selected)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "10px 10px 0 10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "5px",
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

          <Typography
            sx={{
              color: "#000",
              fontSize: "14px",
              textAlign: "left",
            }}
          >
            Conversation ID: {props.conversationId}
          </Typography>
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
            onClick={handleCloseDropdown}
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
      {/* <Box
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
            color: "#000",
            fontSize: "14px",
            padding: "2px 4px",
            border: "1px solid grey",
            borderRadius: "5px",
            backgroundColor: "lightgrey",
          }}
        >
          26 October 2024
        </Typography>
      </Box> */}
    </Box>
  );
}
