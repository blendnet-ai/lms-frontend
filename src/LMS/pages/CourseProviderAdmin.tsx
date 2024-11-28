import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState, useMemo, useCallback } from "react";
import LiveClassAPI from "../apis/LiveClassAPI";
import CreateLiveClassModal from "../modals/CreateLiveClassModal";
import EditLiveClassModal from "../modals/EditLiveClassModal";
import { Scheduler } from "@aldabil/react-scheduler";
import GroupsIcon from "@mui/icons-material/Groups";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};

const buttonStyles = {
  borderRadius: "10px",
  padding: "10px",
  fontSize: "14px",
  fontWeight: "bold",
};

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  backgroundColor: "#fff",
  border: "1px solid #EFF6FF",
  boxShadow: "0px 5px 8px 0px #00000033",
};

const CourseProviderAdmin = () => {
  const createLiveClassModal = useModal();
  const editLiveClassModal = useModal();

  const [liveClassesEvents, setLiveClassesEvents] = useState([]);
  const [liveClassMeetingId, setLiveClassMeetingId] = useState<string>("");
  const [classDetails, setClassDetails] = useState({
    title: "",
    start_time: "",
    duration: "",
    start_date: "",
    end_date: "",
    recurrence_type: "",
    weekday_schedule: null,
    monthly_day: null,
  });

  const fetchLiveClasses = useCallback(async () => {
    try {
      const rawData = await LiveClassAPI.getLiveClasses(
        "2024-11-28",
        "2024-12-30"
      );
      const formattedData = rawData.map((event, index) => ({
        event_id: index,
        title: event.title,
        subtitle: "Empty",
        meetingLink: event.link,
        meetingId: event.meeting_id,
        meetingPlatform: "Ms Teams",
        start: new Date(event.start_timestamp),
        end: new Date(event.end_timestamp),
        color: "#00995B",
      }));
      setLiveClassesEvents(formattedData);
    } catch (error) {
      console.error("Error fetching live classes:", error);
    }
  }, []);

  const fetchClassDetails = async (classId: string) => {
    try {
      const data = await LiveClassAPI.getLiveClassDetails(Number(classId));
      setClassDetails((prev) => ({ ...prev, ...data }));
      setLiveClassMeetingId(classId);
      editLiveClassModal.open();
    } catch (error) {
      console.error("Error fetching class details:", error);
    }
  };

  useEffect(() => {
    fetchLiveClasses();
  }, [fetchLiveClasses]);

  const liveClassesSchedule = useMemo(
    () => liveClassesEvents,
    [liveClassesEvents]
  );

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#EFF6FF",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "20px",
        mt: "3.5rem",
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          color: "#333",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        My Schedule
      </Typography>
      <Scheduler
        height={700}
        view="month"
        events={liveClassesSchedule}
        deletable={false}
        editable={false}
        agenda={false}
        customViewer={(event) => (
          <Box sx={containerStyles}>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#333",
                padding: "10px",
                borderBottom: "1px solid #EFF6FF",
              }}
            >
              {event.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#333",
                padding: "10px",
                borderBottom: "1px solid #EFF6FF",
              }}
            >
              {event.start.toLocaleTimeString()} -{" "}
              {event.end.toLocaleTimeString()}
            </Typography>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                sx={{
                  ...buttonStyles,
                  backgroundColor: "#2059EE",
                  color: "#fff",
                }}
                onClick={() => window.open(event.meetingLink, "_blank")}
              >
                Join
              </Button>
              <Button
                variant="contained"
                sx={{
                  ...buttonStyles,
                  backgroundColor: "#fff",
                  color: "#2059EE",
                }}
                onClick={() => {
                  fetchClassDetails(event.meetingId);
                  setLiveClassMeetingId(event.meetingId);
                }}
              >
                Edit
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #EFF6FF",
              }}
            >
              <GroupsIcon />
              <Typography sx={{ fontSize: "14px", color: "#333" }}>
                {event.meetingPlatform}
              </Typography>
            </Box>
          </Box>
        )}
      />
      <Button
        variant="contained"
        sx={{
          mt: "20px",
          backgroundColor: "#2059EE",
          color: "#fff",
          borderRadius: "0px",
          padding: "10px",
          fontSize: "14px",
          fontWeight: "bold",
          alignSelf: "flex-start",
        }}
        onClick={createLiveClassModal.open}
      >
        Add New Live Class
      </Button>
      <CreateLiveClassModal
        open={createLiveClassModal.isOpen}
        close={createLiveClassModal.close}
        submit={createLiveClassModal.close}
      />
      <EditLiveClassModal
        open={editLiveClassModal.isOpen}
        close={editLiveClassModal.close}
        submit={editLiveClassModal.close}
        meetingId={liveClassMeetingId}
        data={classDetails}
      />
    </Box>
  );
};

export default CourseProviderAdmin;
