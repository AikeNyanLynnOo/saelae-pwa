"use client";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { LoadingSpinner } from "../atoms/Loading";

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
  const commonLayoutClasses = useMemo(() => {
    return twMerge(
      "flex min-h-screen items-center justify-center",
      customClasses
    );
  }, []);

  return (
    <div className={commonLayoutClasses}>
      {(isLoading && <LoadingSpinner />) || children}
    </div>
  );
};
