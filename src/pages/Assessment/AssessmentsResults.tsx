import {
  Box,
  Button,
  IconButton,
  Paper,
  Skeleton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BreadCrumb from "../../components/BreadCrumb";
import { useEffect, useState, useCallback } from "react";
import LMSAPI from "../../apis/LmsAPI";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: "/",
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
  last_attempted: string;
  type: number;
  status:number;
};

const AssessmentsResults = () => {
  const [assessmentsResults, setAssessmentsResults] = useState<
    AssessmentResult[]
  >([]);

  // Function to check if any assessment from today is being evaluated
  const hasEvaluatingAssessmentToday = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return assessmentsResults.some(assessment => 
      assessment.status === 3 && 
      assessment.last_attempted?.split('T')[0] === today
    );
  }, [assessmentsResults]);

  // Fetch assessment results
  const fetchAssessmentsResults = async () => {
    const resp = await LMSAPI.getAssessmentsResults();
    setAssessmentsResults(resp.attempted_list);
  };

  // Initial fetch
  useEffect(() => {
    fetchAssessmentsResults();
  }, []);

  // Polling effect
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    if (hasEvaluatingAssessmentToday()) {
      pollInterval = setInterval(() => {
        fetchAssessmentsResults();
      }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [hasEvaluatingAssessmentToday]);

  const location = useLocation();
  const [isTestEnded, setIsTestEnded] = useState(false);

  useEffect(() => {
    const isTestEnded = location.state?.isTestEnded;
    setIsTestEnded(isTestEnded);

    setTimeout(() => {
      setIsTestEnded(false);
    }, 5000);
  }, [location]);

  const navigate = useNavigate();

  return (
    <>
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
            Here are the results of the assessments you have attempted.
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
                    Date Last Attempted
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    Course Code
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    Module
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    Status
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
                        cursor: row.type === 1 ? "pointer" : "default",
                        "&:hover": {
                          color: row.type === 1 ? "#2059EE" : "inherit",
                        },
                      }}
                      onClick={() => {
                        if (row.type === 1) {
                          navigate(
                            `/assessment-results/report/${row.assessment_id}`
                          );
                        }
                      }}
                    >
                      {row.assessment_name}
                    </TableCell>
                    <TableCell>
                      {row.last_attempted
                        ? new Date(row.last_attempted).toDateString() +new Date(row.last_attempted).toLocaleString().split(',')[1]
                        : "N/A"}
                    </TableCell>
                    <TableCell>{row.course_code}</TableCell>
                    <TableCell>{row.module_name}</TableCell>
                    <TableCell>
                      {row.status === 2 ? "Completed" :
                      row.status === 3 ? "Evaluating" : 
                       row.status === 4 ? "Abandoned" : null}
                    </TableCell>
                    <TableCell>
                      {row.status === 3?<Skeleton width={'100%'} height={'100%'}/> : row.status === 4 ? "-" : row.grand_total}
                    </TableCell>
                    <TableCell>
                    {row.status === 3?<Skeleton width={'100%'} height={'100%'}/> : row.status === 4 ? "-" : row.total_obtained}
                    </TableCell>
                    <TableCell>
                      {row.status === 3?<Skeleton width={'100%'} height={'100%'}/> : row.status === 4 ? "-" : row.percentage}
                    </TableCell>
                  </TableRow>
                ))}

                {/* if assessmentsResults is empty, display a message */}
                {assessmentsResults.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "semibold",
                          color: "#8EA1B3",
                          textAlign: "center",
                        }}
                      >
                        No assessments attempted yet.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {isTestEnded && (
        <Snackbar
          open={isTestEnded}
          autoHideDuration={5000}
          message="Your assessment result will appear here shortly"
        />
      )}
    </>
  );
};

export default AssessmentsResults;
