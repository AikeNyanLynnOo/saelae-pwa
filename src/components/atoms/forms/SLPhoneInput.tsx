"use client";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountrySelector } from "@/components/atoms/forms/PhoneInput/CountrySelector/CountrySelector";
import { usePhoneInput } from "@/components/atoms/forms/PhoneInput/hooks/usePhoneInput";
import { ParsedCountry } from "@/components/atoms/forms/PhoneInput/types";
import { splitInputValue } from "@/components/atoms/forms/PhoneInput/utils/splitInputValue";

interface SLPhoneInputProps {
  value?: string;
  onChange: (
    phone: string,
    meta: { country: ParsedCountry; inputValue: string }
  ) => void;
  setShowBottomMm: (show: boolean) => void;
}

export const SLPhoneInput = ({
  value,
  onChange,
  setShowBottomMm,
}: SLPhoneInputProps) => {
  const phoneInput = usePhoneInput({
    defaultCountry: "mm",
    value,
    onChange: (data: any) => {
      onChange(data.phone, {
        country: data.country,
        inputValue: data.inputValue,
      });
    },
  });

  const phoneInputValue = useMemo(() => {
    if (phoneInput.inputValue) {
      const { code, value } = splitInputValue(phoneInput.inputValue);
      if (code === "+95" && value === "") {
        setShowBottomMm(true);
        return "+95 9";
      }
      setShowBottomMm(false);
      return phoneInput.inputValue;
    }
    return "";
  }, [phoneInput.inputValue, setShowBottomMm]);

  return (
    <div className="flex items-center gap-x-2">
      <CountrySelector
        selectedCountry={phoneInput.country.iso2}
        onSelect={(country) => phoneInput.setCountry(country.iso2)}
        renderButtonWrapper={({ children, rootProps }) => {
          return (
            <Button
              {...rootProps}
              className="h-10 rounded-sm shadow-none"
              variant="outline"
            >
              {children}
            </Button>
          );
        }}
      />
      <Input
        placeholder="xxx xxx xxx"
        type="tel"
        color="primary"
        value={phoneInputValue}
        onChange={phoneInput.handlePhoneValueChange}
        className="w-full flex items-center"
        ref={phoneInput.inputRef}
      />
    </div>
  );
};
