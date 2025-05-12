import CourseAPI from "@/apis/CourseAPI";
import BreadCrumb from "@/components/BreadCrumb";
import BatchFormFields from "@/components/BatchFormFields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBatchesRoute, ROUTES } from "@/configs/routes";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const BatchForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course_id");
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    lecturer_id: "",
  });

  const navigateToBatches = () => {
    if (courseId) {
      navigate(`${ROUTES.BATCHES}?course_id=${courseId}`);
    } else {
      navigate(ROUTES.COURSES);
    }
  };

  const breadcrumbPreviousPages = [
    {
      name: "Courses",
      route: ROUTES.COURSES,
    },
    {
      name: "Batches",
      route: getBatchesRoute(courseId || ""),
    },
  ];

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (
      !formData.title ||
      !formData.start_date ||
      !formData.end_date ||
      !formData.lecturer_id
    ) {
      setShowError(true);
      return;
    }
    setShowError(false);
    handleCreateBatch();
  };

  const handleCreateBatch = async () => {
    if (!courseId) return;
    try {
      await CourseAPI.createBatch(
        courseId,
        formData.title,
        formData.lecturer_id,
        formData.start_date,
        formData.end_date
      );
      navigateToBatches();
    } catch (error) {
      console.error("Error creating batch:", error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Batch Form"}
      />
      <h2 className="text-2xl font-bold mt-4">Add New Batch</h2>
      <Card className="mt-4 p-4 flex flex-col gap-4">
        <BatchFormFields
          onFieldChange={handleFieldChange}
          showError={showError}
        />
        <div className="flex justify-between">
          <Button variant="primary" onClick={handleSave}>
            Create
          </Button>
          <Button variant="outline" onClick={navigateToBatches}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BatchForm;
