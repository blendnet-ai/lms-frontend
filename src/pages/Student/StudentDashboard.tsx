import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { useEffect, useState } from "react";
import LMSAPI, { GetStudentDetails } from "../../apis/LmsAPI";
import ProfilePanel from "./components/ProfilePanel";
import EngagementStats from "./components/EngagementStats";
import CourseStats from "./components/CourseStats";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Students",
    route: "/students",
  },
];

const StudentDashboard = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState<GetStudentDetails | null>(
    null
  );

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // Fetch student data
        const resp = await LMSAPI.getStudentDetails();
        console.log("Student data: ", resp);
        setStudentData(resp);
      } catch (error) {
        console.error("Error fetching student data: ", error);
      }
    };

    fetchStudent();
  }, [studentId]);

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
        currentPageName={"Student"}
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
        Student Profile
      </Typography>

      {/* content  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {/* left panel  */}
        <ProfilePanel
          studentData={studentData ? studentData.user_stats : null}
        />

        {/* right panel  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            width: "80%",
            gap: "20px",
          }}
        >
          <EngagementStats
            total_learning_time={
              studentData ? studentData.engagement_stats.total_learning_time : 0
            }
            last_login_date={
              studentData ? studentData.engagement_stats.last_login_date : ""
            }
            last_login_time={
              studentData ? studentData.engagement_stats.last_login_time : ""
            }
          />

          {/* Courses Table */}
          <CourseStats
            courses_enrolled={studentData ? studentData.courses_enrolled : []}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
