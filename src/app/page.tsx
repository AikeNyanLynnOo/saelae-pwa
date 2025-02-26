"use client";
import { ContentHeader } from "@/components/atoms/ContentHeader";
import { LessonCard } from "@/components/atoms/LessonCard";
import { PageHeader } from "@/components/atoms/PageHeader";
import { TabLayout } from "@/components/layouts/TabLayout";
export default function Home() {
  return (
    <section>
      <TabLayout>
        <PageHeader className="sticky top-0 bg-white z-10"/>
        <ContentHeader
          title="မွေးကင်းစကလေး ပြုစုစောင့်ရှောက်ခြင်း"
          titleVariant="fontH4Semibold"
          titleClassName="text-[var(--semantic-color-text-default)]"
          className="sticky top-[72px] bg-white z-10"
        />
        <div className="px-6 space-y-[var(--core-spacing-md)] pb-20">
          <LessonCard
            title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
            description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
            state="completed"
          />
          <LessonCard
            title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
            description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
            state="completed"
          />
          <LessonCard
            title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
            description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
            state="completed"
          />
          <LessonCard
            title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
            description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
            state="completed"
          />
          <LessonCard
            title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
            description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
            state="completed"
          />
          <LessonCard
            title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
            description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
            state="completed"
          />
          <LessonCard
            title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
            description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
            state="completed"
          />
          <LessonCard
            title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
            description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
            state="half-completed"
          />
          <LessonCard
            title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
            description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
            state="locked"
          />
        </div>
      </TabLayout>
    </section>
  );
}
