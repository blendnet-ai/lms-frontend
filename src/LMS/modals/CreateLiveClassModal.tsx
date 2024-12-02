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
import dayjs, { Dayjs } from "dayjs";
import { BatchCard, CoursesCard } from "../components/Cards";

type CreateLiveClassModalProps = {
  open: boolean;
  close: () => void;
  submit: () => void;
};

const CreateLiveClassModal = (props: CreateLiveClassModalProps) => {
  const [formData, setFormData] = useState<any>({
    title: "",
    recurrence_type: "",
    week_days: [false, false, false, false, false, false, false],
  });

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs("2024-11-01"));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs("2024-11-01"));
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs("2024-11-01"));
  const [duration, setDuration] = useState<Dayjs | null>(dayjs("2024-11-01"));

  const handleCheckboxChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevState: any) => {
        const week_days = [...prevState.week_days];
        week_days[index] = e.target.checked;
        return { ...prevState, week_days };
      });
    };

  const formatDate = (date: Date): string => {
    return date.toISOString().slice(0, 10);
  };

  const handleSubmitData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const refactoredFormData = {
      batch_ids: [batchId],
      title: formData.title,
      start_date: formatDate(startDate!.toDate()),
      end_date: formatDate(endDate!.toDate()),
      start_time: startTime!.format("HH:mm:ss"),
      duration: duration!.format("HH:mm:ss"),
      recurrence_type: formData.recurrence_type,
      weekday_schedule: formData.week_days,
    };

    try {
      const response = await LiveClassAPI.createLiveClasses(refactoredFormData);
      console.log(response);
      if (response.batches_allocated.length > 0) {
        toast.success("Live class created successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        props.submit();
      } else {
        toast.error("Error submitting data", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        props.close();
      }
    } catch (error) {
      toast.error("Error submitting data", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      props.close();
    } finally {
      props.close();
    }
  };

  const [courseProvider, setCourseProvider] = useState({} as CourseProvider);
  const [courseProviderCourses, setCourseProviderCourses] = useState([]);
  const [courseId, setCourseId] = useState<number | null>(null);
  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState<number | null>(null);

  // Fetch course provider
  useEffect(() => {
    const fetchCourseProvider = async () => {
      const data = await LiveClassAPI.getCourseProvider();
      setCourseProvider(data);
    };
    fetchCourseProvider();
  }, []);

  // Fetch courses for course provider
  useEffect(() => {
    if (courseProvider.id) {
      const fetchCourseProviderCourses = async () => {
        const data = await LiveClassAPI.getCoursesForCourseProvider(
          courseProvider.id
        );
        setCourseProviderCourses(data);
      };
      fetchCourseProviderCourses();
    }
  }, [courseProvider]);

  // Fetch batches by course provider id
  useEffect(() => {
    const fetchBatchesByCourseProviderId = async () => {
      if (courseId) {
        const data = await LiveClassAPI.getBatchesByCourseProviderId(courseId);
        console.log(data);
        setBatches(data);
      }
    };
    fetchBatchesByCourseProviderId();
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
            {batchId !== null && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "100%",
                  // padding: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "24px",
                      color: "#2059EE",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    Create Live Class
                  </Typography>

                  {/* back button to clear batchId and show courses */}
                  <Button
                    variant="text"
                    sx={{
                      color: "#2059EE",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      setCourseId(null);
                      setBatchId(null);
                      setBatches([]);
                    }}
                  >
                    Back
                  </Button>
                </Box>
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
                  {/* category  */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Posted As
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Posted As"
                    >
                      <MenuItem value={0}>Live Class</MenuItem>
                    </Select>
                  </FormControl>
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
                  {/* Start Date */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </LocalizationProvider>
                  {/* End Date */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                    />
                  </LocalizationProvider>
                  {/* start Time  */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                      label="Start Time"
                      format="HH:mm:ss"
                      value={startTime}
                      onChange={(time) => setStartTime(time)}
                    />
                  </LocalizationProvider>
                  {/* duration  */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                      label="Duration"
                      format="HH:mm:ss"
                      value={duration}
                      onChange={(time) => setDuration(time)}
                    />
                  </LocalizationProvider>
                  {/* reccurrence */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Recurrence Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Recurrence Type"
                      value={formData.recurrence_type}
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
                </Box>
              </Box>
            )}

            {/* Cards */}
            {batches.length === 0 && courseProviderCourses && (
              <Box
                sx={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                {courseProviderCourses.map((course: any) => (
                  <CoursesCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    code={course.code}
                    setProviderId={(id: number) => setCourseId(id)}
                  />
                ))}
              </Box>
            )}

            {/* Batches */}
            {!batchId && batches && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                {batches.map((batch: any) => (
                  <BatchCard
                    key={batch.id}
                    id={batch.id}
                    title={batch.title}
                    openModal={() => {}}
                    setIdOfBatch={setBatchId}
                  />
                ))}
              </Box>
            )}
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
