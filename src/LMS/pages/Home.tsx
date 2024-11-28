import { Box, Button, Typography } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import GroupsIcon from "@mui/icons-material/Groups";
import { useEffect, useState } from "react";
import LiveClassAPI from "../apis/LiveClassAPI.ts";

const Home = () => {
  const [LiveClassesEvents, setLiveClassesEvents] = useState([]);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data && event.data.type === "SET_FIREBASE_TOKEN") {
        const firebaseToken = event.data.token;
        console.log("Received Firebase Token:", firebaseToken);
      }
    });

    const fetchLiveClasses = async () => {
      const data = await LiveClassAPI.getLiveClasses(
        "2024-11-28",
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
            meetingPlatform: "Google Meet",
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
      {/* Assessment & News */}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            color: "#333",
          }}
        >
          Assessment & News
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Legend size={15} title="Assessment" legendColor="#EC6980" />
          <Legend size={15} title="News" legendColor="#2059EE" />
        </Box>
      </Box> */}

      {/* Cards */}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <AssessmentCard
          assessmentDescription="This is a description"
          assessmentNumber={1}
          timeAgo="2 hours ago"
        />
        <NewsCard
          newsDescription="This is a description"
          timeAgo="2 hours ago"
        />
      </Box> */}

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
          height={700}
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

              {/* Join Now Button */}
              <Button
                variant="contained"
                sx={{
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
                onClick={() => {
                  window.open(event.meetingLink, "_blank");
                }}
              >
                Join
              </Button>
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
    </Box>
  );
};

export default Home;
