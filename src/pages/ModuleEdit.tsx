import CourseAPI from "@/apis/CourseAPI";
import BreadCrumb from "@/components/BreadCrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getModuleRoute, ROUTES } from "@/configs/routes";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ModuleFormFields from "@/components/ModuleFormFields";

const ModuleEdit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const moduleId = searchParams.get("moduleId");
  const courseName = searchParams.get("courseName");
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    order_in_course: 0,
  });
  const { toast } = useToast();

  const breadcrumbPreviousPages = [
    {
      name: "Courses",
      route: ROUTES.COURSES,
    },
    {
      name: courseName ?? "",
      route: getModuleRoute(courseName ?? "", courseId ?? ""),
    },
  ];

  useEffect(() => {
    if (moduleId && courseId) {
      fetchModuleData();
    }
  }, [moduleId, courseId]);

  const fetchModuleData = async () => {
    try {
      const module = await CourseAPI.getModule(moduleId ?? "");
      console.log("module", module);
      if (module) {
        setFormData({
          title: module.title,
          order_in_course: module.order_in_course,
        });
      }
    } catch (error) {
      console.error("Error fetching module:", error);
      toast({
        title: "Failed to fetch module details",
        duration: 1000,
        className:
          "bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4",
        variant: "destructive",
      });
    }
  };

  const navigateToModules = () => {
    if (courseId) {
      navigate(getModuleRoute(courseName ?? "", courseId));
    }
  };

  const handleFieldChange = (field: string, value: string | number) => {
    console.log("field", field, "value", value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.title || formData.order_in_course < 0) {
      setShowError(true);
      return;
    }
    setShowError(false);
    handleUpdateModule();
  };

  const handleUpdateModule = async () => {
    if (!moduleId || !courseId) return;
    try {
      await CourseAPI.updateModule(
        courseId,
        moduleId,
        formData.title,
        formData.order_in_course
      );
      toast({
        title: "Module updated successfully",
        duration: 1000,
        className:
          "bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4",
      });
      navigateToModules();
    } catch (error) {
      console.error("Error updating module:", error);
      toast({
        title: "Failed to update module",
        duration: 1000,
        className:
          "bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Edit Module"}
      />
      <h2 className="text-2xl font-bold mt-4">Edit Module</h2>
      <Card className="mt-4 p-4 flex flex-col gap-4">
        <div>{formData.order_in_course}</div>
        <ModuleFormFields
          onFieldChange={handleFieldChange}
          showError={showError}
          initialTitle={formData.title}
          initialOrder={formData.order_in_course}
        />
        <div className="flex justify-between">
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outline" onClick={navigateToModules}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ModuleEdit;
