import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentCoursesTable from "../components/StudentCoursesTable";
import CoursesTable from "../components/CoursesTable";
import BreadCrumb from "../components/BreadCrumb";
import { Role, UserContext } from "../App";
import LiveClassAPI, { GetCourseListResponse } from "../apis/LiveClassAPI";

const Courses = () => {
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState<GetCourseListResponse | null>(
    null
  );
  const { role } = useContext(UserContext);

  const navigateParent = async (
    slug: string,
    courseId: string,
    batchId: string
  ) => {
    navigate(`/modules/${slug}?courseId=${courseId}&batchId=${batchId}`);
  };

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const response = await LiveClassAPI.getCoursesList();
        console.log("response", response.courses);
        setUserCourses(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserCourses();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#EFF6FF",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
      }}
    >
      <BreadCrumb previousPages={[]} currentPageName={"Courses"} />

      {/* table view of user courses */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FFF",
          padding: "20px",
          mt: "20px",
        }}
      >
        {role === Role.STUDENT && (
          <StudentCoursesTable
            courses={userCourses?.courses || []}
            navigateParent={navigateParent}
          />
        )}
        {role === Role.LECTURER ||
          (role === Role.COURSE_PROVIDER_ADMIN && (
            <CoursesTable
              courses={userCourses?.courses || []}
              navigateParent={navigateParent}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Courses;
