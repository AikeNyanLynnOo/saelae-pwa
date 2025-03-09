"use client";
import Link from "next/link";
import { ImageWithPlaceholder } from "@/components/atoms/ImageWithPlaceholder";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { SLTypo } from "@/components/SLTypo";
import { Button } from "@/components/ui/button";
import { LanguageDropDown } from "../atoms/LanguageDropDown";
import { useTranslate } from "../hooks/use-translate";

export const WelcomeLayout = () => {
  const { messages, isLoading } = useTranslate();
  const { welcome } = messages;
  return (
    <CommonLayout isLoading={isLoading}>
      <LanguageDropDown />
      <div className="w-full sm:w-fit px-4 sm:px-0">
        {/* Image placeholder */}
        <ImageWithPlaceholder src="/images/logo.png" />

        <div className="mb-12">
          {/* Title */}
          <SLTypo
            as="h1"
            variant="fontH4Semibold"
            className="text-center text-[var(--semantic-color-text-bold)] mb-2"
            isDangerously
          >
            {welcome.title}
          </SLTypo>

          {/* Description */}
          <SLTypo
            as="p"
            variant="fontBody3Normal"
            className="text-center text-[var(semantic-color-text-subtle)] !leading-5"
            isDangerously
          >
            {welcome.text}
          </SLTypo>
        </div>

        {/* Button */}
        <Button asChild>
          <Link href="/auth">{welcome.cta_text}</Link>
        </Button>
      </div>
    </CommonLayout>
  );
};
