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
  hideCta?: boolean;
}

export const ContentHeader = ({
  title,
  description,
  showBackButton = false,
  showPrimaryButton = false,
  showHeartButton = false,
  primaryButtonText = "ဉာဏ်စမ်းဖြေမယ်",
  customBackUrl,
  className,
  titleClassName,
  descriptionClassName,
  titleVariant,
  descriptionVariant,
  onPrimaryButtonClick,
  onHeartButtonClick,
  isHeartActive = false,
  hideCta = false,
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
    <div
      className={cn(
        "w-full px-6 py-4 flex flex-col gap-[var(--core-spacing-md)]",
        className
      )}
    >
      {showBackButton && (
        <Button variant="link" onClick={handleBack} className="w-fit p-0">
          <ArrowLeft className="w-5 h-5 text-[var(--semantic-color-icon-default)]" />
        </Button>
      )}
      <div className="space-y-[var(--core-spacing-base)]">
        <SLTypo
          as="h1"
          text={title}
          variant={titleVariant || "fontH4Semibold"}
          className={cn(
            "text-[var(--semantic-color-text-default)]",
            titleClassName
          )}
        />
        {description && (
          <SLTypo
            as="p"
            text={description}
            variant={descriptionVariant || "fontBody3Normal"}
            className={cn(
              "text-[var(--semantic-color-text-subtle)]",
              descriptionClassName
            )}
          />
        )}
      </div>
      {!hideCta && (
        <div className="flex gap-[var(--core-spacing-md)] items-center">
          {showPrimaryButton && (
            <Button
              variant="outline"
              className={`w-full rounded-[var(--core-border-radius-xs)] bg-[var(--semantic-color-bg-update-secondary)] hover:bg-[var(--semantic-color-bg-update-primary)] border-none py-[var(--core-spacing-sm)]`}
              onClick={onPrimaryButtonClick}
            >
              <SLTypo
                as="span"
                text={primaryButtonText}
                variant="fontButtonMdSemibold"
                className="text-[var(--semantic-color-text-bold)]"
              />
            </Button>
          )}
          {showHeartButton && (
            <Button
              variant="outline"
              className={`w-fit rounded-[var(--core-border-radius-xs)] bg-[var(--semantic-color-bg-new-subtlest)] hover:bg-[var(--semantic-color-bg-new-subtle)] border-none py-[var(--core-spacing-sm)] px-[var(--core-spacing-md)]`}
              onClick={onHeartButtonClick}
            >
              <Heart
                className="w-5 h-5 text-[var(--semantic-color-icon-new-default)]"
                fill={isHeartActive ? "currentColor" : "none"}
              />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
