import Link from "next/link";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { CommonLayout } from "@/components/layouts/CommonLayout";
import { SLTypo } from "@/components/SLTypo";
import { Button } from "@/components/ui/button";

export const WelcomeLayout = () => {
  return (
    <CommonLayout isLoading={false}>
      <div className="w-full sm:w-fit px-4 sm:px-0">
        {/* Image placeholder */}
        <ImagePlaceholder />

        <div className="mb-12">
          {/* Title */}
          <SLTypo
            as="h1"
            variant="fontH4Semibold"
            className="text-center text-[var(--semantic-color-text-bold)] mb-2"
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
        <Button asChild>
          <Link href="/auth">စတင်အသုံးပြုမယ်</Link>
        </Button>
      </div>
    </CommonLayout>
  );
};
