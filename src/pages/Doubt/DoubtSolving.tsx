import {
  Box,
  CardMedia,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { icons } from "../../assets";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import EditIcon from "@mui/icons-material/Edit";
import { Clear, Search } from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import { useState } from "react";

export default function DoubtSolving() {
  const [query, setQuery] = useState<string>("");

  // handle query change
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // clear query
  const handleClearQuery = () => {
    setQuery("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
      }}
    >
      {/* content  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100vh",
          backgroundColor: "#EFF6FF",
        }}
      >
        {/* left */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            padding: "20px",
            height: "100%",
            gap: "20px",
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
            {/* DIsha */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {/* history button  */}
              <Tooltip title="Show History">
                <IconButton>
                  <HistoryToggleOffIcon
                    sx={{
                      color: "#fff",
                      fontSize: "1.5rem",
                    }}
                  />
                </IconButton>
              </Tooltip>

              {/* disha maam  */}
              <CardMedia
                component="img"
                image={icons.avatar3}
                alt="avatar"
                sx={{ width: 40, height: 40, borderRadius: "50%" }}
              />

              {/* name  */}
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

            {/* Edit  */}
            <Tooltip title="Edit">
              <IconButton>
                <EditIcon
                  sx={{
                    color: "#fff",
                    fontSize: "1.5rem",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          {/* conversation module */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              height: "100%",
              backgroundColor: "#fff",
              borderRadius: "10px",
              gap: "20px",
            }}
          >
            {/* conversations */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {/* welcome message */}
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
                Please select the conversation mode and course and start
                chatting with Disha.
              </Typography>
            </Box>

            {/* search bar */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: "20px",
              }}
            >
              {/* Input  */}
              <Box
                component="form"
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
                  value={query}
                  onChange={handleQueryChange}
                  sx={{
                    flex: 1,
                    padding: "0.8rem",
                  }}
                  placeholder="search"
                  inputProps={{ "aria-label": "search google maps" }}
                />
                {query.length > 0 && (
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

                <Tooltip title="Search">
                  <IconButton
                    type="button"
                    onClick={handleClearQuery}
                    sx={{
                      p: "10px",
                    }}
                    aria-label="search"
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
              <Tooltip title="Voice Search">
                <IconButton
                  sx={{
                    marginTop: "10px",
                  }}
                  aria-label="search"
                >
                  <MicIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* right */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            padding: "20px",
          }}
        ></Box>
      </Box>
    </Box>
  );
}
