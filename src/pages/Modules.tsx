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
import { Role, UserContext } from "../App";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { Eye } from "lucide-react";

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
      route: "/courses",
    },
    ...(selectedResource
      ? [
          {
            name: slug,
            route: `/modules/${slug}?courseId=${courseId}`,
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
    <div className="flex flex-col h-full min-h-screen w-full p-4">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName={selectedResource ? selectedResource.title : slug}
      />

      {/* table view of modules */}
      {!selectedResource && (
        <div className="flex flex-col bg-white p-4 mt-4">
          <p className="text-black mb-4">Study Materials</p>

          <Accordion type="single" collapsible className="w-full">
            {modules?.module_data.map((module) => (
              <AccordionItem value={`module-${module.id}`}>
                <AccordionTrigger
                  // expandIcon={<ArrowDropDownIcon />}
                  id={`module-${module.id}`}
                >
                  <p className="font-bold p-2 text-base">{module.title}</p>

                  <Button
                    variant="primary"
                    className="ml-auto mr-1"
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
                <AccordionContent className="bg-white">
                  <p className="font-bold text-base text-[#2059EE] p-2">
                    Video Resources
                  </p>

                  <Table className="min-w-[650px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-base">
                          Title
                        </TableHead>
                        <TableHead className="font-bold text-base">
                          Get Started
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {module.resources_video.map((row) => (
                        <TableRow className="border-none">
                          <TableCell>{row.title}</TableCell>
                          <TableCell>
                            <div
                              className="flex items-center gap-2 cursor-pointer hover:text-[#2059EE]"
                              onClick={() => setSelectedResource(row)}
                            >
                              <PlayCircle />
                              <div className="cursor-pointer hover:text-[#2059EE]">
                                Play Now
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {/* if no video resources */}
                      {module.resources_video.length === 0 && (
                        <TableRow className="border-none">
                          <TableCell colSpan={2}>
                            <div className="font-semibold text-base text-[#8EA1B3] text-center">
                              No video resources available
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>

                  <Separator className="my-4" />

                  <p className="font-bold text-base text-[#2059EE] p-2">
                    Reading Resources
                  </p>

                  <Table className="min-w-[650px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-base">
                          Title
                        </TableHead>
                        <TableHead className="font-bold text-base">
                          Get Started
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {module.resources_reading.map((row) => (
                        <TableRow key={row.id} className="border-none">
                          <TableCell>{row.title}</TableCell>
                          <TableCell>
                            <div
                              className="flex items-center gap-2 cursor-pointer hover:text-[#2059EE]"
                              onClick={() => setSelectedResource(row)}
                            >
                              <Eye />
                              <div className="cursor-pointer hover:text-[#2059EE]">
                                View Resource
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {/* if no reading resources */}
                      {module.resources_reading.length === 0 && (
                        <TableRow className="border-none">
                          <TableCell colSpan={2}>
                            <div className="font-semibold text-base text-[#8EA1B3] text-center">
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
