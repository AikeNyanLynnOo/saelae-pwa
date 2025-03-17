"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { InputGroup } from "../atoms/forms/InputGroup";
import { CustomInput } from "../atoms/forms/OnboardingStepper";
import { PageHeader } from "../atoms/PageHeader";
import { TabLayout } from "../layouts/TabLayout";
import { SLTypo } from "../SLTypo";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CommonLayout } from "../layouts/CommonLayout";
import { useTranslate } from "../hooks/use-translate";
import { useCommonStore } from "@/store/common-store";
import { useAuthStore } from "@/store/auth-store";
import { getUserProfile } from "@/utils/userAPIFunctions";
import { formatDate } from "@/utils/helperFunction";
import { addChild } from "@/utils/childApiFunctions";
import toast, { Toaster } from "react-hot-toast";
import { parseCookies } from "nookies";

interface BabyPageNewLayoutProps {
  cookies?: any;
  children?: React.ReactNode;
  customClasses?: string;
  customBackUrl?: string;
}

export const BabyPageNewLayout = ({
  cookies,
  children,
  customClasses,
  customBackUrl,
}: BabyPageNewLayoutProps) => {
  const clientCookies = parseCookies();
  const { messages, isLoading } = useTranslate();
  const { baby } = messages;

  const { lang } = useCommonStore();
  const { currentUser, setCurrentUser } = useAuthStore();

  // fetchUser
  // checkIsValid
  useEffect(() => {
    getUserProfile({ cookies: clientCookies }).then(({ success, data }) => {
      // console.log("User >>", success);
      if (success && data) {
        setCurrentUser((data && data.profile) || null);
      } else {
        router.push("/auth?session_expired=true");
      }
    });
  }, []);

  const relationships = useMemo(() => {
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
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    mediaFile: null,
    // step 1
    isBorn: null as boolean | null,
    // step 2
    saelaeName: "",
    saelaeDob: null,
    gender: "",
    relationship: "",
  });

  const totalSteps = 2;

  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return typeof formData.isBorn === "boolean";
      case 2:
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
      const { status, statusText, success, message, data } = await addChild({
        name: formData.saelaeName,
        is_born: formData.isBorn || false,
        birth_date: formatDate(formData.saelaeDob),
        gender: formData.gender,
        guardian_role: formData.relationship,
        media_file: formData.mediaFile,
        cookies: clientCookies,
      });
      if (success) {
        toast.success("Successfully added!");
        router.push("/baby");
      }
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (customBackUrl) {
      router.push(customBackUrl);
    } else {
      router.back();
    }
  };

  return (
    <CommonLayout
      isLoading={isLoading}
      customClasses="block h-[100dvh] relative w-full md:w-4/6 lg:w-1/2 mx-auto"
    >
      <PageHeader className="sticky top-0 bg-white z-20" />
      <div className="max-w-md mx-auto bg-white min-h-[100dvh] p-6 pb-20">
        <div className="flex flex-col gap-y-[var(--core-spacing-lg)] items-center mb-6">
          <div className="w-full">
            <Button variant="link" onClick={handleBack} className="w-fit p-0">
              <ArrowLeft
                size={24}
                className="w-6 h-6 text-[var(--semantic-color-icon-default)]"
              />
            </Button>
          </div>
          <SLTypo
            as="h1"
            text={baby.new.step1.text}
            variant={"fontH5Medium"}
            className="text-[var(--semantic-color-text-default)]"
          />
          <div
            className={`space-y-6 pb-28 flex flex-col items-center justify-center w-full min-h-[calc(100dvh-24rem)] ${step === 1 ? "justify-center" : ""}`}
          >
            {step === 1 && (
              <div className="space-y-4 px-4 lg:px-0 w-full">
                <SLTypo
                  as="h1"
                  text={baby.new.step1.question}
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
                    text={baby.new.step1.true_cta_text}
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
                    text={baby.new.step1.false_cta_text}
                    variant="fontButtonMdNormal"
                    className="text-[var(--semantic-color-text-bold)]"
                  />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 px-4 lg:px-0 w-full">
                {/* Sae Lae Name Input */}
                <InputGroup
                  labelText={baby.new.step2.saelae_name_label}
                  className="mb-4"
                  htmlFor="name"
                >
                  <Input
                    id="name"
                    placeholder={baby.new.step2.saelae_name_placeholder}
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
                      ? baby.new.step2.saelae_dob_born_label
                      : baby.new.step2.saelae_dob_notyet_label
                  }
                  className="mb-4"
                  htmlFor="birthdate"
                >
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
                        placeholder={baby.new.step2.saelae_dob_placeholder}
                      />
                    }
                  />
                </InputGroup>

                {/* Sae Lae Gender Input */}
                <InputGroup
                  labelText={baby.new.step2.saelae_gender_label}
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
                        text={baby.new.step2.saelae_gender_male}
                      />
                    </Button>

                    <Button
                      className={cn(
                        "rounded-full w-fit px-8 py-1.5 h-fit border hover:bg-[var(--semantic-color-bg-new-subtlest)] hover:text-[var(--semantic-color-text-default)]",
                        formData.gender === "female"
                          ? "bg-[var(--semantic-color-bg-new-secondary)] text-[var(--semantic-color-text-inverse)]"
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
                        text={baby.new.step2.saelae_gender_female}
                      />
                    </Button>
                  </div>
                </InputGroup>

                {/* Sae Lae Relationship Input */}
                <InputGroup
                  labelText={baby.new.step2.relationship_label}
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
                        placeholder={baby.new.step2.relationship_placeholder}
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
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-[var(--semantic-color-bg-layoutsecondary)] md:bg-transparent p-[var(--core-spacing-xl)] md:px-6 rounded-t-[var(--core-border-radius-md)]">
        <Button disabled={!canProceed} onClick={handleNext}>
          {(step === totalSteps && baby.new.cta_save) ||
            baby.new.cta_continue_text}{" "}
          <MoveRight className="!h-4 ml-1" />
        </Button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </CommonLayout>
  );
};
