import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Course } from "../apis/LiveClassAPI";

type StudentCoursesTableProps = {
  courses: Course[];
  navigateParent: (slug: string, courseId: string, batchId: string) => void;
};

function StudentCoursesTable(props: StudentCoursesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Course Name</TableHead>
          <TableHead>Instructor</TableHead>
          <TableHead>Course Code</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.courses.map((row) => (
          <TableRow key={row.id}>
            <TableCell
              className="cursor-pointer hover:text-[#2059EE] text-[#2059EE] underline font-bold"
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
            <TableCell>{row.lecturer_full_name}</TableCell>
            <TableCell>{row.code}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default StudentCoursesTable;
