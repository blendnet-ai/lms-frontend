import { Box, CardMedia, Typography } from "@mui/material";
import { icons } from "../../../assets";

type UserMessageProps = {
  message: string;
};

const UserMessage = (props: UserMessageProps) => {
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
        {props.message}
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

export default UserMessage;
