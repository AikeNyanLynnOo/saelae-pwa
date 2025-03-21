"use client";

import { InputGroup } from "@/components/atoms/forms/InputGroup";
import { useTranslate } from "@/components/hooks/use-translate";
import { SLTypo } from "@/components/SLTypo";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useCommonStore } from "@/store/common-store";
import { formatDate } from "@/utils/helperFunction";
import { completeOnboard } from "@/utils/onboardApiFunctions";
import { getCities } from "@/utils/userAPIFunctions";
import { format } from "date-fns";
import { CalendarIcon, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import * as React from "react";
import { forwardRef } from "react";
import toast, { Toaster } from "react-hot-toast";

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

export const CustomInput = forwardRef(
  (
    {
      value,
      onClick,
      className,
      placeholder,
    }: {
      value: any;
      onClick?: () => void;
      className?: string;
      placeholder?: string;
    },
    ref: any
  ) => {
    const { lang } = useCommonStore();

    console.log("Value>>", value);
    return (
      <Button
        variant={"outline"}
        className={cn(
          "w-full justify-start items-center text-left font-normal text-sm",
          !value && "text-[var(--semantic-color-text-disabled)]",
          className
        )}
        onClick={onClick}
        ref={ref}
      >
        <CalendarIcon className="mr-1 h-4 w-4" />

        {value ? (
          <SLTypo
            as="span"
            variant="fontBody2Normal"
            fontFamily="var(--font-figtree)"
            text={format(value, "PPP")}
          />
        ) : (
          <span className="text-[var(--semantic-color-text-disabled)]">
            {placeholder ||
              (lang === "mm" ? "ရက်စွဲကို ရွေးခြယ်ပါ" : "Select Date")}
          </span>
        )}
      </Button>
    );
  }
);

CustomInput.displayName = "CustomInput";
interface OnboardingStepperProps {
  cookies?: any;
}

export const OnboardingStepper = ({ cookies }: OnboardingStepperProps) => {
  const clientCookies = parseCookies();
  const { messages, isLoading } = useTranslate();
  const { onboard } = messages;
  const { setLoadingText } = useCommonStore();
  const { countryName } = useAuthStore();
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [cities, setCities] = React.useState([]);
  const [formData, setFormData] = React.useState({
    // step 1
    name: "",
    city: "",
    address: "",
    dob: null,

    // step 2
    isBorn: null as boolean | null,

    // step 3
    saelaeName: "",
    saelaeDob: null,
    gender: "",
    relationship: "",
  });

  const totalSteps = 3;

  const { lang } = useCommonStore();

  React.useEffect(() => {
    getCities({ countryName }).then(
      ({ status, statusText, success, message, data, loading, error }) => {
        if (success && data) {
          console.log("Cities>>", data);
          setCities(
            (data &&
              data.length > 0 &&
              data.sort().map((city: string) => ({
                label: city,
                value: city,
              }))) ||
              []
          );
        } else {
          // error
          setCities([]);
        }
      }
    );
  }, []);

  const relationships = React.useMemo(() => {
    if (lang === "mm") {
      return [
        { value: "mom", label: "မေမေ" },
        { value: "dad", label: "ဖေဖေ" },
        { value: "grandpa", label: "ဖိုးဖိုး" },
        { value: "grandma", label: "ဖွားဖွား" },
        { value: "uncle", label: "ဦးဦး" },
        { value: "aunt", label: "ဒေါ်ဒေါ်" },
        { value: "brother", label: "ကိုကို" },
        { value: "sister", label: "မမ" },
        { value: "caregiver", label: "စောင့်ရှောက်သူ" },
      ];
    }
    return [
      { value: "mom", label: "Mom" },
      { value: "dad", label: "Dad" },
      { value: "grandpa", label: "Grandpa" },
      { value: "grandma", label: "Grandma" },
      { value: "uncle", label: "Uncle" },
      { value: "aunt", label: "Aunt" },
      { value: "brother", label: "Brother" },
      { value: "sister", label: "Sister" },
      { value: "caregiver", label: "Caregiver" },
    ];
  }, [lang]);

  const canProceed = React.useMemo(() => {
    switch (step) {
      case 1:
        return (
          formData.name && formData.city && formData.address && formData.dob
        );
      case 2:
        return typeof formData.isBorn === "boolean";
      case 3:
        return (
          formData.saelaeName &&
          formData.saelaeDob &&
          formData.gender &&
          formData.relationship
        );
      default:
        return false;
    }
  }, [step, formData]);

  const handleNext = async () => {
    if (step === totalSteps) {
      const child: any = {
        name: formData.saelaeName,
        is_born: formData.isBorn || false,
        gender: formData.gender,
        guardian_role: formData.relationship,
      };
      if (formData.isBorn) {
        child.birth_date = formatDate(formData.saelaeDob);
      } else {
        child.due_date = formatDate(formData.saelaeDob);
      }
      console.log("Data>>", {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        date_of_birth: formatDate(formData.dob),
        children: [child],
        cookies: clientCookies,
      });

      const { status, statusText, success, message, data } =
        await completeOnboard({
          name: formData.name,
          address: formData.address,
          city: formData.city,
          date_of_birth: formatDate(formData.dob),
          children: [child],
          cookies: clientCookies,
        });
      if (success) {
        router.push("/onboard/personalize");
        if (lang === "mm") {
          setLoadingText(
            `${formData.relationship} အတွက် အဆင်ပြေဆုံးဖြစ်မယ့် ဘာသာရပ်များကို ရွေးခြယ်ပေးနေပါတယ်...`
          );
        } else {
          setLoadingText(
            "We're choosing the perfect launchpad for you to begin your learning journey."
          );
        }
      } else {
        toast.error(message);
      }
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="w-full min-h-[100dvh] max-h-[100vh] overflow-y-scroll relative hide-scrollbar">
          {/* Progress Indicators */}
          <div className="flex gap-2 mb-12 pt-10 px-4 lg:px-0">
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
              text={onboard.step1.title}
              variant="fontH4Semibold"
              className="text-center text-[var(--semantic-color-text-bold)] mb-2 px-4 lg:px-0"
            />

            {/* Description */}
            <SLTypo
              as="p"
              text={(step === 1 && onboard.step1.text) || onboard.step2.text}
              variant="fontBody1Normal"
              className="text-center text-[var(--semantic-color-text-subtle)] px-4 lg:px-0"
            />
          </div>

          {/* Form Content */}
          <div
            className={`space-y-6 pb-28 flex flex-col items-center min-h-[calc(100dvh-20rem)] ${step === 2 ? "justify-center" : ""}`}
          >
            {step === 1 && (
              <div className="space-y-4 px-4 lg:px-0 w-full">
                {/* User Name Input */}
                <InputGroup
                  labelText={onboard.step1.name_label}
                  className="mb-4"
                  htmlFor="name"
                >
                  <Input
                    id="name"
                    placeholder={onboard.step1.name_placeholder}
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
                  labelText={onboard.step1.city_label}
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
                      <SelectValue
                        placeholder={onboard.step1.city_placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent className="text-black">
                      <SelectGroup>
                        {/* <SelectItem value="yangon">ရန်ကုန်</SelectItem>
                        <SelectItem value="mandalay">မန္တလေး</SelectItem>

                        <SelectItem value="naypyidaw">နေပြည်တော်</SelectItem>
                        <SelectItem value="bago">ပဲခူး</SelectItem>
                        <SelectItem value="mawlamyine">မော်လမြိုင်</SelectItem> */}
                        {(cities &&
                          cities.length > 0 &&
                          cities.map((city: any, index: number) => (
                            <SelectItem key={index} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))) || (
                          <SelectItem value="no_option" disabled>
                            No options
                          </SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </InputGroup>
                <InputGroup
                  labelText={onboard.step1.address_label}
                  className="mb-4"
                  htmlFor="address"
                >
                  <Textarea
                    id="address"
                    rows={3}
                    placeholder={onboard.step1.address_placeholder}
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full"
                  />
                </InputGroup>

                {/* User Birthdate Input */}
                <InputGroup
                  labelText={onboard.step1.dob_label}
                  className="mb-4"
                  htmlFor="birthdate"
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
                    customInput={
                      <CustomInput
                        value={formData.dob}
                        placeholder={onboard.step1.dob_placeholder}
                      />
                    }
                    maxDate={new Date()}
                  />
                </InputGroup>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 px-4 lg:px-0 w-full">
                <SLTypo
                  as="h1"
                  text={onboard.step2.question}
                  variant="fontH4Semibold"
                  className="text-center text-[var(--semantic-color-text-bold)] mb-2 px-4 lg:px-0"
                />
                <Button
                  variant="outline"
                  className={`w-full ${typeof formData.isBorn === "boolean" && formData.isBorn ? "bg-[var(--semantic-color-bg-update-secondary)] hover:bg-[var(--semantic-color-bg-update-primary)]" : "bg-[var(--semantic-color-bg-brand-subtlest)] hover:bg-[var(--semantic-color-bg-brand-subtle)]"} border-none h-12`}
                  onClick={() => setFormData({ ...formData, isBorn: true })}
                >
                  <SLTypo
                    as="span"
                    text={onboard.step2.true_cta_text}
                    variant="fontButtonMdNormal"
                    className="text-[var(--semantic-color-text-bold)]"
                  />
                </Button>
                <Button
                  variant="outline"
                  className={`w-full ${typeof formData.isBorn === "boolean" && !formData.isBorn ? "bg-[var(--semantic-color-bg-update-secondary)] hover:bg-[var(--semantic-color-bg-update-primary)]" : "bg-[var(--semantic-color-bg-brand-subtlest)] hover:bg-[var(--semantic-color-bg-brand-subtle)]"} border-none h-12`}
                  onClick={() => setFormData({ ...formData, isBorn: false })}
                >
                  <SLTypo
                    as="span"
                    text={onboard.step2.false_cta_text}
                    variant="fontButtonMdNormal"
                    className="text-[var(--semantic-color-text-bold)]"
                  />
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 px-4 lg:px-0 w-full">
                {/* Sae Lae Name Input */}
                <InputGroup
                  labelText={onboard.step3.saelae_name_label}
                  className="mb-4"
                  htmlFor="name"
                >
                  <Input
                    id="name"
                    placeholder={onboard.step3.saelae_name_placeholder}
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
                      ? onboard.step3.saelae_dob_born_label
                      : onboard.step3.saelae_dob_notyet_label
                  }
                  className="mb-4"
                  htmlFor="birthdate"
                >
                  {(formData.isBorn && (
                    <Calendar
                      mode="single"
                      className="rounded-md overflow-x-scroll"
                      selected={formData.saelaeDob || undefined}
                      onSelect={(date: any) => {
                        if (date) {
                          console.log(date, typeof date, Object.keys(date));
                          setFormData({ ...formData, saelaeDob: date });
                        }
                      }}
                      customInput={
                        <CustomInput
                          value={formData.saelaeDob}
                          placeholder={onboard.step3.saelae_dob_placeholder}
                        />
                      }
                      maxDate={new Date()}
                    />
                  )) || (
                    <Calendar
                      mode="single"
                      className="rounded-md overflow-x-scroll"
                      selected={formData.saelaeDob || undefined}
                      onSelect={(date: any) => {
                        if (date) {
                          console.log(date, typeof date, Object.keys(date));
                          setFormData({ ...formData, saelaeDob: date });
                        }
                      }}
                      customInput={
                        <CustomInput
                          value={formData.saelaeDob}
                          placeholder={onboard.step3.saelae_dob_placeholder}
                        />
                      }
                      minDate={new Date()}
                    />
                  )}
                </InputGroup>

                {/* Sae Lae Gender Input */}
                <InputGroup
                  labelText={onboard.step3.saelae_gender_label}
                  className="mb-4"
                  htmlFor="gender"
                >
                  <div className="flex items-center gap-2">
                    <Button
                      className={cn(
                        "rounded-full w-fit px-8 py-1.5 h-fit border hover:bg-[var(--semantic-color-bg-info-subtlest)] hover:text-[var(--semantic-color-text-default)]",
                        formData.gender === "male"
                          ? "bg-[var(--semantic-color-bg-info-secondary)] text-[var(--semantic-color-text-inverse)]"
                          : "bg-white text-[var(--semantic-color-text-default)]",
                        formData.gender === "" && "bg-transparent"
                      )}
                      onClick={() =>
                        setFormData({ ...formData, gender: "male" })
                      }
                    >
                      <SLTypo
                        as="span"
                        variant="fontLabelNormal"
                        text={onboard.step3.saelae_gender_male}
                      />
                    </Button>

                    <Button
                      className={cn(
                        "rounded-full w-fit px-8 py-1.5 h-fit border hover:bg-[var(--semantic-color-bg-new-subtlest)] hover:text-[var(--semantic-color-text-default)]",
                        formData.gender === "female"
                          ? "bg-[var(--semantic-color-bg-new-primary)] text-[var(--semantic-color-text-inverse)]"
                          : "bg-white text-[var(--semantic-color-text-default)]",
                        formData.gender === "" && "bg-transparent"
                      )}
                      onClick={() =>
                        setFormData({ ...formData, gender: "female" })
                      }
                    >
                      <SLTypo
                        as="span"
                        variant="fontLabelNormal"
                        text={onboard.step3.saelae_gender_female}
                      />
                    </Button>
                  </div>
                </InputGroup>

                {/* Sae Lae Relationship Input */}
                <InputGroup
                  labelText={onboard.step3.relationship_label}
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
                      <SelectValue
                        placeholder={onboard.step3.relationship_placeholder}
                      />
                    </SelectTrigger>
                    <SelectContent className="text-black">
                      <SelectGroup>
                        {relationships.map((relationship, index) => (
                          <SelectItem key={index} value={relationship.value}>
                            {relationship.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </InputGroup>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 w-full bg-[var(--semantic-color-bg-layoutsecondary)] md:bg-transparent p-[var(--core-spacing-xl)] md:px-0 rounded-t-[var(--core-border-radius-md)]">
            <Button disabled={!canProceed} onClick={handleNext}>
              {onboard.cta_text} <MoveRight className="!h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
