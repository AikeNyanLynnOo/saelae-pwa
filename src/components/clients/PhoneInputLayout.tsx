"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import { requestOtp } from "@/utils/authApiFunctions";
import { useAuthStore } from "@/store/auth-store";
import { extractMessage } from "@/utils/helperFunction";

export const PhoneInputLayout = ({ authCookies }: { authCookies?: any[] }) => {
  const params = useSearchParams();
  const router = useRouter();

  const {
    phoneNumber,
    countryCode,
    iso2Code,
    inputValue,

    setPhoneNumber,
    setCountryCode,
    setIso2Code,
    setInputValue,
  } = useAuthStore();

  const [showBottomMm, setShowBottomMm] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const { messages, isLoading } = useTranslate();
  const { auth } = messages;

  const onChange = (
    phone: string,
    meta: { country: ParsedCountry; inputValue: string }
  ) => {
    // console.log("country", meta && meta.country && meta.country.iso2);
    // console.log("phone", phone);
    setErrMessage("");
    setPhoneNumber(phone || "");
    setIso2Code((meta && meta.country && meta.country.iso2) || "");
    setCountryCode((meta && meta.country && meta.country.dialCode) || "");
    setInputValue(
      (meta && meta.country && splitInputValue(inputValue).value) || ""
    );
  };

  const handleSubmitPhone = async () => {
    const { status, statusText, success, message, data } = await requestOtp({
      phone_number: phoneNumber,
      country_code: iso2Code,
    });
    const extractedMsg = extractMessage(message);
    if (!success) {
      setErrMessage(extractedMsg);
    } else {
      router.push("/auth/otp");
    }
  };

  useEffect(() => {
    if (
      params.get("session_expired") &&
      params.get("session_expired") === "true" &&
      authCookies &&
      authCookies.length === 0
    ) {
      toast("Please Login to continue", {
        icon: "🔓",
      });
    }
  }, [params, authCookies]);

  const phoneHelperText = useMemo(() => {
    return errMessage || (showBottomMm && auth.phone.helper_text) || "";
  }, [errMessage]);

  return (
    <CommonLayout isLoading={isLoading} customClasses="items-start relative">
      <div className="absolute top-1/3 -translate-y-1/2 w-full sm:w-fit px-4 sm:px-0">
        {/* Image Placeholder */}
        <ImageWithPlaceholder src="/images/logo.png" />

        {/* Label */}
        <InputGroup
          labelText={auth.phone.label}
          bottomText={phoneHelperText}
          isErr={(errMessage && true) || false}
          className="mb-4"
        >
          {/* Phone Input */}
          <SLPhoneInput onChange={onChange} setShowBottomMm={setShowBottomMm} />
        </InputGroup>

        {/* Submit Button */}
        <Button onClick={handleSubmitPhone}>{auth.phone.cta_text}</Button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </CommonLayout>
  );
};
