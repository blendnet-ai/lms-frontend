import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  MobileStepper,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

type modalProps = {
  open: boolean;
  close: () => void;
  failedTestCases: any[];
};

export default function ShowFailedTestCases(props: modalProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = props.failedTestCases.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    console.log(props.failedTestCases);
  }, [props.failedTestCases]);

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={props.open}
      onClose={props.close}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={props.open}>
        <Box
          component={"form"}
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100",
            maxWidth: "600px",
            maxHeight: "600px",
            backgroundColor: "white",
            boxShadow: 24,
            borderRadius: "10px",
            padding: "2rem",
          }}
        >
          {/* top right close button */}
          <IconButton
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "black",
            }}
            onClick={props.close}
          >
            <CloseIcon />
          </IconButton>

          {/* main content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "1rem",
              height: "100%",
            }}
          >
            {props.failedTestCases.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  pb: "0.5rem",
                  height: "100%",
                }}
              >
                {/* title */}
                <Typography
                  sx={{
                    fontSize: "1.5rem",
                    mb: "1rem",
                    color: "red",
                  }}
                >
                  Test Case {activeStep + 1}
                </Typography>

                {/* if error_type */}
                {props.failedTestCases[activeStep].error_type && (
                  <Typography>
                    <strong>Error Type:</strong>{" "}
                    {props.failedTestCases[activeStep].error_type}
                  </Typography>
                )}

                {/* if error */}
                {props.failedTestCases[activeStep].error && (
                  <Typography>
                    <strong>Error:</strong>{" "}
                    {props.failedTestCases[activeStep].error}
                  </Typography>
                )}

                {/* inputs */}
                {props.failedTestCases[activeStep].inputs && (
                  <Typography>
                    <strong>Inputs:</strong>{" "}
                    {props.failedTestCases[activeStep].inputs}
                  </Typography>
                )}

                {/* output */}
                {props.failedTestCases[activeStep].output && (
                  <Typography>
                    <strong>Output:</strong>{" "}
                    {props.failedTestCases[activeStep].output}
                  </Typography>
                )}

                {/* expected */}
                {props.failedTestCases[activeStep].expected && (
                  <Typography>
                    <strong>Expected:</strong>{" "}
                    {props.failedTestCases[activeStep].expected}
                  </Typography>
                )}
              </Box>
            )}
          </Box>

          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: "100%", flexGrow: 1 }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </Fade>
    </Modal>
  );
}
