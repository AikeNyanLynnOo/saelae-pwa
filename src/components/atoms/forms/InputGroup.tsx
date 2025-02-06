"use client";
import { useMemo } from "react";
import { SLLabel } from "./Label";
import { twMerge } from "tailwind-merge";
import { SLTypo } from "@/components/SLTypo";

interface InputGroupProps {
  className?: string;
  labelText?: string;
  htmlFor?: string;
  bottomText?: string;
  [otherProp: string]: any;
}

export const InputGroup = ({
  className,
  labelText,
  htmlFor,
  bottomText,
  ...props
}: InputGroupProps) => {
  const inputGroupClasses = useMemo(
    () =>
      twMerge("flex flex-col gap-y-[var(--core-spacing-sm)]", className || ""),
    [className]
  );
  return (
    <div className={inputGroupClasses}>
      <SLLabel labelText={labelText} htmlFor={htmlFor} />
      {props.children}
      <SLTypo
        text={bottomText}
        variant="fontBody4Normal"
        className="text-[var(--semantic-color-text-subtle)]"
      />
    </div>
  );
};
