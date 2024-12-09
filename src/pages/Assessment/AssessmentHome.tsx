import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import transformQuestions from "../../utils/transformQuestionList";
import EvalAPI from "../../apis/EvalAPI";
import { AssessmentCard } from "./components/AssessmentCard";

interface Assessment {
  assessment_generation_id: number;
  test: {
    heading: string;
    slug: string;
  };
  welcome: {
    heading: string;
    heading_inner: string;
    instructions: {
      content: string;
      list: string[];
    };
    img_url: string;
  };
  name: string;
  user_attempts: number;
  max_attempts: number;
}

const AssessmentHome = () => {
  // hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // constants
  const id = parseInt(searchParams.get("id") || "0");

  // states
  const [allAssessments, setAllAssessments] = useState<Assessment[]>([]);
  const [assessmentData, setAssessmentData] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // fetch all assessments
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const data = await EvalAPI.getAllAssessmentsData();
        if (!data) return;
        setAllAssessments(data);
      } catch (error) {
        console.error("Failed to fetch assessments:", error);
      }
    };

    // also clear the localStorage
    localStorage.removeItem("transformedQuestions");
    localStorage.removeItem("currentQuestion");

    fetchAssessments();
  }, []);

  // set the assessment data
  useEffect(() => {
    const assessment = allAssessments.find(
      (assessment) => assessment.assessment_generation_id === id
    );
    setAssessmentData(assessment || null);
    localStorage.setItem("assessmentData", assessment?.test.heading || "");
  }, [id, allAssessments]);

  // handle start assessment
  const handleStartAssessment = async () => {
    if (!assessmentData) return;
    setIsLoading(true);
    try {
      const resp = await EvalAPI.startAssessment(
        assessmentData.assessment_generation_id
      );

      if (resp && resp.assessment_id) {
        navigate(`/assessment-start?id=${resp.assessment_id}`);
        const transformedQuestions = transformQuestions(resp);
        localStorage.setItem(
          "transformedQuestions",
          JSON.stringify(transformedQuestions)
        );
      }
    } catch (error) {
      console.error("Failed to start assessment:", error);
      setIsLoading(false);
    }
  };

  const breadcrumbPreviousPages = [
    {
      name: "Courses",
      route: "/courses",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        gap: "1rem",
        backgroundColor: "#EFF6FF",
        width: "100%",
        padding: "20px",
      }}
    >
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Assessments"}
      />
      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "2rem",
        }}
      >
        {/* Heading */}
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "black",
            mb: "1rem",
            // textAlign: "center",
          }}
        >
          Assessment
        </Typography>
        {/* Heading */}
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "semibold",
            color: "#8EA1B3",
            mb: "1rem",
          }}
        >
          This course offers a comprehensive introduction to SQL (Structured
          Query Language) and its application in software development. Students
          will learn to design, manage, and manipulate relational data.
        </Typography>

        {/* assessment card  */}
        <AssessmentCard
          assessmentName={assessmentData?.name}
          totalAttempts={assessmentData?.max_attempts}
          userAttempts={assessmentData?.user_attempts}
          assessmentDescription="SQL basic test for beginners"
          assessmentInstructions={assessmentData?.welcome.instructions.list}
          assessmentNumber={1}
          questionsCount={10}
          bgColor="#2059EE"
          startHandler={handleStartAssessment}
        />
      </Box>

      {/* Loading Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <CircularProgress color="secondary" />
          <Typography
            sx={{
              fontSize: "2rem",
              color: "white",
            }}
          >
            Starting Assessment...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default AssessmentHome;
