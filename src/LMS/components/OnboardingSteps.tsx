import {
  Box,
  Button,
  CircularProgress,
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
import { useEffect, useState } from "react";
import LMSAPI from "../apis/LmsAPI";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const TelegramStep = () => {
  const [telegramUrl, setTelegramUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // Fetch the Telegram URL initially
  useEffect(() => {
    const fetchTelegramStatus = async () => {
      try {
        const data = await LMSAPI.getOnboardingStatus();
        if (data) {
          console.log("Telegram status:", data);
          setTelegramUrl(data.telegram_url);
          setIsVerified(data.telegram_status); // Assuming this field indicates verification
        }
      } catch (error) {
        console.log("Failed to fetch Telegram status:", error);
      }
    };

    fetchTelegramStatus();
  }, []);

  const handleConnectClick = () => {
    if (telegramUrl) {
      window.open(telegramUrl, "_blank"); // Open Telegram URL in a new tab
      setIsLoading(true);
    } else {
      console.log("Telegram URL not available.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "40px 60px",
      }}
    >
      <Typography
        sx={{
          fontSize: "26px",
          marginBottom: "8px",
          fontWeight: "bold",
        }}
      >
        Receive Notifications
      </Typography>

      <Typography
        sx={{
          fontSize: "20px",
          marginBottom: "16px",
        }}
      >
        You’re almost there! Connect your Telegram Account to get regular
        notifications and updates on your courses. Make sure you have the
        Telegram app installed on your phone/desktop, or you are logged in to
        your account on Telegram Web.
      </Typography>

      {/* Steps to connect Telegram */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          To connect your Telegram account, follow the below steps:
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
          }}
        >
          1. Click the “Connect Telegram” button below
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
          }}
        >
          2. Select “Start Bot” on the next page
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
          }}
        >
          3. Please refresh this page after connecting your Telegram account
        </Typography>
      </Box>

      {/* Button to connect Telegram */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          alignSelf: "start",
          padding: "10px 20px",
          textTransform: "none",
          mt: "20px",
        }}
        onClick={handleConnectClick}
        disabled={isLoading || isVerified}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Connect Telegram"}
      </Button>

      {/* Verification message */}
      {isVerified && (
        <Typography
          sx={{
            fontSize: "16px",
            color: "green",
            marginTop: "16px",
          }}
        >
          Telegram account successfully connected!
        </Typography>
      )}
    </Box>
  );
};

export const OnboardingFormStep = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any[]>([]); // Initialize as an array
  const methods = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = methods;

  const onSubmit = async () => {
    console.log("Submitted Values:");
    const values = getValues(); // This fetches all current values from the form

    // Create a JSON structure that includes both the original field definitions and the values submitted by the user
    const submissionData = formData.map((section) => ({
      ...section,
      fields: section.fields.map((field) => ({
        ...field,
        value: values[field.name], // Append the user-entered value for each field
      })),
    }));

    // Now `submissionData` contains the original form structure with user values included
    console.log(JSON.stringify(submissionData)); // Log or send this data to a server

    try {
      const data = await LMSAPI.submitOnboardingForm({
        sections: submissionData,
      });
      if (data) {
        // navigate(`/dashboard`, { replace: true });
        window.location.reload();
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
                                  type="number"
                                  size="medium"
                                  inputProps={{
                                    inputMode: "numeric",
                                  }}
                                  {...commonProps}
                                  sx={{
                                    margin: "0",
                                  }}
                                  placeholder="Contact phone number"
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
                        return null;
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

export const PhoneVerificationStep = () => {
  const [numberValue, setNumberValue] = useState<string>("");
  const [otpValue, setOtpValue] = useState<string>("");
  const [otpSentAlready, setOtpSentAlready] = useState<boolean>(false);

  // Check localStorage for OTP state on component mount
  useEffect(() => {
    const otpStatus = localStorage.getItem("otp");
    setOtpSentAlready(!!otpStatus); // Set to true if otpStatus exists
  }, []);

  const submitOtp = async () => {
    try {
      const data = await LMSAPI.sendOtp(numberValue);
      if (data) {
        console.log("OTP sent:", data);
        localStorage.setItem("otp", data.message); // Save OTP message in localStorage
        setOtpSentAlready(true); // Show OTP verify form
      }
    } catch (error) {
      console.log("Failed to send OTP:", error);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await LMSAPI.verifyOtp(numberValue, otpValue);
      if (data) {
        console.log("OTP verified:", data);
        localStorage.removeItem("otp"); // Clear OTP data from localStorage
        setOtpSentAlready(false); // Reset form
        setNumberValue(""); // Reset phone number field
        setOtpValue(""); // Reset OTP field
      }
    } catch (error) {
      console.log("Failed to verify OTP:", error);
    }
  };

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
        Phone Verification
      </Typography>

      {/* description */}
      <Typography
        sx={{
          fontSize: "16px",
          marginBottom: "16px",
        }}
      >
        Enter your phone number
      </Typography>

      <Box component={"form"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
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
                type="number"
                size="medium"
                inputProps={{
                  inputMode: "numeric",
                }}
                sx={{
                  margin: "0",
                }}
                value={numberValue}
                onChange={(e) => setNumberValue(e.target.value)}
                placeholder="Enter phone number"
                disabled={otpSentAlready} // Disable if OTP is already sent
              />
            </Box>
          </Box>
        </Box>

        {/* send otp button  */}
        {!otpSentAlready && (
          <Button
            onClick={submitOtp}
            variant="contained"
            color="primary"
            disabled={numberValue.length !== 10}
            sx={{
              alignSelf: "start",
              padding: "10px 20px",
              textTransform: "none",
              mt: "20px",
            }}
          >
            Send OTP
          </Button>
        )}
      </Box>

      {/* verify otp form */}
      {otpSentAlready && (
        <>
          <Typography
            sx={{
              fontSize: "16px",
              mt: "20px",
            }}
          >
            Enter OTP received on phone
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              mt: "20px",
            }}
          >
            <TextField
              size="medium"
              type="number"
              inputProps={{
                inputMode: "numeric",
              }}
              placeholder="Enter OTP"
              value={otpValue}
              onChange={(e) => setOtpValue(e.target.value)}
              sx={{
                width: "200px",
              }}
            />
            <Button
              onClick={verifyOtp}
              variant="contained"
              color="primary"
              sx={{
                alignSelf: "start",
                padding: "10px 20px",
                textTransform: "none",
                mt: "20px",
              }}
              disabled={otpValue.length !== 6}
            >
              Verify
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
