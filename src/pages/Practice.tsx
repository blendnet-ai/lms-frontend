import { Box, CircularProgress, Typography } from "@mui/material";
import "./../styles/Practice.css";
import { useEffect, useRef, useState } from "react";
import { Height, Mic } from "@mui/icons-material";

const MAX_RECORD_TIME = 120;

function formatSecondsToMinutesAndSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

  return formattedTime;
}

function Practice() {
  const [remainingRecordTime, setRemainingRecordTime] = useState<number>(120);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // startTimer();
  }, []);

  const startRecording = () => {
    startTimer();
    setIsRecording(true);
  };

  const stopRecording = () => {
    stopTimer();
    setIsRecording(false);
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setRemainingRecordTime((prevRemainingTime) => {
          if (prevRemainingTime > 0) {
            return prevRemainingTime - 1;
          } else {
            // stopRecording(true);
            return prevRemainingTime;
          }
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="Practice">
      {/* <h3>Practice</h3> */}
      <div>
        If you could change one thing about your current solution or provider,
        what would it be and why?
      </div>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          thickness={8}
          size={100}
          value={remainingRecordTime / (MAX_RECORD_TIME / 100)}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {formatSecondsToMinutesAndSeconds(remainingRecordTime)}
          </Typography>
        </Box>
      </Box>
      <div
        className={`mic-container ${isRecording ? "recording" : ""}`}
        onClick={handleMicClick}
      >
        <img src="/icons/mic.png" />
      </div>
    </div>
  );
}

export default Practice;
