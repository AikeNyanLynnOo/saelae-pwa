"use client";
import { cn } from "@/lib/utils";
import { ArrowLeft, Pencil, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import { useAuthStore } from "@/store/auth-store";
import {
  getCities,
  getUserProfile,
  updateProfile,
} from "@/utils/userAPIFunctions";
import toast, { Toaster } from "react-hot-toast";
import { formatDate, getCountryNameFromISO2 } from "@/utils/helperFunction";
import { parseCookies } from "nookies";

interface ProfilePageLayoutProps {
  cookies?: any;
  children?: React.ReactNode;
  customClasses?: string;
  customBackUrl?: string;
}

export const ProfileEditPageLayout = ({
  cookies,
  children,
  customClasses,
  customBackUrl,
}: ProfilePageLayoutProps) => {
  const clientCookies = parseCookies();
  const { lang } = useCommonStore();
  const { currentUser, setCurrentUser } = useAuthStore();
  const { messages, isLoading } = useTranslate();
  const { common } = messages;
  const { profile } = messages;
  const router = useRouter();
  const [cities, setCities] = useState<any>([]);
  const [formData, setFormData] = useState<any>({
    mediaUrl: "",
    mediaFile: null,
    name: "",
    city: "",
    address: "",
    dob: null,
  });

  // useEffect(() => {
  //   setFormData({
  //     ...formData,
  //     mediaUrl: formData.mediaFile
  //       ? URL.createObjectURL(formData.mediaFile)
  //       : "",
  //   });
  // }, [formData.mediaFile]);

  // fetchUser
  // checkIsValid
  useEffect(() => {
    getUserProfile({ cookies: clientCookies }).then(({ success, data }) => {
      // console.log("User >>", success);
      if (success && data) {
        setCurrentUser((data && data.profile) || null);
      } else {
        router.push("/welcome?session_expired=true");
      }
    });
  }, []);

  useEffect(() => {
    setFormData({
      mediaUrl: (currentUser && currentUser.profile) || "",
      mediaFile: null,
      name: (currentUser && currentUser.name) || "",
      city: (currentUser && currentUser.city) || "",
      address: currentUser && currentUser.address,
      dob:
        currentUser && currentUser.date_of_birth
          ? new Date(currentUser.date_of_birth)
          : null,
    });
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.country_code) {
      getCities({
        countryName: getCountryNameFromISO2(currentUser.country_code),
      }).then(
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
    }
  }, [currentUser]);

  const handleBack = () => {
    if (customBackUrl) {
      router.push(customBackUrl);
    } else {
      router.back();
    }
  };

  const canProceed = useMemo(() => {
    return formData.name && formData.city && formData.address && formData.dob;
  }, [formData]);

  const handleSave = async () => {
    // console.log(formData);
    const { status, statusText, success, message, data } = await updateProfile({
      name: formData.name,
      address: formData.address,
      city: formData.city,
      date_of_birth: formatDate(formData.dob),
      media_file: formData.mediaFile,
      cookies: clientCookies,
    });
    if (success) {
      toast.success(common && common.toast_success_update_user);
      router.refresh();
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
                text={profile.edit.title}
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
                  label={profile.edit.cta_photo_edit}
                  icon={Pencil}
                  variant="fontButtonMdSemibold"
                  iconClassName="text-[var(--semantic-color-text-brand-default)]"
                  labelClassName="text-[var(--semantic-color-text-brand-default)]"
                  className="gap-x-2.5"
                />
              </Button>
            </div>

            <div className="space-y-[var(--core-spacing-sm)]">
              {/* User Name Input */}
              <InputGroup
                labelText={profile.edit.name_label}
                className="mb-4"
                htmlFor="name"
              >
                <Input
                  id="name"
                  placeholder={profile.edit.name_placeholder}
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
                labelText={profile.edit.city_label}
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
                    <SelectValue placeholder={profile.edit.city_placeholder} />
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
                labelText={profile.edit.address_label}
                className="mb-4"
                htmlFor="address"
              >
                <Textarea
                  id="address"
                  rows={3}
                  placeholder={profile.edit.address_placeholder}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full"
                />
              </InputGroup>

              {/* User Birthdate Input */}
              <InputGroup
                labelText={profile.edit.dob_label}
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
                      placeholder={profile.edit.dob_placeholder}
                    />
                  }
                  maxDate={new Date()}
                />
              </InputGroup>
            </div>

            <Button
              className="mt-[var(--core-spacing-lg)]"
              onClick={handleSave}
              disabled={!canProceed}
            >
              {profile.cta_save}
            </Button>
          </div>
        </TabLayout>
      )}

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
