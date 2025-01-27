import { useEffect, useState } from "react";
import { OnboardingStepProps } from "../OnboardingLms";
import QRCode from "react-qr-code";
import ONBOARDINGAPI from "../../../apis/OnboardingAPI";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Role } from "@/types/app";

export const TelegramStep = (props: OnboardingStepProps) => {
  const [telegramUrl, setTelegramUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSkippeed, setIsLoadingSkippeed] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const [role, setRole] = useState<Role>(Role.STUDENT);

  const fetchTelegramStatus = async () => {
    try {
      const data = await ONBOARDINGAPI.getOnboardingStatus();
      if (data) {
        setTelegramUrl(data.telegram_url);
        setIsVerified(data.telegram_status);
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
      const resp = await ONBOARDINGAPI.skipTelegramOnboarding();

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
    <div className="flex flex-col w-full h-full p-10">
      <h1 className="text-2xl font-bold mb-2">Receive Notifications</h1>

      <p className="text-lg mb-4 w-[70%]">
        You're almost there! Connect your Telegram Account to get regular
        notifications and updates on your courses. Make sure you are logged in
        to your Telegram account on{" "}
        <strong className="text-blue-600">Telegram app</strong> or{" "}
        <strong className="text-blue-600">Telegram Web.</strong>
      </p>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">
          To connect your Telegram account, follow the below steps:
        </h2>
        <p className="text-base">
          1. Scan the QR Code below or click the "Connect to Telegram" button
        </p>
        <p className="text-base">
          2. Click "Start Bot" to connect your account
        </p>
        <p className="text-base">
          3. Please refresh this page after connecting your Telegram account
        </p>
      </div>

      <div className="flex justify-center mt-5 w-[100px] bg-white p-2.5">
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={telegramUrl}
        />
      </div>

      <p className="text-base font-bold mt-4">Or</p>

      <div className="flex flex-row gap-4 items-center">
        <Button
          className="mt-5"
          onClick={handleConnectClick}
          disabled={isLoading || isVerified}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            "Connect Telegram"
          )}
        </Button>

        {Role.LECTURER === role && (
          <Button
            variant="primary"
            className="mt-5"
            onClick={handleConnectSkip}
            disabled={isLoadingSkippeed || isSkipped}
          >
            {isLoadingSkippeed ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Skipping...
              </>
            ) : (
              "Skip For Now"
            )}
          </Button>
        )}
      </div>

      {isVerified && (
        <p className="text-base text-green-600 mt-4">
          Telegram account successfully connected!
        </p>
      )}
    </div>
  );
};
