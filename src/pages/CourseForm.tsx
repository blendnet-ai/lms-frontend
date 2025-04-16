import CourseAPI from "@/apis/CourseAPI";
import BreadCrumb from "@/components/BreadCrumb";
import CourseFormFields from "@/components/CourseFormFields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/configs/routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const breadcrumbPreviousPages = [
  {
    name: "Courses",
    route: ROUTES.COURSES,
  },
];

const CourseForm = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    duration: 0,
    description: "",
  });

  const navigateToCourses = () => {
    navigate(ROUTES.COURSES);
  };

  const handleFieldChange = (field: string, value: string | number) => {
    if (field === "code") {
      setCodeError("");
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.code || !formData.duration) {
      setShowError(true);
      return;
    }
    setShowError(false);
    handleCreateCourse();
  };

  const handleCreateCourse = async () => {
    try {
      const response = await CourseAPI.createCourse(
        formData.title,
        formData.code,
        formData.description,
        formData.duration
      );

      navigateToCourses();
    } catch (error: any) {
      console.error("Error creating course:", error);
      if (error.response?.data?.code) {
        setCodeError(error.response.data.code[0]);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Course Form"}
      />
      <h2 className="text-2xl font-bold mt-4">Add New Course</h2>
      <Card className="mt-4 p-4 flex flex-col gap-4">
        <CourseFormFields
          onFieldChange={handleFieldChange}
          showError={showError}
          codeError={codeError}
        />
        <div className="flex justify-between">
          <Button variant="primary" onClick={handleSave}>
            Create
          </Button>
          <Button variant="outline" onClick={navigateToCourses}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CourseForm;
