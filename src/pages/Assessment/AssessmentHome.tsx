import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import transformQuestions from "../../utils/transformQuestionList";
import EvalAPI from "../../apis/EvalAPI";
import { AssessmentCard } from "./components/AssessmentCard";
import LiveClassAPI from "../../apis/LiveClassAPI";

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
  start_date: string;
  end_date: string;
  is_locked: boolean;
  score: number;
}

const AssessmentHome = () => {
  // hooks
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // constants
  const courseId = parseInt(searchParams.get("courseId") || "0");
  const moduleId = parseInt(searchParams.get("moduleId") || "0");

  // states
  const [configs, setConfigs] = useState<Assessment[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  // fetch assessment configs for user by course id and module id
  useEffect(() => {
    const fetchAssessmentConfigs = async () => {
      try {
        const data = await LiveClassAPI.getAssessmentConfigs(
          courseId,
          moduleId
        );
        if (!data) return;
        setConfigs(data?.assessment_generation_configs); // Update configs
      } catch (error) {
        console.error("Failed to fetch assessment configs:", error);
      }
    };

    // Clear any local storage data before fetching
    localStorage.removeItem("transformedQuestions");
    localStorage.removeItem("currentQuestion");

    // Fetch assessment configs
    fetchAssessmentConfigs();
  }, [courseId, moduleId]);

  // handle start assessment
  const handleStartAssessment = async (data: any) => {
    if (!data) return;
    setIsLoading(true);
    try {
      const resp = await EvalAPI.startAssessment(data.assessment_generation_id);

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
          Select an assessment to start{" "}
        </Typography>

        {/* assessments card  */}
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
            width: "100%",
            padding: "2rem",
          }}
        >
          {configs.map((assessment, index) => (
            <AssessmentCard
              key={index}
              assessmentName={assessment?.name}
              totalAttempts={assessment?.max_attempts}
              userAttempts={assessment?.user_attempts}
              assessmentDescription=""
              assessmentInstructions={assessment?.welcome.instructions.list}
              assessmentNumber={index + 1}
              bgColor="#2059EE"
              startHandler={() => handleStartAssessment(assessment)}
              startDate={assessment.start_date}
              endDate={assessment.end_date}
              isLocked={assessment.is_locked}
              maxScore={assessment.score}
            />
          ))}
        </Box>
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
