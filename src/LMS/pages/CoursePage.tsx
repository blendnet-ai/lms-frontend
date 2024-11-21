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
import { useLocation } from "react-router-dom";
import LiveClassAPI from "../apis/LiveClassAPI";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
}

const CoursePage = () => {
  // hooks
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [modules, setModules] = useState<Module[]>([]);

  // fetch modules
  useEffect(() => {
    const fetchModules = async () => {
      const modules = await LiveClassAPI.getModulesData(
        parseInt(searchParams.get("courseId") || "0")
      );
      setModules(modules);
      console.log(modules);
    };
    fetchModules();
  }, [parseInt(searchParams.get("courseId") || "0")]);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit">
      My Courses
    </Link>,
    <Link underline="hover" key="2" color="inherit">
      Course Name
    </Link>,
  ];
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

      {/* table view of modules */}
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
                disabled
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
                      <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        #
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        Video Title
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
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
                        <TableCell>{row.url}</TableCell>
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
                      <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        #
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        File Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
                        Link
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
                        <TableCell>{row.url}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default CoursePage;
