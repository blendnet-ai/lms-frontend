import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";

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
    </Box>
  );
};

export default StudentDashboard;
