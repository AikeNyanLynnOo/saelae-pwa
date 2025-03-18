"use client";
import { useRouter } from "next/navigation";
import { useTranslate } from "../hooks/use-translate";
import { useFetchData } from "../hooks/use-fetch-data";
import { getModuleCategories, getModules } from "@/utils/moduleApiFunctions";
import { TabLayout } from "../layouts/TabLayout";
import { PageHeader } from "../atoms/PageHeader";
import { LabelWithContentScroll } from "../molecules/LabelWithContentScroll";
import { LessonCard } from "../atoms/LessonCard";
import { Divider } from "../atoms/Divider";
import { getStateBaseOnData } from "@/utils/helperFunction";
import { useModuleStore } from "@/store/module-store";
import { useCommonStore } from "@/store/common-store";
import { useEffect } from "react";
import { getUserProfile } from "@/utils/userAPIFunctions";
import { useAuthStore } from "@/store/auth-store";
import { SLTypo } from "../SLTypo";
import { parseCookies } from "nookies";

// const items = [
//   { label: "အားလုံး", value: "all", isActive: true },
//   { label: "ကိုယ်ဝန်ဆောင်ကျန်းမာရေး", value: "pregnancy" },
//   { label: "မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး", value: "newborn" },
//   { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
//   { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
//   { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
// ];

interface ModulesPageLayoutProps {
  cookies?: any;
}

export const ModulesPageLayout = ({ cookies }: ModulesPageLayoutProps) => {
  const clientCookies = parseCookies();
  const { lang } = useCommonStore();
  const { setCurrentUser } = useAuthStore();
  const { messages, isLoading } = useTranslate();
  const {
    modules,
    categories,
    currentCategory,
    setCurrentCategory,
    setModules,
    setCategories,
  } = useModuleStore();
  const router = useRouter();
  const onButtonClick = (module_id: string) => {
    router.push(`/${module_id}`);
  };

  // fetchUser
  // checkIsValid
  useEffect(() => {
    getUserProfile({ cookies: clientCookies }).then(
      ({ status, statusText, success, message, data, loading, error }) => {
        // console.log("User >>", success);
        if (success && data) {
          setCurrentUser((data && data.profile) || null);
        } else {
          router.push("/welcome?session_expired=true");
        }
      }
    );
  }, []);

  // fetching module categories
  useEffect(() => {
    getModuleCategories({
      cookies: clientCookies,
    }).then((res) => {
      if (
        res &&
        res.success &&
        res.data &&
        res.data.categories &&
        res.data.categories.length > 0
      ) {
        setCategories(res.data.categories);
      }
    });
  }, []);

  // fetching modules
  useEffect(() => {
    getModules({
      cookies: clientCookies,
    }).then((res) => {
      if (res && res.success && res.data && res.data.length > 0) {
        setModules(res.data);
      }
    });
  }, []);

  const onChipClick = (value: any) => {
    setCurrentCategory(value);
    getModules({
      cookies: clientCookies,
      category_id: value,
    }).then((res) => {
      if (res && res.success && res.data) {
        setModules(res.data);
      }
    });
  };

  return (
    <section>
      {!isLoading && (
        <TabLayout>
          <PageHeader className="sticky top-0 bg-white z-20" />
          <div className="px-6 py-4 sticky top-[72px] z-10 bg-white">
            <LabelWithContentScroll
              label={messages.modules.title}
              items={[
                {
                  label: lang === "mm" ? "အားလုံး" : "All",
                  value: "",
                  isActive: (!currentCategory && true) || false,
                },
                ...categories.map((category: any) => {
                  return {
                    label: category.name,
                    value: category.id,
                    isActive:
                      (currentCategory &&
                        `${currentCategory}` === `${category.id}`) ||
                      false,
                  };
                }),
              ]}
              onChipClick={onChipClick}
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
            {(modules &&
              modules.length > 0 &&
              modules.map((module: any, index: number) => {
                return (
                  <LessonCard
                    key={index}
                    title={module.title}
                    imageUrl={module.media_url || ""}
                    description={module.description}
                    totalLessons={module.progress_data.total_lessons || ""}
                    state={getStateBaseOnData(module.progress_data)}
                    onButtonClick={() => onButtonClick(module.id)}
                    clickRoute={`/${module.id}`}
                  />
                );
              })) || (
              <SLTypo
                as="p"
                text={
                  lang === "mm"
                    ? "လေ့လာစရာ များ မရှိသေးပါ..."
                    : "No modules found..."
                }
                variant="fontBody3Normal"
                className="text-center text-[var(--semantic-color-text-default)] mb-4 px-4 lg:px-0 min-h-[60dvh] flex items-center justify-center"
              />
            )}

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
