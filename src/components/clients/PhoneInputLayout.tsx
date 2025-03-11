"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { ImageWithPlaceholder } from "@/components/atoms/ImageWithPlaceholder";
import { InputGroup } from "@/components/atoms/forms/InputGroup";
import { Button } from "@/components/ui/button";
import { SLPhoneInput } from "@/components/atoms/forms/SLPhoneInput";
import { ParsedCountry } from "@/components/atoms/forms/PhoneInput/types";
import { splitInputValue } from "@/components/atoms/forms/PhoneInput/utils/splitInputValue";
import { useRouter } from "next/navigation";
import { useTranslate } from "../hooks/use-translate";
import toast, { Toaster } from "react-hot-toast";

export const PhoneInputLayout = ({ authCookies }: { authCookies?: any[] }) => {
  const params = useSearchParams();
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

  useEffect(() => {
    if (
      params.get("session_expired") &&
      params.get("session_expired") === "true" &&
      authCookies &&
      authCookies.length === 0
    ) {
      toast("Session Expired! Please login again.", {
        icon: "🔓",
      });
    }
  }, [params, authCookies]);

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
      <Toaster position="top-center" reverseOrder={false} />
    </CommonLayout>
  );
};
