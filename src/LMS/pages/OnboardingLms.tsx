import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import LMSAPI from "../apis/LmsAPI";
import {
  OnboardingFormStep,
  PhoneVerificationStep,
  TelegramStep,
} from "../components/OnboardingSteps";
import Loading from "../helpers/Loading";

const OnboardingLms = () => {
  // check which step of onboarding remaining and show the respective component
  // if all steps are completed, show the success screen
  const [onboardingStep, setOnboardingStep] = useState<string>("");

  useEffect(() => {
    const fetchOnboardingStep = async () => {
      const resp = await LMSAPI.getOnboardingStep();
      setOnboardingStep(resp.step);
      console.log(resp);
    };
    fetchOnboardingStep();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#EFF6FF",
        padding: "20px",
        mt: "3.5rem",
      }}
    >
      {onboardingStep === "onboarding_form" ? (
        <OnboardingFormStep />
      ) : onboardingStep === "telegram_onboarding" ? (
        <TelegramStep />
      ) : onboardingStep === "mobile_verification" ? (
        <PhoneVerificationStep />
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default OnboardingLms;
