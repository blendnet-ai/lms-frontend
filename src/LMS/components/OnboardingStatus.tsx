import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LMSAPI from "../apis/LmsAPI";

type Props = {
  children: JSX.Element;
};

const OnboardingProtectedRoute = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // Replace this with your actual API call
        const response = await LMSAPI.getOnboardingStatus();
        if (response.telegram_status && response.mobile_verification_status && response.onboarding_status) {
          setIsOnboarded(true);
        } else {
          navigate("/onboarding-lms", { state: { from: location } });
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [navigate, location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isOnboarded ? children : null;
};

export default OnboardingProtectedRoute;
