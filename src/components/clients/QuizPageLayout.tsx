import { CommonLayout } from "@/components/layouts/CommonLayout";
import { Button } from "../ui/button";
import { SLTypo } from "../SLTypo";
import { Heart, MoveRight } from "lucide-react";

interface QuizPageLayoutProps {
  children: React.ReactNode;
  customClasses?: string;
  hideBottomCta?: boolean;
  showPrimaryButton?: boolean;
  primaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  showSecondaryButton?: boolean;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
  primaryButtonClasses?: string;
  secondaryButtonClasses?: string;
  isCompleted?: boolean;
  canProceed?: boolean;
}

export const QuizPageLayout = ({
  children,
  customClasses,
  hideBottomCta = false,
  showPrimaryButton = true,
  primaryButtonText = "နောက်တစ်ခု",
  onPrimaryButtonClick,
  showSecondaryButton = false,
  secondaryButtonText = "ထပ်မံဖြေဆိုမယ်",
  onSecondaryButtonClick,
  primaryButtonClasses,
  secondaryButtonClasses,
  isCompleted,
  canProceed,
}: QuizPageLayoutProps) => {
  return (
    <CommonLayout
      isLoading={false}
      customClasses="block h-[100dvh] relative w-full md:w-4/6 lg:w-1/2 mx-auto"
    >
      <main className="flex-1">{children}</main>

      {!hideBottomCta && (
        <div
          className={`w-full p-[var(--core-spacing-xl)] md:py-0 lg:px-12 xl:px-20 max-w-screen-lg left-1/2 -translate-x-1/2 fixed bottom-0 ${isCompleted ? "bg-[var(--semantic-color-bg-layoutsecondary)]" : "bg-[var(--semantic-color-bg-layoutprimary)]"} md:bg-transparent rounded-t-[var(--core-border-radius-md)]`}
        >
          <div className="w-full px-0 md:px-6 md:w-4/6 lg:w-1/2 flex flex-col items-center gap-[var(--core-spacing-md)] mx-auto bg-transparent md:bg-white md:py-2">
            {showSecondaryButton && (
              <Button
                variant="outline"
                disabled={!canProceed}
                className={`w-full rounded-[var(--core-border-radius-xs)] bg-transparent border ${
                  isCompleted
                    ? "border-[var(--semantic-color-outline-brand-default)]"
                    : "border-[var(--semantic-color-outline-update-default)]"
                } py-[var(--core-spacing-sm)]`}
                onClick={onSecondaryButtonClick}
              >
                <SLTypo
                  as="span"
                  text={secondaryButtonText}
                  variant="fontButtonMdSemibold"
                  className={
                    (isCompleted &&
                      "text-[var(--semantic-color-text-brand-default)]") ||
                    "text-[var(--semantic-color-text-update-default)]"
                  }
                />
              </Button>
            )}
            {showPrimaryButton && (
              <Button
                variant="outline"
                disabled={!canProceed}
                className={`w-full rounded-[var(--core-border-radius-xs)] ${
                  isCompleted
                    ? "bg-[var(--component-mode-1-color-button-bg-primary-enabled)] hover:bg-[var(--component-mode-1-color-button-bg-primary-hovered)]"
                    : "bg-[var(--semantic-color-bg-update-secondary)] hover:bg-[var(--semantic-color-bg-update-primary)]"
                } border-none py-[var(--core-spacing-sm)]`}
                onClick={onPrimaryButtonClick}
              >
                <SLTypo
                  as="span"
                  text={isCompleted ? "ဆက်လေ့လာမယ်" : primaryButtonText}
                  variant="fontButtonMdSemibold"
                  className={
                    (isCompleted && "text-white") ||
                    "text-[var(--semantic-color-text-bold)]"
                  }
                />
                {!isCompleted && <MoveRight className="!h-4 ml-1" />}
              </Button>
            )}
          </div>
        </div>
      )}
    </CommonLayout>
  );
};
