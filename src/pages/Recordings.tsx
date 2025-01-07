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
  SELECTED_RECORDING: "selectedRecording",
  SELECTED_RECORDING_DATA: "selectedRecordingData",
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
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const timeSpentRef = useRef<number>(0);

  // Update the ref whenever timeSpent changes
  useEffect(() => {
    timeSpentRef.current = timeSpent;
  }, [timeSpent]);

  // Load selected recording from localStorage on mount
  useEffect(() => {
    const savedRecording = localStorage.getItem(
      LOCAL_STORAGE_KEYS.SELECTED_RECORDING
    );
    const savedData = localStorage.getItem(
      LOCAL_STORAGE_KEYS.SELECTED_RECORDING_DATA
    );

    if (savedRecording && savedData) {
      setSelectedRecording(savedRecording);
      setSelectedRecordingData(JSON.parse(savedData));
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

  // Handle time tracking when a recording is selected
  useEffect(() => {
    if (selectedRecordingData) {
      // Start the timer
      startTimer();

      // Handle visibility changes (e.g., user switches tabs)
      const handleVisibilityChange = () => {
        if (document.visibilityState === "hidden") {
          pauseTimer();
        } else if (document.visibilityState === "visible") {
          startTimer();
        }
      };

      // Handle page unload (refresh, close, navigate away)
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        // Log the time spent using navigator.sendBeacon
        logTimeSpentBeacon();

        // Optional: Display a confirmation dialog (not recommended for user experience)
        // e.preventDefault();
        // e.returnValue = '';
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        // Clean up event listeners and timer
        pauseTimer();
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        window.removeEventListener("beforeunload", handleBeforeUnload);
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

  // Function to log time spent using regular API call
  const logTimeSpent = async () => {
    if (!selectedRecordingData) return;

    const totalTime = timeSpentRef.current;
    if (totalTime === 0) return;

    const formattedTime = formatTime(totalTime);
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

  // Function to log time spent using navigator.sendBeacon
  const logTimeSpentBeacon = () => {
    if (!selectedRecordingData) return;

    const totalTime = timeSpentRef.current;
    if (totalTime === 0) return;

    const formattedTime = formatTime(totalTime);
    const data = {
      content_id: selectedRecordingData.meeting_id,
      content_type: "recording",
      time_spent: formattedTime,
    };

    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    const beaconUrl = LMSAPI.getBeaconUrl();

    const success = navigator.sendBeacon(beaconUrl, blob);
    if (success) {
      console.log("Time spent logged successfully via Beacon.");
    } else {
      console.error("Failed to send time spent via Beacon.");
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

    // Log the time spent via regular API call
    await logTimeSpent();

    // Clean up localStorage and reset state
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_RECORDING);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SELECTED_RECORDING_DATA);
    setSelectedRecording(null);
    setSelectedRecordingData(null);
    setTimeSpent(0);
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
            <Typography sx={{ marginTop: "10px" }}>
              Time Spent: {formatTime(timeSpent)}
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
};

export default Recordings;
