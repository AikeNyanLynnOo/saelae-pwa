"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft, Pencil, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { useCommonStore } from "@/store/common-store";
import { useBabyStore } from "@/store/baby-store";
import { getUserProfile } from "@/utils/userAPIFunctions";
import { useAuthStore } from "@/store/auth-store";
import { getChild, updateChild } from "@/utils/childApiFunctions";
import { formatDate } from "@/utils/helperFunction";
import toast, { Toaster } from "react-hot-toast";
import { parseCookies } from "nookies";

interface BabyPageEditProps {
  cookies?: any;
  children?: React.ReactNode;
  customClasses?: string;
  customBackUrl?: string;
}

export const BabyPageEditLayout = ({
  cookies,
  children,
  customClasses,
  customBackUrl,
}: BabyPageEditProps) => {
  const clientCookies = parseCookies();
  const { lang } = useCommonStore();
  const { currentUser, setCurrentUser } = useAuthStore();
  const { currentBaby, setCurrentBaby } = useBabyStore();
  const { messages, isLoading } = useTranslate();
  const { baby } = messages;
  const router = useRouter();

  // fetchUser
  // checkIsValid
  useEffect(() => {
    getUserProfile({ cookies: clientCookies }).then(({ success, data }) => {
      // console.log("User >>", success, data);
      if (success && data) {
        setCurrentUser((data && data.profile) || null);
      } else {
        router.push("/welcome?session_expired=true");
      }
    });
  }, []);

  const [formData, setFormData] = useState<any>({
    mediaUrl: "",
    mediaFile: null,
    isBorn: true,
    // step 3
    saelaeName: "",
    saelaeDob: null,
    gender: "",
    relationship: "",
  });

  // useEffect(() => {
  //   setFormData({
  //     ...formData,
  //     mediaUrl: formData.mediaFile
  //       ? URL.createObjectURL(formData.mediaFile)
  //       : "",
  //   });
  // }, [formData.mediaFile]);

  useEffect(() => {
    setFormData({
      saelaeName: (currentBaby && currentBaby.name) || "",
      saelaeDob:
        currentBaby && currentBaby.birth_date
          ? new Date(currentBaby.birth_date)
          : null,
      isBorn: (currentBaby && currentBaby.is_born) || false,
      gender: (currentBaby && currentBaby.gender) || "",
      relationship: (currentBaby && currentBaby.guardian_role) || "",
      mediaUrl: (currentBaby && currentBaby.media_url) || null,
      mediaFile: null,
    });
  }, [currentBaby]);

  const handleBack = () => {
    if (customBackUrl) {
      router.push(customBackUrl);
    } else {
      router.back();
    }
  };

  const handleSave = async () => {
    console.log(formData);
    const { status, statusText, success, message, data } = await updateChild({
      id: currentBaby?.id,
      name: formData.saelaeName,
      is_born: formData.isBorn,
      birth_date: formatDate(formData.saelaeDob),
      gender: formData.gender,
      guardian_role: formData.relationship,
      media_file: formData.mediaFile,
      cookies: clientCookies,
    });
    if (success) {
      toast.success("Successfully updated!");
      router.refresh();
      const childRes = await getChild({
        id: currentBaby?.id,
        cookies: clientCookies,
      });
      if (
        childRes &&
        childRes.success &&
        childRes.data &&
        childRes.data.child
      ) {
        setCurrentBaby(childRes.data.child);
      }
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
              <div className="w-20 h-20 rounded-full bg-[var(--semantic-color-bg-brand-subtlest)] flex items-center justify-center overflow-hidden">
                {formData.mediaUrl ? (
                  <img
                    src={formData.mediaUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-[var(--semantic-color-icon-brand-subtle)]" />
                )}
              </div>

              <Button
                variant="outline"
                className={`w-fit rounded-[var(--core-border-radius-xs)] bg-transparent border border-[var(--semantic-color-outline-brand-default)] py-[var(--core-spacing-sm)]`}
                onClick={() => {
                  // Create a hidden file input element
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";
                  fileInput.accept = "image/*";

                  // Handle file selection
                  fileInput.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      setFormData((prev: any) => ({
                        ...prev,
                        mediaFile: file,
                        mediaUrl: URL.createObjectURL(file),
                      }));
                    }
                  };

                  // Trigger file input click
                  fileInput.click();
                }}
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
                        placeholder={baby.edit.saelae_dob_placeholder}
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
                        placeholder={baby.edit.saelae_dob_placeholder}
                      />
                    }
                    minDate={new Date()}
                  />
                )}
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
                    onClick={() =>
                      setFormData({ ...formData, gender: "female" })
                    }
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

            <Button
              className="mt-[var(--core-spacing-lg)]"
              onClick={handleSave}
            >
              {baby.edit.cta_save}
            </Button>
          </div>
        </TabLayout>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
