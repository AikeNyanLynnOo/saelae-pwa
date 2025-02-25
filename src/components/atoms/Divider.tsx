"use client";

import { cn } from "@/lib/utils";

interface DividerProps {
  wrapperClassName?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
  contentPosition?: "left" | "center" | "right";
  contentClassName?: string;
}

export const Divider = ({
  wrapperClassName,
  className,
  orientation = "horizontal",
  children,
  contentPosition = "center",
  contentClassName,
}: DividerProps) => {
  const isHorizontal = orientation === "horizontal";

  const dividerStyles = cn(
    "relative",
    isHorizontal ? "w-full h-[1px] my-4" : "h-full w-[1px] mx-4 min-h-[20px]",
    "bg-[var(--semantic-color-outline-subtle)]",
    !children && "opacity-100",
    children && "opacity-0",
    className
  );

  const contentStyles = cn(
    "absolute bg-white px-2",
    isHorizontal
      ? "top-1/2 -translate-y-1/2"
      : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90",
    {
      "left-4": contentPosition === "left" && isHorizontal,
      "left-1/2 -translate-x-1/2": contentPosition === "center" && isHorizontal,
      "right-4": contentPosition === "right" && isHorizontal,
    },
    contentClassName
  );

  const wrapperStyles = cn(
    "relative",
    isHorizontal ? "w-full" : "h-full inline-block",
    wrapperClassName
  );
  return (
    <div className={wrapperStyles}>
      <div className={dividerStyles} />
      {children && <div className={contentStyles}>{children}</div>}
    </div>
  );
};
