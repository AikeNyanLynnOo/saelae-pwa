"use client";

import { SLTypo } from "@/components/SLTypo";
import { TypoVariants } from "@/lib/typoSystem";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface LabelWithIconProps {
  label: string;
  icon?: LucideIcon;
  customIcon?: () => JSX.Element;
  iconPosition?: "start" | "end";
  variant?: (typeof TypoVariants)[number];
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  labelFontFamily?: string;
  onClick?: () => void;
  iconProps?: any;
  children?: any;
}

export const LabelWithIcon = ({
  label,
  icon: Icon,
  customIcon,
  iconPosition = "start",
  variant = "fontLabelMedium",
  className,
  iconClassName,
  labelClassName,
  labelFontFamily,
  onClick,
  iconProps,
  children,
}: LabelWithIconProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 w-fit",
        iconPosition === "end" && "flex-row-reverse",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : "none"}
    >
      {Icon && (
        <Icon
          className={cn(
            "w-4 h-4 text-[var(--semantic-color-text-subtlest)]",
            iconClassName
          )}
          strokeWidth={1.5}
          {...iconProps}
        />
      )}
      {customIcon && customIcon()}

      <SLTypo
        text={label}
        variant={variant}
        className={cn(
          "text-[var(--semantic-color-text-subtlest)]",
          labelClassName
        )}
        fontFamily={labelFontFamily}
      />
      {children}
    </div>
  );
};
