import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player";
import { useEffect, useState, useCallback, useRef } from "react";
import LMSAPI from "../apis/LmsAPI";
import { Resource } from "./Modules";
import { formatTime } from "../utils/formatTime";
import LiveClassAPI from "../apis/LiveClassAPI";

type CourseResourceProps = {
  resource: Resource;
  unselectResource: () => void;
};

const CourseResource = ({
  resource,
  unselectResource,
}: CourseResourceProps) => {
  const [fetchedResourceUrl, setFetchedResourceUrl] = useState<string>("");
  const [isReadingLoading, setIsReadingLoading] = useState<boolean>(true);

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
    // Reset loading state when resource changes
    setIsReadingLoading(true);
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
      return <p className="text-gray-600">Loading resource...</p>;
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
          <div className="w-full h-full relative">
            {isReadingLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-blue-500">Loading document...</span>
              </div>
            )}
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                fetchedResourceUrl
              )}&embedded=true`}
              className="w-full h-full border-none overflow-hidden"
              allowFullScreen
              title="Reading Resource"
              onLoad={() => setIsReadingLoading(false)}
              onError={() => setIsReadingLoading(false)}
            />
          </div>
        );
      default:
        return (
          <p className="text-gray-600">
            Unsupported resource type: {resource.type}
          </p>
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
      await LiveClassAPI.resourseEventLogging(data);
      console.log("Time spent logged successfully.");
    } catch (err) {
      console.error("Error logging time spent:", err);
    }
  };

  return (
    <div className="flex flex-col w-full p-5 h-screen bg-white">
      {/* Header Section */}
      <div className="flex flex-row items-center">
        <h1 className="text-2xl font-bold text-blue-600">{resource.title}</h1>
        <Button
          variant="default"
          className="ml-auto"
          onClick={handleBackButtonClick}
        >
          Back
        </Button>
      </div>

      {/* Content Section */}
      <div className="flex justify-center items-center h-full mt-5">
        {renderContent()}
      </div>
    </div>
  );
};

export default CourseResource;
