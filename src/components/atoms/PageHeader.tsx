"use client";

import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import { Divider } from "./Divider";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { LabelWithIcon } from "./LabelWithIcon";

interface PageHeaderProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  customBackUrl?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const PageHeader = ({
  title,
  description,
  showBackButton = false,
  customBackUrl,
  className,
  titleClassName,
  descriptionClassName,
}: PageHeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (customBackUrl) {
      router.push(customBackUrl);
    } else {
      router.back();
    }
  };

  return (
    <>
      <div className={cn("w-full px-6 py-4 space-y-2", className)}>
        <div className="flex items-center justify-between gap-3">
          <ImagePlaceholder
            className="w-10 h-10 rounded-sm"
            containerClassName="mb-0"
          />
          <LabelWithIcon
            label="3"
            icon={Flame}
            variant="fontBody2IntenseSemibold"
          />
        </div>
      </div>
      <Divider
        className="my-0"
        wrapperClassName="px-0 md:px-6 sticky top-[73px] z-20"
      />
    </>
  );
};
