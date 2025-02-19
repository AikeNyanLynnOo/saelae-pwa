import { useEffect } from "react";
import { useState } from "react";
import { LessonCard } from "../atoms/LessonCard";
import { CommonLayout } from "../layouts/CommonLayout";
import { SLTypo } from "../SLTypo";

export const PersonalizationLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  return (
    <CommonLayout isLoading={isLoading}>
      <div className="space-y-[var(--core-spacing-xl)] pb-12 w-full md:w-4/6 lg:w-3/6 mx-auto min-h-[100dvh] max-h-[100vh] overflow-y-scroll relative hide-scrollbar">
        <div className="pt-10 px-4 lg:px-0">
          {/* Title */}
          <SLTypo
            as="h3"
            text="စတင်လေ့လာချင်သော ဘာသာရပ်ကို ရွေးခြယ်ပါ..."
            variant="fontH3Medium"
            className="text-center text-[var(--semantic-color-text-default)] mb-4 px-4 lg:px-0"
          />

          {/* Description */}
          <SLTypo
            as="p"
            text="အချိန်မရွေးပြန်လည် ပြင်ဆင်လို့ရတယ်နော်"
            variant="fontBody3Normal"
            className="text-center text-[var(--semantic-color-text-subtle)] px-4 lg:px-0"
          />
        </div>

        <div className="px-4 lg:px-0 w-fit mx-auto">
          <SLTypo
            as="h6"
            text="ဦးစားပေးလေ့လာသင့်သော"
            variant="fontH6Semibold"
            className="text-[var(--semantic-color-text-default)] mb-[var(--core-spacing-lg)]"
          />
          <div className="flex flex-col gap-[var(--core-spacing-lg)]">
            <LessonCard
              title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
              description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
              totalLessons="၆"
              state="default"
            />
          </div>
        </div>

        <div className="px-4 lg:px-0 w-fit mx-auto">
          <SLTypo
            as="h6"
            text="အခြားလေ့လာစရာများ"
            variant="fontH6Semibold"
            className="text-[var(--semantic-color-text-default)] mb-[var(--core-spacing-lg)]"
          />
          <div className="flex flex-col gap-[var(--core-spacing-lg)]">
            <LessonCard
              title="သန္ဓေသား ဆည်းလည်းလေးရဲ့ ဖွံ့ဖြိုးမှု"
              description="ဆည်းလည်းလေးတို့တွေ မေမေ့ရဲ့ ဗိုက်ထဲမှာ ဘယ်လိုမျိုးရှင်သန်ကြလဲ လေ့လာရအောင်နော်။"
              totalLessons="၆"
              state="default"
            />
            <LessonCard
              title="မွေးကင်းစကလေး ပြုစုစောင့်ရှောက်ခြင်း"
              description="ဆည်းလည်းလေးတို့တွေဟာ မွေးစအချိန်မှာ အရမ်းကိုနုနယ်လွန်းတာမို့ စနစ်တကျ ပြုစုစောင့်ရှောက်နည်းတွေကို လေ့လာရအောင်နော်။"
              totalLessons="၆"
              state="default"
            />
            <LessonCard
              title="မွေးကင်းစကလေး အာဟာရ"
              description="ဆည်းလည်းလေးတို့တွေဟာ မွေးစအချိန်မှာ အရမ်းကိုနုနယ်လွန်းတာမို့ စနစ်တကျ ပြုစုစောင့်ရှောက်နည်းတွေကို လေ့လာရအောင်နော်။"
              totalLessons="၆"
              state="default"
            />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};
