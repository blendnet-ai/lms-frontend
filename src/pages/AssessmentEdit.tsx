import { useEffect, useState } from "react";
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

const AssessmentEdit = () => {
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
      listening: 0,
      speaking: 0,
      reading: 0,
      writing: 0,
      objective: 0,
    },
    assessment_type: "objective",
  });

  const courseId = parseInt(searchParams.get("courseId") || "0");
  const moduleId = parseInt(searchParams.get("moduleId") || "0");
  const assessmentGenId = parseInt(searchParams.get("assessmentGenId") || "0");

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const data = await CourseAPI.getAssessmentDetails(assessmentGenId);
        if (data) {
          // Convert HH:MM:SS to minutes
          const [hours, minutes] = data.test_duration.split(":");
          const durationInMinutes = parseInt(hours) * 60 + parseInt(minutes);

          // Format dates to match datetime-local input format
          const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toISOString().slice(0, 16); // Get YYYY-MM-DDTHH:mm format
          };

          setFormData({
            name: data.assessment_display_name,
            module_id: data.module_id,
            duration: durationInMinutes,
            start_date: formatDate(data.start_date),
            end_date: formatDate(data.end_date),
            due_date: formatDate(data.due_date),
            question_counts: data.question_counts || {
              listening: 0,
              speaking: 0,
              reading: 0,
              writing: 0,
              objective: 0,
            },
            assessment_type: data.assessment_type || "objective",
          });
        }
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching assessment:", error);
      }
    };

    if (assessmentGenId) {
      fetchAssessment();
    }
  }, [assessmentGenId]);

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
    console.log(formData);
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
    handleUpdateAssessment();
  };

  const handleUpdateAssessment = async () => {
    try {
      await CourseAPI.updateAssessment(
        assessmentGenId,
        formData.name,
        formData.duration,
        formData.start_date,
        formData.end_date,
        formData.due_date
      );

      navigateToAssessments();
    } catch (error: any) {
      console.error("Error updating assessment:", error);
      if (error.response?.data?.name) {
        setNameError(error.response.data.name[0]);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Edit Assessment"}
      />
      <h2 className="text-2xl font-bold mt-4">Edit Assessment</h2>
      <Card className="mt-4 p-4 flex flex-col gap-4">
        <AssessmentFormFields
          onFieldChange={handleFieldChange}
          showError={showError}
          nameError={nameError}
          formData={formData}
          isEditMode={true}
        />
        <div className="flex justify-between">
          <Button variant="primary" onClick={handleSave}>
            Update
          </Button>
          <Button variant="outline" onClick={navigateToAssessments}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AssessmentEdit;
