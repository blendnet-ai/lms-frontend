import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  MobileStepper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  UndoRounded,
} from "@mui/icons-material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import "../styles/Onboarding.css";
import { useNavigate } from "react-router-dom";
import OnboardingAPI, { Form, Section } from "../apis/OnboardingAPI";
import { printIdToken } from "../configs/firebase";

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

    // const form: Form = {
    //   // Assuming form data is fetched or defined here
    //   sections: [
    //     {
    //       heading: "Tell us more about yourself",
    //       description:
    //         "Please enter your legal name. This infomation will be used to verify your account.",
    //       fields: [
    //         {
    //           label: "First name",
    //           required: true,
    //           type: "text",
    //           name: "name",
    //         },
    //         {
    //           label: "Mobile Number (10 digits)",
    //           type: "phone",
    //           required: true,
    //           name: "phone",
    //         },
    //       ],
    //     },
    //     {
    //       heading: "About your education",
    //       description: "Please enter your last education details",
    //       fields: [
    //         {
    //           label: "Degree/course (Pursuing or Completed)",
    //           description: "",
    //           required: true,
    //           type: "radio-with-other",
    //           options: ["BA", "BSc"],
    //           name: "degree",
    //         },
    //         {
    //           label: "College/Insitution",
    //           type: "text",
    //           required: true,
    //           name: "college",
    //         },
    //         {
    //           label: "Graduating Year",
    //           required: true,
    //           type: "select",
    //           options: ["2023", "2024"],
    //           name: "grad_year",
    //         },
    //       ],
    //     },
    //     {
    //       heading: "Other details",
    //       description: "Please enter your last education details",
    //       fields: [
    //         {
    //           label: "Language Proficiency",
    //           required: true,
    //           type: "checkbox-with-other",
    //           options: ["English", "Hindi"],
    //           name: "languages",
    //         },
    //         {
    //           label: "Career Interest",
    //           description: "What are your career plans after graduation?",
    //           type: "checkbox-with-other",
    //           options: [
    //             "Post Graduation",
    //             "Public Sector Job",
    //             "Self Employment",
    //           ],
    //           required: true,
    //           name: "career_interests",
    //         },
    //         {
    //           label: "Job Roles of Interest",
    //           description: "What are your career plans after graduation?",
    //           type: "checkbox-with-other",
    //           options: [
    //             "Developer/Engineer/Quality Assurance",
    //             "Product Manager/UI UX Design",
    //           ],
    //           required: true,
    //           name: "job_roles_interests",
    //         },
    //         {
    //           label: "LinkedIn Profile / CV Link",
    //           required: true,
    //           type: "text",
    //           name: "resume_link",
    //         },
    //       ],
    //     },
    //   ],
    // };
  }, []);

  const submitOnboarding = () => {};

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
      await OnboardingAPI.submitOnboardingData({ sections: submissionData });
    } catch (error) {}

    navigate(`/home`, { state: { hasOnboarded: true } });
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
        console.log("one");
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log("two");
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="Onboarding">
      <div className="onboarding-header">
        <div className="onboarding-header-inner">
          <h1>Hi,</h1>
          <div className="few-steps-text">
            You are a few steps ahead of your career journey
          </div>
        </div>
      </div>
      {form && (
        <Box sx={{ flexGrow: 1 }}>
          <MobileStepper
            steps={form.sections.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext}>
                {activeStep === form.sections.length - 1 ? "Finish" : "Next"}
                <KeyboardArrowRight />
              </Button>
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
          <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="form-heading">
                {form.sections[activeStep].heading}
              </div>
              <div className="form-description">
                {form.sections[activeStep].description}
              </div>
            </div>
            <FormProvider {...methods}>
              {form.sections[activeStep].fields.map((field, index) => (
                <Controller
                  key={index.toString() + activeStep.toString()}
                  name={field.name}
                  control={control}
                  rules={
                    field.type != "phone"
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
                        return <TextField {...commonProps} />;
                      case "phone":
                        return (
                          <div className="phone-container">
                            <TextField
                              value={"+91"}
                              disabled
                              margin="normal"
                              style={{ width: "70px" }}
                            />
                            <TextField
                              type="number"
                              inputProps={{
                                inputMode: "numeric",
                              }}
                              {...commonProps}
                            />
                          </div>
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
                          <div className="form-element-container">
                            <div>
                              {field.label + (field.required ? "*" : "")}
                            </div>
                            <div
                              className="radio-container"
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
                                    <div className="other-radio-container">
                                      <div>Other</div>
                                      <TextField
                                        required
                                        id="other"
                                        disabled={value != "other"}
                                        variant="standard"
                                        style={{ zIndex: 999 }}
                                      />
                                    </div>
                                  }
                                />
                              </RadioGroup>
                            </div>
                            {error && (
                              <FormHelperText error={true}>
                                {error.message}
                              </FormHelperText>
                            )}
                          </div>
                        );
                      case "checkbox-with-other":
                        return (
                          <div className="form-element-container">
                            <div>
                              {field.label + (field.required ? "*" : "")}
                            </div>
                            <div
                              className="checkbox-container"
                              style={
                                error ? { border: "1px solid #d3302f" } : {}
                              }
                            >
                              {field.options?.map((option) => (
                                <FormControlLabel
                                  key={index}
                                  control={
                                    <Checkbox
                                      checked={value?.includes(option)} // Use optional chaining to safely access `includes`
                                      onChange={(e) => {
                                        console.log(value);
                                        const checked = e.target.checked;
                                        const currentValue = value || [];
                                        const newValue = checked
                                          ? [...currentValue, option]
                                          : currentValue.filter(
                                              (v: any) => v !== option
                                            );
                                        onChange(newValue); // Update the React Hook Form state
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
                                      onChange(newValue); // Update the React Hook Form state
                                    }}
                                  />
                                }
                                value={"other"}
                                label={
                                  <div className="other-radio-container">
                                    <div>Other</div>
                                    <TextField
                                      required
                                      id="other"
                                      disabled={value != "other"}
                                      variant="standard"
                                      style={{ zIndex: 999 }}
                                    />
                                  </div>
                                }
                              />
                            </div>
                            {error && (
                              <FormHelperText error={true}>
                                {error.message}
                              </FormHelperText>
                            )}
                          </div>
                        );

                      default:
                        return <TextField {...commonProps} />;
                    }
                  }}
                />
              ))}
            </FormProvider>
          </form>
        </Box>
      )}
    </div>
  );
}

export default Onboarding;
