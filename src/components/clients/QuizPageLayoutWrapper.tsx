"use client";
import { useRouter } from "next/navigation";
import { useTranslate } from "../hooks/use-translate";
import { useEffect, useMemo, useState } from "react";
import { QuizPageLayout } from "./QuizPageLayout";
import { QuizStepper } from "../atoms/forms/QuizStepper";
import { PageHeader } from "../atoms/PageHeader";
import { getUserProfile } from "@/utils/userAPIFunctions";
import { useAuthStore } from "@/store/auth-store";

export type QuizState =
  | "question"
  | "incorrect"
  | "correct"
  | "complete"
  | "timeout";

interface QuizPageLayoutWrapperProps {
  cookies?: any;
}

export const QuizPageLayoutWrapper = ({
  cookies,
}: QuizPageLayoutWrapperProps) => {
  const { setCurrentUser } = useAuthStore();
  const { messages, isLoading } = useTranslate();
  const { lessons } = messages;
  const router = useRouter();
  const totalSteps = 1;
  const [quizState, setQuizState] = useState<QuizState>("question");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState([]);
  const [isFinalExam, setIsFinalExam] = useState(false);

  // fetchUser
  // checkIsValid
  useEffect(() => {
    getUserProfile({ cookies }).then(
      ({ status, statusText, success, message, data, loading, error }) => {
        // console.log("User >>", success);
        if (success && data) {
          setCurrentUser((data && data.profile) || null);
        } else {
          router.push("/auth?session_expired=true");
        }
      }
    );
  }, [cookies]);

  const updateFormData = (data: any) => {
    // setFormData(data);
  };

  const canProceed = useMemo(() => {
    // check based on step & formData
    return true;
  }, [step, formData]);

  const showSecondaryButton = useMemo(
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
      {!isLoading && (
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
      )}
    </section>
  );
};
