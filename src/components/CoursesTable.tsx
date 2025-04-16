import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Course } from "../apis/LiveClassAPI";
import { Button } from "./ui/button";

import { getBatchesRoute, getCourseEditRoute } from "../configs/routes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
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
import { useState } from "react";
import CourseAPI from "../apis/CourseAPI";
import { useToast } from "@/hooks/use-toast";

type StudentCoursesTableProps = {
  courses: Course[];
  navigateParent: (slug: string, courseId: string) => void;
  onCourseDeleted?: (deletedCourseId: number) => void;
};

function StudentCoursesTable(props: StudentCoursesTableProps) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const { toast } = useToast();

  const navigateToCourseEdit = (courseId: string) => {
    setOpenDropdownId(null);
    navigate(getCourseEditRoute(courseId));
  };

  const handleDeleteClick = (course: Course) => {
    setOpenDropdownId(null);
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!courseToDelete) return;

    try {
      await CourseAPI.deleteCourse(courseToDelete.id.toString());
      if (props.onCourseDeleted) {
        props.onCourseDeleted(courseToDelete.id);
      }
    } catch (error) {
      toast({
        title: "Failed to delete course",
        duration: 1000,
        className:
          "bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setCourseToDelete(null);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-bold text-lg text-primary">
              Course Name
            </TableHead>
            <TableHead className="font-bold text-lg">Course Code</TableHead>
            <TableHead className="font-bold text-lg">
              Number of Batches
            </TableHead>
            <TableHead className="font-bold text-lg">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.courses.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50">
              <TableCell
                className="cursor-pointer text-primary hover:underline"
                onClick={() => {
                  props.navigateParent(row.slug, row.id.toString());
                }}
              >
                {row.title}
              </TableCell>
              <TableCell className="text-gray-600">{row.code}</TableCell>
              <TableCell className="text-gray-600">
                {row.no_of_batches}
              </TableCell>
              <TableCell className="flex flex-row gap-2">
                <DropdownMenu
                  open={openDropdownId === row.id}
                  onOpenChange={(open) => {
                    setOpenDropdownId(open ? row.id : null);
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
                        navigateToCourseEdit(row.id.toString());
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(row);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate(`/batches?course_id=${row.id.toString()}`);
                  }}
                >
                  View Batches
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete the course?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              course "{courseToDelete?.title}".
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
    </div>
  );
}

export default StudentCoursesTable;
