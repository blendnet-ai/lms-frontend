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
    let pollingInterval: NodeJS.Timeout;

    const checkOnboardingStatus = async () => {
      try {
        const response = await LMSAPI.getOnboardingStatus();
        if (
          response.telegram_status &&
          response.mobile_verification_status &&
          response.onboarding_status
        ) {
          setIsOnboarded(true);
          clearInterval(pollingInterval); // Stop polling once the user is onboarded
        } else {
          setIsOnboarded(false);
          navigate("/onboarding-lms", { state: { from: location } });
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const startPolling = () => {
      pollingInterval = setInterval(checkOnboardingStatus, 10000); // Poll every 10 seconds
      checkOnboardingStatus(); // Initial call to avoid waiting for the first interval
    };

    startPolling();

    return () => {
      clearInterval(pollingInterval); // Cleanup on component unmount
    };
  }, [navigate, location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isOnboarded ? children : null;
};

export default OnboardingProtectedRoute;
