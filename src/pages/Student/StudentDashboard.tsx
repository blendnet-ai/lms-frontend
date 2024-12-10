import { Avatar, Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { useEffect, useState } from "react";
import LMSAPI, { GetStudentDetails } from "../../apis/LmsAPI";
import DetailTag from "./components/DetailTag";

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
      <Box>
        {/* left panel  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
            width: "20%",
            height: "100%",
          }}
        >
          <Avatar
            sx={{
              width: "100px",
              height: "100px",
              margin: "auto",
              marginBottom: "20px",
            }}
          />
          <Typography
            sx={{ fontWeight: "bold", fontSize: "20px", textAlign: "center" }}
          >
            {studentData?.user_stats.name}
          </Typography>

          {/* Details  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              gap: "10px",
            }}
          >
            <DetailTag label="ID" value={studentData?.user_stats?.user_id} />
            <DetailTag label="Age" value={studentData?.user_stats?.age} />
            <DetailTag label="Gender" value={studentData?.user_stats?.gender} />
            <DetailTag
              label="College"
              value={studentData?.user_stats?.college}
            />
            <DetailTag label="Email" value={studentData?.user_stats?.email} />
            <DetailTag
              label="Mobile"
              value={`+91 ${studentData?.user_stats?.phone}`}
            />

            {/* Message  */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2059EE",
                color: "white",
                marginTop: "20px",
              }}
            >
              Message
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentDashboard;

