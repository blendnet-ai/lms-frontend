import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import InstructionsModal from "../../../modals/InstructionsModal";
import { UserContext } from "../../../App";
import { Role } from "@/types/app";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/configs/routes";
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

interface AssessmentProps {
  assessmentNumber: number;
  assessmentDescription: string;
  assessmentName?: string;
  assessmentInstructions?: string[];
  timeAgo?: string;
  bgColor?: string;
  startHandler?: () => void;
  totalAttempts?: number;
  userAttempts?: number;
  startDate: string;
  endDate: string;
  isLocked: boolean;
  maxScore: number;
  assessmentGenId: string;
  moduleId: string;
  courseId: string;
}

export const AssessmentCard = (props: AssessmentProps) => {
  const [open, setOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { role } = useContext(UserContext);

  const navigate = useNavigate();

  const navigateToEdit = () => {
    navigate(
      `${ROUTES.ASSESSMENT.EDIT}?assessmentGenId=${props.assessmentGenId}&moduleId=${props.moduleId}&courseId=${props.courseId}`
    );
  };

  const handleDelete = async () => {
    try {
      await CourseAPI.deleteAssessment(props.moduleId, props.assessmentGenId);
      // Refresh the page or update the assessment list
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete assessment:", error);
    }
  };

  const handleDeleteClick = () => {
    setDropdownOpen(false);
    setShowDeleteAlert(true);
  };

  return (
    <>
      <div className="flex flex-col w-[450px] h-[250px] bg-white shadow-lg rounded-md relative">
        {/* header */}
        <div
          className={`flex flex-row justify-between items-center p-[10px_30px] rounded-t-md`}
          style={{ backgroundColor: props.bgColor || "#EC6980" }}
        >
          <h2 className="text-lg font-bold text-white">
            {props.assessmentName || "Assessment"}
          </h2>

          {role === Role.STUDENT && (
            <span className="text-base text-white px-[10px] py-[5px] rounded-md bg-[#D01215]">
              {props.userAttempts} / {props.totalAttempts} Attempts
            </span>
          )}

          {role === Role.COURSE_PROVIDER_ADMIN && (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger>
                <MoreVertical className="h-5 w-5 text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={navigateToEdit}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDeleteClick}
                  className="text-red-600"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* body */}
        <div className="p-5">
          <p className="text-base text-gray-800">
            Assessment {props.assessmentNumber} - {props.assessmentName}
          </p>
          <p className="text-base text-gray-800 mt-[10px]">
            Start : {new Date(props.startDate).toDateString()}
          </p>
          <p className="text-base text-gray-800">
            End : {new Date(props.endDate).toDateString()}
          </p>

          <p className="text-base text-gray-800">
            Max Score Obtained : {props.maxScore}
          </p>
        </div>

        {/* footer */}
        {props.timeAgo && (
          <p className="absolute bottom-0 right-0 p-[10px_30px] text-lg text-gray-300">
            {props.timeAgo}
          </p>
        )}

        {/* button */}
        {props.startHandler && role === Role.STUDENT && (
          <Button
            className={`mt-auto text-lg rounded-t-none rounded-b-md ${
              props.isLocked
                ? "bg-gray-300"
                : "bg-[#455A64] hover:bg-[#455A64]/90"
            }`}
            onClick={handleOpen}
            disabled={
              props.isLocked ||
              (props.userAttempts ?? 0) >= (props.totalAttempts ?? 0)
            }
          >
            {props.isLocked
              ? "Unlocks on " + new Date(props.startDate).toDateString()
              : props.userAttempts === props.totalAttempts
              ? "Max Attempts Reached"
              : "Start Assessment"}
          </Button>
        )}
      </div>

      <InstructionsModal
        open={open}
        close={handleClose}
        submitHandler={props.startHandler || (() => {})}
        data={props.assessmentInstructions || []}
      />

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete the assessment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              assessment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
