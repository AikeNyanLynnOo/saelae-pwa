"use client";
import { ContentHeader } from "@/components/atoms/ContentHeader";
import { LessonCard } from "@/components/atoms/LessonCard";
import { PageHeader } from "@/components/atoms/PageHeader";
import { TabLayout } from "@/components/layouts/TabLayout";
import { ResponsiveModal } from "@/components/molecules/ResponsiveModal";
import { SLTypo } from "@/components/SLTypo";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
export default function Home({ params }: { params: { module_id: string } }) {
  const { module_id } = params;
  console.log(module_id);
  return (
    <section>
      <TabLayout>
        <PageHeader className="sticky top-0 bg-white z-10">
          <ResponsiveModal>
            <Button
              variant="outline"
              className={`w-fit flex-wrap rounded-[var(--core-border-radius-xs)] bg-[var(--semantic-color-bg-primary)] border-none py-[var(--core-spacing-sm)] px-2 sm:px-[var(--core-spacing-lg)]`}
              onClick={() => {}}
            >
              <SLTypo
                as="span"
                text="မွေးကင်းစကလေး ပြုစုစောင့်ရှောက်ခြင်း"
                variant="fontBody2IntenseNormal"
                className="text-[var(--semantic-color-text-bold)]"
              />
              <ChevronDown size={2} />
            </Button>
          </ResponsiveModal>
        </PageHeader>
        <ContentHeader
          title="မွေးကင်းစကလေး ပြုစုစောင့်ရှောက်ခြင်း"
          titleVariant="fontH4Semibold"
          titleClassName="text-[var(--semantic-color-text-default)]"
          className="sticky top-[116px] bg-white z-10 gap-0"
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
