"use client";
import { QuizStepper } from "@/components/atoms/forms/QuizStepper";
import { PageHeader } from "@/components/atoms/PageHeader";
import { QuizPageLayout } from "@/components/clients/QuizPageLayout";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type QuizState = "question" | "incorrect" | "correct" | "complete" | "timeout";

export default function LessonPage() {
  const router = useRouter();
  const totalSteps = 1;
  const [quizState, setQuizState] = useState<QuizState>("question");
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState([]);
  const [isFinalExam, setIsFinalExam] = useState(true);

  const updateFormData = (data: any) => {
    // setFormData(data);
  };

  const canProceed = React.useMemo(() => {
    // check based on step & formData
    return true;
  }, [step, formData]);

  const showSecondaryButton = React.useMemo(
    () => !isFinalExam && quizState === "complete",
    [isFinalExam, quizState]
  );

  const handleNext = () => {
    console.log("handleNext", step, totalSteps);
    if (quizState === "complete") {
      router.push("/");
      return;
    }
    if (step === totalSteps) {
      setQuizState("complete");
      return;
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <section>
      <QuizPageLayout
        canProceed={canProceed}
        onPrimaryButtonClick={handleNext}
        showSecondaryButton={showSecondaryButton}
        isCompleted={quizState === "complete"}
      >
        <PageHeader className="sticky top-0 bg-white z-20" />

        <div className="space-y-[var(--core-spacing-lg)] pb-20">
          <QuizStepper
            step={step}
            totalSteps={totalSteps}
            quizState={quizState}
            setQuizState={setQuizState}
            updateFormData={updateFormData}
            isFinalExam={isFinalExam}
          />
        </div>
      </QuizPageLayout>
    </section>
  );
}
