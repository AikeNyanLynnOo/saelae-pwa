"use client";
import { useMemo } from "react";
import { SLLabel } from "@/components/atoms/forms/Label";
import { twMerge } from "tailwind-merge";
import { SLTypo } from "@/components/SLTypo";

interface InputGroupProps {
  className?: string;
  labelText?: string;
  htmlFor?: string;
  bottomText?: string;
  isErr?: boolean;
  [otherProp: string]: any;
}

export const InputGroup = ({
  className,
  labelText,
  htmlFor,
  bottomText,
  isErr = false,
  ...props
}: InputGroupProps) => {
  const inputGroupClasses = useMemo(
    () =>
      twMerge("flex flex-col gap-y-[var(--core-spacing-sm)]", className || ""),
    [className]
  );

  const bottomTextClasses = useMemo(
    () =>
      twMerge(
        "text-[var(--semantic-color-text-subtle)]",
        isErr && "text-[var(--semantic-color-text-negative-default)]"
      ),
    [isErr]
  );
  return (
    <div className={inputGroupClasses}>
      <SLLabel labelText={labelText} htmlFor={htmlFor} />
      {props.children}
      <SLTypo
        text={bottomText}
        variant="fontBody4Normal"
        className={bottomTextClasses}
      />
    </div>
  );
};
