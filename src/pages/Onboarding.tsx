import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  MobileStepper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import "./../styles/Onboarding.css";
import { useEffect, useState } from "react";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

type Fields = {
  label: string;
  description?: string;
  required: boolean;
  type: string;
  options?: string[];
  name: string;
};

type Section = {
  heading: string;
  description: string;
  fields: Fields[];
};

type Form = {
  sections: Section[];
};

function Onboarding() {
  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    const form = {
      sections: [
        {
          heading: "Tell us more about yourself",
          description:
            "Please enter your legal name. This infomation will be used to verify your account.",
          fields: [
            {
              label: "First name",
              required: true,
              type: "text",
              name: "name",
            },
            {
              label: "Mobile Number (10 digits)",
              type: "text",
              required: true,
              name: "phone",
            },
          ],
        },
        {
          heading: "About your education",
          description: "Please enter your last education details",
          fields: [
            {
              label: "Degree/course (Pursuing or Completed)",
              description: "",
              required: true,
              type: "radio-with-other",
              options: ["BA", "BSc"],
              name: "degree",
            },
            {
              label: "College/Insitution",
              type: "text",
              required: true,
              name: "college",
            },
            {
              label: "Graduating Year",
              required: true,
              type: "select",
              options: ["2023", "2024"],
              name: "grad_year",
            },
          ],
        },
        {
          heading: "Other details",
          description: "Please enter your last education details",
          fields: [
            {
              label: "Language Proficiency",
              required: true,
              type: "checkbox-with-other",
              options: ["English", "Hindi"],
              name: "languages",
            },
            {
              label: "Career Interest",
              description: "What are your career plans after graduation?",
              type: "checkbox-with-other",
              options: [
                "Post Graduation",
                "Public Sector Job",
                "Self Employment",
              ],
              required: true,
              name: "career_interests",
            },
            {
              label: "Job Roles of Interest",
              description: "What are your career plans after graduation?",
              type: "checkbox-with-other",
              options: [
                "Developer/Engineer/Quality Assurance",
                "Product Manager/UI UX Design",
              ],
              required: true,
              name: "job_roles_interests",
            },
            {
              label: "LinkedIn Profile / CV Link",
              required: true,
              type: "text",
              name: "resume_link",
            },
          ],
        },
      ],
    };
    setForm(form);
  }, []);

  const [activeStep, setActiveStep] = useState<number>(0);

  const maxSteps = form ? form.sections.length : 0;

  const handleNext = () => {
    // handleSubmit(onSubmit);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {});
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ flexGrow: 1 }}>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  style={
                    activeStep != maxSteps - 1
                      ? {
                          color: "#1da5a7",
                        }
                      : {}
                  }
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  style={
                    activeStep != 0
                      ? {
                          color: "#1da5a7",
                        }
                      : {}
                  }
                >
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
            <div className="form-container">
              <div>
                <div className="form-heading">
                  {form.sections[activeStep].heading}
                </div>
                <div className="form-description">
                  {form.sections[activeStep].description}
                </div>
              </div>
              {form.sections[activeStep].fields.map((sectionField) => {
                if (sectionField.type == "text") {
                  return (
                    <Controller
                      name={sectionField.name}
                      control={control}
                      rules={
                        sectionField.required
                          ? { required: "First name is required" }
                          : {}
                      }
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label={sectionField.label}
                          variant="outlined"
                          error={Boolean(errors.firstName)}
                          helperText={
                            errors.firstName
                              ? errors.firstName.message?.toString()
                              : ""
                          }
                        />
                      )}
                    />
                  );
                } else if (sectionField.type == "radio") {
                  return (
                    <div className="form-element-container">
                      <div>
                        {sectionField.label +
                          (sectionField.required ? "*" : "")}
                      </div>
                      <div className="radio-container">
                        <RadioGroup name="radio-buttons-group">
                          {sectionField.options?.map((option) => {
                            return (
                              <FormControlLabel
                                value={option}
                                control={<Radio />}
                                label={option}
                              />
                            );
                          })}
                        </RadioGroup>
                      </div>
                    </div>
                  );
                } else if (sectionField.type == "radio-with-other") {
                  return (
                    <div className="form-element-container">
                      <div>
                        {sectionField.label +
                          (sectionField.required ? "*" : "")}
                      </div>
                      <div className="radio-container">
                        <RadioGroup name="radio-buttons-group">
                          {sectionField.options?.map((option) => {
                            return (
                              <FormControlLabel
                                value={option}
                                control={<Radio />}
                                label={option}
                              />
                            );
                          })}
                          <FormControlLabel
                            value={"other"}
                            control={<Radio />}
                            label={
                              <div className="other-radio-container">
                                <div>Other</div>
                                <TextField
                                  required
                                  id="other"
                                  variant="standard"
                                  style={{ zIndex: 999 }}
                                />
                              </div>
                            }
                          />
                        </RadioGroup>
                      </div>
                    </div>
                  );
                } else if (sectionField.type == "select") {
                  return (
                    <TextField select label={sectionField.label}>
                      {sectionField.options?.map((option) => (
                        <MenuItem value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  );
                } else if (sectionField.type == "checkbox-with-other") {
                  return (
                    <div className="form-element-container">
                      <div>
                        {sectionField.label +
                          (sectionField.required ? "*" : "")}
                      </div>
                      <div className="checkbox-container">
                        {sectionField.options &&
                          sectionField.options.map((option) => {
                            return (
                              <FormControlLabel
                                control={<Checkbox />}
                                label={option}
                              />
                            );
                          })}
                        <FormControlLabel
                          control={<Checkbox />}
                          label={
                            <div className="other-radio-container">
                              <div>Other</div>
                              <TextField
                                required
                                id="other"
                                variant="standard"
                                style={{ zIndex: 999 }}
                              />
                            </div>
                          }
                        />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </Box>
        </form>
      )}
    </div>
  );
}

export default Onboarding;
