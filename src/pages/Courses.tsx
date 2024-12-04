import {
  Box,
  LinearProgress,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentCoursesTable from "../components/StudentCoursesTable";
import CoursesTable from "../components/CoursesTable";
import BreadCrumb from "../components/BreadCrumb";
import { Role, UserContext } from "../App";
import LiveClassAPI from "../apis/LiveClassAPI";

export interface Course {
  id: number;
  title: string;
  code: string;
  slug: string;
  no_of_batches: number;
  batch_id: number;
  lecturer_full_name: string;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#00995B",
    ...theme.applyStyles("dark", {
      backgroundColor: "#00995B",
    }),
  },
}));

const Courses = () => {
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const { role } = useContext(UserContext);

  const navigateParent = async (
    slug: string,
    courseId: string,
    batchId: string
  ) => {
    navigate(`/modules/${slug}?courseId=${courseId}&batchId=${batchId}`);

    window.parent.postMessage(
      {
        type: "ROUTE_CHANGE_COURSE",
        route: slug,
        courseId: courseId,
      },
      "*"
    );
  };

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const response = await LiveClassAPI.getCoursesList();
        console.log("response", response);
        setUserCourses(response.courses);
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
        marginTop: "40px",
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
            courses={userCourses}
            navigateParent={navigateParent}
          />
        )}
        {role === Role.LECTURER ||
          (role === Role.COURSE_PROVIDER_ADMIN && (
            <CoursesTable
              courses={userCourses}
              navigateParent={navigateParent}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Courses;
