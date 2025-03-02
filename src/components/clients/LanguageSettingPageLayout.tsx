import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageHeader } from "../atoms/PageHeader";
import { TabLayout } from "../layouts/TabLayout";
import { SLTypo } from "../SLTypo";
import { Button } from "../ui/button";
import LanguageSelection from "../atoms/forms/LanguageSelection";

interface ProfilePageLayoutProps {
  children?: React.ReactNode;
  customClasses?: string;
  customBackUrl?: string;
}

export const LanguageSettingPageLayout = ({
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
              <ArrowLeft
                size={24}
                className="w-6 h-6 text-[var(--semantic-color-icon-default)]"
              />
            </Button>
          </div>
          <SLTypo
            as="h1"
            text="အပ်ပလီကေးရှင်း ဘာသာစကား"
            variant={"fontH5Medium"}
            className="text-[var(--semantic-color-text-default)]"
          />
        </div>
        <LanguageSelection />
      </div>
    </TabLayout>
  );
};
