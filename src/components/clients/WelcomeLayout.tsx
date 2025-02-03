import { CommonLayout } from "../layouts/CommonLayout";
import { SLTypo } from "../SLTypo";
import { Button } from "../ui/button";

export const WelcomeLayout = () => {
  return (
    <CommonLayout isLoading={false}>
      <div>
        {/* Image placeholder */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 bg-gray-200 rounded-lg" />
        </div>

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
            className="text-center text-[color:--semantic-color-text-subtle] !leading-5"
          >
            ကလေးလေးတွေဟာ အိမ်တိုင်းအတွက် ဆည်းလည်းသံလေးတွေပါပဲ။
            <br />
            ဆည်းလည်းလေးတွေ ကျန်းမာပျော်ရွှင်စေဖို့၊
            <br />
            မိသားစုဝင်အားလုံး ဗဟုသုတတွေ လေ့လာပြည့်ဝဖို့ ရည်ရွယ်ပါတယ်။
          </SLTypo>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Button className="bg-[#735EFA] rounded-sm w-full px-4 py-2">
            စတင်အသုံးပြုမယ်
          </Button>
        </div>
      </div>
    </CommonLayout>
  );
};
