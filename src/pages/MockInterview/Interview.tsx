import React from "react";
import {
  Box,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { images } from "../../assets";
import data from "./sections.json";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Hidden input style for file upload
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Interview = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const [interviewType, setInterviewType] = React.useState("");

  const methods = useForm();
  const { control, handleSubmit, getValues, trigger } = methods;

  const stepsData = [
    {
      id: 1,
      description:
        "Hi Vidya, please upload your latest resume so that we can personalize your interview experience",
      image: images.interviewDisha,
    },
    {
      id: 2,
      description:
        "Please select the company and role you want to interview for.",
      image: images.interviewDisha,
    },
    {
      id: 3,
      description: "Please read Instructions carefully.",
      image: images.interviewDisha,
    },
  ];

  const submitForm = () => {
    const values = getValues(); // Fetch all current form values
    const submissionData = data.data.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({
        ...field,
        value: values[field.name],
      })),
    }));

    // Get interview type from data and navigate to respective page
    const interviewType = submissionData[1].fields[0].value;
    setInterviewType(interviewType);
    console.log("Interview Type:", interviewType);
    console.log("Final Submission Data:", JSON.stringify(submissionData));
  };

  const handleNext = async () => {
    const isStepValid = await trigger(
      data.data[activeStep].fields.map((field) => field.name)
    );
    console.log("isStepValid", isStepValid);
    if (isStepValid) {
      if (activeStep === data.data.length - 1) {
        submitForm();
        navigate(`/mock-interview/behavioural`, { replace: true });
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderField = (field, index) => {
    const commonProps = {
      label: field.label,
      control,
      key: `${index}-${activeStep}`,
      value: field.value,
    };

    switch (field.type) {
      case "select":
        return (
          <Controller
            name={field.name}
            {...commonProps}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {field.placeholder}
                </Typography>
                <FormControl fullWidth variant="outlined" error={!!error}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    value={field.value}
                    onChange={(e: SelectChangeEvent) =>
                      onChange(e.target.value)
                    }
                    label={field.label}
                    required={field.required}
                    sx={{ minWidth: "400px" }}
                  >
                    {field.options?.map((option) => (
                      <MenuItem key={option.id} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {error && (
                    <Typography color="error">{error.message}</Typography>
                  )}
                </FormControl>
              </Box>
            )}
          />
        );
      case "file-upload":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {field.placeholder}
            </Typography>

            <Button
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #2059EE",
                padding: "10px 20px",
                width: "fit-content",
              }}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => console.log(e.target.files)}
                required={field.required}
              />
            </Button>
          </Box>
        );
      case "display-text":
        return <Typography>{field.placeholder}</Typography>;
      default:
        return <TextField {...commonProps} />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        backgroundColor: "#EFF6FF",
      }}
    >
      {/* Stepper Navigation */}
      <Box
        sx={{
          display: "flex",
          padding: "20px",
          width: "60%",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ display: activeStep ? "block" : "none", color: "black", mr: 2 }}
        >
          Back
        </Button>
        <Stepper activeStep={activeStep} sx={{ flexGrow: 1 }}>
          {data.data.map((step) => (
            <Step key={step.id}>
              <StepLabel>{step.name}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Button
          onClick={handleNext}
          sx={{
            display: activeStep === data.data.length - 1 ? "none" : "block",
            color: "black",
            ml: 2,
          }}
        >
          Next
        </Button>
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "60%",
          mx: "auto",
          mt: "20px",
          backgroundColor: "white",
          boxShadow: "0px 4px 4px 0px #00000040",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            mt: "20px",
            mb: "20px",
            color: "#205EFF",
          }}
        >
          {data.data[activeStep]?.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "min-content",
            minWidth: "750px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "20px",
              padding: "20px",
            }}
          >
            <CardMedia
              component="img"
              image={stepsData[activeStep]?.image}
              alt="avatar"
              sx={{ width: 150, height: 150, borderRadius: "15px" }}
            />
            <Typography
              sx={{
                fontSize: "16px",
                border: "2px solid #CFE4FF",
                borderRadius: "0px 10px 10px 10px",
                padding: "10px",
                width: "100%",
                mb: "20px",
                backgroundColor: "#EFF6FF",
              }}
            >
              {stepsData[activeStep]?.description}
            </Typography>
          </Box>

          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(handleNext)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                mr: "auto",
                padding: "20px",
                mb: "40px",
              }}
            >
              {data.data[activeStep]?.display === "flex" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {data.data[activeStep]?.fields.map((field, index) =>
                    renderField(field, index)
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                  }}
                >
                  {data.data[activeStep]?.fields.map((field, index) =>
                    renderField(field, index)
                  )}
                </Box>
              )}
              <Button
                type="submit"
                size="large"
                sx={{
                  color: "white",
                  padding: "10px 30px",
                  borderRadius: "10px",
                  backgroundColor: "#205EFF",
                  "&:hover": {
                    backgroundColor: "#205EFF",
                  },
                }}
              >
                {activeStep === data.data.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default Interview;
