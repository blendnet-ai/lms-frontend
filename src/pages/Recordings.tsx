import { useEffect, useState } from "react";
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
  TIME_SPENT_PREFIX: "timeSpent_on_recording_",
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
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (selectedRecordingData) {
      const savedTime = localStorage.getItem(
        `${LOCAL_STORAGE_KEYS.TIME_SPENT_PREFIX}${selectedRecordingData.meeting_id}`
      );
      if (savedTime) setTimeSpent(parseInt(savedTime, 10));

      const intervalId = setInterval(() => {
        setTimeSpent((prev) => {
          const updatedTime = prev + 1;
          localStorage.setItem(
            `${LOCAL_STORAGE_KEYS.TIME_SPENT_PREFIX}${selectedRecordingData.meeting_id}`,
            updatedTime.toString()
          );
          return updatedTime;
        });
      }, 1000);

      setTimerId(intervalId);
      return () => clearInterval(intervalId);
    }
  }, [selectedRecordingData]);

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

  const handleBackToList = async () => {
    if (timerId) clearInterval(timerId);
    console.log(`Total time spent: ${timeSpent} seconds`);

    const formattedTime = formatTime(timeSpent);
    const data = {
      content_id: selectedRecordingData?.meeting_id,
      content_type: "recording",
      time_spent: formattedTime,
    };

    try {
      await LMSAPI.resourseEventLogging(data);
      console.log("Time spent logged successfully.");
    } catch {
      console.error("Error logging time spent.");
    }

    localStorage.removeItem(
      `${LOCAL_STORAGE_KEYS.TIME_SPENT_PREFIX}${selectedRecordingData?.meeting_id}`
    );
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
        </Box>
        )
      )}
    </Box>
  );
};

export default Recordings;
