import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Course } from "../pages/Courses";
import { useNavigate } from "react-router-dom";

type StudentCoursesTableProps = {
  courses: Course[];
  navigateParent: (slug: string, courseId: string, batchId: string) => void;
};

function StudentCoursesTable(props: StudentCoursesTableProps) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              #
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Course Name
            </TableCell>

            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Course Code
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Number of Batches
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Number of Batches
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.courses.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#2059EE",
                    textDecoration: "underline",
                  },
                  color: "#2059EE",
                  textDecoration: "none",
                }}
                onClick={() => {
                  props.navigateParent(
                    row.slug,
                    row.id.toString(),
                    row.batch_id.toString()
                  );
                }}
              >
                {row.title}
              </TableCell>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.no_of_batches}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate(`/batches?course_id=${row.id.toString()}`);
                  }}
                >
                  View Batches
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentCoursesTable;
