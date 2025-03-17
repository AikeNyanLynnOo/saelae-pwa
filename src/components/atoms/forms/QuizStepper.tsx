"use client";

import { SLTypo } from "@/components/SLTypo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  CircleCheck,
  Frown,
  Timer,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LabelWithIcon } from "../LabelWithIcon";
import { useTranslate } from "@/components/hooks/use-translate";
import { useCommonStore } from "@/store/common-store";
import { useQuizStore } from "@/store/quiz-store";
import { ConfirmQuitModal } from "@/components/molecules/ConfirmQuitModal";

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
  quizState,
  setQuizState,
  isFinalExam = false,
}: {
  step: number;
  totalSteps: number;
  quizState: string | null;
  setQuizState: any;
  isFinalExam?: boolean;
}) => {
  const { lang } = useCommonStore();
  const {
    quizzes,
    setCanProceed,
    selectedOption,
    setSelectedOption,
    explanation,
    setExplanation,
    score,
    setScore,
    timeLeft,
    setTimeLeft,
    timerActive,
    setTimerActive,
    submissions,
    setSubmissions,
    pass,
    score_percentage,
  } = useQuizStore();
  const { messages, isLoading } = useTranslate();
  const { lessons } = messages;

  // const [selectedOption, setSelectedOption] = useState<any | null>(null);
  // const [explanation, setExplanation] = useState(""); // Add this line to store the explanation
  // const [score, setScore] = useState(0);
  // const [timeLeft, setTimeLeft] = useState(30);
  // const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (
      isFinalExam &&
      timerActive &&
      timeLeft > 0 &&
      quizState === "question"
    ) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isFinalExam && timeLeft === 0 && quizState === "question") {
      setQuizState("timeout");
      setSubmissions([
        ...submissions,
        {
          quiz_id: currentQuiz.id,
          answer_ids: [],
        },
      ]);
      setCanProceed(true);
      setTimerActive(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, timerActive, quizState, isFinalExam]);

  const currentQuiz = useMemo(() => {
    return quizzes[step];
  }, [step, quizzes]);

  const handleOptionSelect = useCallback(
    (option: any) => {
      if (timeLeft === 0) return;
      if (selectedOption) return;

      setSubmissions([
        ...submissions,
        {
          quiz_id: currentQuiz.id,
          answer_ids: [option.id],
        },
      ]);
      setCanProceed(true);
      setSelectedOption(option);
      setTimerActive(false);
      if (option && option.is_correct) {
        setQuizState("correct");
        setExplanation(option.explanation);
        setScore(score + 1);
      } else {
        setQuizState("incorrect");
        setExplanation(option.explanation);
      }
    },
    [
      currentQuiz,
      timeLeft,
      selectedOption,
      submissions,
      setSubmissions,
      score,
      setScore,
    ]
  );

  return (
    <div className="w-full min-h-[80dvh] max-h-[80vh] overflow-y-scroll relative hide-scrollbar">
      {/* Form Content */}
      <div
        className={`space-y-6 pb-28 flex flex-col items-center min-h-[calc(100dvh-20rem)] ${step === 2 ? "justify-center" : ""}`}
      >
        {quizState !== "complete" ? (
          <>
            {/* Header with progress and close button */}
            <div className="flex w-full items-center py-4 px-6 gap-x-[var(--core-spacing-sm)]">
              <ConfirmQuitModal>
                <Button variant="link" className="w-fit p-0">
                  <X className="w-5 h-5 text-[var(--semantic-color-icon-default)]" />
                </Button>
              </ConfirmQuitModal>
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

            <div className="space-y-[var(--core-spacing-lg)] w-full">
              {/* Question */}
              <SLTypo
                as="h1"
                text={currentQuiz?.question_text}
                variant="fontH4Semibold"
                className={cn(
                  "text-[var(--semantic-color-text-default)]",
                  "px-6"
                )}
              />

              {/* Options */}
              <div className="space-y-[var(--core-spacing-lg)] px-6">
                {currentQuiz &&
                  currentQuiz.answer_choices &&
                  currentQuiz.answer_choices.length > 0 &&
                  currentQuiz.answer_choices.map(
                    (answer: any, index: number) => {
                      // if (quizState === "incorrect") {
                      return (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(answer)}
                          className={`w-full px-[var(--core-spacing-lg)] py-[var(--core-spacing-lg)] rounded-full border text-left ${
                            selectedOption &&
                            selectedOption.id === answer.id &&
                            !answer.is_correct
                              ? "bg-[var(--semantic-color-bg-negative-subtlest)] border-[var(--semantic-color-outline-negative-default)]"
                              : selectedOption &&
                                  selectedOption.id === answer.id
                                ? " bg-[var(--semantic-color-bg-positive-subtlest)] border-[var(--semantic-color-outline-positive-default)]"
                                : "bg-white border-[var(--semantic-color-outline-subtle)]"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                                selectedOption &&
                                selectedOption.id === answer.id &&
                                !answer.is_correct
                                  ? "border-[var(--semantic-color-icon-negative-default)]"
                                  : "border-[var(--semantic-color-icon-default)]"
                              }`}
                            >
                              {selectedOption &&
                                selectedOption.id === answer.id && (
                                  <div
                                    className={`w-2 h-2 rounded-full ${!answer.is_correct ? "bg-[var(--semantic-color-icon-negative-default)]" : "bg-[var(--semantic-color-icon-positive-default)]"}`}
                                  />
                                )}
                            </div>
                            <SLTypo
                              as="span"
                              text={(answer && answer.answer_text) || ""}
                              variant="fontBody2IntenseNormal"
                              className={cn(
                                "text-[var(--semantic-color-text-bold)]"
                              )}
                            />
                          </div>
                        </button>
                      );
                      // }
                      // return (
                      //   <button
                      //     onClick={() => handleOptionSelect("option2")}
                      //     className={`w-full px-[var(--core-spacing-lg)] py-[var(--core-spacing-lg)] rounded-full border text-left ${
                      //       selectedOption &&
                      //       selectedOption.id === answer.id &&
                      //       quizState === "correct"
                      //         ? "bg-[var(--semantic-color-bg-positive-subtlest)] border-[var(--semantic-color-outline-positive-default)]"
                      //         : selectedOption === "option2"
                      //           ? "bg-white border-[var(--semantic-color-outline-subtle)]"
                      //           : "border-[var(--semantic-color-outline-subtle)]"
                      //     }`}
                      //   >
                      //     <div className="flex items-center">
                      //       <div
                      //         className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                      //           selectedOption &&
                      //           selectedOption.id === answer.id &&
                      //           quizState === "correct"
                      //             ? "border-[var(--semantic-color-outline-positive-default)]"
                      //             : "border-[var(--semantic-color-icon-default)]"
                      //         }`}
                      //       >
                      //         {selectedOption === "option2" && (
                      //           <div className="w-2 h-2 rounded-full bg-[var(--semantic-color-icon-positive-default)]" />
                      //         )}
                      //       </div>
                      //       <SLTypo
                      //         as="span"
                      //         text={(answer && answer.answer_text) || ""}
                      //         variant="fontBody2IntenseNormal"
                      //         className={cn(
                      //           "text-[var(--semantic-color-text-bold)]"
                      //         )}
                      //       />
                      //     </div>
                      //   </button>
                      // );
                    }
                  )}
                {/* <button
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
                  </button> */}

                {/* <button
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
                  </button> */}
              </div>

              {/* Feedback for incorrect answer */}
              {quizState === "incorrect" && (
                <div className="mt-4 mx-0 md:mx-[var(--core-spacing-xl)] py-[var(--core-spacing-lg)] px-[var(--core-spacing-xl)] bg-[var(--semantic-color-bg-negative-subtlest)] text-[var(--semantic-color-text-default)]">
                  <div className="flex items-start">
                    <XCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0 text-[var(--semantic-color-icon-negative-default)]" />
                    <SLTypo
                      as="div"
                      text={explanation}
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
                      text={explanation}
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
            {(pass && (
              <CircleCheck className="h-20 w-20 text-white" fill="#28A745" />
            )) || <Frown className="h-20 w-20" color="#FC2525" />}
            <SLTypo
              as="p"
              isDangerously
              text={
                isFinalExam
                  ? (pass && lessons.exam_complete_title) ||
                    lessons.exam_fail_title
                  : lessons.lesson_complete_title
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
                {totalSteps} {lang === "mm" && "ခု"}
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
              <span>{score} ခု</span>
            </SLTypo>
          </div>
        )}
      </div>
    </div>
  );
};
