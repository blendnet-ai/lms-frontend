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
import { CourseDetails } from "../../../apis/LmsAPI";

interface CoursesProps {
  courses_enrolled: CourseDetails[];
}

const CourseStats = (props: CoursesProps) => {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "20px",
          padding: "20px",
          backgroundColor: "white",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        Courses Enrolled
      </Typography>

      {/* table view of engagement stats */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Course
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Batch ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Attendance
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Videos Watched
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                Assessments
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.courses_enrolled.map((row) => (
              <TableRow
                key={row.course_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.course_name}</TableCell>
                <TableCell>{row.batch_id}</TableCell>
                <TableCell>{row.attendance}%</TableCell>
                <TableCell>
                  {row.videos_watched}/{row.videos_watched}
                </TableCell>
                <TableCell>
                  {row.assessments_attempted}/{row.total_assessments}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CourseStats;
