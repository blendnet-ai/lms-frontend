import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { CourseDetails } from "@/apis/LiveClassAPI";

interface CoursesProps {
  courses_enrolled: CourseDetails[];
}

const CourseStats = (props: CoursesProps) => {
  return (
    <div className="">
      <div className="bg-white p-2 border-b text-xl font-bold">
        Courses Enrolled
      </div>

      <Card className="rounded-none border-none">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-base">Course</TableHead>
              <TableHead className="font-bold text-base">Batch ID</TableHead>
              <TableHead className="font-bold text-base">Attendance</TableHead>
              <TableHead className="font-bold text-base">
                Videos Watched
              </TableHead>
              <TableHead className="font-bold text-base">Assessments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {props?.courses_enrolled.map((row) => (
              <TableRow key={row.course_id}>
                <TableCell>{row.course_name}</TableCell>
                <TableCell>{row.batch_id}</TableCell>
                <TableCell>{row.attendance}%</TableCell>
                <TableCell>
                  {row.videos_watched}/{row.total_videos}
                </TableCell>
                <TableCell>
                  {row.assessments_attempted}/{row.total_assessments}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CourseStats;
