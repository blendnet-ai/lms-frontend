import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BreadCrumb from "@/components/BreadCrumb";
import AssessmentFormFields from "@/components/AssessmentFormFields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/configs/routes";
import CourseAPI from "@/apis/CourseAPI";

const breadcrumbPreviousPages = [
  {
    name: "Courses",
    route: ROUTES.COURSES,
  },
];

const AssessmentForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showError, setShowError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    module_id: searchParams.get("moduleId") || "",
    duration: 60,
    start_date: "",
    end_date: "",
    due_date: "",
    question_counts: {
      objective: 1,
      listening: 1,
      speaking: 1,
      reading: 1,
      writing: 1,
    },
    assessment_type: "objective",
  });

  const courseId = parseInt(searchParams.get("courseId") || "0");
  const moduleId = parseInt(searchParams.get("moduleId") || "0");

  const navigateToAssessments = () => {
    navigate(
      `${ROUTES.ASSESSMENT.HOME}?courseId=${courseId}&moduleId=${moduleId}`
    );
  };

  const handleFieldChange = (field: string, value: string | number | any) => {
    if (field === "name") {
      setNameError("");
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.duration ||
      !formData.start_date ||
      !formData.end_date ||
      !formData.due_date
    ) {
      setShowError(true);
      return;
    }
    setShowError(false);
    handleCreateAssessment();
  };

  const handleCreateAssessment = async () => {
    try {
      await CourseAPI.createAssessment(
        formData.name,
        formData.module_id,
        formData.duration,
        formData.start_date,
        formData.end_date,
        formData.due_date,
        formData.question_counts,
        formData.assessment_type
      );

      navigateToAssessments();
    } catch (error: any) {
      console.error("Error creating assessment:", error);
      if (error.response?.data?.name) {
        setNameError(error.response.data.name[0]);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Assessment Form"}
      />
      <h2 className="text-2xl font-bold mt-4">Add New Assessment</h2>
      <Card className="mt-4 p-4 flex flex-col gap-4">
        <AssessmentFormFields
          onFieldChange={handleFieldChange}
          showError={showError}
          nameError={nameError}
          formData={formData}
        />
        <div className="flex justify-between">
          <Button variant="primary" onClick={handleSave}>
            Create
          </Button>
          <Button variant="outline" onClick={navigateToAssessments}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AssessmentForm;
