import { Box, Typography } from "@mui/material";
import OverallScore from "./components/OverallScore";
import BreadCrumb from "../../components/BreadCrumb";
import { PerformanceChart } from "./components/Chart";
import PerformanceOverview from "./components/PerformanceOverview";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LMSAPI, { AssessmentReportResponse } from "../../apis/LmsAPI";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Assessments Results",
    route: "/assessment-results",
  },
];

const AssessmentReport = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const [reportData, setReportData] = useState<AssessmentReportResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchReport = async (id: string) => {
      const resp = await LMSAPI.getSingleAssessmentsResult(id);
      setReportData(resp);
      setLoading(false);
    };

    if (assessmentId) fetchReport(assessmentId);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <BreadCrumb
        key={1}
        currentPageName="Report"
        previousPages={breadcrumbPreviousPages}
      />

      {/* Heading */}
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Assessment Report for {assessmentId}
      </Typography>

      {/* Overall Score */}
      {!loading ? (
        <OverallScore
          feedback={reportData?.performance_overview.feedback}
          key={"overallScore"}
          score={reportData?.performance_overview.score}
        />
      ) : (
        <OverallScore feedback={null} key={null} score={null} />
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "2rem",
          height: "100%",
        }}
      >
        {/* Radar Chart */}
        {!loading ? (
          <PerformanceChart data={reportData?.performance_metrics || []} />
        ) : (
          <PerformanceChart data={null} />
        )}

        {/* Performance Overview */}
        {!loading ? (
          <PerformanceOverview
            data={reportData?.performance_metrics || []}
            metricsData={reportData?.sections || []}
          />
        ) : (
          <PerformanceOverview data={null} metricsData={null} />
        )}
      </Box>
    </Box>
  );
};

export default AssessmentReport;
