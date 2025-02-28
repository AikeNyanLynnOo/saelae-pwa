"use client";
import { QuizStepper } from "@/components/atoms/forms/QuizStepper";
import { PageHeader } from "@/components/atoms/PageHeader";
import { QuizPageLayout } from "@/components/clients/QuizPageLayout";
import { useRouter } from "next/navigation";
import React from "react";

export default function LessonPage() {
  const router = useRouter();
  const totalSteps = 3;
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState([]);

  const updateFormData = (data: any) => {
    // setFormData(data);
  };

  const canProceed = React.useMemo(() => {
    // check based on step & formData
    return false;
  }, [step, formData]);

  const handleNext = () => {
    if (step === totalSteps) {
      router.push("/onboard/personalize");
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };



  

  return (
    <section>
      <QuizPageLayout canProceed={canProceed} handleNext={handleNext}>
        <PageHeader className="sticky top-0 bg-white z-20" />

        <div className="px-6 space-y-[var(--core-spacing-lg)] pb-20">
          <QuizStepper
            step={step}
            totalSteps={totalSteps}
            updateFormData={updateFormData}
          />
        </div>
      </QuizPageLayout>
    </section>
  );
}
