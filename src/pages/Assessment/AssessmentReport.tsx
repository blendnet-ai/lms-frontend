import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import OverallScore from "./components/OverallScore";
import BreadCrumb from "../../components/BreadCrumb";
import { PerformanceChart } from "./components/Chart";
import PerformanceOverview from "./components/PerformanceOverview";
import EvalAPI, {
  AssessmentReportResponse,
  ReportStatus,
} from "../../apis/EvalAPI";
import { ROUTES } from "../../configs/routes";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: ROUTES.HOME,
  },
  {
    name: "Assessments Results",
    route: ROUTES.ASSESSMENT.RESULTS,
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
    <div className="flex flex-col gap-5 w-full h-full min-h-screen p-8 pt-6">
      <BreadCrumb
        key={1}
        currentPageName="Report"
        previousPages={breadcrumbPreviousPages}
      />

      {/* Heading */}
      {/* <h1 className="text-2xl font-bold text-black">
        Assessment Report for {assessmentId}
      </h1> */}

      {/* Overall Score */}
      <Card className="p-6">
        {!loading ? (
          <OverallScore
            feedback={reportData?.data.performance_overview?.feedback}
            key="overallScore"
            score={reportData?.data.performance_overview?.score}
          />
        ) : (
          <OverallScore feedback={null} key={null} score={null} />
        )}
      </Card>

      <Card className="p-8">
        <div className="flex flex-row gap-4 h-full">
          {/* Radar Chart */}
          <div className="flex-1">
            {!loading ? (
              <PerformanceChart
                data={reportData?.data?.performance_metrics || []}
              />
            ) : (
              <PerformanceChart data={null} />
            )}
          </div>

          {/* Performance Overview */}
          <div className="flex-1">
            {!loading ? (
              <PerformanceOverview
                data={reportData?.data?.performance_metrics || []}
                metricsData={reportData?.data?.sections || []}
              />
            ) : (
              <PerformanceOverview data={null} metricsData={null} />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AssessmentReport;
