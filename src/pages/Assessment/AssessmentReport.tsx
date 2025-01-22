import { Box, Typography } from "@mui/material";
import OverallScore from "./components/OverallScore";
import BreadCrumb from "../../components/BreadCrumb";
import { PerformanceChart } from "./components/Chart";
import PerformanceOverview from "./components/PerformanceOverview";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EvalAPI, {
  AssessmentReportResponse,
  ReportStatus,
} from "../../apis/EvalAPI";

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

  const fetchReport = async (id: string) => {
    try {
      const resp = await EvalAPI.getSingleAssessmentsResult(id);
      setReportData(resp);

      // If status is COMPLETED, stop loading
      if (resp.status === ReportStatus.COMPLETED) {
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.error("Error fetching report:", error);
    }
    return false;
  };

  useEffect(() => {
    if (!assessmentId) return;

    let intervalId: NodeJS.Timeout;

    const startPolling = async () => {
      const stopPolling = await fetchReport(assessmentId);

      if (!stopPolling) {
        intervalId = setInterval(async () => {
          const shouldStop = await fetchReport(assessmentId);

          if (shouldStop) {
            clearInterval(intervalId);
          }
        }, 5000);
      }
    };

    startPolling();

    // Cleanup interval
    return () => clearInterval(intervalId);
  }, [assessmentId]);

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
          feedback={reportData?.data.performance_overview?.feedback}
          key={"overallScore"}
          score={reportData?.data.performance_overview?.score}
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
          <PerformanceChart
            data={reportData?.data?.performance_metrics || []}
          />
        ) : (
          <PerformanceChart data={null} />
        )}

        {/* Performance Overview */}
        {!loading ? (
          <PerformanceOverview
            data={reportData?.data?.performance_metrics || []}
            metricsData={reportData?.data?.sections || []}
          />
        ) : (
          <PerformanceOverview data={null} metricsData={null} />
        )}
      </Box>
    </Box>
  );
};

export default AssessmentReport;
