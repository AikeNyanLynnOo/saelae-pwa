"use client";
import { RotateCw, Router } from "lucide-react";
import { useEffect, useState } from "react";
import { ImagePlaceholder } from "../atoms/ImagePlaceholder";
import { InputGroup } from "../atoms/forms/InputGroup";
import { CommonLayout } from "../layouts/CommonLayout";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { SLTypo } from "../SLTypo";
import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";

export const OTPInputLayout = () => {
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    if (otp.length === 6) {
      toast.success("Successfully verified!");
      setTimeout(() => {
        router.push("/onboard");
      }, 1000);
    }
  }, [otp]);

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

  return (
    <CommonLayout customClasses="items-start relative">
      <div className="absolute top-1/3 -translate-y-1/2 w-full sm:w-fit text-center flex flex-col px-4 sm:px-0">
        {/* Image Placeholder */}
        <ImagePlaceholder />

        {/* OTP Input */}
        <InputGroup
          bottomText={
            "သင့်ဖုန်းနံပါတ်ကို ဂဏန်း ၆ လုံးပါတဲ့ OTP ပို့ပေးထားပါတယ်"
          }
          className="mb-4 text-center"
        >
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
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
            <span className="text-[var(--semantic-color-text-negative-default)] mr-1">
              60
            </span>
            <span>စက္ကန့်အတွင်းမရခဲ့ဘူးဆိုရင် ပြန်တောင်းပါ။</span>
          </SLTypo>
        )) || (
          <SLTypo
            variant="fontBody4Normal"
            text="OTP နံပါတ်မရခဲ့ဘူးလား။"
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
          ပြန်ပို့မယ်
        </Button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </CommonLayout>
  );
};
