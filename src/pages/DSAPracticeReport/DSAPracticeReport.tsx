import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DSAPracticeAPI, {
  GetReport,
  ReportStatus,
} from "../../apis/DSAPracticeAPI";
import {
  Alert,
  Backdrop,
  Box,
  CardMedia,
  CircularProgress,
  Fade,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { icons, images } from "../../assets";
import OverallScore from "./components/OverallScore";
import Efficiency from "./components/Efficiency";
import CodeQuality from "./components/CodeQuality";
import ImprovementsAndFeedback from "./components/ImprovementsAndFeedback";
import RevisionTopics from "./components/RevisionTopics";
import Correctness from "./components/Correctness";
import Solutions from "./components/Solutions";
import CloseIcon from "@mui/icons-material/Close";
import FeedBackForm from "./components/FeedBackForm";
import FeedbackFormAPI, { GetForm } from "../../apis/FeedBackFormAPI";
import ShowFailedTestCases from "../../components/Modals/ShowFailedTestCases";

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
  detailed_report: true,
  submitted_code: null,
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
      failed_tests: [],
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
  resources: {
    article_link: null,
    video_link: null,
  },
};

export default function DSAPracticeReport() {
  const [searchParams, _] = useSearchParams();
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  const [report, setReport] = useState<GetReport | null>(hardcodedReport);
  const [feedbackForm, setFeedbackForm] = useState<GetForm | null>(null);

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

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

  const fetchForm = async () => {
    try {
      const form = await FeedbackFormAPI.getForm();
      // console.log(form);
      setFeedbackForm(form);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchReport();
    }, 5000);

    if (report && report.status === ReportStatus.COMPLETED) {
      clearInterval(intervalId);

      // enable feedback button
      setIsLoading(false);

      // call get feedback form api
      fetchForm();
    }

    return () => clearInterval(intervalId);
  }, [report, assessmentId]);

  useEffect(() => {
    fetchReport();
  }, [assessmentId]);

  useEffect(() => {
    (async () => {
      const assessmentId = searchParams.get("assessment_id");
      if (assessmentId) setAssessmentId(parseInt(assessmentId));
    })();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    // open feedback form modal
    if (report && report.status === ReportStatus.COMPLETED && feedbackForm) {
      console.log("opening modal");
      handleOpenModal();
    }
  }, [report, feedbackForm]);

  const [openFailedTestCases, setOpenFailedTestCases] = useState(false);
  // const [failedTestCases, setFailedTestCases] = useState<string[]>([]);
  const handleOpenFailedTestCases = () => setOpenFailedTestCases(true);
  const handleCloseFailedTestCases = () => setOpenFailedTestCases(false);

  if (report)
    return (
      <>
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
              justifyContent: "space-between",
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
              <h3>Test Result</h3>
            </Box>
            {!isLoading && feedbackForm && feedbackForm.form && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <img src={icons.feedback} alt="" />
                <Typography
                  sx={{
                    color: "#2059EE",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  onClick={handleOpenModal}
                >
                  Give Feedback
                </Typography>
              </Box>
            )}
          </Box>
          {report?.detailed_report === true &&
            (report?.status === ReportStatus.COMPLETED ||
              ReportStatus.PENDING) && (
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
                    <Correctness
                      score={
                        report.detailed_performance_analysis?.correctness.score
                      }
                      feedback={
                        report.detailed_performance_analysis?.correctness
                          .feedback
                      }
                      detailedReport={report.detailed_report}
                      status={report.status === ReportStatus.COMPLETED ? 3 : 2}
                      isFailedTestCases={
                        report.detailed_performance_analysis?.correctness
                          .failed_tests || []
                      }
                      clickToOpenTestCasesModal={handleOpenFailedTestCases}
                    />

                    <Efficiency
                      score={
                        report.detailed_performance_analysis?.efficiency.score
                      }
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
                  </Box>

                  <Box
                    sx={{
                      width: "70%",
                    }}
                  >
                    <CodeQuality
                      score={
                        report.detailed_performance_analysis?.code_quality.score
                      }
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
                    report.detailed_performance_analysis
                      ?.improvement_and_learning.score
                  }
                  feedback={
                    report.detailed_performance_analysis
                      ?.improvement_and_learning.feedback
                  }
                />

                <RevisionTopics revision_topics={report.revision_topics} />
                {report.resources && (
                  <Solutions
                    solution_resources={report.resources}
                    submittedCode={report.submitted_code}
                  />
                )}
              </Box>
            )}

          {report?.detailed_report === false &&
            (report?.status === ReportStatus.PENDING ||
              report?.status === ReportStatus.COMPLETED) && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
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
                    <Correctness
                      score={
                        report.detailed_performance_analysis?.correctness.score
                      }
                      feedback={
                        report.detailed_performance_analysis?.correctness
                          .feedback
                      }
                      detailedReport={report.detailed_report}
                      isFailedTestCases={
                        report.detailed_performance_analysis?.correctness
                          .failed_tests || []
                      }
                      status={report.status === ReportStatus.PENDING ? 1 : 2}
                      clickToOpenTestCasesModal={handleOpenFailedTestCases}
                    />
                  </Box>

                  {/* reason of failed test cases */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "70%",
                      padding: "30px 10px 30px 60px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(90deg, #2059EE 0%, #6992FF 100%)",
                      color: "#fff",
                      position: "relative",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        width: "70%",
                      }}
                    >
                      Not enough test cases passed to generate detailed
                      feedback. Please review the solution and re-attempt the
                      question
                    </Typography>
                    <CardMedia
                      component="img"
                      image={images.failedTestCases}
                      sx={{
                        position: "absolute",
                        width: "auto",
                        height: "140px",
                        objectFit: "contain",
                        right: "20px",
                        bottom: "0px",
                      }}
                    />
                  </Box>
                </Box>
                {report.resources && (
                  <Solutions
                    solution_resources={report.resources}
                    submittedCode={report.submitted_code}
                  />
                )}
              </Box>
            )}

          {report?.detailed_report === false &&
            report?.status === ReportStatus.IN_PROGRESS && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <OverallScore score={null} feedback={null} />

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
                    <Correctness
                      score={null}
                      feedback={null}
                      detailedReport={false}
                      status={3}
                      isFailedTestCases={[]}
                      clickToOpenTestCasesModal={handleOpenFailedTestCases}
                    />

                    <Efficiency
                      score={null}
                      optimum_time_complexity={null}
                      space_complexity={null}
                      time_complexity={null}
                    />
                  </Box>

                  <Box
                    sx={{
                      width: "70%",
                    }}
                  >
                    <CodeQuality
                      score={null}
                      code_readability={null}
                      variable_naming={null}
                      code_structure={null}
                      usage_of_comments={null}
                    />
                  </Box>
                </Box>
                <ImprovementsAndFeedback score={null} feedback={null} />

                <RevisionTopics revision_topics={null} />
                {report.resources && (
                  <Solutions solution_resources={null} submittedCode={null} />
                )}
              </Box>
            )}
          {/* modal for submitting ratings */}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={openModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  padding: "20px 20px",
                  borderRadius: "20px",
                  maxWidth: "1000px",
                  // minWidth: "",
                  width: "50vw",
                  height: feedbackForm?.id === 1 ? "auto" : "80vh",
                }}
              >
                {/* close button  */}
                <IconButton
                  onClick={handleCloseModal}
                  sx={{ position: "absolute", top: "10px", right: "10px" }}
                >
                  <CloseIcon />
                </IconButton>
                {/* Form  */}
                <FeedBackForm
                  data={feedbackForm as GetForm}
                  assessmentId={assessmentId as number}
                  open={openSnackBar}
                  setOpen={setOpenSnackBar}
                  closeModal={handleCloseModal}
                />
                {/* Buttons */}
                {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: "20px",
                  gap: "20px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2059EE",
                    color: "white",
                    fontWeight: "600",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#2059EE",
                    },
                  }}
                >
                  Submit
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#2059EE",
                    color: "white",
                    fontWeight: "600",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#2059EE",
                    },
                  }}
                >
                  Skip
                </Button>
              </Box> */}
              </Box>
            </Fade>
          </Modal>
          {/* modal for showing failed test cases */}
          <ShowFailedTestCases
            open={openFailedTestCases}
            close={handleCloseFailedTestCases}
            failedTestCases={
              report.detailed_performance_analysis?.correctness?.failed_tests ||
              []
            }
          />
        </Box>

        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Feedback Submitted Successfully
          </Alert>
        </Snackbar>
      </>
    );
  else return <CircularProgress />;
}
