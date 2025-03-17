"use client";

import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import { Divider } from "./Divider";
import { ImageWithPlaceholder } from "./ImageWithPlaceholder";
import { LabelWithIcon } from "./LabelWithIcon";
import { use, useMemo } from "react";
import { useAuthStore } from "@/store/auth-store";

interface PageHeaderProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  customBackUrl?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  [otherProp: string]: any;
}

export const PageHeader = ({
  title,
  description,
  showBackButton = false,
  customBackUrl,
  className,
  titleClassName,
  descriptionClassName,
  ...props
}: PageHeaderProps) => {
  const router = useRouter();
  const { currentUser } = useAuthStore();

  const handleBack = () => {
    if (customBackUrl) {
      router.push(customBackUrl);
    } else {
      router.back();
    }
  };

  return (
    <>
      <div
        className={cn(
          `w-full px-[var(--core-spacing-xl)] py-[var(--core-spacing-lg)] ${(props.children && "space-y-[var(--core-spacing-sm)]") || ""} `,
          className
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <ImageWithPlaceholder
            className="w-10 h-10 rounded-sm"
            containerClassName="mb-0"
            src="/images/logo.png"
          />
          <LabelWithIcon
            label={(currentUser && currentUser.streak_count) || "0"}
            icon={Flame}
            variant="fontBody2IntenseSemibold"
            iconClassName="-mt-1"
          />
        </div>
        <div>{props.children}</div>
      </div>
      <Divider
        className="my-0"
        wrapperClassName={`px-0 md:px-6 sticky ${(props.children && "top-[116px]") || "top-[73px]"} z-20`}
      />
    </>
  );
};
