import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Panel } from "react-resizable-panels";
import { FaBug } from "react-icons/fa";
import DifficultyChip, {
  Difficulty,
} from "../../DifficultyChip/DifficultyChip";
import { ExpandMore } from "@mui/icons-material";
import Tag from "./Tag";
import { useEffect, useState } from "react";
import DSAPracticeAPI from "../../../apis/DSAPracticeAPI";
import { useSearchParams } from "react-router-dom";

type LeftPanelProps = {
  title: string;
  question: string;
  questionId: number;
  visible: boolean;
  difficulty: Difficulty;
  topics: string[];
  companies: string[];
};

export default function LeftPanel(props: LeftPanelProps) {
  const [searchParams] = useSearchParams();
  const [assessmentId, setAssessmentId] = useState(0);

  useEffect(() => {
    setAssessmentId(parseInt(searchParams.get("assessment_id") || "0"));
  }, [searchParams]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [openSelectiveModal, setOpenSelectiveModal] = useState(false);
  const handleOpenSelectiveModal = () => {
    handleCloseModal();
    setOpenSelectiveModal(true);
  };

  const handleCloseSelectiveModal = () => setOpenSelectiveModal(false);

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
      props.questionId
    );

    const response = await data;
    console.log(response);

    handleCloseSelectiveModal();
  };

  return (
    <Panel
      style={{
        display: props.visible ? "inline" : "none",
      }}
    >
      <Box
        sx={{
          padding: "6px",
        }}
      >
        <DifficultyChip difficulty={props.difficulty} />
      </Box>

      <Box
        sx={{
          padding: "10px 30px 10px 30px",
          borderRadius: "10px",
          border: "1px solid #CFE4FF",
          backgroundColor: "white",
          overflowY: "scroll",
          height: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#2059EE", fontWeight: "550" }}>
            #{props.questionId} {props.title}
          </h2>

          <Tooltip title="Report a bug" placement="top" arrow>
            <IconButton
              aria-label="report a bug"
              sx={{ color: "black" }}
              onClick={handleOpenModal}
            >
              <FaBug style={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
        <div
          dangerouslySetInnerHTML={{
            __html: props.question,
          }}
        />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              fontWeight: "bold",
            }}
          >
            Company
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {props.companies.map((company) => (
              <Tag text={company} />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            marginBottom: "40px",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              fontWeight: "bold",
            }}
          >
            Topic
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {props.topics.map((topic) => (
              <Tag text={topic} />
            ))}
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Report Modal  */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
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
            <Typography variant="body1" component="p" sx={{}}>
              Here is some Troubleshooting Advice for various scenarios:
            </Typography>

            {/* scenarios */}
            <ol
              style={{
                fontWeight: "bold",
              }}
            >
              <li>
                Code is working as expected on Compile & Run but failing on
                submission.
                <ul
                  style={{
                    fontWeight: "normal",
                  }}
                >
                  <li>
                    Avoid using static/global variables in your code as your
                    code is tested against multiple test cases and these tend to
                    retain their previous values.
                  </li>
                  <li>
                    Do not print anything unless mentioned in the problem
                    statement. Avoid unnecessary new line characters.
                  </li>
                </ul>
              </li>

              <li>
                Software related troubleshooting.
                <ul
                  style={{
                    fontWeight: "normal",
                  }}
                >
                  <li>Make sure you are not using ad-blockers.</li>
                  <li>Keep your browser updated.</li>
                </ul>
              </li>
            </ol>

            <Typography variant="body1" component="p">
              <Typography
                component="span"
                sx={{
                  color: "#2059EE",
                  cursor: "pointer",
                }}
                onClick={handleOpenSelectiveModal}
              >
                Click here
              </Typography>{" "}
              if you still have something to report/suggest.
            </Typography>
          </Box>

          {/* Footer  */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            <Button
              onClick={handleCloseModal}
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
          </Box>
        </Box>
      </Modal>

      {/* Selective Modal  */}
      <Modal
        open={openSelectiveModal}
        onClose={handleCloseSelectiveModal}
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
              onClick={handleCloseSelectiveModal}
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
    </Panel>
  );
}
