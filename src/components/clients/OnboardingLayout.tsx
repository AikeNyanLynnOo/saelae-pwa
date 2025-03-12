"use client";
import { OnboardingStepper } from "@/components/atoms/forms/OnboardingStepper";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

interface OnboardingLayoutProps {
  cookies?: any;
}

export const OnboardingLayout = ({ cookies }: OnboardingLayoutProps) => {
  const params = useSearchParams();
  useEffect(() => {
    if (params.get("profile") && params.get("profile") === "incomplete") {
      toast("Please complete profile");
    }
  }, [params]);
  return (
    <CommonLayout isLoading={false}>
      <div className="w-full md:w-4/6 lg:w-1/2 min-h-[100dvh]">
        <OnboardingStepper cookies={cookies} />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </CommonLayout>
  );
};
