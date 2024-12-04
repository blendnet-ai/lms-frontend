import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import LMSAPI from "../apis/LmsAPI";
import {
  OnboardingFormStep,
  PhoneVerificationStep,
  TelegramStep,
} from "../components/OnboardingSteps";
import Loading from "../helpers/Loading";
import { useNavigate } from "react-router-dom";

const OnboardingLms = () => {
  // check which step of onboarding remaining and show the respective component
  // if all steps are completed, show the success screen
  const [onboardingStep, setOnboardingStep] = useState<string>("");
  const navigate = useNavigate();

  const fetchOnboardingStep = async () => {
    const resp = await LMSAPI.getOnboardingStep();
    setOnboardingStep(resp.step);
    console.log(resp);
    if (resp.step === null) {
      navigate("/");
    }
  };

  useEffect(() => {
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
      }}
    >
      {onboardingStep === "onboarding_form" ? (
        <OnboardingFormStep completed={fetchOnboardingStep} />
      ) : onboardingStep === "telegram_onboarding" ? (
        <TelegramStep completed={fetchOnboardingStep} />
      ) : onboardingStep === "mobile_verification" ? (
        <PhoneVerificationStep completed={fetchOnboardingStep} />
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default OnboardingLms;
