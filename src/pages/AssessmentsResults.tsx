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
import LMSAPI from "../apis/LmsAPI";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: "/home-lms",
  },
];

type AssessmentResult = {
  assessment_id: number;
  assessment_name: string;
  course_code: string;
  module_name: string;
  percentage: number;
  total_obtained: number;
  grand_total: number;
};

const AssessmentsResults = () => {
  const [assessmentsResults, setAssessmentsResults] = useState<
    AssessmentResult[]
  >([]);

  useEffect(() => {
    const fetchAssessmentsResults = async () => {
      const resp = await LMSAPI.getAssessmentsResults();
      console.log(resp.attempted_list);
      setAssessmentsResults(resp.attempted_list);
    };

    fetchAssessmentsResults();
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
        mt: "3.5rem",
      }}
    >
      <BreadCrumb
        key={1}
        currentPageName="Results"
        previousPages={breadcrumbPreviousPages}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          height: "100%",
        }}
      >
        {/* Heading */}
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Assessment Results
        </Typography>

        {/* description */}
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "semibold",
            color: "#8EA1B3",
            mb: "1rem",
            width: "80%",
          }}
        >
          This course offers a comprehensive introduction to SQL (Structured
          Query Language) and its application in software development. Students
          will learn to design, manage, and manipulate relational data.
        </Typography>

        {/* table view of assessments results */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Assessment
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Course Code
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Module
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Max. Marks
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Obt. Marks
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Percentage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assessmentsResults.map((row) => (
                <TableRow
                  key={row.assessment_id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "#2059EE",
                      },
                    }}
                  >
                    {row.assessment_name}
                  </TableCell>
                  <TableCell>{row.course_code}</TableCell>
                  <TableCell>{row.module_name}</TableCell>
                  <TableCell>{row.total_obtained}</TableCell>
                  <TableCell>{row.grand_total}</TableCell>
                  <TableCell>{row.percentage}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AssessmentsResults;
