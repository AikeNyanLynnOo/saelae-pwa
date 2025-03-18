"use client";
import { useAuthStore } from "@/store/auth-store";
import { useBabyStore } from "@/store/baby-store";
import { useCommonStore } from "@/store/common-store";
import {
  calculateAge,
  formatDateString,
  getGenderLabel,
} from "@/utils/helperFunction";
import { getUserProfile } from "@/utils/userAPIFunctions";
import { Cake, Pencil, Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BabyNameWithDropDown } from "../atoms/BabyNameWithDropDown";
import { Female, Male } from "../atoms/CustomIcon";
import { LabelWithIcon } from "../atoms/LabelWithIcon";
import { PageHeader } from "../atoms/PageHeader";
import { useTranslate } from "../hooks/use-translate";
import { TabLayout } from "../layouts/TabLayout";
import { SLTypo } from "../SLTypo";
import { Button } from "../ui/button";
import { parseCookies } from "nookies";

interface BabyPageLayoutProps {
  cookies?: any;
  children?: React.ReactNode;
  customClasses?: string;
}

export const BabyPageLayout = ({
  cookies,
  children,
  customClasses,
}: BabyPageLayoutProps) => {
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
      // console.log("User >>", success);
      if (success && data) {
        setCurrentUser((data && data.profile) || null);
        if (!currentBaby) {
          setCurrentBaby((data && data.profile.children[0]) || null);
        }
      } else {
        router.push("/welcome?session_expired=true");
      }
    });
  }, []);

  return (
    <>
      {!isLoading && (
        <TabLayout>
          <PageHeader className="sticky top-0 bg-white z-20" />
          <div className="max-w-md mx-auto bg-white min-h-[100dvh] p-6 pb-20">
            <div className="flex flex-col gap-y-[var(--core-spacing-lg)] items-center mb-6">
              <SLTypo
                as="h1"
                text={baby.profile.title}
                variant={"fontH5Medium"}
                className="text-[var(--semantic-color-text-default)]"
              />

              <div className="w-20 h-20 rounded-full bg-[var(--semantic-color-bg-brand-subtlest)] flex items-center justify-center overflow-hidden">
                {(currentBaby && currentBaby.media_url && (
                  <img
                    src={currentBaby.media_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )) || (
                  <User className="text-[var(--semantic-color-icon-brand-subtle)]" />
                )}
              </div>

              <BabyNameWithDropDown
                babies={
                  currentUser &&
                  currentUser.children &&
                  currentUser.children.map((child: any) => ({
                    ...child,
                    age: calculateAge(child.birth_date),
                  }))

                  // [
                  //   {
                  //     name: "Noah",
                  //     gender: "male",
                  //     age: "၁ နှစ်၊ ၂၃ ရက်",
                  //   },
                  //   {
                  //     name: "Susan",
                  //     gender: "female",
                  //     age: "သန္ဓေသား အသက် ၆ လ",
                  //   },
                  // ]
                }
              />

              <div className="flex items-center gap-x-[var(--core-spacing-sm)]">
                <Button
                  variant="outline"
                  className={`w-fit rounded-[var(--core-border-radius-xs)] bg-transparent border border-[var(--semantic-color-outline-brand-default)] py-[var(--core-spacing-sm)]`}
                  onClick={() => {
                    router.push("/baby/edit");
                  }}
                >
                  <LabelWithIcon
                    label={baby.profile.cta_edit}
                    icon={Pencil}
                    variant="fontButtonMdSemibold"
                    iconClassName="text-[var(--semantic-color-text-brand-default)]"
                    labelClassName="text-[var(--semantic-color-text-brand-default)]"
                    className="gap-x-2.5"
                  />
                </Button>
                <Button
                  variant="outline"
                  className={`w-fit rounded-[var(--core-border-radius-xs)] bg-transparent border border-[var(--semantic-color-outline-brand-default)] py-[var(--core-spacing-sm)]`}
                  onClick={() => {
                    router.push("/baby/new");
                  }}
                >
                  <LabelWithIcon
                    label={baby.profile.cta_add}
                    icon={Plus}
                    variant="fontButtonMdSemibold"
                    iconClassName="text-[var(--semantic-color-text-brand-default)]"
                    labelClassName="text-[var(--semantic-color-text-brand-default)]"
                    className="gap-x-2.5"
                  />
                </Button>
              </div>
            </div>

            <div className="space-y-[var(--core-spacing-sm)]">
              <LabelWithIcon
                label={
                  (currentBaby && formatDateString(currentBaby.birth_date)) ||
                  ""
                }
                icon={Cake}
                variant="fontBody2Normal"
                iconClassName="text-[var(--semantic-color-icon-brand-default)]"
                labelClassName="text-[var(--semantic-color-text-default)]"
                className="gap-x-[var(--core-spacing-md)] border w-full p-[var(--core-spacing-lg)] rounded-[var(--core-border-radius-sm)] shadow-sm"
                labelFontFamily="var(--font-figtree)"
              />
              <LabelWithIcon
                label={
                  currentBaby &&
                  getGenderLabel({
                    gender: currentBaby.gender,
                    lang,
                  })
                }
                customIcon={
                  currentBaby && currentBaby.gender === "male" ? Male : Female
                }
                variant="fontBody2Normal"
                iconClassName="text-[var(--semantic-color-icon-update-default)]"
                labelClassName="text-[var(--semantic-color-text-default)]"
                className="gap-x-[var(--core-spacing-md)] border w-full p-[var(--core-spacing-lg)] rounded-[var(--core-border-radius-sm)] shadow-sm"
              />
            </div>
          </div>
        </TabLayout>
      )}
    </>
  );
};
