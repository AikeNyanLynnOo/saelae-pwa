"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SLTypo } from "@/components/SLTypo";
import { CalendarIcon, MoveRight } from "lucide-react";
import { InputGroup } from "./InputGroup";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectContent,
  SelectLabel,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

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
    // step 1
    name: "",
    city: "",
    address: "",
    dob: null,

    // step 2
    isBorn: true,

    // step 3
    saelaeName: "",
    saelabDob: "",
    gender: "",
    relationship: "",
  });

  const totalSteps = 3;

  const canProceed = () => {
    switch (step) {
      case 1:
        return (
          formData.name && formData.city && formData.address && formData.dob
        );
      case 2:
        return true; // No required fields in step 2
      case 3:
        return (
          formData.saelaeName &&
          formData.saelabDob &&
          formData.gender &&
          formData.relationship
        );
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

        {step === 1 && (
          <div className="space-y-4 px-6 lg:px-0">
            {/* Label */}
            <InputGroup
              labelText="သင့်နာမည် ဘယ်လိုခေါ်လဲ"
              className="mb-4"
              htmlFor="name"
            >
              {/* User Name Input */}
              <Input
                id="name"
                placeholder="နာမည်အပြည့်အစုံကိုရေးထည့်ပါ"
                color="primary"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full flex items-center"
              />
            </InputGroup>
            <InputGroup
              labelText="ဘယ်မြို့မှာနေထိုင်ပါသလဲ"
              className="mb-4"
              htmlFor="city"
            >
              <Select
                value={formData.city}
                onValueChange={(value) =>
                  setFormData({ ...formData, city: value })
                }
              >
                <SelectTrigger
                  id="city"
                  className={cn(
                    "w-full",
                    formData.city
                      ? "text-black"
                      : "text-[var(--semantic-color-text-disabled)]"
                  )}
                >
                  <SelectValue placeholder="မြို့နာမည်ကိုရွေးခြယ်ပါ" />
                </SelectTrigger>
                <SelectContent className="text-black">
                  <SelectGroup>
                    <SelectItem value="yangon">ရန်ကုန်</SelectItem>
                    <SelectItem value="mandalay">မန္တလေး</SelectItem>

                    <SelectItem value="naypyidaw">နေပြည်တော်</SelectItem>
                    <SelectItem value="bago">ပဲခူး</SelectItem>
                    <SelectItem value="mawlamyine">မော်လမြိုင်</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </InputGroup>
            <InputGroup
              labelText="လိပ်စာလေးပြောပြပေးပါဦး"
              className="mb-4"
              htmlFor="address"
            >
              <Textarea
                id="address"
                rows={3}
                placeholder="လက်ရှိနေထိုင်တဲ့ လိပ်စာကို ထည့်ပေးနော်"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full"
              />
            </InputGroup>
            {/* <InputGroup
              labelText="သင့်မွေးနေ့ကိုပြောပြပါဦး"
              className="mb-4"
              htmlFor="birthdate"
            > */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !formData.dob &&
                      "text-[var(--semantic-color-text-disabled)]"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {formData.dob ? (
                    format(formData.dob, "PPP")
                  ) : (
                    <span>ရက်စွဲကို ရွေးခြယ်ပါ</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  // selected={formData.dob || undefined}
                  // onSelect={(date: any) => {
                  //   if (date) {
                  //     console.log(date);
                  //     // setFormData({ ...formData, dob: date })
                  //   }
                  // }}
                  // initialFocus
                />
              </PopoverContent>
            </Popover>
            {/* </InputGroup> */}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 px-6 lg:px-0">
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

        {step === 3 && <div className="space-y-4 px-6 lg:px-0">Form 3</div>}
      </div>

      <div className="absolute bottom-0 w-full bg-[var(--semantic-color-bg-layoutsecondary)] lg:bg-transparent p-[var(--core-spacing-xl)] lg:px-0 rounded-t-[var(--core-border-radius-md)]">
        <Button disabled={!canProceed()} onClick={handleNext}>
          ဆက်သွားမယ် <MoveRight className="!h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
