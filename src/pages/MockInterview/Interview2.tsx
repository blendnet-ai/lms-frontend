import {
  Box,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import React from "react";
import { images } from "../../assets";
import data from "./sections.json";
import { Controller, FormProvider, useForm } from "react-hook-form";

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

const Interview = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const methods = useForm();
  const { control, handleSubmit, getValues, trigger } = methods;

  const submitForm = () => {
    const values = getValues(); // Fetch all current form values
    const submissionData = data.data.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({
        ...field,
        value: values[field.name],
      })),
    }));
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
      } else {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
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
      {/* stepper  */}
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
          sx={{
            display: activeStep === 0 ? "none" : "block",
            color: "black",
            mr: 2,
          }}
        >
          Back
        </Button>
        <Stepper activeStep={activeStep} sx={{ flexGrow: 1 }}>
          {data.data.map((step) => (
            <Step key={step.id}>
              <StepLabel>{step["name"]}</StepLabel>
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

      {/* content */}
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
        {/* Heading  */}
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
          {data.data[activeStep].name}
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
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "20px",
              padding: "20px",
            }}
          >
            <CardMedia
              component="img"
              image={stepsData[activeStep].image}
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
              {stepsData[activeStep].description}
            </Typography>
          </Box>

          <Box
            component={"form"}
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
            {data.data[activeStep].display === "flex" ? (
              <Box>
                <FormProvider {...methods}>
                  {data.data[activeStep].fields.map((field, index) => (
                    <Controller
                      key={index.toString() + activeStep.toString()}
                      name={field.name}
                      control={control}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => {
                        const commonProps = {
                          label: field.label,
                          onChange,
                          onBlur,
                          value,
                          error: !!error,
                          helperText: error ? error.message : null,
                          margin: "normal" as const,
                          variant: "outlined" as const,
                          fullWidth: true,
                        };

                        switch (field.type) {
                          case "select":
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

                                <FormControl
                                  fullWidth
                                  sx={{
                                    minWidth: "400px",
                                  }}
                                  error={!!error}
                                >
                                  <InputLabel id={field.label}>
                                    {field.label}
                                  </InputLabel>

                                  <Select
                                    id={field.label}
                                    value={field.value}
                                    label={field.label}
                                    required={field.required}
                                    onChange={onChange}
                                  >
                                    {field.options?.map((option) => (
                                      <MenuItem
                                        key={option.id}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {error && (
                                    <Typography color="error">
                                      {error.message}
                                    </Typography>
                                  )}
                                </FormControl>
                              </Box>
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
                                  role={undefined}
                                  tabIndex={-1}
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
                                    onChange={(event) =>
                                      console.log(event.target.files)
                                    }
                                    required={field.required}
                                  />
                                </Button>
                              </Box>
                            );
                          case "display-text":
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
                              </Box>
                            );
                          default:
                            return <TextField {...commonProps} />;
                        }
                      }}
                    />
                  ))}
                </FormProvider>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <FormProvider {...methods}>
                  {data.data[activeStep].fields.map((field, index) => (
                    <Controller
                      key={index.toString() + activeStep.toString()}
                      name={field.name}
                      control={control}
                      render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                      }) => {
                        const commonProps = {
                          label: field.label,
                          onChange,
                          onBlur,
                          value,
                          error: !!error,
                          helperText: error ? error.message : null,
                          margin: "normal" as const,
                          variant: "outlined" as const,
                          fullWidth: true,
                        };

                        switch (field.type) {
                          case "select":
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

                                <FormControl
                                  fullWidth
                                  sx={{
                                    minWidth: "400px",
                                  }}
                                >
                                  <InputLabel id={field.label}>
                                    {field.label}
                                  </InputLabel>

                                  <Select
                                    labelId={field.label}
                                    id={field.label}
                                    value={field.value}
                                    label={field.label}
                                    fullWidth
                                  >
                                    {field.options?.map((option) => (
                                      <MenuItem value={option.value}>
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Box>
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
                                  role={undefined}
                                  tabIndex={-1}
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
                                    onChange={(event) =>
                                      console.log(event.target.files)
                                    }
                                  />
                                </Button>
                              </Box>
                            );

                          default:
                            return <TextField {...commonProps} />;
                        }
                      }}
                    />
                  ))}
                </FormProvider>
              </Box>
            )}

            {/* submit button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                mr: "auto",
              }}
            >
              <Button
                size="large"
                type="submit"
                sx={{
                  color: "white",
                  padding: "10px 30px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(180deg, #2059EE 0%, #6992FF 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(180deg, #2059EE 0%, #6992FF 100%)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    textTransform: "none",
                  }}
                >
                  {activeStep === data.data.length - 1 ? "Submit" : "Next"}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Interview;
