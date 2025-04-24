import { useEffect, useState, useCallback, Fragment, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LiveClassAPI, { Course, CourseProvider } from "../apis/LiveClassAPI";
import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "@/components/Custom/TimePicker";
import { TimePickerAMPM } from "@/components/Custom/TimePickerAMPM";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CreateLiveClassModalProps, ErrorField, FormData } from "./types";
import formatTimeUsingDate from "@/utils/formatTimeUsingDate";
import { formatDate } from "@/utils/formatDate";
import { AxiosError } from "axios";

// Add type for week days
type WeekDay = {
  id: string;
  label: string;
};

const CreateLiveClassModal = (props: CreateLiveClassModalProps) => {
  // Memoize weekDays array
  const weekDays = useMemo<readonly WeekDay[]>(
    () => [
      { id: "monday", label: "Monday" },
      { id: "tuesday", label: "Tuesday" },
      { id: "wednesday", label: "Wednesday" },
      { id: "thursday", label: "Thursday" },
      { id: "friday", label: "Friday" },
      { id: "saturday", label: "Saturday" },
      { id: "sunday", label: "Sunday" },
    ],
    []
  );

  const [formData, setFormData] = useState<FormData>({
    title: "",
    recurrence_type: "",
    week_days: [false, false, false, false, false, false, false],
  });

  const [errorField, setErrorField] = useState<ErrorField>({
    startDate: null,
    endDate: null,
    startTime: null,
    duration: null,
  });

  const [courseProvider, setCourseProvider] = useState<CourseProvider | null>(
    null
  );
  const [courseProviderCourses, setCourseProviderCourses] = useState<Course[]>(
    []
  );
  const [courseId, setCourseId] = useState<number | null>(null);
  const [batches, setBatches] = useState<
    {
      id: number;
      title: string;
      lecturer_id: number;
    }[]
  >([]);
  const [batchId, setBatchId] = useState<number | null>(null);
  const [isLiveClassCreating, setIsLiveClassCreating] =
    useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startime, setStartTime] = useState<Date>();
  const [duration, setDuration] = useState<Date>();

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  const [lecterurError, setLecturerError] = useState<string | null>(null);

  // Add loading state for API calls
  const [isLoading, setIsLoading] = useState({
    courseProvider: false,
    courses: false,
    batches: false,
  });

  // Improved validation
  const validateFields = useCallback(() => {
    const errors: ErrorField = {
      startDate: null,
      endDate: null,
      startTime: null,
      duration: null,
    };

    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";
    if (!startime) errors.startTime = "Start time is required";
    if (!duration) errors.duration = "Duration is required";

    if (startDate && endDate) {
      if (startDate > endDate) {
        errors.startDate = "Start date cannot be greater than end date";
        errors.endDate = "End date cannot be greater than start date";
      }
    }

    setErrorField(errors);
    return !Object.values(errors).some(Boolean);
  }, [startDate, endDate, startime, duration]);

  // Optimized API calls with error handling
  const fetchCourseProvider = useCallback(async () => {
    try {
      setIsLoading((prev) => ({ ...prev, courseProvider: true }));
      const data = await LiveClassAPI.getCourseProvider();
      setCourseProvider(data);
    } catch (error) {
      toast.error("Failed to fetch course provider");
      console.error(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, courseProvider: false }));
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    if (courseProvider?.id) {
      try {
        setIsLoading((prev) => ({ ...prev, courses: true }));
        const data = await LiveClassAPI.getCoursesForCourseProvider(
          courseProvider.id
        );
        setCourseProviderCourses(data);
      } catch (error) {
        toast.error("Failed to fetch courses");
        console.error(error);
      } finally {
        setIsLoading((prev) => ({ ...prev, courses: false }));
      }
    }
  }, [courseProvider]);

  const fetchBatches = useCallback(async () => {
    if (courseId) {
      try {
        setIsLoading((prev) => ({ ...prev, batches: true }));
        const data = await LiveClassAPI.getBatchesByCourseProviderId(courseId);
        setBatches(data);
      } catch (error) {
        toast.error("Failed to fetch batches");
        console.error(error);
      } finally {
        setIsLoading((prev) => ({ ...prev, batches: false }));
      }
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

  const form = useForm<{ items: string[] }>({
    defaultValues: { items: [] },
  });

  // Optimized form submission
  const handleSubmitData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateFields()) return;

    const weekDaysChecked = form.getValues("items");
    const weekDaysBooleanArray = weekDays.map((day) =>
      weekDaysChecked.includes(day.id)
    );

    const formPayload = {
      batch_ids: [batchId],
      title: formData.title.trim(),
      start_date: formatDate(startDate as Date),
      end_date: formatDate(endDate as Date),
      start_time: formatTimeUsingDate(startime as Date),
      duration: formatTimeUsingDate(duration as Date),
      recurrence_type: formData.recurrence_type,
      weekday_schedule: weekDaysBooleanArray,
    };

    try {
      setIsLiveClassCreating(true);
      const response = await LiveClassAPI.createLiveClasses(formPayload);

      if (response.error) throw new Error(response.data.error);

      toast.success("Live class created successfully", { theme: "dark" });
      props.isLiveClassCreated(true);
      resetForm();
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.error ?? "Failed to create live class"
          : "An unknown error occurred";
      toast.error(errorMessage, { theme: "dark" });
    } finally {
      setIsLiveClassCreating(false);
    }
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    setStartDateOpen(false);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    setEndDateOpen(false);
  };

  const handleCalendarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const resetForm = () => {
    props.close();
    setFormData({
      title: "",
      recurrence_type: "",
      week_days: Array(7).fill(false),
    });
    setStartDate(undefined);
    setEndDate(undefined);
    setStartTime(undefined);
    setDuration(undefined);
    setCourseId(null);
    setBatchId(null);
    setErrorField({
      startDate: null,
      endDate: null,
      startTime: null,
      duration: null,
    });
    setStartDateOpen(false);
    setEndDateOpen(false);
  };

  return (
    <Fragment>
      <Dialog open={true}>
        <DialogContent className="sm:max-w-[425px] sm:max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Live Class</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmitData}
            className="grid gap-3 py-2 relative"
          >
            {/* Title  */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="title"
                placeholder="Title"
                value={formData.title}
                required
                disabled={isLiveClassCreating}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }))
                }
                className="w-full col-span-4"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              {/* Course Name */}
              <Select
                value={courseId?.toString()}
                onValueChange={(value) => setCourseId(parseInt(value))}
                required
                disabled={isLiveClassCreating}
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

              {/* Batch Name */}
              <Select
                value={batchId?.toString()}
                onValueChange={(value) => {
                  const selectedBatch = batches.find(
                    (batch) => batch.id === parseInt(value)
                  );
                  if (selectedBatch && !selectedBatch.lecturer_id) {
                    setLecturerError("No lecturer assigned to this batch!");
                    setBatchId(null);
                  } else {
                    setLecturerError(null);
                    setBatchId(parseInt(value));
                  }
                }}
                required
                disabled={isLiveClassCreating}
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
              {lecterurError && (
                <p className="text-red-500 text-xs col-span-4">
                  {lecterurError}
                </p>
              )}
            </div>

            {/* Start Date with improved calendar popup */}
            <div className="grid grid-cols-4 items-center gap-2 relative">
              <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"light"}
                    className={cn(
                      "justify-start text-left font-normal w-full col-span-4",
                      !startDate && "text-muted-foreground"
                    )}
                    disabled={isLiveClassCreating}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Start Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 relative"
                  align="start"
                  style={{
                    zIndex: 999,
                    position: "absolute",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                  }}
                  sideOffset={5}
                  onInteractOutside={(e) => e.preventDefault()}
                >
                  <div
                    className="p-0 overflow-hidden rounded-md shadow-lg border border-gray-200 bg-white"
                    onClick={handleCalendarClick}
                    style={{ pointerEvents: "all" }}
                  >
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={handleStartDateSelect}
                      initialFocus
                      className="border-none"
                      style={{ isolation: "isolate" }}
                    />
                  </div>
                </PopoverContent>
              </Popover>

              {errorField.startDate && (
                <p className="text-red-500 text-xs col-span-4">
                  {errorField.startDate}
                </p>
              )}
            </div>

            {/* End Date with improved calendar popup */}
            <div className="grid grid-cols-4 items-center gap-2 relative">
              <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"light"}
                    className={cn(
                      "justify-start text-left font-normal w-full col-span-4",
                      !endDate && "text-muted-foreground"
                    )}
                    disabled={isLiveClassCreating}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>End Date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 relative"
                  align="start"
                  style={{
                    zIndex: 999,
                    position: "absolute",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                  }}
                  sideOffset={5}
                  onInteractOutside={(e) => e.preventDefault()}
                >
                  <div
                    className="p-0 overflow-hidden rounded-md shadow-lg border border-gray-200 bg-white"
                    onClick={handleCalendarClick}
                    style={{ pointerEvents: "all" }}
                  >
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={handleEndDateSelect}
                      initialFocus
                      className="border-none"
                      style={{ isolation: "isolate" }}
                    />
                  </div>
                </PopoverContent>
              </Popover>

              {errorField.endDate && (
                <p className="text-red-500 text-xs col-span-4">
                  {errorField.endDate}
                </p>
              )}
            </div>

            {/* start time */}
            <div className="flex flex-col gap-2">
              <TimePickerAMPM
                date={startime}
                setDate={setStartTime}
                disabled={isLiveClassCreating}
              />
              {errorField.startTime && (
                <p className="text-red-500 text-xs col-span-4">
                  {errorField.startTime}
                </p>
              )}
            </div>

            {/* duration */}
            <div className="flex flex-col gap-2">
              <TimePicker
                date={duration}
                setDate={setDuration}
                disabled={isLiveClassCreating}
              />
              {errorField.duration && (
                <p className="text-red-500 text-xs col-span-4">
                  {errorField.duration}
                </p>
              )}
            </div>

            {/* Recurrence Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Select
                value={formData.recurrence_type}
                onValueChange={(value) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    recurrence_type: value,
                  }))
                }
                required
                disabled={isLiveClassCreating}
              >
                <SelectTrigger className="w-full col-span-4">
                  <SelectValue placeholder="Recurrence Type">
                    {formData.recurrence_type || "Recurrence Type"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="not_repeating">Non Repeating</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* week days  */}
              {formData.recurrence_type === "week" && (
                <Form {...form}>
                  <form className="space-y-8">
                    <FormField
                      control={form.control}
                      name="items"
                      render={() => (
                        <FormItem>
                          {weekDays.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="items"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}
            </div>

            {/* Buttons  */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={"light"}
                disabled={isLiveClassCreating}
                onClick={() => {
                  props.close();
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant={"primary"}
                disabled={isLiveClassCreating}
                className="flex items-center gap-2"
              >
                {isLiveClassCreating && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {isLiveClassCreating ? "Creating..." : "Create"}
              </Button>
            </div>
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

export default CreateLiveClassModal;
