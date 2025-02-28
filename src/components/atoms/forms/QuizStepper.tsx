"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

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

type QuizState = "question" | "incorrect" | "correct" | "complete" | "timeout";

export const QuizStepper = ({
  step,
  totalSteps,
  updateFormData,
}: {
  step: number;
  totalSteps: number;
  updateFormData: (data: any) => void;
}) => {
  const [quizState, setQuizState] = useState<QuizState>("question");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 1 });
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timerActive && timeLeft > 0 && quizState === "question") {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizState === "question") {
      setQuizState("timeout");
      setTimerActive(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timeLeft, timerActive, quizState]);

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
            <div className="flex w-full items-center py-4">
              <button onClick={handleClose} className="mr-2">
                <X size={20} />
              </button>
              <div className="h-2 flex-1 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-yellow-400 rounded-full transition-all duration-300 ease-linear"
                  style={{ width: `${(timeLeft / 20) * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium">{timeLeft}s</span>
            </div>

            {/* Question */}
            <div>
              <p className="text-lg mb-6 leading-relaxed">
                ကလေးငယ်တစ်ရောက်ဆီသို့ဝမ်းနည်းခြင်းသည်ဘာလဲ။ ဆိုတာကိုသိဖို့ဆရာ
                ဒါပေမဲ့ကြီးကျယ်ခမ်းနားရိုက်ရမယ် ဆိုတာ မှန်ပါသလား။
              </p>

              {/* Options */}
              <div className="space-y-3">
                <button
                  onClick={() => handleOptionSelect("option1")}
                  className={`w-full p-4 rounded-full border text-left ${
                    selectedOption === "option1" && quizState === "incorrect"
                      ? "bg-red-100 border-red-500 text-red-700"
                      : selectedOption === "option1"
                        ? "bg-gray-100 border-gray-300"
                        : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                        selectedOption === "option1" &&
                        quizState === "incorrect"
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedOption === "option1" && (
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      )}
                    </div>
                    <span>မှန်ပါတယ်၊ ကတ်နိုင်တဲ့အထိပိုတယ်။</span>
                  </div>
                </button>

                <button
                  onClick={() => handleOptionSelect("option2")}
                  className={`w-full p-4 rounded-full border text-left ${
                    selectedOption === "option2" && quizState === "correct"
                      ? "bg-green-100 border-green-500 text-green-700"
                      : selectedOption === "option2"
                        ? "bg-gray-100 border-gray-300"
                        : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                        selectedOption === "option2" && quizState === "correct"
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedOption === "option2" && (
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                    <span>မှားပါတယ်၊ ကတ်မျိုးမဟုတ်သေးဘူး။</span>
                  </div>
                </button>
              </div>

              {/* Feedback for incorrect answer */}
              {quizState === "incorrect" && (
                <div className="mt-4 p-4 bg-red-100 rounded-md text-red-700">
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p>
                        မှားပါတယ်၊ ဆိုလိုတာမှန်းမသိတဲ့အတွက်
                        မျှော်မှန်းချက်နိမ့်ပါတယ်။ ဒါပေမဲ့ ဆေးစာအနေနဲ့
                        ခြောက်လသားကလေးလို့ လူတကားမျိုးစုံထည့်သေးတယ်ဘူး။
                      </p>
                      <p className="mt-2">
                        ကတ်နိုင်တဲ့အတွက် မေတ္တာသဒ္ဓါအခြေပြုခဲ့ပါတယ်။
                        မေတ္တာပိုင်ပိုင်ပါတယ်သည်ပင်လျှင် အခေါ်အဝေါ်ပါတယ်။
                        ငယ်ငယ်မှစ၍တည်းက မှန်မှန်သည့်ဖြစ်ခဲ့ပါတယ်။
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {}}
                    className="mt-4 w-full p-3 bg-red-200 text-red-700 rounded-md"
                  >
                    ဆက်လုပ်ပါ
                  </button>
                </div>
              )}

              {/* Feedback for correct answer */}
              {quizState === "correct" && (
                <div className="mt-4 p-4 bg-green-100 rounded-md text-green-700">
                  <div className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p>အခြေဖြေမှန်ပါတယ်ဟုတ်။</p>
                  </div>
                  <button
                    onClick={() => {}}
                    className="mt-4 w-full p-3 bg-green-200 text-green-700 rounded-md"
                  >
                    ဆက်လုပ်ပါ
                  </button>
                </div>
              )}

              {/* Feedback for timeout */}
              {quizState === "timeout" && (
                <div className="mt-4 p-4 bg-orange-100 rounded-md text-orange-700">
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p>အချိန်ကုန်ဆုံးသွားပါပြီ။ သင်အမှတ်မရရှိပါ။</p>
                      <p className="mt-2">
                        ကျေးဇူးပြု၍ နောက်တစ်ခုကို ဆက်လုပ်ပါ။
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {}}
                    className="mt-4 w-full p-3 bg-orange-200 text-orange-700 rounded-md"
                  >
                    ဆက်လုပ်ပါ
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          // Complete screen
          <div className="flex flex-col items-center justify-center p-8 h-full">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl mb-8 text-center">
              သင်ခန်းစာ သင်ယူပြီးဆုံးသွားပြီ။
            </h2>
            <div className="w-full flex justify-between mb-2">
              <span>ဟုတ်မှန်း ဟေးနား</span>
              <span>{score.correct} ခု</span>
            </div>
            <div className="w-full flex justify-between">
              <span>အခြေဖြေ</span>
              <span>{score.total} ခု</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
