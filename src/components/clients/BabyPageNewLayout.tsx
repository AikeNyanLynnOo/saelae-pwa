import { cn } from "@/lib/utils";
import { ArrowLeft, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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

interface BabyPageNewLayoutProps {
  children?: React.ReactNode;
  customClasses?: string;
  customBackUrl?: string;
}

export const BabyPageNewLayout = ({
  children,
  customClasses,
  customBackUrl,
}: BabyPageNewLayoutProps) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // step 1
    isBorn: null as boolean | null,
    // step 2
    saelaeName: "",
    saelabDob: null,
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
          formData.saelabDob &&
          formData.gender &&
          formData.relationship
        );
      default:
        return false;
    }
  }, [step, formData]);

  const handleNext = () => {
    if (step === totalSteps) {
      router.push("/baby");
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
    <CommonLayout customClasses="block h-[100dvh] relative w-full md:w-4/6 lg:w-1/2 mx-auto">
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
            text="ဆည်းလည်းလေးအကြောင်း ပြောပြပေးပါဦး"
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
                  text="ဆည်းလည်းလေးကို မွေးဖွားပြီးပြီလား"
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
                    text="မွေးဖွားပြီးပါပြီ"
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
                    text="မမွေးဖွားရသေးပါဘူး"
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
                    customInput={
                      <CustomInput
                        value={formData.saelabDob}
                        placeholder="ရက်စွဲကို ရွေးခြယ်ပါ"
                      />
                    }
                  />
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
                          ? "bg-[var(--semantic-color-bg-info-secondary)] text-[var(--semantic-color-text-inverse)]"
                          : "bg-white text-[var(--semantic-color-text-default)]",
                        formData.gender === "" && "bg-transparent"
                      )}
                      onClick={() =>
                        setFormData({ ...formData, gender: "ကျား" })
                      }
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
                        "rounded-full w-fit px-8 py-1.5 h-fit border hover:bg-[var(--semantic-color-bg-new-subtlest)] hover:text-[var(--semantic-color-text-default)]",
                        formData.gender === "မ"
                          ? "bg-[var(--semantic-color-bg-new-secondary)] text-[var(--semantic-color-text-inverse)]"
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
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-[var(--semantic-color-bg-layoutsecondary)] md:bg-transparent p-[var(--core-spacing-xl)] md:px-6 rounded-t-[var(--core-border-radius-md)]">
        <Button disabled={!canProceed} onClick={handleNext}>
          {(step === totalSteps && "သိမ်းဆည်းမယ်") || "ဆက်သွားမယ်"}{" "}
          <MoveRight className="!h-4 ml-1" />
        </Button>
      </div>
    </CommonLayout>
  );
};
