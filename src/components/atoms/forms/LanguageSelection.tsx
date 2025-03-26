"use client";

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SLTypo } from "@/components/SLTypo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCommonStore } from "@/store/common-store";
import { useTranslate } from "@/components/hooks/use-translate";

export default function LanguageSelection() {
  const { messages, isLoading } = useTranslate();
  const { profile } = messages;
  const router = useRouter();
  const { lang, setLanguage } = useCommonStore();

  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("lang", newLanguage);

    router.refresh();
  };

  // Sync with localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && storedLang !== lang) {
      setLanguage(storedLang);
    }
  }, [lang, setLanguage]);

  return (
    <div className="max-w-md mx-auto">
      <RadioGroup
        value={lang}
        onValueChange={handleLanguageChange}
        className="space-y-[var(--core-spacing-sm)]"
      >
        <div className="flex items-center space-x-[var(--core-spacing-xl)] rounded-[var(--core-border-radius-sm)] border px-[var(--core-spacing-lg)] shadow-sm">
          <RadioGroupItem value="mm" id="mm" />
          <Label
            htmlFor="mm"
            className="flex items-center gap-2 cursor-pointer w-full h-full py-[var(--core-spacing-lg)]"
          >
            <Image src="/images/mm.png" alt="mm-flag" width="18" height="12" />
            <SLTypo
              text={profile.lang_mm}
              as="span"
              variant="fontBody2Normal"
              className="mt-0.5"
              fontFamily="var(--font-figtree)"
            />
          </Label>
        </div>
        <div className="flex items-center space-x-[var(--core-spacing-xl)] rounded-[var(--core-border-radius-sm)] border px-[var(--core-spacing-lg)] shadow-sm">
          <RadioGroupItem value="en" id="en" />
          <Label
            htmlFor="en"
            className="flex items-center gap-2 cursor-pointer w-full h-full py-[var(--core-spacing-lg)]"
          >
            <Image src="/images/usa.png" alt="en-flag" width="18" height="12" />
            <SLTypo
              text={profile.lang_en}
              as="span"
              variant="fontBody2Normal"
              className="mt-0.5"
              fontFamily="var(--font-figtree)"
            />
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
