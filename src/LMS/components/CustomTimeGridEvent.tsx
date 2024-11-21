import { Box, Typography } from "@mui/material";

type props = {
  calendarEvent: {
    id: string | number;
    title: string;
    start: string;
    end: string;
    shortTitle: string;
    meetingLink: string;
    meetingPlatform: string;
    type: number;
  };
};

export default function CustomDateGridEvent({ calendarEvent }: props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        background: "#00995B",
        color: "white",
        padding: "10px",
        borderRadius: 2,
        border: "1px solid white",
      }}
    >
      <Typography>{calendarEvent.title}</Typography>

      <Typography>{calendarEvent.shortTitle}</Typography>
    </Box>
  );
}
