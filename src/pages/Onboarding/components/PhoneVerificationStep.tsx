import { OnboardingStepProps } from "../OnboardingLms";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LMSAPI from "../../../apis/LmsAPI";

export const PhoneVerificationStep = (props: OnboardingStepProps) => {
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
        localStorage.removeItem("otp"); // Clear OTP data from localStorage
        setOtpSentAlready(false); // Reset form
        setNumberValue(""); // Reset phone number field
        setOtpValue(""); // Reset OTP field
        props.completed();
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
