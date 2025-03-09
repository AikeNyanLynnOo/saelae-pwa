import { CommonLayout } from "@/components/layouts/CommonLayout";
import { Button } from "../ui/button";
import { SLTypo } from "../SLTypo";
import { Heart } from "lucide-react";
import { useTranslate } from "../hooks/use-translate";

interface LessonPageLayoutProps {
  children: React.ReactNode;
  customClasses?: string;
  hideBottomCta?: boolean;
  showHeartButton?: boolean;
  showPrimaryButton?: boolean;
  primaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  isHeartActive?: boolean;
  onHeartButtonClick?: () => void;
}

export const LessonPageLayout = ({
  children,
  customClasses,
  hideBottomCta = false,
  showHeartButton,
  showPrimaryButton = true,
  primaryButtonText,
  onPrimaryButtonClick,
  isHeartActive,
  onHeartButtonClick,
}: LessonPageLayoutProps) => {
  const { messages, isLoading } = useTranslate();
  const { lessons } = messages;

  return (
    <CommonLayout
      isLoading={isLoading}
      customClasses="block h-[100dvh] relative w-full md:w-4/6 lg:w-1/2 mx-auto"
    >
      <main className="flex-1">{children}</main>

      {!hideBottomCta && (
        <div className="w-full p-[var(--core-spacing-xl)] md:py-0 lg:px-12 xl:px-20 max-w-screen-lg left-1/2 -translate-x-1/2 fixed bottom-0 bg-[var(--semantic-color-bg-layoutprimary)] md:bg-transparent rounded-t-[var(--core-border-radius-md)]">
          <div className="w-full px-0 md:px-6 md:w-4/6 lg:w-1/2 flex items-center gap-[var(--core-spacing-md)] mx-auto bg-transparent md:bg-white md:py-2">
            {showPrimaryButton && (
              <Button
                variant="outline"
                className={`w-full rounded-[var(--core-border-radius-xs)] bg-[var(--semantic-color-bg-update-secondary)] hover:bg-[var(--semantic-color-bg-update-primary)] border-none py-[var(--core-spacing-sm)]`}
                onClick={onPrimaryButtonClick}
              >
                <SLTypo
                  as="span"
                  text={
                    primaryButtonText ||
                    lessons.cta_for_quiz ||
                    "ဉာဏ်စမ်းဖြေမယ်"
                  }
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
        </div>
      )}
    </CommonLayout>
  );
};
