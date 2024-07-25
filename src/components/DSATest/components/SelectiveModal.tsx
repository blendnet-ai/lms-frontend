import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DSAPracticeAPI from "../../../apis/DSAPracticeAPI";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SelectiveModal({
  openModal,
  closeModal,
  questionId,
}: {
  openModal: boolean;
  closeModal: () => void;
  questionId: number;
}) {
  const [searchParams] = useSearchParams();
  const [assessmentId, setAssessmentId] = useState(0);

  useEffect(() => {
    setAssessmentId(parseInt(searchParams.get("assessment_id") || "0"));
  }, [searchParams]);

  const [issueValue, setIssueValue] = useState("");
  const [issueDetails, setIssueDetails] = useState("");
  const [error, setError] = useState(false);

  const handleChangeIssue = (event: SelectChangeEvent) => {
    setIssueValue(event.target.value as string);
    setError(false);
  };

  const submitIssue = async () => {
    // check if the issue type and details are filled
    if (issueValue == null || issueDetails === "") {
      setError(true);
      return;
    }

    // send the issue to the backend
    const data = DSAPracticeAPI.postIssue(
      assessmentId,
      issueValue,
      issueDetails,
      questionId
    );

    const response = await data;
    if (response) {
      // close the modal and clear the fields
      closeModal();
      setIssueValue("");
      setIssueDetails("");

      // show a toast
      toast.success("Issue reported successfully");
    } else {
      toast.error("Failed to report issue");
    }
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid grey",
              padding: "10px",
            }}
          >
            <Typography variant="h6" component="h2">
              Want to report an issue?
            </Typography>
          </Box>

          {/* content  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "30px",
              borderBottom: "1px solid grey",
            }}
          >
            {/* scenerios  */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <Typography variant="body1" component="p" sx={{}}>
                <strong> Examples of Software related issues :</strong> related
                to Marks, Videos, UI related etc.
              </Typography>
              <Typography variant="body1" component="p" sx={{}}>
                <strong> Examples of Content related issues :</strong> related
                to Problem Statement, Difficulty, Test Cases, Run Time or
                Compilation Errors, Wrong Answer etc..
              </Typography>
            </Box>

            {/* actions  */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Issue Type */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Issue Type:{" "}
                  <strong
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </strong>
                </Typography>
                <FormControl
                  size="small"
                  sx={{
                    maxWidth: "360px",
                  }}
                >
                  <InputLabel id="issue-select">
                    Select the type of issue
                  </InputLabel>
                  <Select
                    labelId="issue-select-label"
                    id="issue-select"
                    value={issueValue}
                    label="Select the type of issue"
                    onChange={handleChangeIssue}
                  >
                    <MenuItem value={0}>Software Related Issue</MenuItem>
                    <MenuItem value={1}>Content Related Issue</MenuItem>
                    <MenuItem value={2}>Others Issue</MenuItem>
                  </Select>
                </FormControl>
                {error && issueValue === "" && (
                  <Typography
                    sx={{
                      color: "red",
                    }}
                  >
                    Please select an issue type
                  </Typography>
                )}
              </Box>

              {/* Details */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Describe Your Issue:{" "}
                  <strong
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </strong>
                </Typography>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Details"
                  value={issueDetails}
                  onChange={(e) => setIssueDetails(e.target.value)}
                  multiline
                  rows={4}
                />
                {error && issueDetails === "" && (
                  <Typography
                    sx={{
                      color: "red",
                    }}
                  >
                    Please describe your issue
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* Footer  */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
              gap: "10px",
            }}
          >
            {/* close  */}
            <Button
              onClick={closeModal}
              variant="contained"
              sx={{
                backgroundColor: "grey",
                color: "white",
                "&:hover": {
                  backgroundColor: "grey",
                  color: "white",
                },
              }}
            >
              Close
            </Button>

            {/* send  */}
            <Button
              variant="contained"
              onClick={submitIssue}
              sx={{
                backgroundColor: "#2059EE",
                color: "white",
                "&:hover": {
                  backgroundColor: "#2059EE",
                  color: "white",
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}
