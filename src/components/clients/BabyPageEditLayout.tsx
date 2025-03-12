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
import { useTranslate } from "../hooks/use-translate";

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
  const { messages, isLoading } = useTranslate();
  const { baby } = messages;
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
    <>
      {!isLoading && (
        <TabLayout>
          <PageHeader className="sticky top-0 bg-white z-20" />
          <div className="max-w-md mx-auto bg-white min-h-[100dvh] p-6 pb-20">
            <div className="flex flex-col gap-y-[var(--core-spacing-lg)] items-center mb-6">
              <div className="w-full">
                <Button
                  variant="link"
                  onClick={handleBack}
                  className="w-fit p-0"
                >
                  <ArrowLeft
                    size={24}
                    className="w-6 h-6 text-[var(--semantic-color-icon-default)]"
                  />
                </Button>
              </div>
              <SLTypo
                as="h1"
                text={baby.edit.title}
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
                  label={baby.edit.cta_photo_edit}
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
                labelText={baby.edit.saelae_name_label}
                className="mb-4"
                htmlFor="name"
              >
                <Input
                  id="name"
                  placeholder={baby.edit.saelae_name_placeholder}
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
                    ? baby.edit.saelae_dob_born_label
                    : baby.edit.saelae_dob_notyet_label
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
                      placeholder={baby.edit.saelae_dob_placeholder}
                    />
                  }
                />
              </InputGroup>

              {/* Sae Lae Gender Input */}
              <InputGroup
                labelText={baby.edit.saelae_gender_label}
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
                    onClick={() => setFormData({ ...formData, gender: "male" })}
                  >
                    <SLTypo
                      as="span"
                      variant="fontLabelNormal"
                      text={baby.edit.saelae_gender_male}
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
                    onClick={() => setFormData({ ...formData, gender: "female" })}
                  >
                    <SLTypo
                      as="span"
                      variant="fontLabelNormal"
                      text={baby.edit.saelae_gender_female}
                    />
                  </Button>
                </div>
              </InputGroup>
            </div>

            <Button className="mt-[var(--core-spacing-lg)]" onClick={() => {}}>
              {baby.edit.cta_save}
            </Button>
          </div>
        </TabLayout>
      )}
    </>
  );
};
