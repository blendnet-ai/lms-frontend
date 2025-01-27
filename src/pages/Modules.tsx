import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LiveClassAPI, { GetModulesDataResponse } from "../apis/LiveClassAPI";
import BreadCrumb from "../components/BreadCrumb";
// import { getAnalytics, logEvent } from "firebase/analytics";
import CourseResource from "./CourseResource";
import { getModuleRoute, ROUTES } from "../configs/routes";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Eye, PlayCircle } from "lucide-react";
import { UserContext } from "@/App";
import { Role } from "@/types/app";

export interface Resource {
  id: number;
  type: string;
  title: string;
  url: string;
}

const Modules = () => {
  const { role } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [modules, setModules] = useState<GetModulesDataResponse | null>(null);
  const [slug, setSlug] = useState<string>("");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  const [courseId, setCourseId] = useState<number | null>(null);

  // Update URL based on selected resource
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedResource) {
      url.searchParams.set("resourceId", selectedResource.id.toString());
      url.searchParams.set("type", selectedResource.type);
    } else {
      url.searchParams.delete("resourceId");
      url.searchParams.delete("type");
    }
    window.history.replaceState({}, "", url.toString());
  }, [selectedResource]);

  // fetch modules
  useEffect(() => {
    const courseSlug = location.pathname.split("/modules/")[1];
    setSlug(courseSlug);

    const courseId = new URLSearchParams(location.search).get("courseId");
    setCourseId(Number(courseId));

    const fetchModules = async () => {
      const modules = await LiveClassAPI.getModulesData(Number(courseId));
      setModules(modules);

      // Check for resource ID in URL and select resource if it exists
      const resourceId = new URLSearchParams(location.search).get("resourceId");
      const resourceType = new URLSearchParams(location.search).get("type");
      if (resourceId) {
        // Search through all module resources
        let foundResource = null;
        const moduleData = modules["module_data"];

        for (const module of moduleData) {
          // Check video resources
          if (resourceType === "video") {
            if (module.resources_video) {
              const videoResource = module.resources_video.find(
                (r: Resource) => r.id === Number(resourceId)
              );
              if (videoResource) {
                foundResource = videoResource;
                break;
              }
            }
          }

          // Check reading resources
          if (resourceType === "reading") {
            const readingResource = module.resources_reading.find(
              (r: Resource) => r.id === Number(resourceId)
            );
            if (readingResource) {
              foundResource = readingResource;
              break;
            }
          }
        }
        if (foundResource) {
          setSelectedResource(foundResource);
        } else {
          // Resource not found, remove from URL
          const url = new URL(window.location.href);
          url.searchParams.delete("resourceId");
          url.searchParams.delete("type");
          window.history.replaceState({}, "", url.toString());
        }
      }
    };
    if (courseId) fetchModules();
  }, []);

  const unselectResource = () => {
    setSelectedResource(null);
  };

  const breadcrumbPreviousPages = [
    {
      name: "Courses",
      route: ROUTES.COURSES,
    },
    ...(selectedResource
      ? [
          {
            name: slug,
            route: getModuleRoute(slug, courseId?.toString() ?? ""),
            onClick: () => {
              setSelectedResource(null);
            },
          },
        ]
      : []),
  ];

  // useEffect(() => {
  //   const analytics = getAnalytics();
  //   const randomId =
  //     Math.random().toString(36).substring(2, 15) +
  //     Math.random().toString(36).substring(2, 15);
  //   const pageEnterTime = Date.now();

  //   console.log("page_enter", pageEnterTime);
  //   // Log page enter event
  //   logEvent(analytics, "page_enter", {
  //     page_name: "Modules",
  //     start_time: pageEnterTime,
  //     session_id: randomId,
  //     user_id: "123",
  //     video_id: "video-123",
  //   });

  //   // Log page exit event
  //   const handleBeforeUnload = () => {
  //     const pageExitTime = Date.now();
  //     const timeSpent = (pageExitTime - pageEnterTime) / 1000;
  //     localStorage.setItem("time_spent", timeSpent.toString());
  //     console.log("page_exit", timeSpent);

  //     logEvent(analytics, "page_exit", {
  //       page_name: "Modules",
  //       end_time: pageExitTime,
  //       start_time: pageEnterTime,
  //       time_spent: timeSpent,
  //       session_id: randomId,
  //       user_id: "123",
  //       video_id: "video-123",
  //     });
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  return (
    <div className="flex flex-col h-full min-h-screen w-full bg-gradient-to-br from-blue-50 to-white p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={selectedResource ? selectedResource.title : slug}
      />

      {!selectedResource && (
        <div className="flex flex-col mt-4 bg-white rounded-xl shadow-lg border border-gray-100">
          <p className="text-black mb-2 bg-gradient-to-r from-gray-50 to-white font-bold text-xl p-4 border-b">
            Study Materials
          </p>

          <Accordion type="single" collapsible className="w-full">
            {modules?.module_data.map((module) => (
              <AccordionItem
                value={`module-${module.id}`}
                className="border-b last:border-b-0 px-4 py-3"
              >
                <AccordionTrigger id={`module-${module.id}`} className="py-0">
                  <p className="font-bold text-lg text-gray-800">
                    {module.title}
                  </p>

                  <Button
                    variant="primary"
                    className="ml-auto mr-1 shadow-md"
                    onClick={() => {
                      navigate(
                        `/assessment?courseId=${courseId}&moduleId=${module.id}`
                      );
                    }}
                  >
                    {role === Role.STUDENT
                      ? "Take Assessment"
                      : "View Assessments"}
                  </Button>
                </AccordionTrigger>
                <AccordionContent className="bg-white px-0">
                  <p className="font-bold text-lg text-[#2059EE] p-3 border-b">
                    Video Resources
                  </p>

                  <Table className="min-w-[650px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-base text-gray-700">
                          Title
                        </TableHead>
                        <TableHead className="font-bold text-base text-gray-700">
                          Get Started
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {module.resources_video.map((row) => (
                        <TableRow className="border-none">
                          <TableCell className="font-medium">
                            {row.title}
                          </TableCell>
                          <TableCell>
                            <div
                              className="flex items-center gap-2 cursor-pointer text-gray-600"
                              onClick={() => setSelectedResource(row)}
                            >
                              <PlayCircle className="w-5 h-5" />
                              <div className="font-medium">Play Now</div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {module.resources_video.length === 0 && (
                        <TableRow className="border-none">
                          <TableCell colSpan={2}>
                            <div className="font-medium text-base text-gray-400 text-center py-4">
                              No video resources available
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>

                  <Separator className="my-6" />

                  <p className="font-bold text-lg text-[#2059EE] p-3 border-b">
                    Reading Resources
                  </p>

                  <Table className="min-w-[650px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-base text-gray-700">
                          Title
                        </TableHead>
                        <TableHead className="font-bold text-base text-gray-700">
                          Get Started
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {module.resources_reading.map((row) => (
                        <TableRow key={row.id} className="border-none">
                          <TableCell className="font-medium">
                            {row.title}
                          </TableCell>
                          <TableCell>
                            <div
                              className="flex items-center gap-2 cursor-pointer text-gray-600"
                              onClick={() => setSelectedResource(row)}
                            >
                              <Eye className="w-5 h-5" />
                              <div className="font-medium">View Resource</div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {module.resources_reading.length === 0 && (
                        <TableRow className="border-none">
                          <TableCell colSpan={2}>
                            <div className="font-medium text-base text-gray-400 text-center py-4">
                              No reading resources available
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {selectedResource && (
        <CourseResource
          resource={selectedResource}
          unselectResource={unselectResource}
        />
      )}
    </div>
  );
};

export default Modules;
