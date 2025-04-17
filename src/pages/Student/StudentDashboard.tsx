import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import { useEffect, useState } from "react";
import ProfilePanel from "./components/ProfilePanel";
import EngagementStats from "./components/EngagementStats";
import CourseStats from "./components/CourseStats";
import LiveClassAPI, {
  CourseDetails,
  GetStudentDetails,
} from "../../apis/LiveClassAPI";
import { Skeleton } from "../../components/ui/skeleton";
import { ROUTES } from "../../configs/routes";
import { Skeleton } from "../../components/ui/skeleton";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: ROUTES.HOME,
  },
  {
    name: "Students",
    route: ROUTES.STUDENTS.LIST,
  },
];

const StudentDashboard = () => {
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState<GetStudentDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setIsLoading(true);
        const resp = await LiveClassAPI.getStudentDetails(Number(studentId));
        setStudentData(resp);
      } catch (error) {
        console.error("Error fetching student data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const setCoursesEnrolled = (courses: CourseDetails[]) => {
    if (!studentData) return;
    const newStudentData: GetStudentDetails = {
      ...studentData,
      courses_enrolled: courses,
    };
    setStudentData(newStudentData);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-blue-50 p-8 pt-6">
      {/* Breadcrumb */}
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Student"}
      />

      {/* Page Title */}
      <h1 className="font-bold text-xl my-5">Student Profile</h1>

      {/* content  */}
      <div className="flex flex-row justify-between gap-5">
        {isLoading ? (
          <>
            {/* Profile Panel Skeleton */}
            <Skeleton className="w-1/5 h-[400px]" />

            {/* Right Panel Skeleton */}
            <div className="flex flex-col rounded-lg w-4/5 gap-5">
              {/* Engagement Stats Skeleton */}
              <Skeleton className="h-32 w-full" />

              {/* Course Stats Table Skeleton */}
              <Skeleton className="h-32 w-full" />
            </div>
          </>
        ) : (
          <>
            {/* left panel  */}
            <ProfilePanel
              studentData={studentData ? studentData.user_stats : null}
              status={studentData?.status || ""}
            />

            {/* right panel  */}
            <div className="flex flex-col rounded-lg w-4/5 gap-5">
              <EngagementStats
                total_learning_time={
                  studentData
                    ? studentData.engagement_stats.total_learning_time
                    : 0
                }
                last_login_date={
                  studentData
                    ? studentData.engagement_stats.last_login_date
                    : ""
                }
                last_login_time={
                  studentData
                    ? studentData.engagement_stats.last_login_time
                    : ""
                }
              />

              {/* Courses Table */}
              <CourseStats
                setCoursesEnrolled={setCoursesEnrolled}
                studentId={studentId ?? ""}
                courses_enrolled={
                  studentData ? studentData.courses_enrolled : []
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
