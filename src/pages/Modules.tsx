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
import CourseAPI from "../apis/CourseAPI";
import BreadCrumb from "../components/BreadCrumb";
// import { getAnalytics, logEvent } from "firebase/analytics";
import CourseResource from "./CourseResource";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Eye, PlayCircle, PlusIcon, MoreVertical, Trash2 } from "lucide-react";
import {
  getModuleFormRoute,
  getModuleEditRoute,
  getModuleRoute,
  ROUTES,
  getVideoFormRoute,
  getDocumentFormRoute,
} from "../configs/routes";
import { UserContext } from "@/App";
import { Role } from "@/types/app";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const [modules, setModules] = useState<GetModulesDataResponse | null>(null);
  const [slug, setSlug] = useState<string>("");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  const [courseId, setCourseId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<number | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [videoToDelete, setVideoToDelete] = useState<Resource | null>(null);
  const [deleteVideoDialogOpen, setDeleteVideoDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Resource | null>(
    null
  );
  const [deleteDocumentDialogOpen, setDeleteDocumentDialogOpen] =
    useState(false);

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

  const handleDeleteClick = (moduleId: number) => {
    setOpenDropdownId(null);
    setModuleToDelete(moduleId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!moduleToDelete) return;

    try {
      await CourseAPI.deleteMaterial(moduleToDelete.toString(), "module");
      toast({
        title: "Resource deleted successfully",
        duration: 1000,
        className:
          "bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4",
      });
    } catch (error) {
      toast({
        title: "Failed to delete resource",
        duration: 1000,
        className:
          "bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setModuleToDelete(null);
    }
  };

  const handleDeleteVideoClick = (video: Resource) => {
    setVideoToDelete(video);
    setDeleteVideoDialogOpen(true);
  };

  const handleDeleteVideoConfirm = async () => {
    if (!videoToDelete) return;

    try {
      // Add API call to delete video
      await CourseAPI.deleteMaterial(videoToDelete.id.toString(), "video");
      // Remove the deleted video from the module's resources
      if (modules) {
        const updatedModules = {
          ...modules,
          module_data: modules.module_data.map((module) => ({
            ...module,
            resources_video: module.resources_video.filter(
              (video) => video.id !== videoToDelete.id
            ),
          })),
        };
        setModules(updatedModules);
      }
    } catch (error) {
      toast({
        title: "Failed to delete video",
        duration: 1000,
        className:
          "bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4",
        variant: "destructive",
      });
    } finally {
      setDeleteVideoDialogOpen(false);
      setVideoToDelete(null);
    }
  };

  const handleDeleteDocumentClick = (document: Resource) => {
    setDocumentToDelete(document);
    setDeleteDocumentDialogOpen(true);
  };

  const handleDeleteDocumentConfirm = async () => {
    if (!documentToDelete) return;

    try {
      await CourseAPI.deleteMaterial(documentToDelete.id.toString(), "reading");
      // Remove the deleted document from the module's resources
      if (modules) {
        const updatedModules = {
          ...modules,
          module_data: modules.module_data.map((module) => ({
            ...module,
            resources_reading: module.resources_reading.filter(
              (doc) => doc.id !== documentToDelete.id
            ),
          })),
        };
        setModules(updatedModules);
      }
    } catch (error) {
      toast({
        title: "Failed to delete document",
        duration: 1000,
        className:
          "bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4",
        variant: "destructive",
      });
    } finally {
      setDeleteDocumentDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  const navigateToModuleEdit = (moduleId: number) => {
    setOpenDropdownId(null);
    navigate(
      getModuleEditRoute(courseId?.toString() ?? "", moduleId.toString(), slug)
    );
  };

  const navigateToModuleForm = () => {
    navigate(getModuleFormRoute(courseId?.toString() ?? "", slug));
  };

  const navigateToDocumentForm = (moduleId: number) => {
    navigate(
      getDocumentFormRoute(
        courseId?.toString() ?? "",
        moduleId.toString(),
        slug
      )
    );
  };

  const navigateToVideoForm = (moduleId: number) => {
    navigate(
      getVideoFormRoute(courseId?.toString() ?? "", moduleId.toString(), slug)
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]  w-full bg-gradient-to-br from-blue-50 to-white p-8 pt-6">
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

                  <div className="flex items-center gap-2 ml-auto">
                    {role === Role.COURSE_PROVIDER_ADMIN && (
                      <DropdownMenu
                        open={openDropdownId === module.id}
                        onOpenChange={(open) => {
                          setOpenDropdownId(open ? module.id : null);
                        }}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="mr-2">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToModuleEdit(module.id);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(module.id);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    <Button
                      variant="primary"
                      className="shadow-md"
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
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-white px-0">
                  <div className="flex flex-row justify-between mt-10">
                    <p className="font-bold text-lg text-[#2059EE] p-3 border-b">
                      Video Resources
                    </p>
                    {role === Role.COURSE_PROVIDER_ADMIN && (
                      <Button
                        variant="primary"
                        className="shadow-md"
                        onClick={() => navigateToVideoForm(module.id)}
                      >
                        Upload New Video
                      </Button>
                    )}
                  </div>

                  <Table className="min-w-[650px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-base text-gray-700">
                          Title
                        </TableHead>
                        <TableHead className="font-bold text-base text-gray-700">
                          Get Started
                        </TableHead>
                        {role === Role.COURSE_PROVIDER_ADMIN && (
                          <TableHead className="font-bold text-base text-gray-700">
                            Actions
                          </TableHead>
                        )}
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
                          {role === Role.COURSE_PROVIDER_ADMIN && (
                            <TableCell>
                              <Button
                                variant="primary"
                                className="shadow-md"
                                onClick={() => handleDeleteVideoClick(row)}
                              >
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </TableCell>
                          )}
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

                  <div className="flex flex-row justify-between mt-10">
                    <p className="font-bold text-lg text-[#2059EE] p-3 border-b">
                      Reading Resources
                    </p>
                    {role === Role.COURSE_PROVIDER_ADMIN && (
                      <Button
                        variant="primary"
                        className="shadow-md"
                        onClick={() => navigateToDocumentForm(module.id)}
                      >
                        Upload New Document
                      </Button>
                    )}
                  </div>

                  <Table className="min-w-[650px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-base text-gray-700">
                          Title
                        </TableHead>
                        <TableHead className="font-bold text-base text-gray-700">
                          Get Started
                        </TableHead>
                        {role === Role.COURSE_PROVIDER_ADMIN && (
                          <TableHead className="font-bold text-base text-gray-700">
                            Actions
                          </TableHead>
                        )}
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
                          {role === Role.COURSE_PROVIDER_ADMIN && (
                            <TableCell>
                              <Button
                                variant="primary"
                                className="shadow-md"
                                onClick={() => handleDeleteDocumentClick(row)}
                              >
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </TableCell>
                          )}
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
      {role === Role.COURSE_PROVIDER_ADMIN && (
        <Button
          variant={"primary"}
          className="fixed bottom-8 left-8 shadow-lg"
          onClick={navigateToModuleForm}
        >
          <PlusIcon className="w-4 h-4" />
          Add New Module
        </Button>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete the resource?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              resource "
              {modules?.module_data.find((m) => m.id === moduleToDelete)?.title}
              " and all its associated resources.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row items-center justify-end gap-2">
            <AlertDialogCancel className="h-10">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="h-10 bg-red-500 hover:bg-red-600 mt-2"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={deleteVideoDialogOpen}
        onOpenChange={setDeleteVideoDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete the video?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              video "{videoToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row items-center justify-end gap-2">
            <AlertDialogCancel className="h-10">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteVideoConfirm}
              className="h-10 bg-red-500 hover:bg-red-600 mt-2"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={deleteDocumentDialogOpen}
        onOpenChange={setDeleteDocumentDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete the document?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              document "{documentToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row items-center justify-end gap-2">
            <AlertDialogCancel className="h-10">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDocumentConfirm}
              className="h-10 bg-red-500 hover:bg-red-600 mt-2"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Modules;
