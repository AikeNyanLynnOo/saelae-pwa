"use client";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useCommonStore } from "@/store/common-store";
import { useLessonStore } from "@/store/lesson-store";
import { useModuleStore } from "@/store/module-store";
import { getStateBaseOnData } from "@/utils/helperFunction";
import { getModules } from "@/utils/moduleApiFunctions";
import { useRouter } from "next/navigation";
import { LessonCard } from "../atoms/LessonCard";
import { useMediaQuery } from "../hooks/use-media-query";
import { useTranslate } from "../hooks/use-translate";
import { SLTypo } from "../SLTypo";
import { LabelWithContentScroll } from "./LabelWithContentScroll";
import { parseCookies } from "nookies";

// const items = [
//   { label: "အားလုံး", value: "all", isActive: true },
//   { label: "ကိုယ်ဝန်ဆောင်ကျန်းမာရေး", value: "pregnancy" },
//   { label: "မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး", value: "newborn" },
//   { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
//   { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
//   { label: "မိခင်နို့တိုက်ကျွေးခြင်း", value: "breastfeeding" },
// ];
interface ResponsiveModalProps {
  cookies?: any;
  children?: any;
}

export function ResponsiveModal({ cookies, children }: ResponsiveModalProps) {
  const clientCookies = parseCookies();
  const { messages } = useTranslate();
  const {
    modules,
    categories,
    currentCategory,
    setCurrentCategory,
    setModules,
  } = useModuleStore();
  const { lang } = useCommonStore();
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const onButtonClick = (module_id: string) => {
    // console.log("Clicked:", module_id);
    router.push(`/${module_id}`);
    setOpen(false);
  };

  const onChipClick = (value: any) => {
    console.log("Clicked:", value);
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

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">test</DialogTitle>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-[var(--core-spacing-lg)]">
          <div className="w-full overflow-x-hidden py-1">
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
              className="w-full max-w-full overflow-x-hidden"
            />
          </div>
          <div className="max-h-[80dvh] overflow-y-auto">
            {/* <div className="space-y-[var(--core-spacing-md)] pb-4">
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
            <div className="space-y-[var(--core-spacing-md)] pb-4">
              {(modules &&
                modules.length > 0 &&
                modules.map((module: any, index: number) => {
                  return (
                    <LessonCard
                      key={index}
                      title={module.title}
                      description={module.description}
                      totalLessons={module.progress_data.total_lessons || "0"}
                      state={getStateBaseOnData(module.progress_data)}
                      completedLessons={
                        module.progress_data.completed_lessons || "0"
                      }
                      progressValue={
                        module.progress_data.completion_percentage || 0
                      }
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
                  className="text-center text-[var(--semantic-color-text-default)] mb-4 px-4 lg:px-0 min-h-[70dvh] flex items-center justify-center"
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
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="px-[var(--core-spacing-lg)]">
        <div className="w-full overflow-x-hidden py-2">
          <LabelWithContentScroll
            label={messages.modules.title}
            items={[
              {
                label: lang === "mm" ? "အားလုံး" : "All",
                value: "all",
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
            className="w-full max-w-full overflow-x-hidden"
          />
        </div>
        <div className="max-h-[80dvh] overflow-y-auto">
          {/* <div className="space-y-[var(--core-spacing-md)] pb-4">
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
          <div className="space-y-[var(--core-spacing-md)] pb-4">
            {modules &&
              modules.length > 0 &&
              modules.map((module: any, index: number) => {
                return (
                  <LessonCard
                    key={index}
                    imageUrl={module.media_url || ""}
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
        </div>
      </DrawerContent>
    </Drawer>
  );
}
