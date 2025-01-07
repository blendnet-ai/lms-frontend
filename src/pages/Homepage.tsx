import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState, useMemo, useCallback, useContext } from "react";
import LiveClassAPI from "../apis/LiveClassAPI";
import CreateLiveClassModal from "../modals/CreateLiveClassModal";
import EditLiveClassModal from "../modals/EditLiveClassModal";
import { Scheduler } from "@aldabil/react-scheduler";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CreateNotificationModal from "../modals/CreateNotificationModal";
import { Role, UserContext } from "../App";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};

const styles = {
  button: {
    borderRadius: "5px",
    padding: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "10px 20px",
    width: "100%",
    backgroundColor: "#fff",
    border: "1px solid #EFF6FF",
    boxShadow: "0px 5px 8px 0px #00000033",
  },
  meetingLink: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#2059EE",
    textTransform: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

interface FormattedData {
  event_id: number;
  heading: string;
  batch: string;
  course: string;
  duration: number;
  end: Date;
  meetingLink: string;
  meetingId: number;
  seriesId: number;
  start: Date;
  meetingPlatform: string;
  title: string;
  color: string;
}

const Homepage = () => {
  const { role } = useContext(UserContext);

  const createLiveClassModal = useModal();
  const editLiveClassModal = useModal();
  const createNotificationModal = useModal();

  const [formatedData, setFormatedData] = useState<FormattedData[]>([]);
  const [liveClassMeetingId, setLiveClassMeetingId] = useState<number | null>(
    null
  );
  const [classDetails, setClassDetails] = useState({});
  const [liveClassUpdated, setLiveClassUpdated] = useState(false);
  const [liveClassCreated, setLiveClassCreated] = useState(false);

  const fetchLiveClasses = useCallback(async () => {
    const todaysDate = new Date();
    const previousDate = new Date();
    previousDate.setDate(todaysDate.getDate() - 1);
    const date30DaysLater = new Date();
    date30DaysLater.setDate(todaysDate.getDate() + 30);

    const formatDate = (date: Date): string => {
      return date.toISOString().slice(0, 10);
    };

    try {
      const rawData = await LiveClassAPI.getLiveClasses(
        formatDate(previousDate),
        formatDate(date30DaysLater)
      );
      // console.log("rawData", rawData);

      if (rawData) {
        const formattedData = rawData.map((event, index) => ({
          event_id: index,
          heading: "Schedule",
          batch: event.batch,
          course: event.course,
          duration: Number(event.duration),
          end: new Date(event.end_timestamp),
          meetingLink: event.link,
          meetingId: event.meeting_id,
          seriesId: event.series_id,
          start: new Date(event.start_timestamp),
          meetingPlatform: "Teams Meeting",
          title: event.title,
          color: "#00995B",
        }));
        // console.log("formattedData", formattedData);
        setFormatedData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching live classes:", error);
    }
  }, []);

  const fetchClassDetails = async (classId: number) => {
    try {
      const data = await LiveClassAPI.getLiveClassDetails(classId);
      setClassDetails(data);
      editLiveClassModal.open();
    } catch (error) {
      console.error("Error fetching class details:", error);
    }
  };

  useEffect(() => {
    fetchLiveClasses();
  }, [fetchLiveClasses, liveClassUpdated, liveClassCreated]);

  const liveClassesSchedule = useMemo(() => formatedData, [formatedData]);

  const fetchMeetingJoinLink = async (meetingId: number) => {
    try {
      const resp = await LiveClassAPI.getMeetingJoinLink(meetingId);
      window.open(resp.joining_url, "_blank");
      // console.log("Meeting link:", resp.joining_url);
    } catch (error) {
      console.error("Error fetching meeting link:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#EFF6FF",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "20px",
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
        {role === Role.COURSE_PROVIDER_ADMIN ? "Live Classes" : "My Schedule"}
      </Typography>

      {/* loading */}
      {role === Role.NO_ROLE && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {role && role !== Role.NO_ROLE && (
        <Scheduler
          height={window.innerHeight * 0.7}
          view="month"
          events={liveClassesSchedule}
          deletable={false}
          editable={false}
          customViewer={(event) => (
            <Box sx={styles.container}>
              <Typography sx={{ fontSize: "16px", color: "#333" }}>
                {event.heading}
              </Typography>
              <Typography
                sx={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}
              >
                {event.title} - {event.course} - {event.batch}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#333" }}>
                {event.start.toLocaleTimeString()} -{" "}
                {event.end.toLocaleTimeString()}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  padding: "5px",
                  borderBottom: "1px solid #EFF6FF",
                }}
              >
                {/* join button  */}
                <Button
                  sx={{
                    ...styles.button,
                    backgroundColor: "#2059EE",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#2059EE",
                    },
                    "&:disabled": {
                      backgroundColor: "#ccc",
                      color: "#fff",
                      cursor: "not-allowed",
                    },
                  }}
                  disabled={event.meetingLink.length === 0}
                  onClick={() => {
                    if (role === Role.COURSE_PROVIDER_ADMIN) {
                      window.open(event.meetingLink, "_blank");
                    } else {
                      fetchMeetingJoinLink(event.meetingId);
                    }
                  }}
                >
                  Join
                </Button>

                {role === Role.COURSE_PROVIDER_ADMIN && (
                  <Button
                    sx={{
                      ...styles.button,
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
                    Edit
                  </Button>
                )}
              </Box>

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
                <Typography sx={{ fontSize: "14px", color: "#333" }}>
                  {event.meetingPlatform}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <AttachmentIcon sx={{ color: "#2059EE" }} />
                <Typography sx={styles.meetingLink}>Meeting Link</Typography>
              </Box>
            </Box>
          )}
        />
      )}

      {role === Role.COURSE_PROVIDER_ADMIN && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
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
            onClick={createNotificationModal.open}
          >
            Create Notification
          </Button>
        </Box>
      )}

      {createLiveClassModal.isOpen && (
        <CreateLiveClassModal
          open={createLiveClassModal.isOpen}
          close={createLiveClassModal.close}
          submit={createLiveClassModal.close}
          isLiveClassCreated={setLiveClassCreated}
        />
      )}

      {editLiveClassModal.isOpen && (
        <EditLiveClassModal
          open={editLiveClassModal.isOpen}
          close={editLiveClassModal.close}
          submit={editLiveClassModal.close}
          meetingId={liveClassMeetingId?.toString() || ""}
          data={classDetails}
          isLiveClassUpdated={setLiveClassUpdated}
        />
      )}

      {createNotificationModal.isOpen && (
        <CreateNotificationModal
          open={createNotificationModal.isOpen}
          close={createNotificationModal.close}
        />
      )}
    </Box>
  );
};

export default Homepage;
