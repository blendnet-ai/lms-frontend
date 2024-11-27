import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LiveClassAPI from "../apis/LiveClassAPI";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ReactPlayer from "react-player";

interface Resource {
  id: number;
  type: string;
  title: string;
  url: string;
}

interface Module {
  id: number;
  title: string;
  order_in_course: number;
  resources_video: Resource[];
  resources_reading: Resource[];
  assessment_generation_configs: number[];
}

const CoursePage = () => {
  // hooks
  const location = useLocation();
  const navigate = useNavigate();
  // const { courseName, courseId } = useParams();
  const [modules, setModules] = useState<Module[]>([]);
  const [slug, setSlug] = useState<string>("");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  // fetch modules
  useEffect(() => {
    // console.log("Params", courseName, courseId);
    const courseSlug = location.pathname.split("/")[1];
    setSlug(courseSlug);
    const Id = location.search.split("=")[1];
    const fetchModules = async () => {
      const modules = await LiveClassAPI.getModulesData(Number(Id));
      setModules(modules);
      // console.log(modules);
    };
    if (Id) fetchModules();
  }, []);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
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
    <Link
      underline="hover"
      key="2"
      color="inherit"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate("/my-courses");
        window.parent.postMessage(
          {
            type: "ROUTE_CHANGE_COURSE",
            route: slug,
            courseId: "1",
          },
          "*"
        );
      }}
    >
      My Courses
    </Link>,
    <Typography key="3" color="inherit" sx={{ color: "#000" }}>
      {slug}
    </Typography>,
  ];

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

      {/* table view of modules */}
      {!selectedResource && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFF",
            padding: "20px",
            mt: "20px",
          }}
        >
          {modules.map((module) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                id={`module-${module.id}`}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  {module.title}
                </Typography>

                {/* assessment button */}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: "auto", marginRight: "1rem" }}
                  onClick={() => {
                    navigate(
                      `/assessment?id=${module.assessment_generation_configs[0]}`
                    );
                  }}
                >
                  Assessment
                </Button>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  backgroundColor: "#EFF6FF",
                  padding: "0px",
                }}
              >
                {/* if module contains video resources  */}
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: "#fff",
                    padding: "20px",
                    pt: "0px",
                    color: "#2059EE",
                    my: "10px",
                  }}
                >
                  Video Resources
                </Typography>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >
                          #
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >
                          Title
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >
                          Get Started
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {module.resources_video.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{row.id}</TableCell>
                          <TableCell
                            sx={{
                              cursor: "pointer",
                              "&:hover": {
                                color: "#2059EE",
                              },
                            }}
                          >
                            {row.title}
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                cursor: "pointer",
                                "&:hover": {
                                  color: "#2059EE",
                                },
                              }}
                              component={"div"}
                              onClick={() => setSelectedResource(row)}
                            >
                              <PlayArrowIcon />
                              <Typography
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": {
                                    color: "#2059EE",
                                  },
                                }}
                              >
                                Play Now
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* if module contains reading resources  */}
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: "#fff",
                    padding: "20px",
                    color: "#2059EE",
                    my: "10px",
                  }}
                >
                  Reading Resources
                </Typography>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >
                          #
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >
                          Title
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "16px" }}
                        >
                          Get Started
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {module.resources_reading.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{row.id}</TableCell>
                          <TableCell
                            sx={{
                              cursor: "pointer",
                              "&:hover": {
                                color: "#2059EE",
                              },
                            }}
                          >
                            {row.title}
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                cursor: "pointer",
                                "&:hover": {
                                  color: "#2059EE",
                                },
                              }}
                              component={"div"}
                              onClick={() => setSelectedResource(row)}
                            >
                              <CloudDownloadIcon />
                              <Typography
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": {
                                    color: "#2059EE",
                                  },
                                }}
                              >
                                Download
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {/* video or reading resources */}
      {selectedResource && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            width: "100%",
            padding: "20px",
            height: "100vh",
            backgroundColor: "#fff",
          }}
        >
          {/* panel  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* Title  */}
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "#2059EE",
              }}
            >
              {selectedResource.title}
            </Typography>

            {/* back button  */}
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: "auto" }}
              onClick={() => setSelectedResource(null)}
            >
              Back
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              height: "100%",
              mt: "20px",
            }}
          >
            {/* if resources contain video, show video player */}
            {selectedResource.type === "video" && (
              <ReactPlayer
                url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                width="60%"
                height="60%"
                controls={true}
              />
            )}

            {/* if resources contain reading, show download link */}
            {selectedResource.type === "reading" && (
              <iframe
                src="https://drive.google.com/file/d/1xN8jHM49dPjr2YUQJU4coTt7tBd42pIZ/preview"
                width="100%"
                height="100%"
              ></iframe>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CoursePage;
