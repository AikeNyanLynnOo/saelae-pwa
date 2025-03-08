import {
  Cake,
  ChevronRight,
  CircleCheck,
  Flame,
  Globe,
  House,
  LogOut,
  Pencil,
  Plus,
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
import { BabyNameWithDropDown } from "../atoms/BabyNameWithDropDown";
import { Male } from "../atoms/CustomIcon";

interface BabyPageLayoutProps {
  children?: React.ReactNode;
  customClasses?: string;
}

export const BabyPageLayout = ({
  children,
  customClasses,
}: BabyPageLayoutProps) => {
  const router = useRouter();

  return (
    <TabLayout>
      <PageHeader className="sticky top-0 bg-white z-20" />
      <div className="max-w-md mx-auto bg-white min-h-[100dvh] p-6 pb-20">
        <div className="flex flex-col gap-y-[var(--core-spacing-lg)] items-center mb-6">
          <SLTypo
            as="h1"
            text="ဆည်းလည်းလေးရဲ့ ဒိုင်ယာရီ"
            variant={"fontH5Medium"}
            className="text-[var(--semantic-color-text-default)]"
          />

          <div className="w-20 h-20 rounded-full bg-[var(--semantic-color-bg-brand-subtlest)] flex items-center justify-center">
            <User className="text-[var(--semantic-color-icon-brand-subtle)]" />
          </div>

          <BabyNameWithDropDown
            babies={[
              {
                name: "Noah",
                gender: "male",
                age: "၁ နှစ်၊ ၂၃ ရက်",
              },
              {
                name: "Susan",
                gender: "female",
                age: "သန္ဓေသား အသက် ၆ လ",
              },
            ]}
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
                label="ပြင်မယ်"
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
                label="အသစ်ထည့်မယ်"
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
            label="30/06/1995"
            icon={Cake}
            variant="fontBody2Normal"
            iconClassName="text-[var(--semantic-color-icon-brand-default)]"
            labelClassName="text-[var(--semantic-color-text-default)]"
            className="gap-x-[var(--core-spacing-md)] border w-full p-[var(--core-spacing-lg)] rounded-[var(--core-border-radius-sm)] shadow-sm"
            labelFontFamily="var(--font-figtree)"
          />
          <LabelWithIcon
            label="ကျား"
            customIcon={Male}
            variant="fontBody2Normal"
            iconClassName="text-[var(--semantic-color-icon-update-default)]"
            labelClassName="text-[var(--semantic-color-text-default)]"
            className="gap-x-[var(--core-spacing-md)] border w-full p-[var(--core-spacing-lg)] rounded-[var(--core-border-radius-sm)] shadow-sm"
          />
        </div>
      </div>
    </TabLayout>
  );
};
