import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import InstructionsModal from "../../../modals/InstructionsModal";
import { Role, UserContext } from "../../../App";

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
}

export const AssessmentCard = (props: AssessmentProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { role } = useContext(UserContext);

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

          <span className="text-base text-white px-[10px] py-[5px] rounded-md bg-[#D01215]">
            {props.userAttempts} / {props.totalAttempts} Attempts
          </span>
        </div>

        {/* body */}
        <div className="p-5">
          <p className="text-base text-gray-800">
            Assessment {props.assessmentNumber}
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
    </>
  );
};
