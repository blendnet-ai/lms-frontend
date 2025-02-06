import { X } from "lucide-react";
import { useState } from "react";
import LiveClassAPI from "../apis/LiveClassAPI";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type StudentNotificationModalProps = {
  open: boolean;
  close: () => void;
  studentId: number;
};

const StudentNotificationModal = (props: StudentNotificationModalProps) => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!message) {
      alert("Please enter a message");
      return;
    }

    setLoading(true);
    try {
      const resp = await LiveClassAPI.postStudentMessage({
        user_id: props.studentId,
        message,
      });
      if (resp.message === "Messages sent") {
        alert("Notification sent successfully");
        props.close();
      }
    } catch (error) {
      console.error("Failed to send notification", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={() => !loading && props.close()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Send Message</DialogTitle>
          <X
            className="absolute right-4 top-4 h-6 w-6 cursor-pointer"
            onClick={() => !loading && props.close()}
          />
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <Textarea
            placeholder="Enter your message here"
            className="min-h-[100px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button variant="default" onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentNotificationModal;
