"use client";
import Link from "next/link";
import { ImageWithPlaceholder } from "@/components/atoms/ImageWithPlaceholder";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { SLTypo } from "@/components/SLTypo";
import { Button } from "@/components/ui/button";
import { LanguageDropDown } from "../atoms/LanguageDropDown";
import { useTranslate } from "../hooks/use-translate";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import toast, { Toaster } from "react-hot-toast";
import { LockKeyholeOpen } from "lucide-react";

export const WelcomeLayout = () => {
  const params = useSearchParams();
  const { messages, isLoading } = useTranslate();
  const { common } = messages;
  const { welcome } = messages;

  useEffect(() => {
    if (
      params.get("session_expired") &&
      params.get("session_expired") === "true"
    ) {
      toast.dismiss();
      toast(common && common.toast_pls_login, {
        icon: <LockKeyholeOpen size={16} />,
      });
    }
  }, [params, common]);
  return (
    <CommonLayout isLoading={isLoading}>
      <LanguageDropDown />
      <div className="w-full sm:w-fit px-4 sm:px-0">
        {/* Image placeholder */}
        <Image
          src={logo}
          alt="logo"
          className="w-24 h-24 rounded-lg mx-auto mb-4"
        />

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
      <Toaster position="top-center" reverseOrder={false} />
    </CommonLayout>
  );
};
