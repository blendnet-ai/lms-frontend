import { Fragment, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DSAPracticeAPI, { GetReport } from "../../apis/DSAPracticeAPI";
import { Box, CircularProgress, Typography } from "@mui/material";
import { icons } from "../../assets";
import CustomCircularProgress from "../../components/CustomCircularProgress/CustomCircularProgress";
import ListElement from "./ListElement";

interface CardProps {
  children: React.ReactNode;
}
function Card(props: CardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      {props.children}
    </Box>
  );
}

export default function DSAPracticeReport() {
  const [searchParams, _] = useSearchParams();
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  const [report, setReport] = useState<GetReport | null>(null);

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

    if (report && report.top) {
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

  const formattedRevisionTopics = report?.revision_topics
    .split("\n\n")
    .map((item, index) => (
      <Fragment key={index}>
        {item}
        <br />
      </Fragment>
    ));

  if (report)
    return (
      <Box
        sx={{
          backgroundColor: "#EFF6FF",
          padding: "20px 40px 20px 40px",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
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
          <Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "40px",
              }}
            >
              <Box>
                <CustomCircularProgress
                  color="#2059EE"
                  textColor="#2059EE"
                  colorOther="#CCE3FF"
                  filledValue={report.total_score?.score}
                  innerValue={`${report.total_score?.score}/100`}
                  innerColor={"blue"}
                />
              </Box>
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
                  Overall Score {report.total_score?.score}/100
                </Typography>
                <Typography>{report.total_score?.overall_feedback}</Typography>
              </Box>
            </Box>
          </Card>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
              }}
            >
              <Card>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <img src={icons.activity} alt="" />
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
                      Efficiency{" "}
                      {report.detailed_performance_analysis?.efficiency.score}
                      /20
                    </Typography>
                    <Box>
                      <Typography>
                        Time complexity:{" "}
                        {
                          report.detailed_performance_analysis?.efficiency
                            .time_complexity
                        }
                      </Typography>
                      <Typography>
                        Optimum Time Complexity:{" "}
                        {
                          report.detailed_performance_analysis?.efficiency
                            .optimum_time_complexity
                        }{" "}
                      </Typography>
                      <Typography>
                        Space Complexity:{" "}
                        {
                          report.detailed_performance_analysis?.efficiency
                            .space_complexity
                        }{" "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>

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

            <Card>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <img src={icons.mobileProgramming} alt="" />
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
                    Code Quality{" "}
                    {report.detailed_performance_analysis?.code_quality.score}
                    /20
                  </Typography>

                  <ListElement
                    head="Readability and Best Practices"
                    content={
                      report.detailed_performance_analysis?.code_quality
                        .code_readability
                    }
                  />
                  <ListElement
                    head="Variable Naming"
                    content={
                      report.detailed_performance_analysis?.code_quality
                        .variable_naming
                    }
                  />
                  <ListElement
                    head="Code Structure"
                    content={
                      report.detailed_performance_analysis?.code_quality
                        .code_structure
                    }
                  />
                  <ListElement
                    head="Usage of Comments"
                    content={
                      report.detailed_performance_analysis?.code_quality
                        .usage_of_comments
                    }
                  />
                </Box>
              </Box>
            </Card>
          </Box>
          <Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "flex-start",
              }}
            >
              <img src={icons.messageEdit} alt="" />
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
                  Improvements and Feedback:{" "}
                  {
                    report.detailed_performance_analysis
                      ?.improvement_and_learning.score
                  }
                  /20
                </Typography>

                <Typography>
                  {
                    report.detailed_performance_analysis
                      ?.improvement_and_learning.feedback
                  }
                </Typography>
              </Box>
            </Box>
          </Card>

          <Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "flex-start",
              }}
            >
              <img src={icons.hourGlass} alt="" />
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
                  Revision Topics
                </Typography>

                <Typography>{formattedRevisionTopics} </Typography>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* <pre>{JSON.stringify(report, null, 2)}</pre> */}
      </Box>
    );
  else return <CircularProgress />;
}
