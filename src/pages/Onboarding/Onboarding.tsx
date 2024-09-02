import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  MobileStepper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import OnboardingAPI, { Form, Section } from "../../apis/OnboardingAPI";
import { printIdToken } from "../../configs/firebase";

function Onboarding() {
  const [form, setForm] = useState<Form | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = methods;

  useEffect(() => {
    (async () => {
      const form = await OnboardingAPI.getOnboardingData();
      setForm(form);
    })();
    printIdToken();
  }, []);

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!form) return;
    const values = getValues(); // This fetches all current values from the form

    // Create a JSON structure that includes both the original field definitions and the values submitted by the user
    const submissionData: Section[] = form.sections.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({
        ...field,
        value: values[field.name], // Append the user-entered value for each field
      })),
    }));

    // Now `submissionData` contains the original form structure with user values included
    console.log(JSON.stringify(submissionData)); // Log or send this data to a server

    try {
      const data = await OnboardingAPI.submitOnboardingData({
        sections: submissionData,
      });
      if (data) {
        navigate(`/dashboard`, { replace: true });
        window.location.reload();
      }
    } catch (error) {
      setSubmissionError(
        `${values["onboarding_code"]} is an invalid onboarding code.`
      );
    }
  };

  const handleNext = async () => {
    if (!form) return;
    const isStepValid = await trigger(
      form?.sections[activeStep].fields.map((field) => field.name)
    );
    if (isStepValid) {
      console.log(activeStep);
      if (activeStep === form.sections.length - 1) {
        handleSubmit(onSubmit)();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [submissionError, setSubmissionError] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflowY: "scroll",
        padding: "1rem",
      }}
    >
      {form && (
        <Box sx={{ flexGrow: 1 }}>
          <MobileStepper
            steps={form.sections.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              activeStep === form.sections.length - 1 ? (
                <Button size="small" onClick={handleNext}>
                  Submit
                </Button>
              ) : (
                <Button size="small" onClick={handleNext}>
                  Next
                  <KeyboardArrowRight />
                </Button>
              )
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
          <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                {form.sections[activeStep].heading}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  color: "#6B7280",
                  fontWeight: "400",
                }}
              >
                {form.sections[activeStep].description}
              </Typography>
            </Box>
            <FormProvider {...methods}>
              {form.sections[activeStep].fields.map((field, index) => (
                <Controller
                  key={index.toString() + activeStep.toString()}
                  name={field.name}
                  control={control}
                  rules={
                    field.type !== "phone"
                      ? {
                          required: field.required
                            ? `${field.label} is required`
                            : undefined,
                        }
                      : {
                          required: field.required
                            ? `${field.label} is required`
                            : undefined,
                          minLength: 10,
                          maxLength: 10,
                        }
                  }
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
                      fullWidth: true,
                      margin: "normal" as const, // Explicitly setting the type as 'normal'
                      variant: "outlined" as const, // Similarly, explicitly setting variant
                    };

                    switch (field.type) {
                      case "text":
                        return <TextField {...commonProps} size="small" />;
                      case "phone":
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "8px",
                            }}
                          >
                            <TextField
                              value={"+91"}
                              disabled
                              margin="normal"
                              style={{ width: "70px" }}
                              size="small"
                            />
                            <TextField
                              type="number"
                              size="small"
                              inputProps={{
                                inputMode: "numeric",
                              }}
                              {...commonProps}
                            />
                          </Box>
                        );
                      case "select":
                        return (
                          <TextField {...commonProps} select>
                            {field.options?.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </TextField>
                        );
                      case "radio-with-other":
                        return (
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: "600",
                                fontSize: "16px",
                                marginTop: "5px",
                              }}
                            >
                              {field.label + (field.required ? "*" : "")}
                            </Typography>
                            <Typography
                              style={
                                error ? { border: "1px solid #d3302f" } : {}
                              }
                            >
                              <RadioGroup {...commonProps}>
                                {field.options?.map((option) => (
                                  <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                  />
                                ))}
                                <FormControlLabel
                                  key="other"
                                  value={"other"}
                                  control={<Radio />}
                                  label={
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "8px",
                                      }}
                                    >
                                      <Typography>Other</Typography>
                                      <TextField
                                        required
                                        id="other"
                                        disabled={value !== "other"}
                                        variant="standard"
                                        style={{ zIndex: 999 }}
                                      />
                                    </Box>
                                  }
                                />
                              </RadioGroup>
                            </Typography>
                            {error && (
                              <FormHelperText error={true}>
                                {error.message}
                              </FormHelperText>
                            )}
                          </Box>
                        );
                      case "checkbox-with-other":
                        return (
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: "600",
                                fontSize: "16px",
                                marginTop: "5px",
                              }}
                            >
                              {field.label + (field.required ? "*" : "")}
                            </Typography>
                            <Typography
                              style={
                                error ? { border: "1px solid #d3302f" } : {}
                              }
                            >
                              {field.options?.map((option) => (
                                <FormControlLabel
                                  key={index}
                                  control={
                                    <Checkbox
                                      checked={value?.includes(option)}
                                      onChange={(e) => {
                                        console.log(value);
                                        const checked = e.target.checked;
                                        const currentValue = value || [];
                                        const newValue = checked
                                          ? [...currentValue, option]
                                          : currentValue.filter(
                                              (v: any) => v !== option
                                            );
                                        onChange(newValue);
                                      }}
                                    />
                                  }
                                  label={option}
                                />
                              ))}
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={value?.includes("other")}
                                    onChange={(e) => {
                                      console.log(value);
                                      const checked = e.target.checked;
                                      const currentValue = value || [];
                                      const newValue = checked
                                        ? [...currentValue, "other"]
                                        : currentValue.filter(
                                            (v: any) => v !== "other"
                                          );
                                      onChange(newValue);
                                    }}
                                  />
                                }
                                value={"other"}
                                label={
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "8px",
                                    }}
                                  >
                                    <Typography>Other</Typography>
                                    <TextField
                                      required
                                      id="other"
                                      disabled={value !== "other"}
                                      variant="standard"
                                      style={{ zIndex: 999 }}
                                    />
                                  </Box>
                                }
                              />
                            </Typography>
                            {error && (
                              <FormHelperText error={true}>
                                {error.message}
                              </FormHelperText>
                            )}
                          </Box>
                        );

                      default:
                        return <TextField {...commonProps} />;
                    }
                  }}
                />
              ))}
            </FormProvider>
            <Typography color="error" variant="body2">
              {submissionError}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Onboarding;
