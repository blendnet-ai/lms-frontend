import { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BreadCrumb from "../components/BreadCrumb";
import LiveClassAPI from "../apis/LiveClassAPI";
import {
  ROUTES,
  getBatchEditRoute,
  getBatchFormRoute,
} from "../configs/routes";
import { PlusIcon, MoreVertical, PencilIcon } from "lucide-react";
import { Role } from "@/types/app";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/App";
import { useNavigate } from "react-router-dom";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import CourseAPI from "@/apis/CourseAPI";
import { useToast } from "@/hooks/use-toast";
type BatchRowProps = {
  title: string;
  id: string;
  start_date: string;
  students_count: number;
  course_id: string;
  students: {
    id: number;
    name: string;
    email: string;
    status: string;
    enrollment_date: string;
  }[];
  setBatches: React.Dispatch<React.SetStateAction<any>>;
};

function BatchRow(props: BatchRowProps & { onDelete: (id: string) => void }) {
  const navigate = useNavigate();
  const { role } = useContext(UserContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { toast } = useToast();
  const handleEdit = () => {
    navigate(getBatchEditRoute(props.id, props.course_id));
  };

  const handleDelete = () => {
    props.onDelete(props.id);
    setShowDeleteDialog(false);
  };

  const handleDeleteClick = () => {
    setOpenDropdown(false);
    setShowDeleteDialog(true);
  };

  const handleUnenroll = async (studentId: number) => {
    try {
      await CourseAPI.unenrollStudent(studentId.toString(), props.course_id);

      props.setBatches((prevBatches: any) => {
        return prevBatches.map((batch: any) => {
          if (batch.id === props.id) {
            const updatedStudents = batch.students.filter(
              (s: any) => s.id !== studentId
            );
            return {
              ...batch,
              students: updatedStudents,
              students_count: updatedStudents.length,
            };
          }
          return batch;
        });
      });

      toast({
        title: "Success",
        description: "Student has been unenrolled successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error unenrolling student:", error);
      toast({
        title: "Error",
        description: "Failed to unenroll student. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="w-full bg-white px-5 py-1"
      >
        <AccordionItem value={props.id}>
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-bold text-base px-2">
                {props.title} (ID : {props.id})
              </span>
              <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-base">
                    Number of students
                  </TableHead>
                  <TableHead className="font-bold text-base">
                    Batch ID
                  </TableHead>
                  <TableHead className="font-bold text-base">
                    Start Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{props.students_count}</TableCell>
                  <TableCell>{props.id}</TableCell>
                  <TableCell>
                    {new Date(props.start_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2">Students</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold text-base">Name</TableHead>
                    <TableHead className="font-bold text-base">Email</TableHead>
                    <TableHead className="font-bold text-base">
                      Status
                    </TableHead>
                    <TableHead className="font-bold text-base">
                      Enrollment Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {props.students?.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <span
                          className="text-blue-600 font-bold cursor-pointer hover:underline"
                          onClick={() => navigate(`/students/${student.id}`)}
                        >
                          {student.name}
                        </span>
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(student.enrollment_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </TableCell>
                      {role === Role.COURSE_PROVIDER_ADMIN && (
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Unenroll
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Unenroll the student?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action will unenroll {student.name} from
                                  this batch. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter className="flex justify-end gap-2">
                                <AlertDialogCancel className="mt-0">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={async () => {
                                    await handleUnenroll(student.id);
                                    // Close the dialog after successful unenroll
                                    const closeButton = document.querySelector(
                                      '[data-state="open"] button[role="button"]'
                                    );
                                    if (closeButton) {
                                      (
                                        closeButton as HTMLButtonElement
                                      ).click();
                                    }
                                  }}
                                  className="bg-red-600 hover:bg-red-700 mt-0"
                                >
                                  Unenroll
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete the Batch?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              batch "{props.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="mt-2" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function Batches() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("course_id");
  const [batches, setBatches] = useState<any>();

  const navigate = useNavigate();

  const breadcrumbPreviousPages = [
    {
      name: "Courses",
      route: ROUTES.COURSES,
    },
  ];

  const { role } = useContext(UserContext);

  useEffect(() => {
    const fetchBatches = async () => {
      const batches = await LiveClassAPI.getBatchesByCourseId(courseId);
      setBatches(batches);
    };
    fetchBatches();
  }, []);

  const handleDeleteBatch = async (batchId: string) => {
    try {
      await CourseAPI.deleteBatch(batchId);
      setBatches((prevBatches: any) =>
        prevBatches.filter((batch: any) => batch.id !== batchId)
      );
    } catch (error) {
      console.error("Error deleting batch:", error);
    }
  };

  const navigateToBatchForm = () => {
    if (courseId) {
      navigate(getBatchFormRoute(courseId));
    } else {
      console.error("Course ID is null");
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen w-full p-8 pt-6">
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName="Batches"
      />
      <h1 className="font-bold text-xl text-blue-600 mb-5 mt-5">
        Batch Details
      </h1>
      {batches &&
        batches.map((batch: any) => (
          <BatchRow
            key={batch.id}
            title={batch.title}
            id={batch.id}
            start_date={batch.start_date}
            students_count={batch.students_count}
            course_id={courseId || ""}
            students={batch.students}
            onDelete={handleDeleteBatch}
            setBatches={setBatches}
          />
        ))}
      {role === Role.COURSE_PROVIDER_ADMIN && (
        <Button
          variant={"primary"}
          className="fixed bottom-8 left-8 shadow-lg"
          onClick={navigateToBatchForm}
        >
          <PlusIcon className="w-4 h-4" />
          Add New Batch
        </Button>
      )}
    </div>
  );
}

export default Batches;
