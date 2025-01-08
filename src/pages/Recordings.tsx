import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import BreadCrumb from "../components/BreadCrumb";
import LiveClassAPI, { Recording } from "../apis/LiveClassAPI";
import ReactPlayer from "react-player";
import LMSAPI from "../apis/LmsAPI";
import { formatTime } from "../utils/formatTime";

const LOCAL_STORAGE_KEYS = {
  SELECTED_RECORDING: "_selected_campaign",
  SELECTED_RECORDING_DATA: "_campaign_data",
  TIME_SPENT: "_event_tracking_ts",
  POLLING_INTERVAL: "_event_tracking_pi",
};

const Recordings = () => {
  const [recordings, setRecordings] = useState<Recording[] | null>(null);
  const [selectedRecording, setSelectedRecording] = useState<string | null>(
    null
  );
  const [selectedRecordingData, setSelectedRecordingData] =
    useState<Recording | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [pollingInterval, setPollingInterval] = useState<number>(0);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const pollingIntervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const timeSpentRef = useRef<number>(0);
  const pollingIntervalRef = useRef<number>(0);

  // Update the ref whenever timeSpent or pollingInterval changes
  useEffect(() => {
    timeSpentRef.current = timeSpent;
    pollingIntervalRef.current = pollingInterval;
  }, [timeSpent, pollingInterval]);

  // Load selected recording and time spent from localStorage on mount
  useEffect(() => {
    const savedRecording = localStorage.getItem(
      LOCAL_STORAGE_KEYS.SELECTED_RECORDING
    );
    const savedData = localStorage.getItem(
      LOCAL_STORAGE_KEYS.SELECTED_RECORDING_DATA
    );
    const savedTimeSpent = localStorage.getItem(LOCAL_STORAGE_KEYS.TIME_SPENT);
    const savedPollingInterval = localStorage.getItem(
      LOCAL_STORAGE_KEYS.POLLING_INTERVAL
    );

    if (savedRecording && savedData) {
      setSelectedRecording(savedRecording);
      setSelectedRecordingData(JSON.parse(savedData));
    }

    if (savedTimeSpent) {
      setTimeSpent(Number(savedTimeSpent));
      timeSpentRef.current = Number(savedTimeSpent);
    }

    if (savedPollingInterval) {
      setPollingInterval(Number(savedPollingInterval));
      pollingIntervalRef.current = Number(savedPollingInterval);
    }
  }, []);

  // Fetch recordings on mount
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await LiveClassAPI.getRecordings();
        setRecordings(response);
      } catch {
        setError("Failed to fetch recordings. Please try again later.");
      }
    };

    fetchRecordings();
  }, []);

  // Update localStorage whenever timeSpent changes
  useEffect(() => {
    if (selectedRecordingData) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TIME_SPENT, timeSpent.toString());
    }
  }, [timeSpent]);

  // Update localStorage whenever pollingInterval changes
  useEffect(() => {
    if (selectedRecordingData) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.POLLING_INTERVAL,
        pollingInterval.toString()
      );
    }
  }, [pollingInterval]);

  // Handle time tracking when a recording is selected
  useEffect(() => {
    if (selectedRecordingData) {
      // Start the timer
      startTimer();
      startPollingInterval();

      // Handle visibility changes (e.g., user switches tabs)
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          pauseTimer();
          pausePollingInterval();
        } else if (document.visibilityState === "visible") {
          startTimer();
          startPollingInterval();
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        // Clean up event listeners, timer, and polling
        pauseTimer();
        pausePollingInterval();
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        // Log any remaining time when the component unmounts
        logTimeSpent();
      };
    }
  }, [selectedRecordingData]);

  // Function to start the timer
  const startTimer = () => {
    if (timerIdRef.current === null) {
      timerIdRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
  };

  // Function to pause the timer
  const pauseTimer = () => {
    if (timerIdRef.current !== null) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  };

  // Function to start the polling interval
  const startPollingInterval = () => {
    if (pollingIntervalIdRef.current === null) {
      pollingIntervalIdRef.current = setInterval(() => {
        setPollingInterval((prev) => {
          const newInterval = prev + 1;
          if (newInterval >= 60) {
            logTimeSpent();
            return 0;
          }
          return newInterval;
        });
      }, 1000);
    }
  };

  // Function to pause the polling interval
  const pausePollingInterval = () => {
    if (pollingIntervalIdRef.current !== null) {
      clearInterval(pollingIntervalIdRef.current);
      pollingIntervalIdRef.current = null;
    }
  };

  // Function to log time spent using regular API call
  const logTimeSpent = async () => {
    if (!selectedRecordingData) return;

    const totalTime = timeSpentRef.current;
    if (totalTime === 0) return;

    // send 1 minute in data
    const formattedTime = formatTime(60);
    const data = {
      content_id: selectedRecordingData.meeting_id,
      content_type: "recording",
      time_spent: formattedTime,
    };

    try {
      await LMSAPI.resourseEventLogging(data);
      console.log("Time spent logged successfully.");
    } catch (err) {
      console.error("Error logging time spent:", err);
    }
  };

  // Handler to view a recording
  const handleViewRecording = async (row: Recording) => {
    try {
      const response = await LMSAPI.getSasUrl(row.blob_url);
      if (response.url) {
        setSelectedRecording(response.url);
        setSelectedRecordingData(row);
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.SELECTED_RECORDING,
          response.url
        );
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.SELECTED_RECORDING_DATA,
          JSON.stringify(row)
        );
      } else {
        setError("Failed to fetch recording. Please try again later.");
      }
    } catch {
      setError("Error fetching recording.");
    }
  };

  // Handler to go back to the recordings list
  const handleBackToList = async () => {
    // Pause the timer
    pauseTimer();
    pausePollingInterval();

    // Clean up localStorage and reset state
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_RECORDING);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_RECORDING_DATA);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TIME_SPENT);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.POLLING_INTERVAL);
    setSelectedRecording(null);
    setSelectedRecordingData(null);
    setTimeSpent(0);
    timeSpentRef.current = 0;
    setPollingInterval(0);
    pollingIntervalRef.current = 0;
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#EFF6FF",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "20px",
        width: "100%",
      }}
    >
      <BreadCrumb
        previousPages={[{ name: "Home", route: "/" }]}
        currentPageName="Recordings"
      />

      <Typography variant="h6" sx={{ marginY: "20px" }}>
        Recordings
      </Typography>

      {error && (
        <Typography color="error" sx={{ marginBottom: "20px" }}>
          {error}
        </Typography>
      )}

      {!selectedRecording && recordings ? (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {recordings.map((row) => (
                <TableRow key={row.meeting_id}>
                  <TableCell>
                    <Box>
                      <Typography fontWeight="bold">
                        {row.course_name}
                      </Typography>
                      <Typography>{row.meeting_title}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleViewRecording(row)}
                    >
                      View Recording
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : recordings?.length === 0 ? (
        <Typography>No recordings available</Typography>
      ) : (
        selectedRecording && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <ReactPlayer
              url={selectedRecording}
              width="60%"
              height="60%"
              controls
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: "20px" }}
              onClick={handleBackToList}
            >
              Back to List
            </Button>
          </Box>
        )
      )}
    </Box>
  );
};

export default Recordings;
