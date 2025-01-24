import { useEffect, useState, useCallback } from "react";
import LiveClassAPI from "../apis/LiveClassAPI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Batch,
  Course,
  CourseProvider,
  CreateNotificationModalProps,
} from "./types";

const CreateNotificationModal = (props: CreateNotificationModalProps) => {
  const [courseProvider, setCourseProvider] = useState<CourseProvider | null>(
    null
  );
  const [courseProviderCourses, setCourseProviderCourses] = useState<Course[]>(
    []
  );
  const [courseId, setCourseId] = useState<number | null>(null);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [batchId, setBatchId] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!message || !subject || !courseId || !batchId) {
      // alert("Please fill all the required fields.");
      return;
    }

    const data = {
      message,
      subject,
      batch_id: batchId,
      course_id: courseId,
    };

    setLoading(true);
    try {
      const resp = await LiveClassAPI.postNotifications(data);
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

  const fetchCourseProvider = useCallback(async () => {
    try {
      const data = await LiveClassAPI.getCourseProvider();
      setCourseProvider(data);
    } catch (error) {
      console.error("Failed to fetch course provider", error);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    if (!courseProvider?.id) return;
    try {
      const data = await LiveClassAPI.getCoursesForCourseProvider(
        courseProvider.id
      );
      setCourseProviderCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  }, [courseProvider]);

  const fetchBatches = useCallback(async () => {
    if (!courseId) return;
    try {
      const data = await LiveClassAPI.getBatchesByCourseProviderId(courseId);
      setBatches(data);
    } catch (error) {
      console.error("Failed to fetch batches", error);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourseProvider();
  }, [fetchCourseProvider]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Live Class</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-2">
          <div className="grid items-center gap-2">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              placeholder="Type your message here."
              id="message"
            />
          </div>

          {/* subject  */}
          <div className="grid items-center gap-2">
            <Input
              id="NotificationSubject"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full col-span-4"
            />
          </div>

          {/* course name  */}
          <div className="grid items-center gap-2">
            <Select
              value={courseId?.toString()}
              onValueChange={(value) => setCourseId(parseInt(value))}
              required
            >
              <SelectTrigger className="w-full col-span-2">
                <SelectValue placeholder="Course Name">
                  {courseId
                    ? courseProviderCourses.find(
                        (course: Course) => course.id === courseId
                      )?.title
                    : "Course Name"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {courseProviderCourses.map((course: Course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Batch Name  */}
          <div className="grid items-center gap-2">
            <Select
              value={batchId?.toString()}
              onValueChange={(value) => setBatchId(parseInt(value))}
              required
            >
              <SelectTrigger className="w-full col-span-2">
                <SelectValue placeholder="Batch Name">
                  {batchId
                    ? batches.find(
                        (batch: { id: number; title: string }) =>
                          batch.id === batchId
                      )?.title
                    : "Batch Name"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {batches.map((batch: any) => (
                    <SelectItem key={batch.id} value={batch.id.toString()}>
                      {batch.title}
                    </SelectItem>
                  ))}

                  {batches.length === 0 && (
                    <SelectItem value="no-batches" disabled>
                      No Batches
                    </SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Buttons  */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant={"primary"} onClick={props.close}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant={"primary"}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Notification"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNotificationModal;
