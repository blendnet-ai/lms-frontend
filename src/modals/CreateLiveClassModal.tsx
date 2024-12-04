import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LiveClassAPI, { CourseProvider } from "../apis/LiveClassAPI";
import {
  DatePicker,
  LocalizationProvider,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

type CreateLiveClassModalProps = {
  open: boolean;
  close: () => void;
  submit: () => void;
  isLiveClassCreated: (value: boolean) => void;
};

interface FormData {
  title: string;
  recurrence_type: string;
  week_days: boolean[];
}

interface ErrorField {
  startDate: string | null;
  endDate: string | null;
  startTime: string | null;
  duration: string | null;
}

const CreateLiveClassModal = (props: CreateLiveClassModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    recurrence_type: "",
    week_days: [false, false, false, false, false, false, false],
  });

  const [dateTimeData, setDateTimeData] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    startTime: Dayjs | null;
    duration: Dayjs | null;
  }>({
    startDate: null,
    endDate: null,
    startTime: null,
    duration: null,
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
  const [courseProviderCourses, setCourseProviderCourses] = useState([]);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState<number | null>(null);

  const handleCheckboxChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedWeekDays = [...formData.week_days];
      updatedWeekDays[index] = e.target.checked;
      setFormData((prevState) => ({
        ...prevState,
        week_days: updatedWeekDays,
      }));
    };

  const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

  const validateFields = () => {
    const errors: ErrorField = {
      startDate: !dateTimeData.startDate ? "Start date is required" : null,
      endDate: !dateTimeData.endDate ? "End date is required" : null,
      startTime: !dateTimeData.startTime ? "Start time is required" : null,
      duration: !dateTimeData.duration ? "Duration is required" : null,
    };

    if (dateTimeData.startDate && dateTimeData.endDate) {
      if (dateTimeData.startDate.isSame(dateTimeData.endDate, "day")) {
        errors.startDate = "Start date and end date cannot be the same";
        errors.endDate = "Start date and end date cannot be the same";
      } else if (dateTimeData.startDate.isAfter(dateTimeData.endDate)) {
        errors.startDate = "Start date cannot be greater than end date";
        errors.endDate = "Start date cannot be greater than end date";
      }
    }

    setErrorField(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmitData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateFields()) return;

    const refactoredFormData = {
      batch_ids: [batchId],
      title: formData.title,
      start_date: formatDate(dateTimeData.startDate!.toDate()),
      end_date: formatDate(dateTimeData.endDate!.toDate()),
      start_time: dateTimeData.startTime!.format("HH:mm:ss"),
      duration: dateTimeData.duration!.format("HH:mm:ss"),
      recurrence_type: formData.recurrence_type,
      weekday_schedule: formData.week_days,
    };

    try {
      const response = await LiveClassAPI.createLiveClasses(refactoredFormData);
      if (response.batches_allocated.length > 0) {
        setTimeout(() => {
          toast.success("Live class created successfully", { theme: "dark" });
        }, 500);
        resetForm();
        props.isLiveClassCreated(true);
      } else {
        throw new Error("Error submitting data");
      }
    } catch {
      toast.error("Error submitting data", { theme: "dark" });
    }
  };

  const resetForm = () => {
    props.close();
    setFormData({
      title: "",
      recurrence_type: "",
      week_days: Array(7).fill(false),
    });
    setDateTimeData({
      startDate: null,
      endDate: null,
      startTime: null,
      duration: null,
    });
    setCourseId(null);
    setBatchId(null);
    setErrorField({
      startDate: null,
      endDate: null,
      startTime: null,
      duration: null,
    });
  };

  useEffect(() => {
    const fetchCourseProvider = async () => {
      const data = await LiveClassAPI.getCourseProvider();
      setCourseProvider(data);
    };
    fetchCourseProvider();
  }, []);

  useEffect(() => {
    if (courseProvider?.id) {
      const fetchCourses = async () => {
        const data = await LiveClassAPI.getCoursesForCourseProvider(
          courseProvider.id
        );
        setCourseProviderCourses(data);
      };
      fetchCourses();
    }
  }, [courseProvider]);

  useEffect(() => {
    if (courseId) {
      const fetchBatches = async () => {
        const data = await LiveClassAPI.getBatchesByCourseProviderId(courseId);
        setBatches(data);
      };
      fetchBatches();
    }
  }, [courseId]);

  return (
    <>
      <Modal
        aria-labelledby="create-live-class-modal-title"
        aria-describedby="create-live-class-modal-description"
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 900,
              height: 700,
              overflowY: "auto",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 4px 0px #205EFF26",
              p: 4,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
                height: "100%",
                // padding: "20px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "24px",
                  color: "#2059EE",
                  fontWeight: "bold",
                }}
              >
                Create Live Class
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmitData}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                {/* Title  */}
                <TextField
                  label="Title"
                  size="small"
                  placeholder="SQL Class"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                {/* course name and batch name */}
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Course Name*
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Course Name"
                      value={courseId}
                      required
                      onChange={(e) => setCourseId(e.target.value as number)}
                    >
                      {courseProviderCourses.map((course: any) => (
                        <MenuItem key={course.id} value={course.id}>
                          {course.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Batch Name*
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Batch Name"
                      value={batchId}
                      required
                      onChange={(e) => setBatchId(e.target.value as number)}
                    >
                      {batches.map((batch: any) => (
                        <MenuItem key={batch.id} value={batch.id}>
                          {batch.title}
                        </MenuItem>
                      ))}

                      {batches.length === 0 && (
                        <MenuItem value={0}>No Batches Found</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>

                {/* Start Date */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date*"
                    value={dateTimeData.startDate}
                    disablePast
                    onChange={(date) => {
                      setDateTimeData({ ...dateTimeData, startDate: date });
                      setErrorField({ ...errorField, startDate: null });
                    }}
                  />
                  {errorField.startDate && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#FF0000",
                      }}
                    >
                      {errorField.startDate}
                    </Typography>
                  )}
                </LocalizationProvider>
                {/* End Date */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date*"
                    value={dateTimeData.endDate}
                    disablePast
                    onChange={(date) => {
                      setDateTimeData({ ...dateTimeData, endDate: date });
                      setErrorField({ ...errorField, endDate: null });
                    }}
                  />
                  {errorField.endDate && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#FF0000",
                      }}
                    >
                      {errorField.endDate}
                    </Typography>
                  )}
                </LocalizationProvider>
                {/* start Time  */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    label="Start Time*"
                    format="HH:mm:ss"
                    value={dateTimeData.startTime}
                    onChange={(time) => {
                      setDateTimeData({ ...dateTimeData, startTime: time });
                      setErrorField({ ...errorField, startTime: null });
                    }}
                  />
                  {errorField.startTime && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#FF0000",
                      }}
                    >
                      {errorField.startTime}
                    </Typography>
                  )}
                </LocalizationProvider>
                {/* duration  */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField
                    label="Duration*"
                    format="HH:mm:ss"
                    value={dateTimeData.duration}
                    onChange={(time) => {
                      setDateTimeData({ ...dateTimeData, duration: time });
                      setErrorField({ ...errorField, duration: null });
                    }}
                  />
                  {errorField.duration && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#FF0000",
                      }}
                    >
                      {errorField.duration}
                    </Typography>
                  )}
                </LocalizationProvider>
                {/* reccurrence */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Recurrence Type*
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Recurrence Type"
                    value={formData.recurrence_type}
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        recurrence_type: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"not_repeating"}>Non Repeating</MenuItem>
                    <MenuItem value={"day"}>Day</MenuItem>
                    <MenuItem value={"week"}>Week</MenuItem>
                    <MenuItem value={"month"}>Month</MenuItem>
                  </Select>
                </FormControl>
                {/* week days  */}
                {formData.recurrence_type === "week" && (
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.week_days[0]}
                          onChange={handleCheckboxChange(0)}
                        />
                      }
                      label="Monday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.week_days[1]}
                          onChange={handleCheckboxChange(1)}
                        />
                      }
                      label="Tuesday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.week_days[2]}
                          onChange={handleCheckboxChange(2)}
                        />
                      }
                      label="Wednesday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.week_days[3]}
                          onChange={handleCheckboxChange(3)}
                        />
                      }
                      label="Thursday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.week_days[4]}
                          onChange={handleCheckboxChange(4)}
                        />
                      }
                      label="Friday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.week_days[5]}
                          onChange={handleCheckboxChange(5)}
                        />
                      }
                      label="Saturday"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.week_days[6]}
                          onChange={handleCheckboxChange(6)}
                        />
                      }
                      label="Sunday"
                    />
                  </FormGroup>
                )}

                {/* footer  */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    mb: "20px",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#2059EE",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#2059EE",
                        color: "#fff",
                      },
                    }}
                  >
                    Create
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#2059EE",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#2059EE",
                        color: "#fff",
                      },
                    }}
                    onClick={() => {
                      props.close();
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        draggable
        theme="dark"
      />
    </>
  );
};

export default CreateLiveClassModal;
