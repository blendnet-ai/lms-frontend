import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentCoursesTable from "../components/StudentCoursesTable";
import CoursesTable from "../components/CoursesTable";
import BreadCrumb from "../components/BreadCrumb";
import { UserContext } from "../App";
import LiveClassAPI, { Course } from "../apis/LiveClassAPI";
import { Role } from "@/types/app";
import { getModuleRoute, ROUTES } from "../configs/routes";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { role } = useContext(UserContext);

  // TODO: Replace with actual courseProviderId from user context or API
  const courseProviderId = 1;

  const navigateParent = (slug: string, courseId: string) => {
    navigate(getModuleRoute(slug, courseId));
  };

  const fetchUserCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await LiveClassAPI.getCoursesForCourseProvider(courseProviderId);

      // Always expect { courses: [...] }
      if (response && Array.isArray(response.courses)) {
        setCourses(response.courses);
      } else {
        setCourses([]);
        setError("Unexpected response format from server.");
        console.error("Unexpected response format:", response);
      }
    } catch (err: any) {
      setCourses([]);
      setError("Failed to fetch courses. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCourses();
    // eslint-disable-next-line
  }, []);

  const handleCourseDeleted = (deletedCourseId: number) => {
    setCourses((prev) => prev.filter((course) => course.id !== deletedCourseId));
  };

  const navigateToCourseForm = () => {
    navigate(ROUTES.COURSE_FORM);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb previousPages={[]} currentPageName={"Courses"} />

      <div className="flex flex-col bg-white p-4 mt-4 rounded-lg">
        {loading && <div>Loading courses...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (
          <>
            {role === Role.STUDENT && (
              <StudentCoursesTable
                courses={courses}
                navigateParent={navigateParent}
              />
            )}
            {(role === Role.LECTURER || role === Role.COURSE_PROVIDER_ADMIN) && (
              <CoursesTable
                courses={courses}
                navigateParent={navigateParent}
                onCourseDeleted={handleCourseDeleted}
              />
            )}
          </>
        )}
      </div>
      {role === Role.COURSE_PROVIDER_ADMIN && (
        <Button
          variant={"primary"}
          className="fixed bottom-8 left-8 shadow-lg"
          onClick={navigateToCourseForm}
        >
          <PlusIcon className="w-4 h-4" />
          Add New Course
        </Button>
      )}
    </div>
  );
};

export default Courses;