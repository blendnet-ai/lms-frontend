import { OnboardingStepProps } from "../OnboardingLms";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LMSAPI from "../../../apis/LmsAPI";
import { AxiosError } from "axios";

export const PhoneVerificationStep = (props: OnboardingStepProps) => {
  const [numberValue, setNumberValue] = useState<string>("");
  const [otpValue, setOtpValue] = useState<string>("");
  const [otpSentAlready, setOtpSentAlready] = useState<boolean>(false);
  const [otpSessionId, setOtpSessionId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  // Add useEffect for countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Check localStorage for OTP state on component mount
  useEffect(() => {
    const otpStatus = localStorage.getItem("otp");
    const phoneNumber = localStorage.getItem("phone_number");
    const otpSessionId = localStorage.getItem("_event_gen_ses_id");

    if (phoneNumber && otpSessionId) {
      setOtpSessionId(otpSessionId);
      setNumberValue(phoneNumber);
    }

    setOtpSentAlready(!!otpStatus); // Set to true if otpStatus exists
  }, []);

  const submitOtp = async () => {
    if (isLoading || countdown > 0) return;
    setIsLoading(true);
    try {
      const data = await LMSAPI.sendOtp(numberValue);
      if (data) {
        console.log("OTP sent successfully:", data);
        localStorage.setItem("otp", data.message);
        localStorage.setItem("_event_gen_ses_id", data.code);
        localStorage.setItem("phone_number", numberValue);
        setOtpSessionId(data.code);
        setOtpSentAlready(true);
        setCountdown(15); // Start 15 second countdown
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await LMSAPI.verifyOtp(otpSessionId, otpValue, numberValue);
      if (data) {
        localStorage.removeItem("otp"); // Clear OTP data from localStorage
        localStorage.removeItem("_event_gen_ses_id"); // Clear OTP session ID from localStorage
        localStorage.removeItem("phone_number"); // Clear phone number from localStorage
        setOtpSentAlready(false); // Reset form
        setNumberValue(""); // Reset phone number field
        setOtpValue(""); // Reset OTP field
        setOtpSessionId(""); // Reset OTP session ID
        props.completed();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      } else {
        console.error("Failed to verify OTP:", error);
        setError("Failed to verify OTP. Please try again.");
      }
    }
  };

  const handleReset = () => {
    localStorage.removeItem("otp"); // Clear OTP data from localStorage
    localStorage.removeItem("_event_gen_ses_id"); // Clear OTP session ID from localStorage
    localStorage.removeItem("phone_number"); // Clear phone number from localStorage
    setOtpSentAlready(false); // Reset form
    setNumberValue(""); // Reset phone number field
    setOtpValue(""); // Reset OTP field
    setOtpSessionId(""); // Reset OTP session ID
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
                disabled={otpSentAlready}
              />
            </Box>
            {/* Note - you will receive an OTP on call  */}
            <Typography
              sx={{
                fontSize: "14px",
                color: "gray",
                mt: "8px",
              }}
            >
              Note - You will receive a 4 digit OTP on this number
            </Typography>
          </Box>
        </Box>

        {/* send otp button  */}
        {!otpSentAlready && (
          <Button
            onClick={submitOtp}
            variant="contained"
            color="primary"
            disabled={numberValue.length !== 10 || isLoading || countdown > 0}
            sx={{
              alignSelf: "start",
              padding: "10px 20px",
              textTransform: "none",
              mt: "10px",
            }}
          >
            {countdown > 0 ? `Wait ${countdown}s` : "Send OTP"}
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
              type="tel"
              placeholder="Enter OTP"
              value={otpValue}
              onChange={(e) => {
                const sanitizedValue = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 4);
                setOtpValue(sanitizedValue);
              }}
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
              disabled={otpValue.length !== 4}
            >
              Verify
            </Button>

            {otpSentAlready && (
              <Box sx={{ display: "flex", gap: "8px" }}>
                <Button
                  onClick={submitOtp}
                  variant="contained"
                  color="primary"
                  disabled={numberValue.length !== 10 || isLoading || countdown > 0}
                  sx={{
                    alignSelf: "start",
                    padding: "10px 20px",
                    textTransform: "none",
                    mt: "10px",
                  }}
                >
                  {countdown > 0 ? `Wait ${countdown}s` : "Resend OTP"}
                </Button>

                <Button
                  onClick={handleReset}
                  variant="contained"
                  color="primary"
                  disabled={numberValue.length !== 10}
                  sx={{
                    alignSelf: "start",
                    padding: "10px 20px",
                    textTransform: "none",
                    mt: "10px",
                  }}
                >
                  Change Number
                </Button>
              </Box>
            )}
          </Box>
        </>
      )}

      {/* error message */}
      {error && (
        <Typography
          sx={{
            color: "red",
            mt: "20px",
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};
