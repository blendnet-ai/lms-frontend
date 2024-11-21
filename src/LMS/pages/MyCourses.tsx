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

interface Course {
  id: number;
  title: string;
  code: string;
  slug: string;
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

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const MyCourses = () => {
  const navigate = useNavigate();
  const [userCourses, setUserCourses] = useState<Course[]>([]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      My Courses
    </Link>,
  ];

  const navigateParent = async (slug: string, courseId: string) => {
    navigate(`/my-courses/${slug}/${courseId}`);

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
        console.log("response", response[0]);
        setUserCourses(response[0]);
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  #
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Course Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Instructor
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Course Code
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  Progress
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userCourses.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "#2059EE",
                      },
                    }}
                    onClick={() => {
                      navigateParent(row.slug, row.id.toString());
                    }}
                  >
                    {row.title}
                  </TableCell>
                  <TableCell>{row.lecturer_full_name}</TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>
                    <BorderLinearProgress variant="determinate" value={50} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MyCourses;
