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
  canProceed?: boolean;
  handleNext?: () => void;
}

export const QuizPageLayout = ({
  children,
  customClasses,
  hideBottomCta = false,
  showPrimaryButton = true,
  primaryButtonText = "နောက်တစ်ခု",
  onPrimaryButtonClick,
  canProceed,
  handleNext,
}: QuizPageLayoutProps) => {
  return (
    <CommonLayout
      isLoading={false}
      customClasses="block h-[100dvh] relative w-full md:w-4/6 lg:w-1/2 mx-auto"
    >
      <main className="flex-1">{children}</main>

      {!hideBottomCta && (
        <div className="w-full p-[var(--core-spacing-xl)] md:py-0 lg:px-12 xl:px-20 max-w-screen-lg left-1/2 -translate-x-1/2 fixed bottom-0 bg-[var(--semantic-color-bg-layoutprimary)] md:bg-transparent rounded-t-[var(--core-border-radius-md)]">
          <div className="w-full px-0 md:px-6 md:w-4/6 lg:w-1/2 flex items-center gap-[var(--core-spacing-md)] mx-auto bg-transparent md:bg-white md:py-2">
            {showPrimaryButton && (
              <Button
                variant="outline"
                disabled={!canProceed}
                className={`w-full rounded-[var(--core-border-radius-xs)] bg-[var(--semantic-color-bg-update-secondary)] hover:bg-[var(--semantic-color-bg-update-primary)] border-none py-[var(--core-spacing-sm)]`}
                onClick={onPrimaryButtonClick}
              >
                <SLTypo
                  as="span"
                  text={primaryButtonText}
                  variant="fontButtonMdSemibold"
                  className="text-[var(--semantic-color-text-bold)]"
                />
                <MoveRight className="!h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      )}
    </CommonLayout>
  );
};
