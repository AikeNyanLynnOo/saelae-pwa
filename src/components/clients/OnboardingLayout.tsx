import { OnboardingStepper } from "@/components/atoms/forms/OnboardingStepper";
import { CommonLayout } from "@/components/layouts/CommonLayout";

export const OnboardingLayout = () => {
  return (
    <CommonLayout isLoading={false}>
      <div className="w-full lg:w-3/6 min-h-[100dvh]">
        <OnboardingStepper />
      </div>
    </CommonLayout>
  );
};
