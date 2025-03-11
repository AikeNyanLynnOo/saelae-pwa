"use client";
import { RotateCw, Router } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ImageWithPlaceholder } from "@/components/atoms/ImageWithPlaceholder";
import { InputGroup } from "@/components/atoms/forms/InputGroup";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { SLTypo } from "@/components/SLTypo";
import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";
import { useTranslate } from "../hooks/use-translate";
import { useCommonStore } from "@/store/common-store";
import { useAuthStore } from "@/store/auth-store";
import { verifyOtp } from "@/utils/authApiFunctions";
import { extractMessage, setAppTokenCookie } from "@/utils/helperFunction";

export const OTPInputLayout = () => {
  const { messages, isLoading } = useTranslate();
  const { phoneNumber } = useAuthStore();
  const { auth } = messages;
  const { lang } = useCommonStore();
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (otp.length === 6) {
      // toast.success("Successfully verified!");
      // setTimeout(() => {
      //   router.push("/onboard");
      // }, 1000);
      verifyOtp({
        phone_number: phoneNumber,
        otp,
      })
        .then(({ status, statusText, success, message, data }) => {
          console.log({
            status,
            statusText,
            success,
            message,
            data,
          });
          const extractedMsg = extractMessage(message);
          if (!success) {
            setErrMessage(extractedMsg);
          } else {
            if (data && data && data.token) {
              setAppTokenCookie(data.token);
              toast.success("Successfully verified!");
              router.push("/onboard");
            }
          }
        })
        .catch((e) => {
          // error
        });
    }
  }, [otp, router]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsResendDisabled(false); // Enable the resend button when timer reaches 0
      return;
    }

    // Set up a timer that decrements the timeLeft every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the timer when the component unmounts or timeLeft changes
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResendOTP = () => {
    setTimeLeft(60); // Reset the timer
    setIsResendDisabled(true); // Disable the resend button again
    // Add your OTP resend logic here
    console.log("Resending OTP...");
  };

  const otpHelperText = useMemo(() => {
    return errMessage || auth.otp.helper;
  }, [errMessage]);

  return (
    <CommonLayout isLoading={isLoading} customClasses="items-start relative">
      <div className="absolute top-1/3 -translate-y-1/2 w-full sm:w-fit text-center flex flex-col px-4 sm:px-0">
        {/* Image Placeholder */}
        <ImageWithPlaceholder src="/images/logo.png" />

        {/* OTP Input */}
        <InputGroup
          bottomText={otpHelperText}
          className="mb-4 text-center"
          isErr={(errMessage && true) || false}
        >
          <InputOTP
            maxLength={6}
            value={otp}
            pattern="^[0-9]+$"
            onChange={(value) => {
              setErrMessage("");
              setOtp(value);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </InputGroup>

        {/* Resend txt */}
        {(isResendDisabled && (
          <SLTypo
            variant="fontBody4Normal"
            className="text-[var(--semantic-color-text-subtle)] flex items-center justify-center mb-4"
          >
            {(lang === "mm" && (
              <>
                <span className="text-[var(--semantic-color-text-negative-default)] mr-1">
                  60
                </span>
                <span>စက္ကန့်အတွင်းမရခဲ့ဘူးဆိုရင် ပြန်တောင်းပါ။</span>
              </>
            )) || (
              <>
                <span>Request again if you do not receive within</span>
                <span className="text-[var(--semantic-color-text-negative-default)] mx-1">
                  60
                </span>
                <span>seconds</span>
              </>
            )}
          </SLTypo>
        )) || (
          <SLTypo
            variant="fontBody4Normal"
            text={auth.otp.otp_not_received}
            className="text-[var(--semantic-color-text-subtle)] mb-4"
          />
        )}

        {/* Submit Button */}
        <Button
          variant="ghost"
          disabled={isResendDisabled}
          onClick={handleResendOTP}
        >
          <RotateCw className="!h-3 text-[var(--semantic-color-icon-brand-default)]" />
          {auth.otp.cta_text}
        </Button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </CommonLayout>
  );
};
