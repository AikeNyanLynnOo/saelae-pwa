"use client";

import { SLTypo } from "@/components/SLTypo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, CircleCheck, Timer, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { LabelWithIcon } from "../LabelWithIcon";
import { useTranslate } from "@/components/hooks/use-translate";
import { useCommonStore } from "@/store/common-store";

interface StepProps {
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
  step: number;
  isNextStep: boolean;
}

function StepIndicator({
  isActive,
  isCompleted,
  onClick,
  step,
  isNextStep,
}: StepProps) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center cursor-pointer focus:outline-none group relative"
      disabled={!isCompleted && !isActive && !isNextStep}
    >
      <div
        className={cn(
          "h-3 flex-1 rounded-full transition-all duration-500",
          isActive || isCompleted
            ? "bg-[var(--semantic-color-bg-brand-primary)]"
            : "bg-[var(--semantic-color-bg-brand-subtle)]",
          "group-hover:bg-opacity-80"
        )}
      >
        {isNextStep && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--semantic-color-icon-brand-subtle)] rounded-full" />
        )}
      </div>
    </button>
  );
}

export const QuizStepper = ({
  step,
  totalSteps,
  updateFormData,
  quizState,
  setQuizState,
  isFinalExam = false,
}: {
  step: number;
  totalSteps: number;
  updateFormData: (data: any) => void;
  quizState: string | null;
  setQuizState: any;
  isFinalExam?: boolean;
}) => {
  const { lang } = useCommonStore();
  const { messages, isLoading } = useTranslate();
  const { lessons } = messages;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 1 });
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (
      isFinalExam &&
      timerActive &&
      timeLeft > 0 &&
      quizState === "question"
    ) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isFinalExam && timeLeft === 0 && quizState === "question") {
      setQuizState("timeout");
      setTimerActive(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, timerActive, quizState, isFinalExam]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setTimerActive(false);
    if (option === "option2") {
      setQuizState("correct");
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setQuizState("incorrect");
    }
  };

  const handleClose = () => {
    setQuizState("question");
    setSelectedOption(null);
    setTimeLeft(20);
    setTimerActive(true);
  };

  return (
    <div className="w-full min-h-[100dvh] max-h-[100vh] overflow-y-scroll relative hide-scrollbar">
      {/* Form Content */}
      <div
        className={`space-y-6 pb-28 flex flex-col items-center min-h-[calc(100dvh-20rem)] ${step === 2 ? "justify-center" : ""}`}
      >
        {quizState !== "complete" ? (
          <>
            {/* Header with progress and close button */}
            <div className="flex w-full items-center py-4 px-6 gap-x-[var(--core-spacing-sm)]">
              <Button
                variant="link"
                onClick={handleClose}
                className="w-fit p-0"
              >
                <X className="w-5 h-5 text-[var(--semantic-color-icon-default)]" />
              </Button>
              <div className="h-2 flex-1 bg-[var(--semantic-color-bg-primary)] rounded-full">
                <div
                  className="h-2 bg-yellow-400 rounded-full transition-all duration-300 ease-linear"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>
              {isFinalExam && (
                <LabelWithIcon
                  label={`${timeLeft} s`}
                  icon={Timer}
                  variant="fontBody2Normal"
                  iconClassName="w-4 h-4 text-[var(--semantic-color-icon-default)]"
                  labelClassName="text-[var(--semantic-color-text-default)] mt-0.5"
                  labelFontFamily="var(--font-figtree)"
                />
              )}
            </div>

            <div className="space-y-[var(--core-spacing-lg)]">
              {/* Question */}
              <SLTypo
                as="h1"
                text="ကလေးမွေးလာရင်မွေးဆံပင်နဲ့မထားနဲ့။ ဆံပင်မသန်ဘူး။ ဒါကြောင့်ကတုံးရိတ်ရမယ် ဆိုတာ မှန်ပါသလား။"
                variant="fontH4Semibold"
                className={cn(
                  "text-[var(--semantic-color-text-default)]",
                  "px-6"
                )}
              />

              {/* Options */}
              <div className="space-y-[var(--core-spacing-lg)] px-6">
                <button
                  onClick={() => handleOptionSelect("option1")}
                  className={`w-full px-[var(--core-spacing-lg)] py-[var(--core-spacing-lg)] rounded-full border text-left ${
                    selectedOption === "option1" && quizState === "incorrect"
                      ? "bg-[var(--semantic-color-bg-negative-subtlest)] border-[var(--semantic-color-outline-negative-default)]"
                      : selectedOption === "option1"
                        ? "bg-white border-[var(--semantic-color-outline-subtle)]"
                        : "border-[var(--semantic-color-outline-subtle)]"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                        selectedOption === "option1" &&
                        quizState === "incorrect"
                          ? "border-[var(--semantic-color-icon-negative-default)]"
                          : "border-[var(--semantic-color-icon-default)]"
                      }`}
                    >
                      {selectedOption === "option1" && (
                        <div className="w-2 h-2 rounded-full bg-[var(--semantic-color-icon-negative-default)]" />
                      )}
                    </div>
                    <SLTypo
                      as="span"
                      text="မှန်ပါတယ်၊ ကတုံးရိတ်သင့်ပါတယ်။"
                      variant="fontBody2IntenseNormal"
                      className={cn("text-[var(--semantic-color-text-bold)]")}
                    />
                  </div>
                </button>

                <button
                  onClick={() => handleOptionSelect("option2")}
                  className={`w-full px-[var(--core-spacing-lg)] py-[var(--core-spacing-lg)] rounded-full border text-left ${
                    selectedOption === "option2" && quizState === "correct"
                      ? "bg-[var(--semantic-color-bg-positive-subtlest)] border-[var(--semantic-color-outline-positive-default)]"
                      : selectedOption === "option2"
                        ? "bg-white border-[var(--semantic-color-outline-subtle)]"
                        : "border-[var(--semantic-color-outline-subtle)]"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                        selectedOption === "option2" && quizState === "correct"
                          ? "border-[var(--semantic-color-outline-positive-default)]"
                          : "border-[var(--semantic-color-icon-default)]"
                      }`}
                    >
                      {selectedOption === "option2" && (
                        <div className="w-2 h-2 rounded-full bg-[var(--semantic-color-icon-positive-default)]" />
                      )}
                    </div>
                    <SLTypo
                      as="span"
                      text="မှားပါတယ်၊ ကတုံးမရိတ်သင့်ပါဘူး။"
                      variant="fontBody2IntenseNormal"
                      className={cn("text-[var(--semantic-color-text-bold)]")}
                    />
                  </div>
                </button>
              </div>

              {/* Feedback for incorrect answer */}
              {quizState === "incorrect" && (
                <div className="mt-4 mx-0 md:mx-[var(--core-spacing-xl)] py-[var(--core-spacing-lg)] px-[var(--core-spacing-xl)] bg-[var(--semantic-color-bg-negative-subtlest)] text-[var(--semantic-color-text-default)]">
                  <div className="flex items-start">
                    <XCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-[var(--semantic-color-icon-negative-default)]" />
                    <SLTypo
                      as="div"
                      text="မှားပါတယ်၊  ဆံပင်သန်မှု၊မသန်မှုဟာ မျိုးဗီဇနဲ့ပိုဆိုင်ပါတယ်။ ဒါကြောင့် မွေးစကနေ ခြောက်လအထိကလေးကို လုံးဝကတုံးမရိတ်ပေးသင့်ပါဘူး။ ကတုံးရိတ်ရာကနေ မတော်တဆအနာဖြစ်နိုင်ပါတယ်။ မေးခိုင်ပိုးဝင်နိုင်ပါတယ်။ဆံပင်မရှိလို့ နှာစေးနိုင်ပါတယ်။ ငယ်ထိပ်မပိတ်တဲ့အချိန်အရေပြားပွန်းရာကနေ ပိုးဝင်ပြီး ဦးနှောက်အမြှေးပါးယောင်ပြီး မစွမ်းမသန်ဖြစ်နိုင်ပါတယ်။"
                      variant="fontBody2Normal"
                      className={cn(
                        "text-[var(--semantic-color-text-default)]"
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Feedback for correct answer */}
              {quizState === "correct" && (
                <div className="mt-4 mx-0 md:mx-[var(--core-spacing-xl)] py-[var(--core-spacing-lg)] px-[var(--core-spacing-xl)] bg-[var(--semantic-color-bg-positive-subtlest)] text-[var(--semantic-color-text-default)]">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0 text-[var(--semantic-color-icon-positive-default)]" />
                    <SLTypo
                      as="div"
                      text={lessons.correct_text}
                      variant="fontBody2Normal"
                      className={cn(
                        "text-[var(--semantic-color-text-default)]"
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Feedback for timeout */}
              {quizState === "timeout" && (
                <div className="mt-4 mx-0 md:mx-[var(--core-spacing-xl)] py-[var(--core-spacing-lg)] px-[var(--core-spacing-xl)] bg-[var(--semantic-color-bg-negative-subtlest)] text-[var(--semantic-color-text-default)]">
                  <div className="flex items-start">
                    <XCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-[var(--semantic-color-icon-negative-default)]" />
                    <SLTypo
                      as="div"
                      text={lessons.times_up_text}
                      variant="fontBody2Normal"
                      className={cn(
                        "text-[var(--semantic-color-text-default)]"
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          // Complete screen
          <div className="flex flex-col items-center justify-center p-8 h-full gap-y-[var(--core-spacing-lg)]">
            <CircleCheck className="h-20 w-20 text-white" fill="#28A745" />
            <SLTypo
              as="p"
              isDangerously
              text={
                (isFinalExam && lessons.exam_complete_title) ||
                lessons.lesson_complete_title
              }
              variant="fontH4Semibold"
              className={cn(
                "text-[var(--semantic-color-text-default)] text-center px-6"
              )}
            />

            <SLTypo
              as="p"
              variant="fontBody3Normal"
              className={cn(
                "text-[var(--semantic-color-text-default)] w-full flex items-center justify-between"
              )}
            >
              <span>{lessons.question_count_text}</span>
              <span>
                {score.correct} {lang === "mm" && "ခု"}
              </span>
            </SLTypo>
            <SLTypo
              as="p"
              variant="fontBody3Normal"
              className={cn(
                "text-[var(--semantic-color-text-default)] w-full flex items-center justify-between"
              )}
            >
              <span>{lessons.correct_count_text}</span>
              <span>{score.total} ခု</span>
            </SLTypo>
          </div>
        )}
      </div>
    </div>
  );
};
