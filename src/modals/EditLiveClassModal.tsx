import { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LiveClassAPI from "../apis/LiveClassAPI";
import formatTimeUsingDate from "@/utils/formatTimeUsingDate";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TimePickerAMPM } from "@/components/Custom/TimePickerAMPM";
import { TimePicker } from "@/components/Custom/TimePicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ApiResponse,
  EditLiveClassModalProps,
  ErrorFieldEditModal,
} from "./types";
import { formatDate } from "@/utils/formatDate";

const secondsToTimeString = (seconds: number): string => {
  const hh = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const mm = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
};

const EditLiveClassModal = (props: EditLiveClassModalProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(
    props.data?.data?.start_date
      ? new Date(props.data.data.start_date)
      : undefined
  );
  const [startTime, setStartTime] = useState<Date | undefined>(
    props.data?.data?.start_time
      ? new Date(`1970-01-01T${props.data.data.start_time}`)
      : undefined
  );
  const [duration, setDuration] = useState<Date | undefined>(
    props.data?.data?.duration != null
      ? new Date(`1970-01-01T${secondsToTimeString(Number(props.data.data.duration))}`)
      : undefined
  );

  const [errorField, setErrorField] = useState<ErrorFieldEditModal>({
    startDate: null,
    startTime: null,
    duration: null,
  });

  useEffect(() => {
    if (props.data?.data) {
      setStartDate(
        props.data.data.start_date
          ? new Date(props.data.data.start_date)
          : undefined
      );
      setStartTime(
        props.data.data.start_time
          ? new Date(`1970-01-01T${props.data.data.start_time}`)
          : undefined
      );
      setDuration(
        props.data.data.duration
          ? new Date(`1970-01-01T${secondsToTimeString(Number(props.data.data.duration))}`)
          : undefined
      );
    }
  }, [props.data]);

  const validateFields = () => {
    const errors: ErrorFieldEditModal = {
      startDate: startDate ? null : "Start date is required",
      startTime: startTime ? null : "Start time is required",
      duration: duration ? null : "Duration is required",
    };

    setErrorField(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmitData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const refactoredFormData = {
      start_date: formatDate(startDate as Date),
      start_time: formatTimeUsingDate(startTime as Date),
      duration: formatTimeUsingDate(duration as Date),
    };

    try {
      const response: ApiResponse = await LiveClassAPI.updateLiveClass(
        refactoredFormData,
        Number(props.meetingId)
      );

      if (response.message) {
        props.close();
        props.isLiveClassUpdated(true);
        toast.success("Live class updated successfully", { theme: "dark" });
      } else {
        throw new Error("Error updating live class");
      }
    } catch (error) {
      toast.error("Error submitting data", { theme: "dark" });
    }
  };

  return (
    <Fragment>
      <Dialog
        open={props.open !== undefined ? props.open : true}
        onOpenChange={() => props.close()}
      >
        <DialogContent className="sm:max-w-[425px] sm:max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Live Class</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitData} className="grid gap-4">
            {/* Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="title"
                placeholder="Title"
                value={props.data.data?.title}
                readOnly
                disabled
                className="w-full col-span-4"
              />
            </div>

            {/* Start Date */}
            <div className="grid grid-cols-4 items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"light"}
                    className={cn(
                      "justify-start text-left font-normal w-full col-span-4",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Start Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errorField.startDate && (
                <p className="text-red-500 text-xs col-span-4">
                  {errorField.startDate}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="grid grid-cols-4 items-center gap-2">
              <Button
                variant={"light"}
                className="justify-start text-left font-normal w-full col-span-4 text-muted-foreground"
                disabled
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {props.data.data?.end_date
                  ? format(new Date(props.data.data.end_date), "PPP")
                  : "No end date"}
              </Button>
            </div>

            {/* Start Time */}
            <div className="flex flex-col gap-2">
              <TimePickerAMPM date={startTime} setDate={setStartTime} />
              {errorField.startTime && (
                <p className="text-red-500 text-xs col-span-4">
                  {errorField.startTime}
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2">
              <TimePicker date={duration} setDate={setDuration} />
              {errorField.duration && (
                <p className="text-red-500 text-xs col-span-4">
                  {errorField.duration}
                </p>
              )}
            </div>

            {/* Recurrence */}
            <div className="grid grid-cols-1 items-center gap-4">
              <Label className="w-full">Recurrence Type</Label>
              <Input
                id="recurrence_type"
                placeholder="Recurrence Type"
                value={props.data.data?.recurrence_type}
                readOnly
                disabled
                className="w-full col-span-4"
              />
            </div>

            <Button type="submit" variant="primary">
              Edit
            </Button>

            {/* cancel button */}
            <Button
              variant="danger"
              onClick={() => {
                props.close();
              }}
            >
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        theme="dark"
      />
    </Fragment>
  );
};

export default EditLiveClassModal;
