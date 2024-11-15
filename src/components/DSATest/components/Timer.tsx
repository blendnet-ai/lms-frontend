import { Box, Button, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import { CalculationsUtil } from "../../../utils/calculations";
import { icons } from "../../../assets";
import { useNavigate } from "react-router-dom";

export default function Timer({
  assessmentId,
  submitSolution,
  ApiClass,
  navigationUrl,
}: {
  assessmentId: number;
  submitSolution: (navToReport: boolean) => void;
  ApiClass: any;
  navigationUrl: string;
}) {
  const [testDuration, setTestDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [nowTime, setNowTime] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!startTime || !testDuration) return;
    const endTime = startTime + testDuration * 1000;

    const remainingTimeInSeconds = Math.max(
      0,
      Math.floor((endTime - nowTime) / 1000)
    );

    const formattedTime = CalculationsUtil.formatTime(remainingTimeInSeconds);
    setTimeRemaining(formattedTime);
  }, [nowTime, startTime, testDuration]);

  useEffect(() => {
    if (!submitted && timeRemaining == "00:00") {
      submitSolution(false);
      setSubmitted(true);
    }
  }, [timeRemaining, submitted]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiClass.getState(assessmentId.toString());
        const startTime = parseISO(data.start_time).getTime();
        setStartTime(startTime);
        setTestDuration(data.test_duration);
      } catch (error) {
        console.error(error);

        // if response status is 400, then set the test duration to mock value (30 minutes)
        if (error.response?.status === 400) {
          setTestDuration(30 * 60);
          setStartTime(Date.now());
        }
      }
    };

    fetchData();
  }, [assessmentId]);

  useEffect(() => {
    const intervalID = setInterval(() => setNowTime(Date.now()), 1000);
    return () => clearInterval(intervalID);
  }, []);

  const navigateToReport = () => {
    navigate(`/${navigationUrl}=${assessmentId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#2059EE",
        padding: "5px 15px 5px 5px",
        borderRadius: "50px",
        color: "white",
      }}
    >
      <CardMedia
        component="img"
        image={icons.timeStart}
        alt="Clock"
        sx={{
          backgroundColor: "white",
          padding: "2px",
          width: "26px",
          height: "26px",
          borderRadius: "50%",
        }}
      />
      <Typography variant="body1">{timeRemaining}</Typography>

      {/* open dialog box when time is over */}
      {timeRemaining == "00:00" && (
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
                width: "200px",
                height: "200px",
                marginBottom: "20px",
              }}
            />
            <Typography
              variant="h5"
              sx={{ marginBottom: "20px", color: "black" }}
            >
              Time Over
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2059EE",
                color: "white",
                borderRadius: "10px",
              }}
              onClick={navigateToReport}
            >
              Check Report
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
