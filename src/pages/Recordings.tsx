import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import BreadCrumb from "../components/BreadCrumb";
import LiveClassAPI, { Recording } from "../apis/LiveClassAPI";
import ReactPlayer from "react-player";
import LMSAPI from "../apis/LmsAPI";
import { formatTime } from "../utils/formatTime";
import { ROUTES } from "../configs/routes";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [isLoading, setIsLoading] = useState(true);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const pollingIntervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const timeSpentRef = useRef<number>(0);
  const pollingIntervalRef = useRef<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Update the ref whenever timeSpent or pollingInterval changes
  useEffect(() => {
    timeSpentRef.current = timeSpent;
    pollingIntervalRef.current = pollingInterval;
  }, [timeSpent, pollingInterval]);

  // Fetch recordings on mount
  useEffect(() => {
    const fetchRecordings = async () => {
      setIsLoading(true);
      try {
        const response = await LiveClassAPI.getRecordings();
        setRecordings(response);

        const params = new URLSearchParams(location.search);
        const recordingId = params.get("recordingId");

        if (recordingId) {
          const recording = response.find(
            (rec: any) => rec.meeting_id === Number(recordingId)
          );

          if (recording) {
            handleViewRecording(recording);
          }
        }
      } catch {
        setError("Failed to fetch recordings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecordings();
  }, [location.search]);

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
      await LiveClassAPI.resourseEventLogging(data);
      console.log("Time spent logged successfully.");
    } catch (err) {
      console.error("Error logging time spent:", err);
    }
  };

  // Handler to view a recording
  const handleViewRecording = async (row: Recording) => {
    setIsLoading(true);
    try {
      const response = await LMSAPI.getSasUrl(row.blob_url);
      if (response.url) {
        setSelectedRecording(response.url);
        setSelectedRecordingData(row);
        navigate(`?recordingId=${row.meeting_id}`);
      } else {
        setError("Failed to fetch recording. Please try again later.");
      }
    } catch {
      setError("Error fetching recording.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler to go back to the recordings list
  const handleBackToList = async () => {
    // Pause the timer
    pauseTimer();
    pausePollingInterval();

    // Reset state
    setSelectedRecording(null);
    setSelectedRecordingData(null);
    setTimeSpent(0);
    timeSpentRef.current = 0;
    setPollingInterval(0);
    pollingIntervalRef.current = 0;
    navigate("");
  };

  // Add loading skeleton component
  const RecordingsSkeleton = () => (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableBody>
          {[1, 2, 3, 4, 5].map((index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[150px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-9 w-[120px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#EFF6FF] p-8 pt-6 w-full">
      <BreadCrumb
        previousPages={[{ name: "Home", route: ROUTES.HOME }]}
        currentPageName="Recordings"
      />

      <h2 className="text-xl font-semibold my-5">Recordings</h2>

      {error && <p className="text-red-500 mb-5">{error}</p>}

      {isLoading ? (
        <RecordingsSkeleton />
      ) : !selectedRecording && recordings ? (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableBody>
              {recordings.map((row) => (
                <TableRow key={row.meeting_id}>
                  <TableCell className="py-4 px-4">
                    <div className="space-y-2">
                      <p className="font-bold">{row.course_name}</p>
                      <p>
                        {row.meeting_title} - {row.batch_name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div>
                      <p className="font-bold">
                        {new Date(row.meeting_date).toDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Button
                      variant="primary"
                      onClick={() => handleViewRecording(row)}
                    >
                      View Recording
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : recordings?.length === 0 ? (
        <p className="text-gray-600">No recordings available</p>
      ) : (
        selectedRecording && (
          <div className="flex flex-col items-center justify-center mt-5">
            {isLoading ? (
              <Skeleton className="w-[60%] h-[400px]" />
            ) : (
              <ReactPlayer
                url={selectedRecording}
                width="60%"
                height="60%"
                controls
              />
            )}
            <Button variant="light" className="mt-5" onClick={handleBackToList}>
              Back to List
            </Button>
          </div>
        )
      )}
    </div>
  );
};

export default Recordings;
