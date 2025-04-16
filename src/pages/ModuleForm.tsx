import CourseAPI from "@/apis/CourseAPI";
import BreadCrumb from "@/components/BreadCrumb";
import ModuleFormFields from "@/components/ModuleFormFields";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getModuleRoute, ROUTES } from "@/configs/routes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModuleForm = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const courseId = searchParams.get("courseId");
  const courseName = searchParams.get("courseName");
  const [formData, setFormData] = useState({
    title: "",
    order: 1,
  });
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

  const navigateToModules = () => {
    navigate(getModuleRoute(courseName ?? "", courseId ?? ""));
  };

  const handleCreate = () => {
    CourseAPI.createModule(courseId ?? "", formData.title, formData.order);
    navigateToModules();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={"Module Form"}
      />
      <h2 className="text-2xl font-bold mt-4">Add New Module</h2>
      <Card className="mt-4 p-4 flex flex-col gap-4">
        <ModuleFormFields
          onFieldChange={(field, value) => {
            setFormData({ ...formData, [field]: value });
          }}
          showError={false}
          initialOrder={formData.order}
          initialTitle={formData.title}
        />
        <div className="flex justify-between">
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
          <Button variant="outline" onClick={navigateToModules}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ModuleForm;
