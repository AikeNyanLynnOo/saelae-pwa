"use client";
import { useState } from "react";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { ImageWithPlaceholder } from "@/components/atoms/ImageWithPlaceholder";
import { InputGroup } from "@/components/atoms/forms/InputGroup";
import { Button } from "@/components/ui/button";
import { SLPhoneInput } from "@/components/atoms/forms/SLPhoneInput";
import { ParsedCountry } from "@/components/atoms/forms/PhoneInput/types";
import { splitInputValue } from "@/components/atoms/forms/PhoneInput/utils/splitInputValue";
import { useRouter } from "next/navigation";
import { useTranslate } from "../hooks/use-translate";

export const PhoneInputLayout = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showBottomMm, setShowBottomMm] = useState(false);

  const { messages, isLoading } = useTranslate();
  const { auth } = messages;

  const onChange = (
    phone: string,
    meta: { country: ParsedCountry; inputValue: string }
  ) => {
    setPhone(phone || "");
    setCountryCode((meta && meta.country && meta.country.dialCode) || "");
    setInputValue(
      (meta && meta.country && splitInputValue(inputValue).value) || ""
    );
  };

  return (
    <CommonLayout isLoading={isLoading} customClasses="items-start relative">
      <div className="absolute top-1/3 -translate-y-1/2 w-full sm:w-fit px-4 sm:px-0">
        {/* Image Placeholder */}
        <ImageWithPlaceholder src="/images/logo.png" />

        {/* Label */}
        <InputGroup
          labelText={auth.phone.label}
          bottomText={(showBottomMm && auth.phone.helper_text) || ""}
          className="mb-4"
        >
          {/* Phone Input */}
          <SLPhoneInput onChange={onChange} setShowBottomMm={setShowBottomMm} />
        </InputGroup>

        {/* Submit Button */}
        <Button onClick={() => router.push("/auth/otp")}>
          {auth.phone.cta_text}
        </Button>
      </div>
    </CommonLayout>
  );
};
