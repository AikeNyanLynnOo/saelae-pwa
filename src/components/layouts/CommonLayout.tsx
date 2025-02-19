"use client";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { LoadingSpinner } from "../atoms/Loading";
import { SLTypo } from "../SLTypo";
import { useCommonStore } from "@/store/common-store";

interface CommonLayoutProps {
  children: React.ReactNode;
  customClasses?: string;
  isLoading?: boolean;
}

export const CommonLayout = ({
  children,
  customClasses,
  isLoading,
}: CommonLayoutProps) => {
  const { loadingText } = useCommonStore();
  const commonLayoutClasses = useMemo(() => {
    return twMerge(
      "flex min-h-[100dvh] items-center justify-center",
      customClasses
    );
  }, [customClasses]);

  return (
    <div className={commonLayoutClasses}>
      {(isLoading && (
        <div className="flex items-center justify-center h-full flex-col">
          <LoadingSpinner />
          <SLTypo
            as="h6"
            text={loadingText}
            variant="fontH6Semibold"
            className="text-center text-[var(--semantic-color-text-default)] mb-4 px-4 lg:px-0"
          />
        </div>
      )) ||
        children}
    </div>
  );
};
