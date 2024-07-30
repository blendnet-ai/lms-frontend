import { Fragment, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DSAPracticeAPI, {
  GetReport,
  ReportStatus,
} from "../../apis/DSAPracticeAPI";
import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";
import { icons } from "../../assets";
import CustomCircularProgress from "../../components/CustomCircularProgress/CustomCircularProgress";
import ListElement from "./ListElement";
import OverallScore from "./components/OverallScore";
import Efficiency from "./components/Efficiency";
import CodeQuality from "./components/CodeQuality";
import ImprovementsAndFeedback from "./components/ImprovementsAndFeedback";
import RevisionTopics from "./components/RevisionTopics";

interface CardProps {
  children: React.ReactNode;
}
export function Card(props: CardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {props.children}
    </Box>
  );
}

const hardcodedReport = {
  status: ReportStatus.PENDING,
  total_score: {
    score: null,
    overall_feedback: null,
  },
  top: {
    student_name: null,
    date_of_session: null,
    title_of_the_dsa_problem: null,
    difficulty_level_and_tags: null,
  },
  detailed_performance_analysis: {
    correctness: {
      score: null,
      feedback: null,
    },
    efficiency: {
      score: null,
      time_complexity: null,
      space_complexity: null,
      optimum_time_complexity: null,
    },
    code_quality: {
      score: null,
      code_readability: null,
      variable_naming: null,
      code_structure: null,
      usage_of_comments: null,
    },
    improvement_and_learning: {
      score: null,
      feedback: null,
    },
  },
  session_insights: {
    key_strengths: null,
    areas_for_improvement: null,
  },
  footer: {
    encouraging_note: null,
  },
  revision_topics: null,
};
export default function DSAPracticeReport() {
  const [searchParams, _] = useSearchParams();
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  const [report, setReport] = useState<GetReport | null>(hardcodedReport);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fetchReport = async () => {
    if (assessmentId) {
      try {
        const report = await DSAPracticeAPI.getReport(assessmentId);
        setReport(report);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchReport();
    }, 5000);

    if (report && report.status == ReportStatus.COMPLETED) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [report, assessmentId]);

  useEffect(() => {
    fetchReport();
  }, [assessmentId]);

  useEffect(() => {
    (async () => {
      const assessmentId = searchParams.get("assessment_id");
      console.log(assessmentId);
      if (assessmentId) setAssessmentId(parseInt(assessmentId));
    })();
  }, []);

  if (report)
    return (
      <Box
        sx={{
          backgroundColor: "#EFF6FF",
          padding: "20px 40px 20px 40px",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <img src={icons.documentCode} alt="" />
          <h3>Test Result</h3>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <OverallScore
            score={report.total_score?.score}
            feedback={report.total_score?.overall_feedback}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "30%",
              }}
            >
              <Efficiency
                score={report.detailed_performance_analysis?.efficiency.score}
                optimum_time_complexity={
                  report.detailed_performance_analysis?.efficiency
                    .optimum_time_complexity
                }
                space_complexity={
                  report.detailed_performance_analysis?.efficiency
                    .space_complexity
                }
                time_complexity={
                  report.detailed_performance_analysis?.efficiency
                    .time_complexity
                }
              />

              <Card>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <img src={icons.clipboardTick} alt="" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#2059EE",
                        fontWeight: "550",
                        fontSize: "20px",
                      }}
                    >
                      Correctness{" "}
                      {report.detailed_performance_analysis?.correctness.score}
                      /40
                    </Typography>
                    <Typography>
                      {
                        report.detailed_performance_analysis?.correctness
                          .feedback
                      }
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Box>

            <Box
              sx={{
                width: "70%",
              }}
            >
              <CodeQuality
                score={report.detailed_performance_analysis?.code_quality.score}
                code_readability={
                  report.detailed_performance_analysis?.code_quality
                    .code_readability
                }
                variable_naming={
                  report.detailed_performance_analysis?.code_quality
                    .variable_naming
                }
                code_structure={
                  report.detailed_performance_analysis?.code_quality
                    .code_structure
                }
                usage_of_comments={
                  report.detailed_performance_analysis?.code_quality
                    .usage_of_comments
                }
              />
            </Box>
          </Box>
          <ImprovementsAndFeedback
            score={
              report.detailed_performance_analysis?.improvement_and_learning
                .score
            }
            feedback={
              report.detailed_performance_analysis?.improvement_and_learning
                .feedback
            }
          />

          <RevisionTopics revision_topics={report.revision_topics} />
        </Box>

        {/* <pre>{JSON.stringify(report, null, 2)}</pre> */}
      </Box>
    );
  else return <CircularProgress />;
}
