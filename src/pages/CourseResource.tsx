import { Box, Button, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { useEffect, useState, useCallback } from "react";
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
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

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

  // Load initial time from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem(`timeSpent_${resource.id}`);
    if (savedTime) {
      setTimeSpent(parseInt(savedTime, 10));
    }

    const id = setInterval(() => {
      setTimeSpent((prev) => {
        const newTime = prev + 1;
        localStorage.setItem(`timeSpent_${resource.id}`, newTime.toString());
        return newTime;
      });
    }, 1000);

    setTimerId(id);

    // Cleanup interval on unmount
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [resource.id]);

  const handleBackButtonClick = async () => {
    // Clear the timer
    if (timerId) {
      clearInterval(timerId);
    }

    // Log the total time spent in the console
    console.log(`Total time spent on the resource: ${timeSpent} seconds`);

    // Clean up localStorage
    localStorage.removeItem(`timeSpent_${resource.id}`);

    // Format the time spent as HH:MM:SS
    const formattedTime = formatTime(timeSpent);

    // Prepare data for API call
    const data = {
      content_id: resource.id,
      content_type: resource.type,
      time_spent: formattedTime,
    };

    // Make the API call only once when the user navigates away
    try {
      const resp = await LMSAPI.resourseEventLogging(data);
      console.log("Time spent logged successfully:", resp);
    } catch (error) {
      console.error("Error recording time spent:", error);
    }

    // Call the unselectResource function
    unselectResource();
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
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(
              fetchedResourceUrl
            )}&embedded=true`}
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
