import { Button } from "@/components/ui/button";
import { StudentDetails } from "@/apis/LiveClassAPI";
import { useState } from "react";
import DetailTag from "./DetailTag";
import StudentNotificationModal from "../../../modals/StudentNotificationModal";

interface ProfilePanelProps {
  studentData: StudentDetails | null;
}

const ProfilePanel = (props: ProfilePanelProps) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="flex flex-col bg-white p-5 rounded-lg mb-5 w-1/5 h-full">
        <div className=" flex items-center justify-center w-full mb-2">
          <span className="text-3xl w-20 h-20 rounded-full bg-gray-200 text-gray-700 font-semibold flex items-center justify-center">
            {props.studentData?.name?.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="font-bold text-xl text-center">
          {props.studentData?.name}
        </h2>

        <div className="flex flex-col mt-5 space-y-2.5">
          <DetailTag label="ID" value={props.studentData?.user_id} />
          <DetailTag label="Age" value={props.studentData?.age} />
          <DetailTag label="Gender" value={props.studentData?.gender} />
          <DetailTag label="College" value={props.studentData?.college} />
          <DetailTag label="Email" value={props.studentData?.email} />
          <DetailTag label="Mobile" value={props.studentData?.phone} />

          <Button variant="default" onClick={() => setOpen(true)}>
            Message
          </Button>
        </div>
      </div>

      <StudentNotificationModal
        open={open}
        close={handleClose}
        studentId={Number(props.studentData?.user_id)}
      />
    </>
  );
};

export default ProfilePanel;
