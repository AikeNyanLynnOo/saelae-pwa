"use client";
import { useRouter } from "next/navigation";
import { useTranslate } from "../hooks/use-translate";
import { useFetchData } from "../hooks/use-fetch-data";
import { getModules } from "@/utils/moduleApiFunctions";
import { TabLayout } from "../layouts/TabLayout";
import { PageHeader } from "../atoms/PageHeader";
import { LabelWithContentScroll } from "../molecules/LabelWithContentScroll";
import { LessonCard } from "../atoms/LessonCard";
import { Divider } from "../atoms/Divider";
import { getStateBaseOnData } from "@/utils/helperFunction";

const items = [
  { label: "အားလုံး", value: "all", isActive: true },
  { label: "ကိုယ်ဝန်ဆောင်ကျန်းမာရေး", value: "pregnancy" },
  { label: "မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး", value: "newborn" },
  { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
  { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
  { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
];

interface ModulesPageLayoutProps {
  cookies?: any;
}

export const ModulesPageLayout = ({ cookies }: ModulesPageLayoutProps) => {
  const { messages, isLoading } = useTranslate();
  const { modules } = messages;
  const router = useRouter();
  const onButtonClick = (module_id: string) => {
    router.push(`/${module_id}`);
  };
  const { status, statusText, success, message, data, loading, error } =
    useFetchData({
      fetcher: getModules,
      args: {
        cookies,
      },
      deps: [],
    });

  return (
    <section>
      {!isLoading && !loading && (
        <TabLayout>
          <PageHeader className="sticky top-0 bg-white z-20" />
          <div className="px-6 py-4 sticky top-[72px] z-10 bg-white">
            <LabelWithContentScroll
              label={modules.title}
              items={items}
              onChipClick={(value) => console.log("Clicked:", value)}
            />
          </div>
          {/* <div className="px-6 space-y-[var(--core-spacing-md)] pb-4">
            <LessonCard
              title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
              description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
              totalLessons="၆"
              state="progress"
              completedLessons="၂"
              progressValue={40}
            />
            <Divider className="my-0" />
          </div> */}
          <div className="px-6 space-y-[var(--core-spacing-md)] pb-20">
            {data &&
              data.length > 0 &&
              data.map((module: any, index: number) => {
                return (
                  <LessonCard
                    key={index}
                    title={module.title}
                    description={module.description}
                    totalLessons={module.progress_data.total_lessons || ""}
                    state={getStateBaseOnData(module.progress_data)}
                    onButtonClick={() => onButtonClick(module.id)}
                  />
                );
              })}

            {/* <LessonCard
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
            /> */}
          </div>
        </TabLayout>
      )}
    </section>
  );
};
