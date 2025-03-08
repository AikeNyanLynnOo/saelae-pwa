"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { SLTypo } from "@/components/SLTypo";
import Image from "next/image";

export default function LanguageSelection() {
  const [language, setLanguage] = useState("english");

  return (
    <div className="max-w-md mx-auto">
      <RadioGroup
        value={language}
        onValueChange={setLanguage}
        className="space-y-[var(--core-spacing-sm)]"
      >
        <div className="flex items-center space-x-[var(--core-spacing-xl)] rounded-[var(--core-border-radius-sm)] border px-[var(--core-spacing-lg)] shadow-sm">
          <RadioGroupItem value="burmese" id="burmese" />
          <Label
            htmlFor="burmese"
            className="flex items-center gap-2 cursor-pointer w-full h-full py-[var(--core-spacing-lg)]"
          >
            <Image src="/images/mm.png" alt="mm-flag" width="18" height="12" />
            <SLTypo
              text="Burmese"
              as="span"
              variant="fontBody2Normal"
              className="mt-0.5"
              fontFamily="var(--font-figtree)"
            />
          </Label>
        </div>
        <div className="flex items-center space-x-[var(--core-spacing-xl)] rounded-[var(--core-border-radius-sm)] border px-[var(--core-spacing-lg)] shadow-sm">
          <RadioGroupItem value="english" id="english" />
          <Label
            htmlFor="english"
            className="flex items-center gap-2 cursor-pointer w-full h-full py-[var(--core-spacing-lg)]"
          >
            <Image src="/images/usa.png" alt="mm-flag" width="18" height="12" />
            <SLTypo
              text="English"
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
