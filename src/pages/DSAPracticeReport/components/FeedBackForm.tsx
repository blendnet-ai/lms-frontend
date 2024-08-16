import {
  Box,
  Button,
  FormControlLabel,
  MobileStepper,
  Radio,
  RadioGroup,
  Rating,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import FeedbackFormAPI, {
  Form,
  GetForm,
  Section,
} from "../../../apis/FeedBackFormAPI";

export default function FeedBackForm({
  data,
  assessmentId,
  setOpen,
  closeModal,
}: {
  data: GetForm;
  assessmentId: number;
  open: boolean;
  setOpen: (val: boolean) => void;
  closeModal: () => void;
}) {
  const [form, setForm] = useState<Form | null>(data.form);
  const [activeStep, setActiveStep] = useState(0);

  const handleCloseSnackBar = () => {
    setOpen(false);
  };

  const methods = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = methods;

  const onSubmit = async () => {
    if (!form) return;
    const values = getValues(); // This fetches all current values from the form

    // Create a JSON structure that includes both the original field definitions and the values submitted by the user
    const submissionData: Section[] = form.sections.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({
        ...field,
        value: values[field.name],
      })),
    }));

    // Now `submissionData` contains the original form structure with user values included
    console.log(JSON.stringify(submissionData)); // Log or send this data to a server

    try {
      const resp = await FeedbackFormAPI.submitForm({
        form_id: data.id,
        data: submissionData,
        assessment_id: assessmentId,
      });

      if (resp) {
        setOpen(true);
        closeModal();
      }
    } catch (error) {
      setSubmissionError(
        `${values["onboarding_code"]} is an invalid onboarding code.`
      );
    }
  };

  const handleNext = async () => {
    if (!form) return;

    // Get the current step's field names
    const fieldNames = form.sections[activeStep].fields.map(
      (field, index) => field.name
    );

    // Trigger validation
    const isStepValid = await trigger(fieldNames);

    if (isStepValid) {
      const currentValues = getValues();
      setForm((prevForm) => {
        if (!prevForm) return prevForm;
        const updatedSections = [...prevForm.sections];
        updatedSections[activeStep].fields.forEach((field) => {
          field.value = currentValues[field.name];
        });
        return { ...prevForm, sections: updatedSections };
      });

      if (activeStep === form.sections.length - 1) {
        handleSubmit(onSubmit)();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setSubmissionError(
        "Please fill out all required fields before proceeding."
      );
    }
  };

  const handleBack = () => {
    const currentValues = getValues();
    setForm((prevForm) => {
      if (!prevForm) return prevForm;
      const updatedSections = [...prevForm.sections];
      updatedSections[activeStep].fields.forEach((field, index) => {
        field.value = currentValues[`${activeStep}_${index}_${field.name}`];
      });
      console.log("Updated Sections: ", updatedSections);
      return { ...prevForm, sections: updatedSections };
    });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [submissionError, setSubmissionError] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "100%",
      }}
    >
      {form && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            height: "100%",
          }}
        >
          <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              overflowY: "auto",
              padding: "0px 30px",
            }}
          >
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {form.sections[activeStep].heading}
            </Typography>
            <FormProvider {...methods}>
              {form.sections[activeStep].fields.map((field, index) => (
                <Controller
                  key={index.toString() + activeStep.toString()}
                  name={field.name}
                  control={control}
                  rules={
                    field.required
                      ? { required: "This field is required" }
                      : undefined
                  }
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => {
                    const commonProps = {
                      label: field.label,
                      onBlur,
                      error: !!error,
                      helperText: error ? error.message : null,
                      fullWidth: true,
                      margin: "normal" as const,
                      variant: "outlined" as const,
                      value,
                      onChange,
                    };
                    switch (field.type) {
                      case "text":
                        return (
                          <TextField
                            multiline
                            rows={3}
                            {...commonProps}
                            sx={{
                              fontWeight: error ? "inherit" : "inherit",
                              color: error ? "#d3302f" : "inherit",
                            }}
                          />
                        );
                      case "text-multiline":
                        return (
                          <TextField
                            multiline
                            rows={4}
                            {...commonProps}
                            sx={{
                              fontWeight: error ? "inherit" : "inherit",
                              color: error ? "#d3302f" : "inherit",
                            }}
                          />
                        );
                      case "text-display":
                        return (
                          <Box>
                            {/* label  */}
                            <Typography>{field.label}</Typography>
                            {/* description */}
                            <Typography>
                              {field.description
                                ?.split("\n")
                                .map((line, index) => (
                                  <p key={index}>{line}</p>
                                ))}
                            </Typography>
                          </Box>
                        );
                      case "radio":
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: error ? "inherit" : "inherit",
                                color: error ? "#d3302f" : "inherit",
                              }}
                            >
                              {field.label}
                              {field.required && (
                                <span style={{ color: "red" }}> *</span>
                              )}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              {/* left Label  */}
                              <Typography
                                sx={{
                                  textAlign: "left",
                                  fontWeight: "bold",
                                  width: "40%",
                                }}
                              >
                                {field.leftLabel}
                              </Typography>
                              <RadioGroup
                                {...commonProps}
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                {field.options?.map((option) => (
                                  <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                  />
                                ))}
                              </RadioGroup>
                              {/* Right Label */}
                              <Typography
                                sx={{
                                  width: "40%",
                                  textAlign: "right",
                                  fontWeight: "bold",
                                }}
                              >
                                {field.rightLabel}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      case "radio-singleLine":
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "10px",
                              alignItems: "center",
                              justifyContent: "space-between",
                              backgroundColor: "lightgray",
                              padding: "0px 10px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: error ? "inherit" : "inherit",
                                color: error ? "#d3302f" : "inherit",
                              }}
                            >
                              {field.label}
                              {field.required && (
                                <span style={{ color: "red" }}> *</span>
                              )}
                            </Typography>
                            <Box>
                              <RadioGroup
                                {...commonProps}
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                {field.options?.map((option) => (
                                  <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                  />
                                ))}
                              </RadioGroup>
                            </Box>
                          </Box>
                        );
                      case "star-rating":
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "10px",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Typography
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "10px",
                                width: "100%",
                                fontWeight: error ? "inherit" : "inherit",
                                color: error ? "#d3302f" : "inherit",
                                fontSize: "18px",
                              }}
                            >
                              {field.label}
                              {field.required && (
                                <span style={{ color: "red" }}> *</span>
                              )}
                            </Typography>
                            <Rating
                              name={field.name}
                              value={value || 0}
                              onChange={(event, newValue) => onChange(newValue)}
                              size="large"
                            />
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

          <MobileStepper
            sx={{ marginTop: "auto" }}
            steps={form.sections.length === 1 ? 0 : form.sections.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext}>
                {activeStep === form.sections.length - 1 ? "Submit" : "Next"}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              form.sections.length === 1 ? (
                <div></div>
              ) : (
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  <KeyboardArrowLeft />
                  Back
                </Button>
              )
            }
          />
        </Box>
      )}
    </Box>
  );
}
