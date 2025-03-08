"use client";
import { Divider } from "@/components/atoms/Divider";
import { LessonCard } from "@/components/atoms/LessonCard";
import { PageHeader } from "@/components/atoms/PageHeader";
import { TabLayout } from "@/components/layouts/TabLayout";
import { LabelWithContentScroll } from "@/components/molecules/LabelWithContentScroll";
import { useRouter } from "next/navigation";

const items = [
  { label: "အားလုံး", value: "all", isActive: true },
  { label: "ကိုယ်ဝန်ဆောင်ကျန်းမာရေး", value: "pregnancy" },
  { label: "မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး", value: "newborn" },
  { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
  { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
  { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
];

export default function ModulesPage() {
  const router = useRouter();
  const onButtonClick = (module_id: string) => {
    router.push(`/${module_id}`);
  };

  return (
    <section>
      <TabLayout>
        <PageHeader className="sticky top-0 bg-white z-20" />
        <div className="px-6 py-4 sticky top-[72px] z-10 bg-white">
          <LabelWithContentScroll
            label="ဘာသာရပ်များ"
            items={items}
            onChipClick={(value) => console.log("Clicked:", value)}
          />
        </div>
        <div className="px-6 space-y-[var(--core-spacing-md)] pb-4">
          <LessonCard
            title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
            description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
            totalLessons="၆"
            state="progress"
            completedLessons="၂"
            progressValue={40}
          />
          <Divider className="my-0" />
        </div>
        <div className="px-6 space-y-[var(--core-spacing-md)] pb-20">
          <LessonCard
            title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
            description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
            totalLessons="၆"
            state="default"
            onButtonClick={() => onButtonClick("23")}
          />
          <LessonCard
            title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
            description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
            totalLessons="၆"
            state="default"
          />
          <LessonCard
            title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
            description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
            totalLessons="၆"
            state="default"
          />
          <LessonCard
            title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
            description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
            totalLessons="၆"
            state="default"
          />
          <LessonCard
            title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
            description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
            totalLessons="၆"
            state="default"
          />
        </div>
      </TabLayout>
    </section>
  );
}
