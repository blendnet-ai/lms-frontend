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
} from "@/components/ui/alert-dialog";
import CourseAPI from "@/apis/CourseAPI";

type BatchRowProps = {
  title: string;
  id: string;
  start_date: string;
  students_count: number;
  course_id: string;
};

function BatchRow(props: BatchRowProps & { onDelete: (id: string) => void }) {
  const navigate = useNavigate();
  const { role } = useContext(UserContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

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
              <span className="font-bold text-base px-2">{props.title}</span>
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
            onDelete={handleDeleteBatch}
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
