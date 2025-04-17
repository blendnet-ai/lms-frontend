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
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CourseAPI from "@/apis/CourseAPI";

interface CoursesProps {
  courses_enrolled: CourseDetails[];
  studentId: string;
  setCoursesEnrolled: (courses: CourseDetails[]) => void;
}

const CourseStats = (props: CoursesProps) => {
  const unenrollStudent = async (studentId: string, courseId: number) => {
    await CourseAPI.unenrollStudent(studentId, courseId.toString());
    // Remove the unenrolled course from the courses_enrolled array

    console.log("courseId", courseId);
    props.setCoursesEnrolled(
      props.courses_enrolled.filter((course) => {
        console.log("course.course_id", course.course_id);
        return course.course_id !== courseId;
      })
    );
  };
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
              <TableHead className="font-bold text-base">Actions</TableHead>
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
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Unenroll
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Unenroll the student?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action will unenroll the student from '
                          {row.course_name}'. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="mt-2"
                          onClick={() =>
                            unenrollStudent(props.studentId, row.course_id)
                          }
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
