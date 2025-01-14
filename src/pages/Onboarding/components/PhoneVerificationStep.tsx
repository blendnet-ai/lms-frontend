import { OnboardingStepProps } from "../OnboardingLms";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LMSAPI from "../../../apis/LmsAPI";

export const PhoneVerificationStep = (props: OnboardingStepProps) => {
  const [numberValue, setNumberValue] = useState<string>("");
  const [otpValue, setOtpValue] = useState<string>("");
  const [otpSentAlready, setOtpSentAlready] = useState<boolean>(false);
  const [otpSessionId, setOtpSessionId] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Check localStorage for OTP state on component mount
  useEffect(() => {
    const otpStatus = localStorage.getItem("otp");
    setOtpSentAlready(!!otpStatus); // Set to true if otpStatus exists
  }, []);

  const submitOtp = async () => {
    try {
      const data = await LMSAPI.sendOtp(numberValue);
      if (data) {
        console.log("OTP sent successfully:", data);
        localStorage.setItem("otp", data.message); // Save OTP message in localStorage
        localStorage.setItem("_event_gen_ses_id", data.code); // Save OTP session ID in localStorage
        localStorage.setItem("phone_number", numberValue); // Save phone number in localStorage
        setOtpSessionId(data.code);
        setOtpSentAlready(true);
      }
    } catch (error) {
      console.log("Failed to send OTP:", error);
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
    } catch (error: any) {
      console.log("Failed to verify OTP:", error);
      setError(error.response.data.message);
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
            disabled={numberValue.length !== 10}
            sx={{
              alignSelf: "start",
              padding: "10px 20px",
              textTransform: "none",
              mt: "10px",
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
