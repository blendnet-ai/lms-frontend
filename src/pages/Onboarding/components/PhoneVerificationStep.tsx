import { OnboardingStepProps } from "../OnboardingLms";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import ONBOARDINGAPI from "../../../apis/OnboardingAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const PhoneVerificationStep = (props: OnboardingStepProps) => {
  const [numberValue, setNumberValue] = useState<string>("");
  const [otpValue, setOtpValue] = useState<string>("");
  const [otpSentAlready, setOtpSentAlready] = useState<boolean>(false);
  const [otpSessionId, setOtpSessionId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  // Modified useEffect for countdown timer
  useEffect(() => {
    // Check for saved countdown time on mount
    const savedCountdown = localStorage.getItem("otp_countdown");
    const savedCountdownTimestamp = localStorage.getItem(
      "otp_countdown_timestamp"
    );

    if (savedCountdown && savedCountdownTimestamp) {
      const elapsedSeconds = Math.floor(
        (Date.now() - parseInt(savedCountdownTimestamp)) / 1000
      );
      const remainingTime = Math.max(
        parseInt(savedCountdown) - elapsedSeconds,
        0
      );
      setCountdown(remainingTime);
    }

    if (countdown > 0) {
      const timer = setTimeout(() => {
        const newCountdown = countdown - 1;
        setCountdown(newCountdown);
        if (newCountdown > 0) {
          localStorage.setItem("otp_countdown", newCountdown.toString());
          localStorage.setItem(
            "otp_countdown_timestamp",
            Date.now().toString()
          );
        } else {
          // Clear countdown from localStorage when it reaches 0
          localStorage.removeItem("otp_countdown");
          localStorage.removeItem("otp_countdown_timestamp");
        }
      }, 1000);
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
      const data = await ONBOARDINGAPI.sendOtp(numberValue);
      if (data) {
        console.log("OTP sent successfully:", data);
        localStorage.setItem("otp", data.message);
        localStorage.setItem("_event_gen_ses_id", data.code);
        localStorage.setItem("phone_number", numberValue);
        localStorage.setItem("otp_countdown", "30");
        localStorage.setItem("otp_countdown_timestamp", Date.now().toString());
        setOtpSessionId(data.code);
        setOtpSentAlready(true);
        setCountdown(30);
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
      const data = await ONBOARDINGAPI.verifyOtp(
        otpSessionId,
        otpValue,
        numberValue
      );
      if (data) {
        localStorage.removeItem("otp"); // Clear OTP data from localStorage
        localStorage.removeItem("_event_gen_ses_id"); // Clear OTP session ID from localStorage
        localStorage.removeItem("phone_number"); // Clear phone number from localStorage
        localStorage.removeItem("otp_countdown");
        localStorage.removeItem("otp_countdown_timestamp");
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
    localStorage.removeItem("otp");
    localStorage.removeItem("_event_gen_ses_id");
    localStorage.removeItem("phone_number");
    localStorage.removeItem("otp_countdown");
    localStorage.removeItem("otp_countdown_timestamp");
    setOtpSentAlready(false);
    setNumberValue("");
    setOtpValue("");
    setOtpSessionId("");
    setCountdown(0);
  };

  return (
    <div className="flex flex-col w-full h-full p-8 pt-4">
      {/* title */}
      <h2 className="text-2xl font-bold mb-2">Phone Verification</h2>

      {/* description */}
      <p className="text-base mb-4">Enter your phone number</p>

      <form className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input value="+91" disabled className="w-[70px]" />
            <Input
              type="number"
              value={numberValue}
              onChange={(e) => setNumberValue(e.target.value)}
              placeholder="Enter phone number"
              disabled={otpSentAlready}
              className="max-w-[200px]"
            />
          </div>
          <p className="text-sm text-gray-500">
            Note - You will receive a 4 digit OTP on this number
          </p>
        </div>

        {/* send otp button */}
        {!otpSentAlready && (
          <Button
            onClick={submitOtp}
            disabled={numberValue.length !== 10 || isLoading || countdown > 0}
            className="px-5 py-2.5"
          >
            {countdown > 0 ? `Wait ${countdown}s` : "Send OTP"}
          </Button>
        )}
      </form>

      {/* verify otp form */}
      {otpSentAlready && (
        <Card className="mt-6 w-max bg-white">
          <CardContent className="pt-6">
            <div className="text-sm">
              {otpValue === "" ? (
                <>Enter your one-time password.</>
              ) : (
                <>You entered: {otpValue}</>
              )}
            </div>
            <div className="space-y-4">
              <InputOTP
                maxLength={4}
                value={otpValue}
                onChange={(value) => setOtpValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
              <div className="space-x-2">
                <Button
                  onClick={verifyOtp}
                  disabled={otpValue.length !== 4}
                  className="px-5 py-2.5"
                >
                  Verify
                </Button>

                <Button
                  onClick={submitOtp}
                  disabled={
                    numberValue.length !== 10 || isLoading || countdown > 0
                  }
                  variant="primary"
                  className="px-5 py-2.5"
                >
                  {countdown > 0
                    ? `Wait ${countdown}s to resend`
                    : "Resend OTP"}
                </Button>

                <Button
                  onClick={handleReset}
                  disabled={numberValue.length !== 10}
                  variant="light"
                  className="px-5 py-2.5"
                >
                  Change Number
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};
