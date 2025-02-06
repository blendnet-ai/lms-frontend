import { useEffect, useState } from "react";
import Loading from "../../helpers/Loading";
import { useNavigate } from "react-router-dom";
import { OnboardingFormStep } from "./components/OnboardingFormStep";
import { TelegramStep } from "./components/TelegramStep";
import { PhoneVerificationStep } from "./components/PhoneVerificationStep";
import OptionalStep from "./components/OptionalStep";
import ONBOARDINGAPI from "../../apis/OnboardingAPI";
import { ROUTES } from "../../configs/routes";

export type OnboardingStepProps = {
  completed: () => void;
};

const OnboardingLms = () => {
  // check which step of onboarding remaining and show the respective component
  // if all steps are completed, show the success screen
  const [onboardingStep, setOnboardingStep] = useState<string>("");
  const navigate = useNavigate();

  const fetchOnboardingStep = async () => {
    const resp = await ONBOARDINGAPI.getOnboardingStep();
    setOnboardingStep(resp.step);
    if (resp.step === null) {
      navigate(ROUTES.HOME);
    }
  };

  useEffect(() => {
    fetchOnboardingStep();
  }, []);

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-blue-50">
      {onboardingStep === "onboarding_form" ? (
        <OnboardingFormStep completed={fetchOnboardingStep} />
      ) : onboardingStep === "telegram_onboarding" ? (
        <TelegramStep completed={fetchOnboardingStep} />
      ) : onboardingStep === "mobile_verification" ? (
        <PhoneVerificationStep completed={fetchOnboardingStep} />
      ) : onboardingStep === "cv_upload" ? (
        <OptionalStep completed={fetchOnboardingStep} />
      ) : (
        <Loading
          primaryColor="text-blue-500"
          secondaryColor="text-blue-300"
          fullScreen
        />
      )}
    </div>
  );
};

export default OnboardingLms;
