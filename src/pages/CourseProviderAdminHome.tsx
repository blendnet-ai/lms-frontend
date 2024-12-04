import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState, useMemo, useCallback } from "react";
import LiveClassAPI from "../apis/LiveClassAPI";
import CreateLiveClassModal from "../modals/CreateLiveClassModal";
import EditLiveClassModal from "../modals/EditLiveClassModal";
import { Scheduler } from "@aldabil/react-scheduler";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachmentIcon from "@mui/icons-material/Attachment";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};

const buttonStyles = {
  borderRadius: "5px",
  padding: "5px",
  fontSize: "14px",
  fontWeight: "bold",
  alignSelf: "flex-start",
};

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "10px 20px",
  width: "100%",
  backgroundColor: "#fff",
  border: "1px solid #EFF6FF",
  boxShadow: "0px 5px 8px 0px #00000033",
};

const CourseProviderAdminHome = () => {
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
  const [liveClassUpdated, setLiveClassUpdated] = useState(false);
  const [liveClassCreated, setLiveClassCreated] = useState(false);

  const fetchLiveClasses = useCallback(async () => {
    const todaysDate = new Date();
    const date30DaysLater = new Date();
    date30DaysLater.setDate(todaysDate.getDate() + 30);

    const formatDate = (date: Date): string => {
      return date.toISOString().slice(0, 10);
    };

    try {
      const rawData = await LiveClassAPI.getLiveClasses(
        formatDate(todaysDate),
        formatDate(date30DaysLater)
      );
      const formattedData = rawData.map(
        (
          event: {
            batch: string;
            course: string;
            duration: string;
            end_timestamp: string | number | Date;
            link: string;
            meeting_id: any;
            series_id: any;
            start_date: string;
            start_time: string;
            start_timestamp: string | number | Date;
            title: string;
            type: number;
          },
          index: any
        ) => ({
          event_id: index,
          heading: "Schedule",
          batch: event.batch,
          course: event.course,
          duration: event.duration,
          end: new Date(event.end_timestamp),
          meetingLink: event.link,
          meetingId: event.meeting_id,
          seriesId: event.series_id,
          start: new Date(event.start_timestamp),
          meetingPlatform: "Teams Meating",
          title: event.title,
          color: "#00995B",
        })
      );
      setLiveClassesEvents(formattedData);
    } catch (error) {
      console.error("Error fetching live classes:", error);
    }
  }, []);

  const fetchClassDetails = async (classId: string) => {
    try {
      const data = await LiveClassAPI.getLiveClassDetails(Number(classId));
      setClassDetails((prev) => ({ ...prev, ...data }));
      editLiveClassModal.open();
    } catch (error) {
      console.error("Error fetching class details:", error);
    }
  };

  useEffect(() => {
    fetchLiveClasses();
  }, [fetchLiveClasses, liveClassUpdated, liveClassCreated]);

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
        Live Classes
      </Typography>
      <Scheduler
        height={window.innerHeight * 0.7}
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
              }}
            >
              {event.heading}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {event.title} - {event.course} - {event.batch}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#333",
              }}
            >
              {event.start.toLocaleTimeString()} -{" "}
              {event.end.toLocaleTimeString()}
            </Typography>
            <Button
              sx={{
                ...buttonStyles,
                backgroundColor: "#2059EE",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#2059EE",
                },
              }}
              onClick={() => {
                fetchClassDetails(event.seriesId);
                setLiveClassMeetingId(event.meetingId);
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                Edit
              </Typography>
            </Button>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                padding: "5px",
                alignItems: "center",
                borderBottom: "1px solid #EFF6FF",
                borderTop: "1px solid #EFF6FF",
              }}
            >
              <GroupsIcon />
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                {event.meetingPlatform}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <AttachmentIcon
                sx={{
                  color: "#2059EE",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#2059EE",
                  textTransform: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Meeting Link
              </Typography>
            </Box>
          </Box>
        )}
        month={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 0,
          startHour: 0,
          endHour: 24,
          navigation: true,
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5],
          weekStartOn: 0,
          startHour: 0,
          endHour: 24,
          step: 60,
          navigation: true,
        }}
        day={{
          startHour: 0,
          endHour: 24,
          step: 60,
        }}
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
        isLiveClassCreated={setLiveClassCreated}
      />
      <EditLiveClassModal
        open={editLiveClassModal.isOpen}
        close={editLiveClassModal.close}
        submit={editLiveClassModal.close}
        meetingId={liveClassMeetingId}
        data={classDetails}
        isLiveClassUpdated={setLiveClassUpdated}
      />
    </Box>
  );
};

export default CourseProviderAdminHome;
