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
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-bold text-lg text-primary">
              Course Name
            </TableHead>
            <TableHead className="font-bold text-lg">Course Code</TableHead>
            <TableHead className="font-bold text-lg">
              Number of Batches
            </TableHead>
            <TableHead className="font-bold text-lg">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.courses.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50">
              <TableCell
                className="cursor-pointer text-primary hover:underline"
                onClick={() => {
                  props.navigateParent(row.slug, row.id.toString());
                }}
              >
                {row.title}
              </TableCell>
              <TableCell className="text-gray-600">{row.code}</TableCell>
              <TableCell className="text-gray-600">
                {row.no_of_batches}
              </TableCell>
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
    </div>
  );
}

export default StudentCoursesTable;
