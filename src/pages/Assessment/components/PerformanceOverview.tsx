import {
  Box,
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  AssessmentResultSection,
  CategoryPerformance,
} from "../../../apis/LmsAPI";
import { useState, useMemo } from "react";
import MetricChip from "./Metric";

interface PerformanceOverviewProps {
  data: CategoryPerformance[] | null;
  metricsData: AssessmentResultSection[] | null;
}

const PerformanceOverview = ({
  data,
  metricsData,
}: PerformanceOverviewProps) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(
    "Speaking"
  );

  const selectedSectionData = useMemo(
    () => metricsData?.find((section) => section.name === selectedSection),
    [selectedSection, metricsData]
  );

  const commonCellStyles = { fontWeight: "semibold" };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Performance Overview
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: "300px" }}>
        <Table sx={{ maxWidth: "300px" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Metric</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.map((metric) => (
                  <TableRow key={metric.category}>
                    <TableCell sx={commonCellStyles}>
                      {metric.category}
                    </TableCell>
                    <TableCell sx={commonCellStyles}>
                      {metric.score} / 10
                    </TableCell>
                  </TableRow>
                ))
              : Array.from({ length: 4 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell sx={commonCellStyles}>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell sx={commonCellStyles}>
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", gap: "10px" }}>
        {metricsData
          ? metricsData.map((section) => (
              <Button
                key={section.name}
                variant={
                  selectedSection === section.name ? "contained" : "outlined"
                }
                onClick={() => setSelectedSection(section.name)}
              >
                {section.name}
              </Button>
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={150}
                height={50}
              />
            ))}
      </Box>

      {selectedSectionData && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
            }}
          >
            {selectedSectionData.metrics.map((metric) => (
              <MetricChip key={metric.name} data={metric} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PerformanceOverview;
