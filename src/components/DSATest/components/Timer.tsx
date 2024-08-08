import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { icons } from "../../../assets";
import { useNavigate } from "react-router-dom";
export default function Timer({
  time,
  questionId,
}: {
  time: number;
  questionId: number;
}) {
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState<number>(() => {
    const savedMinutes = localStorage.getItem(`timerMinutes_${questionId}`);
    return savedMinutes !== null ? JSON.parse(savedMinutes) : time;
  });

  const [seconds, setSeconds] = useState<number>(() => {
    const savedSeconds = localStorage.getItem(`timerSeconds_${questionId}`);
    return savedSeconds !== null ? JSON.parse(savedSeconds) : 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes((prevMinutes) => {
            const newMinutes = prevMinutes - 1;
            localStorage.setItem(
              `timerMinutes_${questionId}`,
              JSON.stringify(newMinutes)
            );
            return newMinutes;
          });
          setSeconds(59);
          localStorage.setItem(
            `timerSeconds_${questionId}`,
            JSON.stringify(59)
          );
        }
      } else {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds - 1;
          localStorage.setItem(
            `timerSeconds_${questionId}`,
            JSON.stringify(newSeconds)
          );
          return newSeconds;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds, questionId]);

  const handleNavigate = () => {
    // clear localStorage when navigate to dashboard
    localStorage.removeItem(`timerMinutes_${questionId}`);
    localStorage.removeItem(`timerSeconds_${questionId}`);
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        width: "100%",
      }}
    >
      <AccessAlarmIcon
        sx={{
          color: "orange",
        }}
      />
      <Typography variant="body1">
        Your Time: {minutes}m {seconds < 10 ? `0${seconds}` : seconds}s
      </Typography>

      {/* open dialog box when time is over */}
      {minutes === 0 && seconds === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
            borderRadius: "10px",
            zIndex: 9999,
            cursor: "not-allowed",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              padding: "30px",
            }}
          >
            <CardMedia
              component="img"
              image={icons.timeOver}
              alt="Time Over"
              sx={{
                width: "100px",
                height: "100px",
                marginBottom: "20px",
              }}
            />
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              Time Over
            </Typography>
            {/* goto dashboard */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2059EE",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={handleNavigate}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
