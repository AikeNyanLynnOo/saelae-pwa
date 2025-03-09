"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SLTypo } from "../SLTypo";
import { LabelWithIcon } from "./LabelWithIcon";
import { ChevronDown, Globe } from "lucide-react";
import { Female, Male } from "./CustomIcon";
import { useCommonStore } from "@/store/common-store";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslate } from "../hooks/use-translate";

interface LanguageDropDownProps {
  children?: React.ReactNode;
  customClasses?: string;
}

export const LanguageDropDown = ({
  children,
  customClasses,
}: LanguageDropDownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const { lang, setLanguage } = useCommonStore();
  const { messages, isLoading } = useTranslate();
  const { welcome } = messages;

  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("lang", newLanguage);

    router.refresh();
  };

  return (
    <div className="flex flex-col gap-y-[var(--core-spacing-base)] items-center absolute top-5 right-4  md:right-1/2 md:translate-x-1/2">
      <DropdownMenu onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none p-0">
            <LabelWithIcon
              label={welcome.lang_setting}
              icon={Globe}
              iconPosition="start"
              variant="fontButtonMdSemibold"
              className="py-[var(--core-spacing-sm)]] gap-x-2.5"
              iconClassName={`h-4 w-4 ${isOpen ? "text-[var(--semantic-color-icon-brand-default)]" : "text-[var(--semantic-color-icon-default)]"}`}
              labelClassName={
                isOpen
                  ? "text-[var(--semantic-color-text-brand-default)]"
                  : "text-[var(--semantic-color-text-bold)]"
              }
              labelFontFamily={lang === "en" ? "var(--font-figtree)" : ""}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit min-w-fit">
          <DropdownMenuItem key={0} onSelect={() => {}}>
            <RadioGroup
              value={lang}
              onValueChange={handleLanguageChange}
              className="px-0 py-0 gap-0"
            >
              <div className="flex w-full border-b items-center space-x-[var(--core-spacing-lg)] px-[var(--core-spacing-lg)]">
                <RadioGroupItem value="mm" id="mm" />
                <Label
                  htmlFor="mm"
                  className="flex items-center gap-2 cursor-pointer w-full h-full py-[var(--core-spacing-lg)]"
                >
                  <Image
                    src="/images/mm.png"
                    alt="mm-flag"
                    width="18"
                    height="12"
                  />
                  <SLTypo
                    text={welcome.lang_mm}
                    as="span"
                    variant="fontBody2Normal"
                    className="mt-0.5"
                    fontFamily="var(--font-figtree)"
                  />
                </Label>
              </div>
              <div className="flex w-full items-center space-x-[var(--core-spacing-lg)] px-[var(--core-spacing-lg)]">
                <RadioGroupItem value="en" id="en" />
                <Label
                  htmlFor="en"
                  className="flex items-center gap-2 cursor-pointer w-full h-full py-[var(--core-spacing-lg)]"
                >
                  <Image
                    src="/images/usa.png"
                    alt="en-flag"
                    width="18"
                    height="12"
                  />
                  <SLTypo
                    text={welcome.lang_en}
                    as="span"
                    variant="fontBody2Normal"
                    className="mt-0.5"
                    fontFamily="var(--font-figtree)"
                  />
                </Label>
              </div>
            </RadioGroup>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
