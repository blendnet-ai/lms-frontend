import CourseAPI from "@/apis/CourseAPI";
import BreadCrumb from "@/components/BreadCrumb";
import BatchFormFields from "@/components/BatchFormFields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBatchesRoute, ROUTES } from "@/configs/routes";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const BatchEdit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const batchId = searchParams.get("batch_id");
  const courseId = searchParams.get("course_id");
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    lecturer_id: "",
  });
  const [isLoading, setIsLoading] = useState(true);

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
  useEffect(() => {
    const fetchBatchData = async () => {
      if (!batchId) {
        setIsLoading(false);
        return;
      }

      try {
        const batch = await CourseAPI.getBatch(batchId);
        console.log("batch", batch);

        setFormData({
          title: batch.title,
          start_date: batch.start_date,
          end_date: batch.end_date,
          lecturer_id: batch.lecturer.id.toString(),
        });
      } catch (error) {
        console.error("Error fetching batch:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatchData();
  }, [batchId]);

  const navigateToBatches = () => {
    if (courseId) {
      navigate(`${ROUTES.BATCHES}?course_id=${courseId}`);
    } else {
      navigate(ROUTES.COURSES);
    }
  };

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
    handleUpdateBatch();
  };

  const handleUpdateBatch = async () => {
    if (!batchId) return;
    try {
      await CourseAPI.updateBatch(
        batchId,
        formData.title,
        formData.lecturer_id,
        formData.start_date,
        formData.end_date
      );
      navigateToBatches();
    } catch (error) {
      console.error("Error updating batch:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Edit Batch"}
      />
      <h2 className="text-2xl font-bold mt-4">Edit Batch</h2>
      <Card className="mt-4 p-4 flex flex-col gap-4">
        <BatchFormFields
          initialTitle={formData.title}
          initialStartDate={formData.start_date}
          initialEndDate={formData.end_date}
          initialLecturerId={formData.lecturer_id}
          onFieldChange={handleFieldChange}
          showError={showError}
        />
        <div className="flex justify-between">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" onClick={navigateToBatches}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BatchEdit;
