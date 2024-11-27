import {
  Box,
  Breadcrumbs,
  LinearProgress,
  linearProgressClasses,
  Link,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LiveClassAPI from "../apis/LiveClassAPI";
import { useNavigate } from "react-router-dom";
import StudentCoursesTable from "../components/StudentCoursesTable";
import CoursesTable from "../components/CoursesTable";

export interface Course {
  id: number;
  title: string;
  code: string;
  slug: string;
  no_of_batches: number;

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

enum Role {
  LECTURER = "lecturer",
  STUDENT = "student",
}

const MyCourses = () => {
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [role, setRole] = useState<Role>(Role.STUDENT);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate("/home-lms");
        window.parent.postMessage(
          {
            type: "ROUTE_HOME",
            route: "",
          },
          "*"
        );
      }}
    >
      Home
    </Link>,
    <Typography key="2" color="inherit" sx={{ color: "#000" }}>
      {role === Role.STUDENT ? "My Courses" : "Courses"}
    </Typography>,
  ];

  const navigateParent = async (slug: string, courseId: string) => {
    console.log("React Navigated to: ", `/modules/${slug}/${courseId}`);
    navigate(`/modules/${slug}/${courseId}`);
    // console.log("React Navigated to: ", `/${courseId}`);
    // navigate(`/${courseId}`);

    // send message to parent window
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
        setRole(response.role);
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
        height: "100vh",
        width: "100%",
        padding: "20px",
        mt: "3.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FFF",
          padding: "20px",
        }}
      >
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Box>

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
        {role === Role.LECTURER && (
          <CoursesTable courses={userCourses} navigateParent={navigateParent} />
        )}
      </Box>
    </Box>
  );
};

export default MyCourses;
