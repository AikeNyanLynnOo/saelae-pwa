import { cn } from "@/lib/utils";
import { ArrowLeft, Pencil, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputGroup } from "../atoms/forms/InputGroup";
import { CustomInput } from "../atoms/forms/OnboardingStepper";
import { LabelWithIcon } from "../atoms/LabelWithIcon";
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
import { Textarea } from "../ui/textarea";

interface BabyPageEditProps {
  children?: React.ReactNode;
  customClasses?: string;
  customBackUrl?: string;
}

export const BabyPageEditLayout = ({
  children,
  customClasses,
  customBackUrl,
}: BabyPageEditProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    isBorn: true,
    // step 3
    saelaeName: "",
    saelabDob: null,
    gender: "",
    relationship: "",
  });
  const handleBack = () => {
    if (customBackUrl) {
      router.push(customBackUrl);
    } else {
      router.back();
    }
  };

  return (
    <TabLayout>
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
            text="ဆည်းလည်းလေး အကြောင်းပြင်ဆင်ခြင်း"
            variant={"fontH5Medium"}
            className="text-[var(--semantic-color-text-default)]"
          />

          <div className="w-20 h-20 rounded-full bg-[var(--semantic-color-bg-brand-subtlest)] flex items-center justify-center">
            <User className="text-[var(--semantic-color-icon-brand-subtle)]" />
          </div>

          <Button
            variant="outline"
            className={`w-fit rounded-[var(--core-border-radius-xs)] bg-transparent border border-[var(--semantic-color-outline-brand-default)] py-[var(--core-spacing-sm)]`}
            onClick={() => {}}
          >
            <LabelWithIcon
              label="ပုံပြင်မယ်"
              icon={Pencil}
              variant="fontButtonMdSemibold"
              iconClassName="text-[var(--semantic-color-text-brand-default)]"
              labelClassName="text-[var(--semantic-color-text-brand-default)]"
              className="gap-x-2.5"
            />
          </Button>
        </div>

        <div className="space-y-[var(--core-spacing-sm)]">
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
                  "rounded-full w-fit px-8 py-1.5 h-fit border hover:bg-[var(--semantic-color-bg-new-subtlest)] hover:text-[var(--semantic-color-text-default)]",
                  formData.gender === "မ"
                    ? "bg-[var(--semantic-color-bg-new-primary)] text-[var(--semantic-color-text-inverse)]"
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
        </div>

        <Button className="mt-[var(--core-spacing-lg)]" onClick={() => {}}>
          သိမ်းဆည်းမယ်
        </Button>
      </div>
    </TabLayout>
  );
};
