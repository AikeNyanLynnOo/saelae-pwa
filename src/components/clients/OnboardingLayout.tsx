import { OnboardingStepper } from "@/components/atoms/forms/OnboardingStepper";
import { CommonLayout } from "@/components/layouts/CommonLayout";

export const OnboardingLayout = () => {
  return (
    <CommonLayout isLoading={false}>
      <div className="w-full md:w-1/2 min-h-[100dvh]">
        <OnboardingStepper />
      </div>
    </CommonLayout>
  );
};
