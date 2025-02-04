import { ImagePlaceholder } from "../atoms/ImagePlaceholder";
import { CommonLayout } from "../layouts/CommonLayout";
import { SLTypo } from "../SLTypo";
import { Button } from "../ui/button";

export const WelcomeLayout = () => {
  return (
    <CommonLayout isLoading={false}>
      <div>
        {/* Image placeholder */}
        <ImagePlaceholder />

        <div className="mb-12">
          {/* Title */}
          <SLTypo
            as="h1"
            variant="fontH4Semibold"
            className="text-center text-gray-800 mb-2"
          >
            ပျော်ရွှင်စရာအိမ်လေးတိုင်းအတွက်
            <br />
            ဆည်းလည်းသံ
          </SLTypo>

          {/* Description */}
          <SLTypo
            as="p"
            variant="fontBody3Normal"
            className="text-center text-[var(semantic-color-text-subtle)] !leading-5"
          >
            ကလေးလေးတွေဟာ အိမ်တိုင်းအတွက် ဆည်းလည်းသံလေးတွေပါပဲ။
            <br />
            ဆည်းလည်းလေးတွေ ကျန်းမာပျော်ရွှင်စေဖို့၊
            <br />
            မိသားစုဝင်အားလုံး ဗဟုသုတတွေ လေ့လာပြည့်ဝဖို့ ရည်ရွယ်ပါတယ်။
          </SLTypo>
        </div>

        {/* Button */}
        <Button className="bg-[var(--component-mode-1-color-button-bg-primary-enabled)] rounded-[var(--core-border-radius-xs)] w-full px-[var(--core-spacing-lg)] py-[var(--core-spacing-sm)]">
          စတင်အသုံးပြုမယ်
        </Button>
      </div>
    </CommonLayout>
  );
};
