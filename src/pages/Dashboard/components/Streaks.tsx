import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
export default function Streaks({
  data,
}: {
  data: { total_problems_solved: number };
}) {
  const [dateToday, setDateToday] = useState(yesterday.getDate());

  const [dayToday, setDayToday] = useState(days[yesterday.getDay()]);

  useEffect(() => {
    console.log(dayToday, dateToday, today.getDate());
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
            backgroundColor: "#2059EE",
            padding: "10px 60px",
            borderRadius: "10px",
            color: "#fff",
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
          flexDirection: "column",
          justifyContent: "center",
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
          Current Streak:{" "}
          {data?.total_problems_solved ? (
            <strong>1 Days</strong>
          ) : (
            <strong>--</strong>
          )}{" "}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            color: "#888",
          }}
        >
          Longest Streak:{" "}
          {data?.total_problems_solved ? (
            <strong>1 Days</strong>
          ) : (
            <strong>--</strong>
          )}{" "}
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
          {days.slice(days.indexOf(dayToday)).map((day) => (
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

          {days.slice(0, days.indexOf(dayToday)).map((day) => (
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

          {dates.slice(dateToday - 1).map((date) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "5px",
                color:
                  date === today.getDate() && data?.total_problems_solved > 0
                    ? "#fff"
                    : "black",
                borderBottom: "1px solid #888",
                backgroundColor:
                  date === today.getDate() && data?.total_problems_solved > 0
                    ? "#00995B"
                    : "",
              }}
            >
              {date}
            </Box>
          ))}

          {dates
            .slice(0, dateToday - 1)
            .slice(0, 7 - (dates.length - dateToday + 1))
            .map((date) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  color: "black",
                  borderBottom: "1px solid #888",
                  backgroundColor:
                    date === today.getDate() && data?.total_problems_solved > 0
                      ? "#00995B"
                      : "",
                }}
              >
                {date}
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}
