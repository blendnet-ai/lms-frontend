import { Box, Button, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { useEffect, useState, useCallback, useRef } from "react";
import LMSAPI from "../apis/LmsAPI";
import { Resource } from "./Modules";
import { formatTime } from "../utils/formatTime";

type CourseResourceProps = {
  resource: Resource;
  unselectResource: () => void;
};

const CourseResource = ({
  resource,
  unselectResource,
}: CourseResourceProps) => {
  const [fetchedResourceUrl, setFetchedResourceUrl] = useState<string>("");

  const fetchSasUrl = useCallback(async (url: string) => {
    try {
      const response = await LMSAPI.getSasUrl(url);
      setFetchedResourceUrl(response.url);
    } catch (error) {
      console.error("Error fetching SAS URL:", error);
    }
  }, []);

  useEffect(() => {
    if (resource.url) {
      fetchSasUrl(resource.url);
    }
  }, [resource.url, fetchSasUrl]);

  const handleBackButtonClick = async () => {
    // Call the unselectResource function
    unselectResource();

    // pause timer and polling interval
    pauseTimer();
    pausePollingInterval();

    // clear states
    setTimeSpent(0);
    timeSpentRef.current = 0;
    setPollingInterval(0);
    pollingIntervalRef.current = 0;
  };

  const renderContent = () => {
    if (!fetchedResourceUrl) {
      return <Typography>Loading resource...</Typography>;
    }

    switch (resource.type) {
      case "video":
      case "recording":
        return (
          <ReactPlayer
            url={fetchedResourceUrl}
            width="60%"
            height="60%"
            controls
          />
        );
      case "reading":
        return (
          <iframe
            src={fetchedResourceUrl}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              overflow: "hidden",
            }}
            allowFullScreen
            title="Reading Resource"
          />
        );
      default:
        return (
          <Typography>Unsupported resource type: {resource.type}</Typography>
        );
    }
  };

  // time spent tracking
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

  // Handle time tracking when a resource is selected
  useEffect(() => {
    if (resource) {
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
      };
    }
  }, [resource]);

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
          if (newInterval >= 5) {
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
    if (!fetchedResourceUrl) return;

    const totalTime = timeSpentRef.current;
    if (totalTime === 0) return;

    // send 1 minute in data
    const formattedTime = formatTime(60);
    const data = {
      content_id: resource.id,
      content_type: resource.type,
      time_spent: formattedTime,
    };

    try {
      await LMSAPI.resourseEventLogging(data);
      console.log("Time spent logged successfully.");
    } catch (err) {
      console.error("Error logging time spent:", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "20px",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "#2059EE",
          }}
        >
          {resource.title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "auto" }}
          onClick={handleBackButtonClick}
        >
          Back
        </Button>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          mt: "20px",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default CourseResource;
