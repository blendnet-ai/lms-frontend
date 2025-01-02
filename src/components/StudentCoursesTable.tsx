import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Course } from "../apis/LiveClassAPI";

type StudentCoursesTableProps = {
  courses: Course[];
  navigateParent: (slug: string, courseId: string, batchId: string) => void;
};

function StudentCoursesTable(props: StudentCoursesTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Course Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Instructor
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Course Code
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Progress
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.courses.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#2059EE",
                  },
                  color: "#2059EE",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  console.log("row", row.id.toString());
                  props.navigateParent(
                    row.slug,
                    row.id.toString(),
                    row.batch_id.toString()
                  );
                }}
              >
                {row.title}
              </TableCell>
              <TableCell>{row.lecturer_full_name}</TableCell>
              <TableCell>{row.code}</TableCell>
              <TableCell>
                <LinearProgress variant="determinate" value={50} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentCoursesTable;
