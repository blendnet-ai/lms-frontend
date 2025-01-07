import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import LMSAPI from "../../../apis/LmsAPI";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { OnboardingStepProps } from "../OnboardingLms";

export const OnboardingFormStep = (props: OnboardingStepProps) => {
  const [formData, setFormData] = useState<any[]>([]); // Initialize as an array
  const methods = useForm();
  const { control, handleSubmit, getValues } = methods;

  const onSubmit = async () => {
    const values = getValues(); // This fetches all current values from the form

    // Create a JSON structure that includes both the original field definitions and the values submitted by the user
    const submissionData = formData.map((section) => ({
      ...section,
      fields: section.fields.map((field: { name: string | number }) => ({
        ...field,
        value: values[field.name], // Append the user-entered value for each field
      })),
    }));

    // Now `submissionData` contains the original form structure with user values included
    // console.log(JSON.stringify(submissionData)); // Log or send this data to a server

    try {
      const data = await LMSAPI.submitOnboardingForm({
        sections: submissionData,
      });
      if (data) {
        props.completed();
      }
    } catch (error) {
      console.log("Failed to submit form:", error);
    }
  };

  // Fetch form data
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const resp = await LMSAPI.getOnboardingForm();
        const sections = resp?.data?.sections || []; // Safeguard against undefined
        if (Array.isArray(sections)) {
          setFormData(sections);
        } else {
          console.error("Unexpected sections data:", sections);
        }
      } catch (error) {
        console.error("Failed to fetch form data:", error);
      }
    };

    fetchForm();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      {/* title  */}
      <Typography
        sx={{
          fontSize: "26px",
          marginBottom: "8px",
          fontWeight: "bold",
        }}
      >
        Onboarding Form
      </Typography>

      {/* description */}
      <Typography
        sx={{
          fontSize: "16px",
          marginBottom: "16px",
        }}
      >
        Your phone number was successfully verified. Please fill the onboarding
        form below to continue!
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "16px",
          width: "100%",
          height: "100%",
        }}
      >
        <FormProvider {...methods}>
          {formData.map((section: any, sectionIndex: number) => (
            <Box
              key={sectionIndex}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "30px",
                rowGap: "30px",
              }}
            >
              {section.fields.map((field: any, fieldIndex: number) => (
                <Controller
                  key={fieldIndex}
                  name={field.name}
                  control={control}
                  rules={{
                    required: field.required
                      ? `${field.label} is required`
                      : undefined,
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    const commonProps = {
                      // label: field.label,
                      value,
                      onChange,
                      error: !!error,
                      fullWidth: true,
                      // helperText: error ? error.message : null,
                    };

                    switch (field.type) {
                      case "text":
                      case "date":
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <InputLabel
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {field.label}*
                            </InputLabel>
                            <FormControl variant="standard" size="medium">
                              <OutlinedInput
                                {...commonProps}
                                placeholder={field.label}
                                id={field.name}
                                type={field.type}
                              />
                            </FormControl>
                            {error && (
                              <FormHelperText error>
                                {error.message}
                              </FormHelperText>
                            )}
                          </Box>
                        );

                      case "number":
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <InputLabel
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {field.label}*
                            </InputLabel>

                            <TextField
                              type="number"
                              {...commonProps}
                              placeholder={field.label}
                            />

                            {error && (
                              <FormHelperText error>
                                {error.message}
                              </FormHelperText>
                            )}
                          </Box>
                        );

                      case "number-adhaar":
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <InputLabel
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {field.label}*
                            </InputLabel>

                            <TextField
                              type="tel"
                              size="medium"
                              {...commonProps}
                              onChange={(e) => {
                                const sanitizedValue = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 12);
                                onChange(sanitizedValue);
                              }}
                              inputProps={{
                                maxLength: 12,
                              }}
                              placeholder="Adhaar number"
                              error={!!error}
                              sx={{
                                margin: "0",
                              }}
                            />

                            {error && (
                              <FormHelperText error>
                                {error.message}
                              </FormHelperText>
                            )}
                          </Box>
                        );

                      case "phone":
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <InputLabel
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {field.label}*
                            </InputLabel>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                mb: "0.5rem",
                                width: "100%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: "8px",
                                  alignItems: "center",
                                }}
                              >
                                <TextField
                                  size="medium"
                                  value="+91"
                                  disabled
                                  sx={{
                                    width: "70px",
                                  }}
                                />
                                <TextField
                                  type="tel"
                                  size="medium"
                                  {...commonProps}
                                  onChange={(e) => {
                                    const sanitizedValue = e.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 10);
                                    onChange(sanitizedValue);
                                  }}
                                  inputProps={{
                                    maxLength: 10,
                                  }}
                                  placeholder="Contact phone number"
                                  error={!!error}
                                  sx={{
                                    margin: "0",
                                  }}
                                />
                              </Box>
                              {error && (
                                <FormHelperText error={true}>
                                  {error.message}
                                </FormHelperText>
                              )}
                              {error && value && value.length !== 10 && (
                                <FormHelperText error={true}>
                                  Phone number should be 10 digits
                                </FormHelperText>
                              )}
                            </Box>
                          </Box>
                        );

                      case "select":
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <InputLabel
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {field.label}*
                            </InputLabel>
                            <TextField {...commonProps} select>
                              {field.options.map((option: string) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </TextField>
                            {error && (
                              <FormHelperText error>
                                {error.message}
                              </FormHelperText>
                            )}
                          </Box>
                        );

                      case "radio":
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {field.label}
                            </Typography>
                            <RadioGroup
                              value={value}
                              onChange={onChange}
                              row
                              aria-label={field.name}
                            >
                              {field.options.map((option: string) => (
                                <FormControlLabel
                                  key={option}
                                  value={option}
                                  control={<Radio />}
                                  label={option}
                                />
                              ))}
                            </RadioGroup>
                            {error && (
                              <FormHelperText error>
                                {error.message}
                              </FormHelperText>
                            )}
                          </Box>
                        );

                      default:
                        return <></>;
                    }
                  }}
                />
              ))}
            </Box>
          ))}
        </FormProvider>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            alignSelf: "start",
            padding: "10px 20px",
            textTransform: "none",
            mt: "20px",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
