"use client";

import { SLTypo } from "@/components/SLTypo";
import { Button } from "@/components/ui/button";
import { TypoVariants } from "@/lib/typoSystem";
import { cn } from "@/lib/utils";
import { ArrowLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface ContentHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  showPrimaryButton?: boolean;
  showHeartButton?: boolean;
  primaryButtonText?: string;
  customBackUrl?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  titleVariant?: (typeof TypoVariants)[number];
  descriptionVariant?: (typeof TypoVariants)[number];
  onPrimaryButtonClick?: () => void;
  onHeartButtonClick?: () => void;
  isHeartActive?: boolean;
}

export const ContentHeader = ({
  title,
  description,
  showBackButton = false,
  showPrimaryButton = false,
  showHeartButton = false,
  primaryButtonText = "ဆက်လက်မယ်",
  customBackUrl,
  className,
  titleClassName,
  descriptionClassName,
  titleVariant,
  descriptionVariant,
  onPrimaryButtonClick,
  onHeartButtonClick,
  isHeartActive = false,
}: ContentHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (customBackUrl) {
      router.push(customBackUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className={cn("w-full px-6 py-4", className)}>
      <div className="flex flex-col gap-2">
        {showBackButton && (
          <button
            onClick={handleBack}
            className="hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="space-y-1">
          <SLTypo
            as="h1"
            text={title}
            variant={titleVariant || "fontH6Semibold"}
            className={cn(
              "text-[var(--semantic-color-text-bold)]",
              titleClassName
            )}
          />
          {description && (
            <SLTypo
              as="p"
              text={description}
              variant={descriptionVariant || "fontBody2Normal"}
              className={cn(
                "text-[var(--semantic-color-text-subtle)]",
                descriptionClassName
              )}
            />
          )}
        </div>
        <div className="flex gap-1 items-center">
          {showPrimaryButton && (
            <div className="px-4">
              <Button
                onClick={onPrimaryButtonClick}
                className="w-full bg-[var(--semantic-color-bg-brand-default)] hover:bg-[var(--semantic-color-bg-brand-hovered)]"
              >
                {primaryButtonText}
              </Button>
            </div>
          )}
          {showHeartButton && (
            <button
              onClick={onHeartButtonClick}
              className={cn(
                "p-2 rounded-full transition-colors",
                isHeartActive
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <Heart
                className="w-5 h-5"
                fill={isHeartActive ? "currentColor" : "none"}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
