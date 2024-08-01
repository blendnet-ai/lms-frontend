import { icons } from "../../../assets";
import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        padding: "10px 40px",
        textAlign: "center",
        color: "rgb(255, 255, 255)",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#2059ee",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-end",
        }}
      >
        <img
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "100px",
          }}
          src={icons.bot}
          alt=""
        />
        <Typography
          sx={{
            fontSize: "22px",
            fontWeight: "500",
            marginBottom: "12px",
          }}
        >
          Disha Ma'am
        </Typography>
      </Box>
      {/* <Typography
        sx={{
          fontSize: "12px",
          marginTop: "12px",
        }}
      >
        If you have any questions or need help, feel free to ask. I'm here to
        assist you with any doubts or clarifications you might need!
      </Typography> */}
    </Box>
  );
}
