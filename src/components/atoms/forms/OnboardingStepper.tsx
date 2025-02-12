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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
    saelabDob: null,
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
    if (step === totalSteps) {
      router.push("/onboarding/personalization");
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <div className="w-full min-h-[100dvh] max-h-[100vh] overflow-y-scroll relative hide-scrollbar">
      {/* Progress Indicators */}
      <div className="flex gap-2 mb-12 pt-10 px-6 lg:px-0">
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
      <div className="mb-12">
        {/* Title */}
        <SLTypo
          as="h1"
          text="ဆည်းလည်း မှကြိုဆိုပါတယ်"
          variant="fontH4Semibold"
          className="text-center text-[var(--semantic-color-text-bold)] mb-2 px-6 lg:px-0"
        />

        {/* Description */}
        <SLTypo
          as="p"
          text={
            (step === 1 && "အရင်ဆုံး မိမိကိုယ်ကို မိတ်ဆက်ပေးပါဦး") ||
            "ဆည်းလည်းလေးအကြောင်း ပြောပြပေးပါဦး"
          }
          variant="fontBody1Normal"
          className="text-center text-[var(--semantic-color-text-subtle)] px-6 lg:px-0"
        />
      </div>

      {/* Form Content */}
      <div
        className={`space-y-6 pb-28 flex flex-col items-center min-h-[calc(100dvh-20rem)] ${step === 2 ? "justify-center" : ""}`}
      >
        {step === 1 && (
          <div className="space-y-4 px-6 lg:px-0 w-full">
            {/* User Name Input */}
            <InputGroup
              labelText="သင့်နာမည် ဘယ်လိုခေါ်လဲ"
              className="mb-4"
              htmlFor="name"
            >
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

            {/* User City Input */}
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

            {/* User Birthdate Input */}
            <InputGroup
              labelText="သင့်မွေးနေ့ကိုပြောပြပါဦး"
              className="mb-4"
              htmlFor="birthdate"
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start items-center text-left font-normal text-sm",
                      !formData.dob &&
                        "text-[var(--semantic-color-text-disabled)]"
                    )}
                  >
                    <CalendarIcon className="mr-1 h-4 w-4" />

                    {formData.dob ? (
                      <SLTypo
                        as="span"
                        variant="fontBody2Normal"
                        fontFamily="var(--font-figtree)"
                        text={format(formData.dob, "PPP")}
                      />
                    ) : (
                      <span>ရက်စွဲကို ရွေးခြယ်ပါ</span>
                    )}
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] sm:w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    className="rounded-md overflow-x-scroll"
                    selected={formData.dob || undefined}
                    onSelect={(date: any) => {
                      if (date) {
                        console.log(date, typeof date, Object.keys(date));
                        setFormData({ ...formData, dob: date });
                      }
                    }}
                    // initialFocus
                  />
                </PopoverContent>
              </Popover>
            </InputGroup>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 px-6 lg:px-0 w-full">
            <SLTypo
              as="h1"
              text="ဆည်းလည်းလေးကို မွေးဖွားပြီးပြီလား"
              variant="fontH4Semibold"
              className="text-center text-[var(--semantic-color-text-bold)] mb-2 px-6 lg:px-0"
            />
            <Button
              variant="outline"
              className={`w-full ${formData.isBorn ? "bg-[var(--semantic-color-bg-update-secondary)] hover:bg-[var(--semantic-color-bg-update-primary)]" : "bg-[var(--semantic-color-bg-brand-subtlest)] hover:bg-[var(--semantic-color-bg-brand-subtle)]"} border-none h-12`}
              onClick={() => setFormData({ ...formData, isBorn: true })}
            >
              <SLTypo
                as="span"
                text="မွေးဖွားပြီးပါပြီ"
                variant="fontButtonMdNormal"
                className="text-[var(--semantic-color-text-bold)]"
              />
            </Button>
            <Button
              variant="outline"
              className={`w-full ${!formData.isBorn ? "bg-[var(--semantic-color-bg-update-secondary)] hover:bg-[var(--semantic-color-bg-update-primary)]" : "bg-[var(--semantic-color-bg-brand-subtlest)] hover:bg-[var(--semantic-color-bg-brand-subtle)]"} border-none h-12`}
              onClick={() => setFormData({ ...formData, isBorn: false })}
            >
              <SLTypo
                as="span"
                text="မမွေးဖွားရသေးပါဘူး"
                variant="fontButtonMdNormal"
                className="text-[var(--semantic-color-text-bold)]"
              />
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 px-6 lg:px-0 w-full">
            {/* Sae Lae Name Input */}
            <InputGroup
              labelText="ဆည်းလည်းလေးရဲ့နာမည် ဘယ်လိုခေါ်လဲ"
              className="mb-4"
              htmlFor="name"
            >
              <Input
                id="name"
                placeholder="ကလေးလေးကိုခေါ်စေချင်တဲ့ နာမည်ကိုရေးထည့်ပါ"
                color="primary"
                value={formData.saelaeName}
                onChange={(e) =>
                  setFormData({ ...formData, saelaeName: e.target.value })
                }
                className="w-full flex items-center"
              />
            </InputGroup>

            {/* Sae Lae Birthdate Input */}
            <InputGroup
              labelText={
                formData.isBorn
                  ? "ဆည်းလည်းလေးရဲ့ မွေးနေ့ ကိုပြောပြပါဦး"
                  : "မွေးဖွားမည့်ရက်(Due Date) ကိုပြောပြပါဦး"
              }
              className="mb-4"
              htmlFor="birthdate"
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start items-center text-left font-normal text-sm",
                      !formData.dob &&
                        "text-[var(--semantic-color-text-disabled)]"
                    )}
                  >
                    <CalendarIcon className="mr-1 h-4 w-4" />

                    {formData.dob ? (
                      <SLTypo
                        as="span"
                        variant="fontBody2Normal"
                        fontFamily="var(--font-figtree)"
                        text={format(formData.dob, "PPP")}
                      />
                    ) : (
                      <span>ရက်စွဲကို ရွေးခြယ်ပါ</span>
                    )}
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] sm:w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    className="rounded-md overflow-x-scroll"
                    selected={formData.saelabDob || undefined}
                    onSelect={(date: any) => {
                      if (date) {
                        console.log(date, typeof date, Object.keys(date));
                        setFormData({ ...formData, saelabDob: date });
                      }
                    }}
                    // initialFocus
                  />
                </PopoverContent>
              </Popover>
            </InputGroup>

            {/* Sae Lae Gender Input */}
            <InputGroup
              labelText="ဆည်းလည်းလေးရဲ့ လိင် ကိုပြောပြပေးပါဦး"
              className="mb-4"
              htmlFor="gender"
            >
              <div className="flex items-center gap-2">
                <Button
                  className={cn(
                    "rounded-full w-fit px-8 py-1.5 h-fit border hover:bg-[var(--semantic-color-bg-info-subtlest)] hover:text-[var(--semantic-color-text-default)]",
                    formData.gender === "ကျား"
                      ? "bg-[var(--semantic-color-bg-info-primary)] text-[var(--semantic-color-text-inverse)]"
                      : "bg-white text-[var(--semantic-color-text-default)]",
                    formData.gender === "" && "bg-transparent"
                  )}
                  onClick={() => setFormData({ ...formData, gender: "ကျား" })}
                >
                  <SLTypo
                    as="span"
                    variant="fontLabelNormal"
                    text="ကျား"
                    className="-mt-1"
                  />
                </Button>

                <Button
                  className={cn(
                    "rounded-full w-fit px-8 py-1.5 h-fit border hover:bg-[var(--semantic-color-bg-info-subtlest)] hover:text-[var(--semantic-color-text-default)]",
                    formData.gender === "မ"
                      ? "bg-[var(--semantic-color-bg-info-primary)] text-[var(--semantic-color-text-inverse)]"
                      : "bg-white text-[var(--semantic-color-text-default)]",
                    formData.gender === "" && "bg-transparent"
                  )}
                  onClick={() => setFormData({ ...formData, gender: "မ" })}
                >
                  <SLTypo
                    as="span"
                    variant="fontLabelNormal"
                    text="မ"
                    className="-mt-1"
                  />
                </Button>
              </div>
            </InputGroup>

            {/* Sae Lae Relationship Input */}
            <InputGroup
              labelText="ဆည်းလည်းလေးနဲ့ ဘယ်လိုတော်စပ်ပါသလဲ"
              className="mb-4"
              htmlFor="relationship"
            >
              <Select
                value={formData.relationship}
                onValueChange={(value) =>
                  setFormData({ ...formData, relationship: value })
                }
              >
                <SelectTrigger
                  id="city"
                  className={cn(
                    "w-full",
                    formData.relationship
                      ? "text-black"
                      : "text-[var(--semantic-color-text-disabled)]"
                  )}
                >
                  <SelectValue placeholder="အောက်ပါထဲမှ တစ်ခုခုကိုရွေးခြယ်ပါ" />
                </SelectTrigger>
                <SelectContent className="text-black">
                  <SelectGroup>
                    <SelectItem value="မေမေ">မေမေ</SelectItem>
                    <SelectItem value="ဖေဖေ">ဖေဖေ</SelectItem>
                    <SelectItem value="ဖိုးဖိုး">ဖိုးဖိုး</SelectItem>
                    <SelectItem value="ဖွားဖွား">ဖွားဖွား</SelectItem>
                    <SelectItem value="ဦးဦး">ဦးဦး</SelectItem>
                    <SelectItem value="ဒေါ်ဒေါ်">ဒေါ်ဒေါ်</SelectItem>
                    <SelectItem value="ကိုကို">ကိုကို</SelectItem>
                    <SelectItem value="မမ">မမ</SelectItem>
                    <SelectItem value="စောင့်ရှောက်သူ">
                      စောင့်ရှောက်သူ
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </InputGroup>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full bg-[var(--semantic-color-bg-layoutsecondary)] lg:bg-transparent p-[var(--core-spacing-xl)] lg:px-0 rounded-t-[var(--core-border-radius-md)]">
        <Button disabled={!canProceed()} onClick={handleNext}>
          ဆက်သွားမယ် <MoveRight className="!h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};
