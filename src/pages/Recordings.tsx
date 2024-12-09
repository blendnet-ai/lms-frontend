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
import { useEffect, useState } from "react";
import LiveClassAPI, { Recording } from "../apis/LiveClassAPI";
import ReactPlayer from "react-player";
import LMSAPI from "../apis/LmsAPI";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: "/",
  },
];

const Recordings = () => {
  const [recordings, setRecordings] = useState<Recording[] | null>(null);
  const [selectedRecording, setSelectedRecording] = useState<string | null>(
    null
  );
  const [selectedRecordingData, setSelectedRecordingData] = useState<
    any | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  // Update URL based on selected recording
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedRecording) {
      url.searchParams.set("recordingId", selectedRecordingData.meeting_id);
    } else {
      url.searchParams.delete("recordingId");
    }
    window.history.replaceState({}, "", url.toString());
  }, [selectedRecording]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await LiveClassAPI.getRecordings();
        setRecordings(response);
      } catch (err) {
        setError("Failed to fetch recordings. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleViewRecording = async (row: any) => {
    try {
      const response = await LMSAPI.getSasUrl(row.blob_url);

      if (response.url) {
        setSelectedRecording(response.url);
      } else {
        setError("Failed to fetch recording. Please try again later.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackToList = () => {
    setSelectedRecording(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#EFF6FF",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
      }}
    >
      {/* Breadcrumb */}
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Recordings"}
      />

      {/* Page Title */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        Recordings
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          marginBottom: "20px",
          padding: "20px",
          backgroundColor: "#fff",
          color: "#2059EE",
        }}
      >
        List of all recordings
      </Typography>

      {error && (
        <Typography
          sx={{
            color: "red",
            marginBottom: "20px",
          }}
        >
          {error}
        </Typography>
      )}

      {/* Recording List */}
      {!selectedRecording && recordings && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="recordings table">
            <TableBody>
              {recordings.map((row) => (
                <TableRow
                  key={row.batch_id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        {row.course_name}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "semibold",
                          fontSize: "12px",
                        }}
                      >
                        {row.meeting_title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleViewRecording(row);
                        setSelectedRecordingData(row);
                      }}
                    >
                      View Recording
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* if empty */}
      {recordings?.length === 0 && !error && (
        <Typography
          sx={{
            textAlign: "center",
            backgroundColor: "#fff",
            padding: "20px",
            color: "red",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          No recordings available
        </Typography>
      )}

      {/* Selected Recording View */}
      {selectedRecording && (
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
      )}
    </Box>
  );
};

export default Recordings;
