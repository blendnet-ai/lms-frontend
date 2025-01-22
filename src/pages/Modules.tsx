import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LiveClassAPI, { GetModulesDataResponse } from "../apis/LiveClassAPI";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BreadCrumb from "../components/BreadCrumb";
// import { getAnalytics, logEvent } from "firebase/analytics";
import CourseResource from "./CourseResource";
import { Role, UserContext } from "../App";
import { getModuleRoute, ROUTES } from "../configs/routes";

export interface Resource {
  id: number;
  type: string;
  title: string;
  url: string;
}

const Modules = () => {
  const { role } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [modules, setModules] = useState<GetModulesDataResponse | null>(null);
  const [slug, setSlug] = useState<string>("");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  const [courseId, setCourseId] = useState<number | null>(null);

  // Update URL based on selected resource
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedResource) {
      url.searchParams.set("resourceId", selectedResource.id.toString());
      url.searchParams.set("type", selectedResource.type);
    } else {
      url.searchParams.delete("resourceId");
      url.searchParams.delete("type");
    }
    window.history.replaceState({}, "", url.toString());
  }, [selectedResource]);

  // fetch modules
  useEffect(() => {
    const courseSlug = location.pathname.split("/modules/")[1];
    setSlug(courseSlug);

    const courseId = new URLSearchParams(location.search).get("courseId");
    setCourseId(Number(courseId));

    const fetchModules = async () => {
      const modules = await LiveClassAPI.getModulesData(Number(courseId));
      setModules(modules);

      // Check for resource ID in URL and select resource if it exists
      const resourceId = new URLSearchParams(location.search).get("resourceId");
      const resourceType = new URLSearchParams(location.search).get("type");
      if (resourceId) {
        // Search through all module resources
        let foundResource = null;
        const moduleData = modules["module_data"];

        for (const module of moduleData) {
          // Check video resources
          if (resourceType === "video") {
            if (module.resources_video) {
              const videoResource = module.resources_video.find(
                (r: Resource) => r.id === Number(resourceId)
              );
              if (videoResource) {
                foundResource = videoResource;
                break;
              }
            }
          }

          // Check reading resources
          if (resourceType === "reading") {
            const readingResource = module.resources_reading.find(
              (r: Resource) => r.id === Number(resourceId)
            );
            if (readingResource) {
              foundResource = readingResource;
              break;
            }
          }
        }
        if (foundResource) {
          setSelectedResource(foundResource);
        } else {
          // Resource not found, remove from URL
          const url = new URL(window.location.href);
          url.searchParams.delete("resourceId");
          url.searchParams.delete("type");
          window.history.replaceState({}, "", url.toString());
        }
      }
    };
    if (courseId) fetchModules();
  }, []);

  const unselectResource = () => {
    setSelectedResource(null);
  };

  const breadcrumbPreviousPages = [
    {
      name: "Courses",
      route: ROUTES.COURSES,
    },
    ...(selectedResource
      ? [
          {
            name: slug,
            route: getModuleRoute(slug, courseId?.toString() ?? ""),
            onClick: () => {
              setSelectedResource(null);
            },
          },
        ]
      : []),
  ];

  // useEffect(() => {
  //   const analytics = getAnalytics();
  //   const randomId =
  //     Math.random().toString(36).substring(2, 15) +
  //     Math.random().toString(36).substring(2, 15);
  //   const pageEnterTime = Date.now();

  //   console.log("page_enter", pageEnterTime);
  //   // Log page enter event
  //   logEvent(analytics, "page_enter", {
  //     page_name: "Modules",
  //     start_time: pageEnterTime,
  //     session_id: randomId,
  //     user_id: "123",
  //     video_id: "video-123",
  //   });

  //   // Log page exit event
  //   const handleBeforeUnload = () => {
  //     const pageExitTime = Date.now();
  //     const timeSpent = (pageExitTime - pageEnterTime) / 1000;
  //     localStorage.setItem("time_spent", timeSpent.toString());
  //     console.log("page_exit", timeSpent);

  //     logEvent(analytics, "page_exit", {
  //       page_name: "Modules",
  //       end_time: pageExitTime,
  //       start_time: pageEnterTime,
  //       time_spent: timeSpent,
  //       session_id: randomId,
  //       user_id: "123",
  //       video_id: "video-123",
  //     });
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

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
        // marginTop: "50px",
      }}
    >
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={selectedResource ? selectedResource.title : slug}
      />

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
          <Typography
            key="3"
            sx={{
              color: "#000",
              mb: "20px",
            }}
          >
            Study Materials
          </Typography>

          {modules?.module_data.map((module) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                id={`module-${module.id}`}
              >
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "1rem", padding: "10px" }}
                >
                  {module.title}
                </Typography>

                {/* assessment button, only if user is student */}

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: "auto", marginRight: "1rem" }}
                  onClick={() => {
                    navigate(
                      `/assessment?courseId=${courseId}&moduleId=${module.id}`
                    );
                  }}
                >
                  {role === Role.STUDENT
                    ? "Take Assessment"
                    : "View Assessments"}
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
                          <TableCell>{row.title}</TableCell>
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

                      {/* if no video resources */}
                      {module.resources_video.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                fontWeight: "semibold",
                                color: "#8EA1B3",
                                textAlign: "center",
                              }}
                            >
                              No video resources available
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
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
                          <TableCell>{row.title}</TableCell>
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
                              <RemoveRedEyeIcon />
                              <Typography
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": {
                                    color: "#2059EE",
                                  },
                                }}
                              >
                                View Resource
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}

                      {/* if no reading resources */}
                      {module.resources_reading.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Typography
                              sx={{
                                fontSize: "1rem",
                                fontWeight: "semibold",
                                color: "#8EA1B3",
                                textAlign: "center",
                              }}
                            >
                              No reading resources available
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {selectedResource && (
        <CourseResource
          resource={selectedResource}
          unselectResource={unselectResource}
        />
      )}
    </Box>
  );
};

export default Modules;
