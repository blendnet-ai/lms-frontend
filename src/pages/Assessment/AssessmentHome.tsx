import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import EvalAPI from "../../apis/EvalAPI";
import { AssessmentCard } from "./components/AssessmentCard";
import LiveClassAPI from "../../apis/LiveClassAPI";
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import {
  getAssessmentFormRoute,
  getAssessmentStartRoute,
  ROUTES,
} from "../../configs/routes";
import { get } from "http";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/App";
import { Role } from "@/types/app";

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
  const { role } = useContext(UserContext);
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
        setConfigs(data?.assessment_generation_configs);
      } catch (error) {
        console.error("Failed to fetch assessment configs:", error);
      }
    };

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
        const firstQuestionId = resp.questions[0].questions[0];
        navigate(getAssessmentStartRoute(resp.assessment_id, firstQuestionId));
      }
    } catch (error) {
      console.error("Failed to start assessment:", error);
      setIsLoading(false);
    }
  };

  const breadcrumbPreviousPages = [
    {
      name: "Courses",
      route: ROUTES.COURSES,
    },
  ];

  const navigateToAssessmentForm = () => {
    navigate(getAssessmentFormRoute(courseId.toString(), moduleId.toString()));
  };
  return (
    <div className="flex flex-col h-full min-h-screen w-full p-4">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Assessments"}
      />
      {/* Content */}
      <div className="flex flex-col h-full min-h-screen w-full p-4">
        <h1 className="font-bold text-2xl text-black mb-4 ">Assessment</h1>

        <p className="font-medium text-[#8EA1B3] text-2xl">
          Select an assessment to start
        </p>

        {/* assessments card  */}
        <div className="flex flex-wrap gap-4 p-5">
          {configs.map((assessment, index) => (
            <AssessmentCard
              moduleId={moduleId.toString()}
              courseId={courseId.toString()}
              assessmentGenId={assessment.assessment_generation_id.toString()}
              key={index}
              assessmentName={assessment?.name}
              totalAttempts={assessment?.max_attempts}
              userAttempts={assessment?.user_attempts}
              assessmentDescription=""
              assessmentInstructions={assessment?.welcome?.instructions?.list}
              assessmentNumber={index + 1}
              bgColor="#2059EE"
              startHandler={() => handleStartAssessment(assessment)}
              startDate={assessment.start_date}
              endDate={assessment.end_date}
              isLocked={assessment.is_locked}
              maxScore={assessment.score}
            />
          ))}
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center z-100">
          <LoadingSpinner size={48} className="text-white" />
          <p className="text-4xl text-white">Starting Assessment...</p>
        </div>
      )}
      {role === Role.COURSE_PROVIDER_ADMIN && (
        <Button
          variant={"primary"}
          className="fixed bottom-8 left-8 shadow-lg"
          onClick={navigateToAssessmentForm}
        >
          <PlusIcon className="w-4 h-4" />
          Add Assessment
        </Button>
      )}
    </div>
  );
};

export default AssessmentHome;
