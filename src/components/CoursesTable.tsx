import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Course } from "../apis/LiveClassAPI";
import { Button } from "./ui/button";

type StudentCoursesTableProps = {
  courses: Course[];
  navigateParent: (slug: string, courseId: string) => void;
};

function StudentCoursesTable(props: StudentCoursesTableProps) {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHead>
        <TableHeader>
          <TableCell>Course Name</TableCell>
          <TableCell>Course Code</TableCell>
          <TableCell>Number of Batches</TableCell>
          <TableCell>Number of Batches</TableCell>
        </TableHeader>
      </TableHead>
      <TableBody>
        {props.courses.map((row) => (
          <TableRow key={row.id}>
            <TableCell
              onClick={() => {
                props.navigateParent(row.slug, row.id.toString());
              }}
            >
              {row.title}
            </TableCell>
            <TableCell>{row.code}</TableCell>
            <TableCell>{row.no_of_batches}</TableCell>
            <TableCell>
              <Button
                variant="primary"
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
  );
}

export default StudentCoursesTable;
