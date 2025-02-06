"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { SLTypo } from "@/components/SLTypo";
import { MoveRight } from "lucide-react";

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

export const OnboardingStepper = () => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    type: "",
    date: "",
    category: "",
  });

  const totalSteps = 3;

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name && formData.type && formData.email;
      case 2:
        return true; // No required fields in step 2
      case 3:
        return formData.category && formData.date;
      default:
        return false;
    }
  };

  const handleNext = () => {
    // if (step < totalSteps && canProceed()) {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <div className="w-full min-h-[100dvh] relative">
      {/* Progress Indicators */}
      <div className="flex gap-2 mb-8 pt-10 px-6 lg:px-0">
        {[...Array(totalSteps)].map((_, index) => (
          <StepIndicator
            key={index}
            step={index + 1}
            isActive={step > index}
            isCompleted={step > index + 1}
            isNextStep={index === step}
            onClick={() => {
              // Only allow going back to completed steps or current step
              if (step > index || index === step - 1) {
                setStep(index + 1);
              }
            }}
          />
        ))}
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        <div className="mb-12">
          {/* Title */}
          <SLTypo
            as="h1"
            text="ဆည်းလည်း မှကြိုဆိုပါတယ်"
            variant="fontH4Semibold"
            className="text-center text-[var(--semantic-color-text-bold)] mb-2"
          />

          {/* Description */}
          <SLTypo
            as="p"
            text={
              (step === 1 && "အရင်ဆုံး မိမိကိုယ်ကို မိတ်ဆက်ပေးပါဦး") ||
              "ဆည်းလည်းလေးအကြောင်း ပြောပြပေးပါဦး"
            }
            variant="fontBody1Normal"
            className="text-center text-[var(--semantic-color-text-subtle)] !leading-5"
          />
        </div>

        {step === 1 && <div className="space-y-4">Form 1</div>}

        {step === 2 && (
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full bg-[#FCD34D] hover:bg-[#F59E0B] text-black border-none h-12"
            >
              မေးမှားပြီးပြီ
            </Button>
            <Button
              variant="outline"
              className="w-full bg-[#EEF2FF] hover:bg-[#E0E7FF] text-black border-none h-12"
            >
              မေးမှားရန်ကျန်သေး
            </Button>
          </div>
        )}

        {step === 3 && <div className="space-y-4">Form 3</div>}
      </div>

      <div className="absolute bottom-0 w-full bg-[var(--semantic-color-bg-layoutsecondary)] lg:bg-transparent p-[var(--core-spacing-xl)] lg:px-0 rounded-t-[var(--core-border-radius-md)]">
        <Button onClick={handleNext}>
          ဆက်သွားမယ် <MoveRight className="!h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
