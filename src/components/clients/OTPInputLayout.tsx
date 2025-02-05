"use client";
import { useState } from "react";
import { CommonLayout } from "../layouts/CommonLayout";
import { ImagePlaceholder } from "../atoms/ImagePlaceholder";
import { InputGroup } from "../atoms/forms/InputGroup";
import { Button } from "../ui/button";
import { SLPhoneInput } from "../atoms/forms/SLPhoneInput";
import { ParsedCountry } from "../atoms/forms/PhoneInput/types";
import { splitInputValue } from "../atoms/forms/PhoneInput/utils/splitInputValue";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { RotateCw } from "lucide-react";

export const OTPInputLayout = () => {
  const [otp, setOtp] = useState("");

  return (
    <CommonLayout customClasses="items-start relative">
      <div className="absolute top-1/3 -translate-y-1/2 w-full sm:w-fit text-center">
        {/* Image Placeholder */}
        <ImagePlaceholder />

        {/* Label */}
        <InputGroup
          bottomText={
            "သင့်ဖုန်းနံပါတ်ကို ဂဏန်း ၆ လုံးပါတဲ့ OTP ပို့ပေးထားပါတယ်"
          }
          className="mb-6 text-center"
        >
          {/* OTP Input */}
          <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
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

        {/* Submit Button */}
        <Button variant="ghost">
          <RotateCw
            className="!h-3 text-[var(--semantic-color-icon-brand-default)]"
          />
          ပြန်ပို့မယ်
        </Button>
      </div>
    </CommonLayout>
  );
};
