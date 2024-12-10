import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BreadCrumb from "../components/BreadCrumb";
import { useEffect, useState } from "react";
import LMSAPI, { GetStudentsResponse } from "../apis/LmsAPI";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: "/",
  },
];

const Students = () => {
  const [error, setError] = useState<string | null>(null);
  const [studentsData, setStudentsData] = useState<GetStudentsResponse | null>(
    null
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await LMSAPI.getStudentList();
        setStudentsData(students);
      } catch (error) {
        setError("Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

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
        currentPageName={"Students"}
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
        Students
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          marginBottom: "20px",
          padding: "20px",
          backgroundColor: "#fff",
          color: "#2059EE",
        }}
      >
        List of all students
      </Typography>

      {error && (
        <Typography
          sx={{
            color: "red",
            marginBottom: "20px",
          }}
        >
          {error}
        </Typography>
      )}

      {/* Recording List */}
      {studentsData && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="recordings table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  #
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Course
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Batch ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsData.students.map((row, index) => (
                <TableRow
                  key={row.batch_id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    sx={{
                      color: "#2059EE",
                      fontWeight: "bold",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>{row.email}</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {row.course_title}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {row.batch_id}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* if empty */}
      {studentsData?.students?.length === 0 && !error && (
        <Typography
          sx={{
            textAlign: "center",
            backgroundColor: "#fff",
            padding: "20px",
            color: "red",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          No Students Found
        </Typography>
      )}
    </Box>
  );
};

export default Students;
