import CourseAPI from "@/apis/CourseAPI";
import BreadCrumb from "@/components/BreadCrumb";
import CourseFormFields from "@/components/CourseFormFields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/configs/routes";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const breadcrumbPreviousPages = [
  {
    name: "Courses",
    route: ROUTES.COURSES,
  },
];

const CourseEdit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [showError, setShowError] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    duration: 1,
    description: "",
  });

  useEffect(() => {
    if (courseId) {
      fetchCourseData();
    }
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const course = await CourseAPI.getCourse(courseId!);
      setFormData({
        title: course.title,
        code: course.code,
        duration: course.course_hours,
        description: course.summary,
      });
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const navigateToCourses = () => {
    navigate(ROUTES.COURSES);
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.code || !formData.duration) {
      setShowError(true);
      return;
    }
    setShowError(false);
    handleUpdateCourse();
  };

  const handleUpdateCourse = async () => {
    if (!courseId) return;
    try {
      const response = await CourseAPI.updateCourse(
        courseId,
        formData.title,
        formData.code,
        formData.description,
        formData.duration
      );

      navigateToCourses();
    } catch (error: any) {
      console.error("Error updating course:", error);
      if (error.response?.data?.code) {
        setCodeError(error.response.data.code[0]);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Edit Course"}
      />
      <h2 className="text-2xl font-bold mt-4">Edit Course</h2>
      <Card className="mt-4 p-4 flex flex-col gap-4">
        <CourseFormFields
          codeError={codeError}
          initialTitle={formData.title}
          initialCode={formData.code}
          initialDuration={formData.duration}
          initialDescription={formData.description}
          onFieldChange={handleFieldChange}
          showError={showError}
        />
        <div className="flex justify-between">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" onClick={navigateToCourses}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CourseEdit;
