import { LessonCard } from "../atoms/LessonCard";
import { CommonLayout } from "../layouts/CommonLayout";

export const PersonalizationLayout = () => {
  return (
    <CommonLayout isLoading={false}>
      <div className="w-full lg:w-3/6 min-h-[100dvh]">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-black rounded-full mx-auto" />
          <h1 className="text-xl font-medium mt-4">
            စတင်လေ့လာချင်သော ဘာသာရပ်ကို ရွေးခြေပါ...
          </h1>
          <p className="text-sm text-muted-foreground">
            အခြေခံမှစ၍ ပြီးပြည့်စုံ ပြင်ဆင်ထားပါတယ်။
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium">နိုင်ငံတော်ငွေကြေးဆိုင်ရာ</h2>

          {/* Default State */}
          <LessonCard
            title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
            description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
            totalLessons="၆"
            state="default"
          />

          {/* Verified State */}
          <LessonCard
            title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
            description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
            state="verified"
          />
          <LessonCard
            title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
            description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
            totalLessons="၆"
            state="progress"
            completedLessons="၂"
            progressValue={40}
          />
        </div>
      </div>
    </CommonLayout>
  );
};
