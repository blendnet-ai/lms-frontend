import { useEffect, useState } from "react";
import { OnboardingStepProps } from "../OnboardingLms";
import LMSAPI from "../../../apis/LmsAPI";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import { Role } from "../../../App";

export const TelegramStep = (props: OnboardingStepProps) => {
  const [telegramUrl, setTelegramUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSkippeed, setIsLoadingSkippeed] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const [role, setRole] = useState<Role>(Role.STUDENT);

  const fetchTelegramStatus = async () => {
    try {
      const data = await LMSAPI.getOnboardingStatus();
      if (data) {
        setTelegramUrl(data.telegram_url);
        setIsVerified(data.telegram_status); // Assuming this field indicates verification
        setRole(data.role);
        props.completed();
      }
    } catch (error) {
      console.log("Failed to fetch Telegram status:", error);
    }
  };

  // Fetch the Telegram URL initially
  useEffect(() => {
    fetchTelegramStatus();
  }, []);

  const handleConnectClick = () => {
    if (telegramUrl) {
      window.open(telegramUrl, "_blank"); // Open Telegram URL in a new tab
      setIsLoading(true);
      // Poll telegram status every 5 seconds while loading
      const intervalId = setInterval(() => {
        fetchTelegramStatus();
      }, 5000);

      // Cleanup interval on unmount
      return () => clearInterval(intervalId);
    } else {
      console.log("Telegram URL not available.");
    }
  };

  const handleConnectSkip = async () => {
    try {
      setIsLoadingSkippeed(true);
      const resp = await LMSAPI.skipTelegramOnboarding();

      if (resp.telegram_skipped) {
        setIsSkipped(true);
        window.location.reload();
      }
    } catch (error) {
      console.log("Failed to skip Telegram onboarding:", error);
    } finally {
      setIsLoadingSkippeed(false);
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
          width: "70%",
        }}
      >
        You’re almost there! Connect your Telegram Account to get regular
        notifications and updates on your courses. Make sure you are logged in
        to your Telegram account on{" "}
        <strong style={{ color: "#2059EE" }}>Telegram app</strong> or{" "}
        <strong style={{ color: "#2059EE" }}>Telegram Web.</strong>
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
          1. Scan the QR Code below or click the “Connect to Telegram” button
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
          }}
        >
          2. Click “Start Bot” to connect your account
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
          }}
        >
          3. Please refresh this page after connecting your Telegram account
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          width: "100px",
          backgroundColor: "#fff",
          padding: "10px",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={telegramUrl}
        />
      </Box>

      <Typography
        sx={{ fontSize: "16px", marginTop: "16px", fontWeight: "bold" }}
      >
        Or
      </Typography>

      {/* Button to connect Telegram */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          alignItems: "center",
        }}
      >
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
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Connect Telegram"
          )}
        </Button>

        {/* Button to skip connect Telegram */}
        {Role.LECTURER === role && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              alignSelf: "start",
              padding: "10px 20px",
              textTransform: "none",
              mt: "20px",
            }}
            onClick={handleConnectSkip}
            disabled={isLoadingSkippeed || isSkipped}
          >
            {isLoadingSkippeed ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Skip For Now"
            )}
          </Button>
        )}
      </Box>

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
