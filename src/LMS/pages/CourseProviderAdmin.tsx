import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LiveClassAPI, { CourseProvider } from "../apis/LiveClassAPI";
import { BatchCard, CoursesCard } from "../components/Cards";
import CreateLiveClassModal from "../modals/CreateLiveClassModal";
import { Scheduler } from "@aldabil/react-scheduler";
import GroupsIcon from "@mui/icons-material/Groups";

const CourseProviderAdmin = () => {
  const [courseProvider, setCourseProvider] = useState({} as CourseProvider);
  const [courseProviderCourses, setCourseProviderCourses] = useState([]);
  const [courseId, setCourseId] = useState(0);
  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState(0);

  // Modal configs
  const [openCreateLiveClassModal, setOpenCreateLiveClassModal] =
    useState(false);
  const handleCreateLiveClassModalOpen = () =>
    setOpenCreateLiveClassModal(true);
  const handleCreateLiveClassModalClose = () =>
    setOpenCreateLiveClassModal(false);

  // fetch klive classes for the course provider
  useEffect(() => {
    const fetchLiveClasses = async () => {
      const data = await LiveClassAPI.getLiveClasses(
        "2024-11-01",
        "2024-12-30"
      );
      // console.log("Data: ", data);
      const refactoredData = data.map(
        (
          event: {
            title: any;
            link: any;
            start_timestamp: string | number | Date;
            end_timestamp: string | number | Date;
          },
          index: any
        ) => {
          return {
            event_id: index,
            title: event.title,
            subtitle: "Empty",
            meetingLink: event.link,
            meetingPlatform: "Ms Teams",
            start: new Date(event.start_timestamp),
            end: new Date(event.end_timestamp),
            color: "#00995B",
          };
        }
      );
      console.log("Refactored Data: ", refactoredData);
      setLiveClassesEvents(refactoredData);
    };
    fetchLiveClasses();
  }, []);

  const [LiveClassesEvents, setLiveClassesEvents] = useState([]);

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
      {/* Cards */}
      {/* {batches.length === 0 && courseProviderCourses && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {courseProviderCourses.map((course: any) => (
            <CoursesCard
              key={course.id}
              id={course.id}
              title={course.title}
              code={course.code}
              setProviderId={setCourseId}
            />
          ))}
        </Box>
      )} */}

      {/* Batches */}
      {/* {batches && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {batches.map((batch: any) => (
            <BatchCard
              key={batch.id}
              id={batch.id}
              title={batch.title}
              openModal={handleCreateLiveClassModalOpen}
              setIdOfBatch={setBatchId}
            />
          ))}
        </Box>
      )} */}

      {/* schedule  */}
      <Box>
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
          height={900}
          view="month"
          events={LiveClassesEvents}
          deletable={false}
          editable={false}
          agenda={false}
          loading={false}
          customViewer={(event) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "100%",
                backgroundColor: "#fff",
                border: "1px solid #EFF6FF",
                boxShadow: "0px 5px 8px 0px #00000033",
              }}
            >
              {/* heading  */}
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

              {/* time  */}
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

              {/* buttons group  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                {/* Join Now Button */}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2059EE",
                    color: "#fff",
                    borderRadius: "10px",
                    padding: "10px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#2059EE",
                    },
                  }}
                  onClick={() => {
                    window.open(event.meetingLink, "_blank");
                  }}
                >
                  Join
                </Button>
                {/* Edit Now Button */}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#2059EE",
                    borderRadius: "10px",
                    padding: "10px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                  }}
                  
                >
                  Edit
                </Button>
                {/* Join Now Button */}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#fff",
                    color: "#2059EE",
                    borderRadius: "10px",
                    padding: "10px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
              {/* platform  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid #EFF6FF",
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
            </Box>
          )}
          week={{
            weekDays: [0, 1, 2, 3, 4, 5, 6],
            weekStartOn: 0,
            startHour: 0,
            endHour: 24,
            step: 60,
          }}
          navigation={true}
        />
      </Box>

      {/* add new live class button  */}
      <Button
        variant="contained"
        sx={{
          alignSelf: "flex-start",
          mt: "20px",
          backgroundColor: "#2059EE",
          color: "#fff",
          borderRadius: "0px",
          padding: "10px",
          fontSize: "14px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#2059EE",
          },
        }}
        onClick={handleCreateLiveClassModalOpen}
      >
        Add New Live Class
      </Button>

      <CreateLiveClassModal
        open={openCreateLiveClassModal}
        close={handleCreateLiveClassModalClose}
        submit={handleCreateLiveClassModalClose}
      />
    </Box>
  );
};

export default CourseProviderAdmin;
