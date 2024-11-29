import { useEffect, useState } from "react";
import LMSAPI from "../apis/LmsAPI";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";

type BatchRowProps = {
  title: string;
  id: string;
  start_date: string;
  students_count: number;
};
function BatchRow(props: BatchRowProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography
          sx={{ fontWeight: "bold", fontSize: "16px", color: "#2767DD" }}
        >
          {props.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Number of students
                </TableCell>

                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Batch ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Start Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{props.students_count}</TableCell>
                <TableCell>{props.id}</TableCell>
                <TableCell>
                  {new Date(props.start_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}
function Batches() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("course_id");

  const [batches, setBatches] = useState<any>();
  const navigate = useNavigate();

  const breadcrumbPreviousPages = [
    {
      name: "Courses",
      route: "/my-courses",
    },
  ];

  useEffect(() => {
    console.log("Batches");
    const fetchBatches = async () => {
      const batches = await LMSAPI.getBatchesByCourseId(courseId);
      setBatches(batches);
      console.log("batches", batches);
    };
    fetchBatches();
  }, []);
  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#EFF6FF",
        height: "100vh",
        width: "100vw",
      }}
    >
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName="Batches"
      />
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          color: "#2767DD",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        Batch Details
      </Typography>
      {batches &&
        batches.map((batch: any) => (
          <BatchRow
            title={batch.title}
            id={batch.id}
            start_date={batch.start_date}
            students_count={batch.students_count}
          />
        ))}
    </Box>
  );
}

export default Batches;
