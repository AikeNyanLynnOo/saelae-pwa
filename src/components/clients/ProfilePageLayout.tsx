import {
  Cake,
  ChevronRight,
  CircleCheck,
  Flame,
  Globe,
  House,
  LogOut,
  Pencil,
  User,
} from "lucide-react";
import { Divider } from "../atoms/Divider";
import { LabelWithIcon } from "../atoms/LabelWithIcon";
import { PageHeader } from "../atoms/PageHeader";
import { TabLayout } from "../layouts/TabLayout";
import { SLTypo } from "../SLTypo";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslate } from "../hooks/use-translate";

interface ProfilePageLayoutProps {
  children?: React.ReactNode;
  customClasses?: string;
}

export const ProfilePageLayout = ({
  children,
  customClasses,
}: ProfilePageLayoutProps) => {
  const { messages, isLoading } = useTranslate();
  const { profile } = messages;

  const router = useRouter();

  return (
    <>
      {!isLoading && (
        <TabLayout>
          <PageHeader className="sticky top-0 bg-white z-20" />
          <div className="max-w-md mx-auto bg-white min-h-[100dvh] p-6 pb-20">
            <div className="flex flex-col gap-y-[var(--core-spacing-lg)] items-center mb-6">
              <SLTypo
                as="h1"
                text={profile.title}
                variant={"fontH5Medium"}
                className="text-[var(--semantic-color-text-default)]"
              />

              <div className="w-20 h-20 rounded-full bg-[var(--semantic-color-bg-brand-subtlest)] flex items-center justify-center">
                <User className="text-[var(--semantic-color-icon-brand-subtle)]" />
              </div>

              <div className="flex flex-col gap-y-[var(--core-spacing-xs)] items-center">
                <SLTypo
                  as="h2"
                  text="အောင်အောင်"
                  variant={"fontH4Semibold"}
                  className="text-[var(--semantic-color-text-default)]"
                />
                <SLTypo
                  as="span"
                  text={`{baby's name} လေး {selectedRelation}`}
                  variant={"fontBody2Normal"}
                  className="text-[var(--semantic-color-text-subtle)] text-center"
                />
              </div>

              <Button
                variant="outline"
                className={`w-fit rounded-[var(--core-border-radius-xs)] bg-transparent border border-[var(--semantic-color-outline-brand-default)] py-[var(--core-spacing-sm)]`}
                onClick={() => {
                  router.push("/profile/edit");
                }}
              >
                <LabelWithIcon
                  label={profile.cta_edit}
                  icon={Pencil}
                  variant="fontButtonMdSemibold"
                  iconClassName="text-[var(--semantic-color-text-brand-default)]"
                  labelClassName="text-[var(--semantic-color-text-brand-default)]"
                  className="gap-x-2.5"
                />
              </Button>
            </div>

            <div className="space-y-[var(--core-spacing-sm)]">
              <LabelWithIcon
                label="30/06/1995"
                icon={Cake}
                variant="fontBody2Normal"
                iconClassName="text-[var(--semantic-color-icon-brand-default)]"
                labelClassName="text-[var(--semantic-color-text-default)]"
                className="gap-x-[var(--core-spacing-md)] border w-full p-[var(--core-spacing-lg)] rounded-[var(--core-border-radius-sm)] shadow-sm"
                labelFontFamily="var(--font-figtree)"
              />
              <LabelWithIcon
                label="မရမ်းကုန်း"
                icon={House}
                variant="fontBody2Normal"
                iconClassName="text-[var(--semantic-color-icon-update-default)]"
                labelClassName="text-[var(--semantic-color-text-default)]"
                className="gap-x-[var(--core-spacing-md)] border w-full p-[var(--core-spacing-lg)] rounded-[var(--core-border-radius-sm)] shadow-sm"
              />
            </div>
            <Divider />

            <div className="flex flex-col gap-y-[var(--core-spacing-sm)]">
              <SLTypo
                as="p"
                text={profile.brief_text}
                variant={"fontH5Medium"}
                className="text-[var(--semantic-color-text-default)] mb-[var(--core-spacing-sm)]"
              />
              <LabelWithIcon
                label="၃ ရက်ဆက်တိုက် သင်ယူပြီး"
                icon={Flame}
                variant="fontBody2Normal"
                iconClassName="text-[var(--semantic-color-icon-negative-default)]"
                labelClassName="text-[var(--semantic-color-text-default)]"
                className="gap-x-[var(--core-spacing-md)] border w-full p-[var(--core-spacing-lg)] rounded-[var(--core-border-radius-sm)] shadow-sm"
              />
              <LabelWithIcon
                label="သင်ခန်းစာ ၃ ခုပြီးမြှောက်ခဲ့"
                icon={CircleCheck}
                variant="fontBody2Normal"
                iconClassName="text-[var(--semantic-color-icon-update-default)] text-white"
                iconProps={{
                  fill: "#28A745",
                  strokeWidth: 2,
                }}
                labelClassName="text-[var(--semantic-color-text-default)]"
                className="gap-x-[var(--core-spacing-md)] border w-full p-[var(--core-spacing-lg)] rounded-[var(--core-border-radius-sm)] shadow-sm"
              />
            </div>
            <Divider />
            <div className="flex flex-col gap-y-[var(--core-spacing-sm)]">
              <Link href={"/profile/edit/language"}>
                <LabelWithIcon
                  label={profile.lang_setting}
                  icon={Globe}
                  variant="fontBody2Normal"
                  iconClassName="text-[var(--semantic-color-icon-brand-default)]"
                  labelClassName="text-[var(--semantic-color-text-default)] w-full"
                  className="cursor-pointer gap-x-[var(--core-spacing-md)] border w-full p-[var(--core-spacing-lg)] rounded-[var(--core-border-radius-sm)] shadow-sm"
                >
                  <ChevronRight className="text-[var(--semantic-color-icon-brand-default)] h-4 w-4" />
                </LabelWithIcon>
              </Link>
            </div>

            <Button
              variant="outline"
              className={`w-fit mt-[var(--core-spacing-lg)] block mx-auto rounded-[var(--core-border-radius-xs)] bg-transparent border border-[var(--semantic-color-outline-bold)] py-[var(--core-spacing-sm)]`}
              onClick={() => {}}
            >
              <LabelWithIcon
                label={profile.cta_logout}
                icon={LogOut}
                variant="fontButtonMdSemibold"
                iconClassName="text-[var(--semantic-color-icon-default)]"
                labelClassName="text-[var(--semantic-color-text-default)]"
                className="gap-x-2.5"
              />
            </Button>
          </div>
        </TabLayout>
      )}
    </>
  );
};
