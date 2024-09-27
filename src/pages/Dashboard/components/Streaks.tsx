import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { format, startOfWeek, addDays } from "date-fns";
import DashboardAPI, {
  GetActivityDataResponse,
} from "../../../apis/DashboardAPI";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Streaks() {
  const [weekDates, setWeekDates] = useState<Date[]>([]);

  const [data, setData] = useState<GetActivityDataResponse | null>(null);

  const getWeekDates = (currentDate: Date): Date[] => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  useEffect(() => {
    const today = new Date();
    setWeekDates(getWeekDates(today));
  }, []);

  const fetchData = async () => {
    const data = await DashboardAPI.getActivityData();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "auto",
        padding: "25px",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      {/* heading  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            padding: "10px 60px",
            borderRadius: "10px",
            color: "#2059EE",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Daily Streak
        </Typography>
      </Box>

      {/* streaks  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mt: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            color: "#888",
          }}
        >
          Current Streak: <strong>{data?.current_streak} Days</strong>
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            color: "#888",
          }}
        >
          Longest Streak: <strong>{data?.longest_streak} Days</strong>
        </Typography>
      </Box>

      {/* Month  */}
      <Typography
        sx={{
          fontSize: "16px",
          color: "#000",
          fontWeight: "bold",
          my: "10px",
        }}
      >
        July 2024
      </Typography>

      {/* calendar  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          mt: "10px",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "5px",
          }}
        >
          {/* start with dayToday and fill the remaining days rolling , back to dayToday */}
          {days.map((day) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px",
                color: "black",
                borderBottom: "1px solid #888",
              }}
            >
              {day}
            </Box>
          ))}

          {weekDates.map((date, index) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px",
                color: data?.activity_status[index] ? "white" : "black",
                backgroundColor: data?.activity_status[index] ? "#00995B" : "",
                borderRadius: "5px",
              }}
            >
              {format(date, "dd")}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
