import { cn } from "@/lib/utils";
import {
    ArrowLeft,
    Pencil,
    User
} from "lucide-react";
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

interface ProfilePageLayoutProps {
  children?: React.ReactNode;
  customClasses?: string;
  customBackUrl?: string;
}

export const ProfileEditPageLayout = ({
  children,
  customClasses,
  customBackUrl,
}: ProfilePageLayoutProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // step 1
    name: "",
    city: "",
    address: "",
    dob: null,
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
              <ArrowLeft size={24} className="w-6 h-6 text-[var(--semantic-color-icon-default)]" />
            </Button>
          </div>
          <SLTypo
            as="h1"
            text="ပရိုဖိုင်ပြင်ဆင်ခြင်း"
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
          {/* User Name Input */}
          <InputGroup labelText="နာမည်" className="mb-4" htmlFor="name">
            <Input
              id="name"
              placeholder="နာမည်အပြည့်အစုံကိုရေးထည့်ပါ"
              color="primary"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full flex items-center"
            />
          </InputGroup>

          {/* User City Input */}
          <InputGroup labelText="နေထိုင်ရာဒေသ" className="mb-4" htmlFor="city">
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
                <SelectValue placeholder="မြို့နာမည်ကိုရွေးခြယ်ပါ" />
              </SelectTrigger>
              <SelectContent className="text-black">
                <SelectGroup>
                  <SelectItem value="yangon">ရန်ကုန်</SelectItem>
                  <SelectItem value="mandalay">မန္တလေး</SelectItem>

                  <SelectItem value="naypyidaw">နေပြည်တော်</SelectItem>
                  <SelectItem value="bago">ပဲခူး</SelectItem>
                  <SelectItem value="mawlamyine">မော်လမြိုင်</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </InputGroup>
          <InputGroup labelText="လိပ်စာ" className="mb-4" htmlFor="address">
            <Textarea
              id="address"
              rows={3}
              placeholder="လက်ရှိနေထိုင်တဲ့ လိပ်စာကို ထည့်ပေးနော်"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full"
            />
          </InputGroup>

          {/* User Birthdate Input */}
          <InputGroup labelText="မွေးနေ့" className="mb-4" htmlFor="birthdate">
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
                  placeholder="ရက်စွဲကို ရွေးခြယ်ပါ"
                />
              }
            />
          </InputGroup>
        </div>

        <Button className="mt-[var(--core-spacing-lg)]" onClick={() => {}}>
          သိမ်းဆည်းမယ်
        </Button>
      </div>
    </TabLayout>
  );
};
