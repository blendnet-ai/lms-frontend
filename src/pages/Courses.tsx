import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentCoursesTable from "../components/StudentCoursesTable";
import CoursesTable from "../components/CoursesTable";
import BreadCrumb from "../components/BreadCrumb";
import { UserContext } from "../App";
import LiveClassAPI, { GetCourseListResponse } from "../apis/LiveClassAPI";
import { Role } from "@/types/app";
import { getModuleRoute, ROUTES } from "../configs/routes";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const Courses = () => {
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState<GetCourseListResponse | null>(
    null
  );
  const { role } = useContext(UserContext);

  const navigateParent = async (slug: string, courseId: string) => {
    navigate(getModuleRoute(slug, courseId));
  };

  const fetchUserCourses = async () => {
    try {
      const response = await LiveClassAPI.getCoursesList();
      setUserCourses(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserCourses();
  }, []);

  const handleCourseDeleted = (deletedCourseId: number) => {
    if (userCourses) {
      setUserCourses({
        ...userCourses,
        courses: userCourses.courses.filter(
          (course) => course.id !== deletedCourseId
        ),
      });
    }
  };

  const navigateToCourseForm = () => {
    navigate(ROUTES.COURSE_FORM);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb previousPages={[]} currentPageName={"Courses"} />

      {/* table view of user courses */}
      <div className="flex flex-col bg-white p-4 mt-4 rounded-lg">
        {role === Role.STUDENT && (
          <StudentCoursesTable
            courses={userCourses?.courses || []}
            navigateParent={navigateParent}
          />
        )}
        {(role === Role.LECTURER || role === Role.COURSE_PROVIDER_ADMIN) && (
          <CoursesTable
            courses={userCourses?.courses || []}
            navigateParent={navigateParent}
            onCourseDeleted={handleCourseDeleted}
          />
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
