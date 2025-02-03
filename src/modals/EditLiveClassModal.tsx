import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LiveClassAPI from "../apis/LiveClassAPI";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

type EditLiveClassModalProps = {
  open: boolean;
  close: () => void;
  submit: () => void;
  data: any;
  meetingId: string;
  isLiveClassUpdated: (value: boolean) => void;
};

interface ErrorField {
  startDate: string | null;
  startTime: string | null;
  duration: string | null;
}

const EditLiveClassModal = (props: EditLiveClassModalProps) => {
  // const [startDate, setStartDate] = useState<Dayjs | null>(null);
  // const [startTime, setStartTime] = useState<Dayjs | null>(null);
  // const [duration, setDuration] = useState<Dayjs | null>(null);

  const [dateTimeData, setDateTimeData] = useState<{
    startDate: Dayjs | null;
    startTime: Dayjs | null;
    duration: Dayjs | null;
  }>({
    startDate: null,
    startTime: null,
    duration: null,
  });

  const [errorField, setErrorField] = useState<ErrorField>({
    startDate: null,
    startTime: null,
    duration: null,
  });

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const validateFields = () => {
    const errors: ErrorField = {
      startDate: !dateTimeData.startDate ? "Start date is required" : null,
      startTime: !dateTimeData.startTime ? "Start time is required" : null,
      duration: !dateTimeData.duration ? "Duration is required" : null,
    };

    setErrorField(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmitData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateFields()) {
      return
    }

    const refactoredFormData = {
      start_date: formatDate(dateTimeData.startDate!.toDate()),
      start_time: dateTimeData.startTime!.format("HH:mm:ss"),
      duration: dateTimeData.duration!.format("HH:mm:ss"),
    };

    try {
      const response = await LiveClassAPI.updateLiveClass(
        refactoredFormData,
        Number(props.meetingId)
      );
      if (response.message) {
        props.close();
        setDateTimeData({
          startDate: null,
          startTime: null,
          duration: null,
        });
        setTimeout(() => {
          toast.success("Live class updated successfully", { theme: "dark" });
        }, 500);
        props.isLiveClassUpdated(true);
      } else {
        throw new Error("Error updating live class");
      }
    } catch (error) {
      toast.error("Error submitting data", { theme: "dark" });
    }
  };

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
              alignItems: "center",
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
                  Edit Live Class
                </Typography>
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
                {/* Title  */}
                <TextField
                  label="Title"
                  size="small"
                  placeholder="SQL Class"
                  type="text"
                  variant="outlined"
                  fullWidth
                  required
                  value={props.data.data?.title}
                  disabled
                />
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
                    value={dayjs(props.data.data?.end_date)}
                    label="End Date"
                    disabled
                  />
                </LocalizationProvider>
                {/* start Time  */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Start Time*"
                    value={dateTimeData.startTime}
                    views={["hours", "minutes", "seconds"]}
                    ampm={false}
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
                  <TimePicker
                    label="Duration*"
                    value={dateTimeData.duration}
                    views={["hours", "minutes", "seconds"]}
                    ampm={false}
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
                    Recurrence Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Recurrence Type"
                    value={props.data.data?.recurrence_type}
                    disabled
                  >
                    <MenuItem value={"not_repeating"}>Non Repeating</MenuItem>
                    <MenuItem value={"day"}>Day</MenuItem>
                    <MenuItem value={"week"}>Week</MenuItem>
                    <MenuItem value={"month"}>Month</MenuItem>
                  </Select>
                </FormControl>

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
                  Edit
                </Button>
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

export default EditLiveClassModal;