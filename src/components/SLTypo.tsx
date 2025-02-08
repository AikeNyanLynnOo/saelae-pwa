"use client";
import { fontFunc, typoSystem, TypoVariants } from "@/lib/typoSystem";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export interface SLTypoProps {
  as?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "span"
    | "p"
    | "div"
    | "strong"
    | "em"
    | "small"
    | "label";
  text?: string;
  variant?: (typeof TypoVariants)[number];
  className?: string;
  fontFamily?: string;
  [otherProp: string]: any;

}

export const SLTypo = ({
  as = "span",
  text,
  variant = "fontBody1Normal",
  className,
  fontFamily,
  ...props
}: SLTypoProps) => {
  const typoClasses = useMemo(
    () => twMerge("leading-6", className),
    [className]
  );
  const typoStyle = useMemo(
    () =>
      fontFunc({
        ...typoSystem[`${variant}`],
      }),
    [variant]
  );

  return React.createElement(
    as,
    {
      className: typoClasses,
      style: {
        ...typoStyle,
        fontFamily: fontFamily || typoStyle.fontFamily,
      },
    },
    text || props.children

  );
};
