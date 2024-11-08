import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { icons } from "../../assets";
import CommunicationScore from "./components/CommunicationSkillScore";
import PerformanceRadarChart from "./components/PerformanceRadarChart";
import QuestionAnalysis from "./components/QuestionAnalysis";
import MockInterviewAPI, {
  GetReport,
  ReportStatus,
} from "./apis/MockInterviewApi";

const hardcodedReport = {
  status: ReportStatus.EVALUATION_PENDING,
  qualified: false,
  total_score: null,
  overall_summary: null,
  total_emotion_score: null,
  total_fluency_score: null,
  total_coherence_score: null,
  questions_analysis: [],
};

// Qualified Report Data for testing
// const mode = 499;

const InterviewReport = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [report, setReport] = useState<GetReport | null>(hardcodedReport);

  // Handle back navigation
  useEffect(() => {
    const handleBackNavigation = () => {
      if (location.pathname === `/mock-interview/report/${mode}`) {
        navigate("/dashboard");
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [location, navigate]);

  // Fetch Report Data
  const fetchReport = async () => {
    if (mode) {
      try {
        const report = await MockInterviewAPI.getReport(Number(mode));
        setReport(report);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Fetch Report Data on component mount
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchReport();
    }, 5000);

    if (report && report.status === ReportStatus.COMPLETED) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [report, mode]);

  return (
    <Box
      sx={{
        backgroundColor: "#EFF6FF",
        padding: "20px 40px 20px 40px",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* Header  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <img src={icons.documentCode} alt="" />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              mr: "10px",
            }}
          >
            Test Result
          </Typography>
          {(report && report?.status === ReportStatus.IN_PROGRESS) ||
            (report?.status === ReportStatus.EVALUATION_PENDING && (
              <Typography
                sx={{
                  backgroundColor: "#FEF5D8",
                  color: "#FFA500",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                IN PROGRESS
              </Typography>
            ))}

          {report && report?.status === ReportStatus.COMPLETED && (
            <Typography
              sx={{
                backgroundColor: report.qualified ? "#8dffd2" : "#efced5",
                color: report.qualified ? "#009600" : "#FF0000",
                padding: "5px 10px",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              {report.qualified ? "QUALIFIED" : "NOT QUALIFIED"}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Body */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#fff",
          mt: "20px",
          borderRadius: "10px",
        }}
      >
        {(report && report?.status === ReportStatus.IN_PROGRESS) ||
          (report?.status === ReportStatus.EVALUATION_PENDING && (
            <Box>
              <CommunicationScore
                score={report.total_score}
                feedback={report.overall_summary}
              />

              <PerformanceRadarChart
                total_fluency_score={report.total_fluency_score}
                total_emotion_score={report.total_emotion_score}
                total_coherence_score={report.total_coherence_score}
              />

              <QuestionAnalysis
                questionData={report.questions_analysis || []}
              />
            </Box>
          ))}

        {report && report?.status === ReportStatus.COMPLETED && (
          <Box>
            <CommunicationScore
              score={report.total_score}
              feedback={report.overall_summary}
            />

            <PerformanceRadarChart
              total_fluency_score={report.total_fluency_score}
              total_emotion_score={report.total_emotion_score}
              total_coherence_score={report.total_coherence_score}
            />

            <QuestionAnalysis questionData={report.questions_analysis} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default InterviewReport;
