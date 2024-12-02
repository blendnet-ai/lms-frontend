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
  TimeField,
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

const EditLiveClassModal = (props: EditLiveClassModalProps) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [duration, setDuration] = useState<Dayjs | null>(null);

  const formatDate = (date: Date): string => {
    return date.toISOString().slice(0, 10);
  };

  const handleSubmitData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!startDate || !startTime || !duration) {
      toast.error("Please fill all the fields", { theme: "dark" });
      return;
    }

    const refactoredFormData = {
      start_date: formatDate(startDate!.toDate()),
      start_time: startTime!.format("HH:mm:ss"),
      duration: duration!.format("HH:mm:ss"),
    };

    try {
      const response = await LiveClassAPI.updateLiveClass(
        refactoredFormData,
        Number(props.meetingId)
      );
      if (response.message) {
        props.close();
        setStartDate(null);
        setStartTime(null);
        setDuration(null);
        setTimeout(() => {
          toast.success("Live class updated successfully", { theme: "dark" });
        }, 500);
        props.isLiveClassUpdated(true);
      } else {
        throw new Error("Error submitting data");
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
                    label="Start Date"
                    value={startDate}
                    disablePast
                    onChange={(date) => setStartDate(date)}
                  />
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
