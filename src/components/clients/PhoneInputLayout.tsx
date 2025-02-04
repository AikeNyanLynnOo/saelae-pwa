"use client";
import { useState } from "react";
import { CommonLayout } from "../layouts/CommonLayout";
import { ImagePlaceholder } from "../atoms/ImagePlaceholder";
import { InputGroup } from "../atoms/forms/InputGroup";
import { Button } from "../ui/button";
import { SLPhoneInput } from "../atoms/forms/SLPhoneInput";
import { ParsedCountry } from "../atoms/forms/PhoneInput/types";
import { splitInputValue } from "../atoms/forms/PhoneInput/utils/splitInputValue";

export const PhoneInputLayout = () => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showBottomMm, setShowBottomMm] = useState(false);

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
    <CommonLayout customClasses="items-start relative">
      <div className="absolute top-1/3 -translate-y-1/2 w-full sm:w-fit">
        {/* Image Placeholder */}
        <ImagePlaceholder />

        {/* Label */}
        <InputGroup
          labelText="ဖုန်းနံပါတ်"
          bottomText={
            (showBottomMm && "၀၉ မပါဘဲ နောက်က ဖုန်းနံပါတ်ကိုပဲထည့်ပေးနော်။") ||
            ""
          }
          className="mb-4"
        >
          {/* Phone Input */}
          <SLPhoneInput onChange={onChange} setShowBottomMm={setShowBottomMm} />
        </InputGroup>

        {/* Submit Button */}
        <Button className="bg-[var(--component-mode-1-color-button-bg-primary-enabled)] rounded-[var(--core-border-radius-xs)] w-full px-[var(--core-spacing-lg)] py-[var(--core-spacing-sm)]">
          အတည်ပြုမယ်
        </Button>
      </div>
    </CommonLayout>
  );
};
