import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentCoursesTable from "../components/StudentCoursesTable";
import CoursesTable from "../components/CoursesTable";
import BreadCrumb from "../components/BreadCrumb";
import { UserContext } from "../App";
import LiveClassAPI, { GetCourseListResponse } from "../apis/LiveClassAPI";
import { Role } from "@/types/app";
import { getModuleRoute } from "../configs/routes";

const Courses = () => {
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState<GetCourseListResponse | null>(
    null
  );
  const { role } = useContext(UserContext);

  const navigateParent = async (slug: string, courseId: string) => {
    navigate(getModuleRoute(slug, courseId));
  };

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const response = await LiveClassAPI.getCoursesList();
        // console.log("response", response.courses);
        setUserCourses(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserCourses();
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen w-full p-8 pt-6">
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
          />
        )}
      </div>
    </div>
  );
};

export default Courses;
