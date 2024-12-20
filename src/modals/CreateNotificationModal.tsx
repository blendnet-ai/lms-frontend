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
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState, useCallback } from "react";
import LiveClassAPI from "../apis/LiveClassAPI";

type CreateNotificationModalProps = {
  open: boolean;
  close: () => void;
};

type CourseProvider = {
  id: number;
  name: string;
};

type Course = {
  id: number;
  title: string;
};

type Batch = {
  id: number;
  title: string;
};

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
      alert("Please fill all the required fields.");
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

  const Dropdown = ({
    label,
    value,
    onChange,
    options,
    noDataMessage,
  }: {
    label: string;
    value: number | null;
    onChange: (event: any) => void;
    options: { id: number; title: string }[];
    noDataMessage: string;
  }) => (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value || ""} onChange={onChange} label="Course Name">
        {options.length > 0 ? (
          options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            {noDataMessage}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );

  return (
    <Modal
      aria-labelledby="instructions-modal-title"
      aria-describedby="instructions-modal-description"
      open={props.open}
      onClose={() => {
        if (!loading) props.close();
      }}
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
            width: "400px",
            maxWidth: "700px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 4px 0px #205EFF26",
            p: 4,
            borderRadius: 2,
          }}
        >
          <CloseIcon
            onClick={() => {
              if (!loading) props.close();
            }}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
          />

          <Typography
            id="instructions-modal-title"
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#000000",
              mb: 2,
            }}
          >
            Create Notification
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
            }}
          >
            <TextField
              id="outlined-multiline-static"
              label="Notification Message"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              sx={{ width: "100%" }}
            />

            <TextField
              id="outlined-basic"
              label="Subject"
              variant="outlined"
              sx={{ width: "100%" }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <Dropdown
              label="Course Name*"
              value={courseId}
              onChange={(e) => setCourseId(Number(e.target.value))}
              options={courseProviderCourses}
              noDataMessage="No Courses Found"
            />

            <Dropdown
              label="Batch Name*"
              value={batchId}
              onChange={(e) => setBatchId(Number(e.target.value))}
              options={batches}
              noDataMessage="No Batches Found"
            />

            <Button
              type="submit"
              sx={{
                padding: "10px 30px",
                fontSize: "18px",
                color: "#2059EE",
                backgroundColor: "#fff",
                border: "1px solid #2059EE",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "#2059EE",
                  color: "#fff",
                },
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              <Typography>
                {loading ? "Sending..." : "Send Notification"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateNotificationModal;
