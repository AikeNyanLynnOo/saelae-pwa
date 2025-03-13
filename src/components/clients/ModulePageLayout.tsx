"use client";
import { useCommonStore } from "@/store/common-store";
import { useLessonStore } from "@/store/lesson-store";
import { useModuleStore } from "@/store/module-store";
import {
  getModuleCategories,
  getModuleLessons,
  getModules,
} from "@/utils/moduleApiFunctions";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ContentHeader } from "../atoms/ContentHeader";
import { LessonCard } from "../atoms/LessonCard";
import { PageHeader } from "../atoms/PageHeader";
import { TabLayout } from "../layouts/TabLayout";
import { ResponsiveModal } from "../molecules/ResponsiveModal";
import { SLTypo } from "../SLTypo";
import { Button } from "../ui/button";

interface ModulePageLayoutProps {
  module_id?: string;
  cookies?: any;
}

export const ModulePageLayout = ({
  cookies,
  module_id,
}: ModulePageLayoutProps) => {
  const router = useRouter();
  console.log("id>>", module_id);
  const {
    categories,
    modules,
    setCategories,
    setModules,
    currentModule,
    setCurrentModule,
  } = useModuleStore();
  const { lang } = useCommonStore();
  const { lessons, setLessons } = useLessonStore();
  const [isModuleValid, setIsModuleValid] = useState(false);

  useEffect(() => {
    if (module_id) {
      getModuleLessons({
        cookies,
        module_id: module_id,
      })
        .then(
          ({ status, statusText, success, message, data, loading, error }) => {
            // console.log("Success >>", success);
            if (success && data) {
              setLessons(data.lessons || []);
              setIsModuleValid(true);
            } else {
              router.push("/");
            }
          }
        )
        .catch((e) => {
          //error
        });
    }
  }, [module_id]);

  useEffect(() => {
    getModuleCategories({
      cookies,
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

  useEffect(() => {
    getModules({
      cookies,
    }).then((res) => {
      if (res && res.success && res.data && res.data.length > 0) {
        setModules(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (isModuleValid) {
      const module = modules.find((item) => `${item.id}` === `${module_id}`);
      console.log("setting current module from array>>", module);
      setCurrentModule(module || null);
    } else {
      const firstModule = (modules && modules.length > 0 && modules[0]) || null;
      console.log("setting first module>>", firstModule);
      setCurrentModule(firstModule);
      if (firstModule && firstModule.id) {
        getModuleLessons({
          cookies,
          module_id: firstModule.id,
        })
          .then(
            ({
              status,
              statusText,
              success,
              message,
              data,
              loading,
              error,
            }) => {
              // console.log("Success >>", success);
              if (success && data) {
                setLessons(data.lessons || []);
              } else {
                setLessons([]);
              }
            }
          )
          .catch((e) => {
            //error
          });
      } else {
        setLessons([]);
      }
    }
  }, [isModuleValid, module_id, modules]);

  //   console.log("current module>>", currentModule);
  //   { status, statusText, success, message, data, loading, error }
  //   const categoriesRes = useFetchData({
  //     fetcher: getModuleCategories,
  //     args: {
  //       cookies,
  //     },
  //     deps: [],
  //   });
  //   const modulesRes = useFetchData({
  //     fetcher: getModules,
  //     args: {
  //       cookies,
  //     },
  //     deps: [],
  //   });

  //   console.log("Categories res>>", categoriesRes);
  //   console.log("Modules res>>", modulesRes);

  //   useEffect(() => {
  //     if (
  //       categoriesRes &&
  //       categoriesRes.success &&
  //       categoriesRes.data &&
  //       categoriesRes.data.categories &&
  //       categoriesRes.data.categories.length > 0
  //     ) {
  //       setCategories(categoriesRes.data.categories);
  //     }
  //   }, [categoriesRes]);

  //   useEffect(() => {
  //     if (
  //       modulesRes &&
  //       modulesRes.success &&
  //       modulesRes.data &&
  //       modulesRes.data.length > 0
  //     ) {
  //       setModules(modulesRes.data);
  //       setCurrentModule(modulesRes.data[0]);
  //     }
  //   }, [modulesRes]);

  return (
    <TabLayout>
      <PageHeader className="sticky top-0 bg-white z-10">
        <ResponsiveModal cookies={cookies}>
          <Button
            variant="outline"
            className={`w-fit flex-wrap rounded-[var(--core-border-radius-xs)] bg-[var(--semantic-color-bg-primary)] border-none py-[var(--core-spacing-sm)] px-2 sm:px-[var(--core-spacing-lg)]`}
            onClick={() => {}}
          >
            <SLTypo
              as="span"
              text={(currentModule && currentModule.title) || ""}
              variant="fontBody2IntenseNormal"
              className="text-[var(--semantic-color-text-bold)]"
            />
            <ChevronDown size={2} />
          </Button>
        </ResponsiveModal>
      </PageHeader>
      <ContentHeader
        title={(currentModule && currentModule.title) || ""}
        titleVariant="fontH4Semibold"
        titleClassName="text-[var(--semantic-color-text-default)]"
        className="sticky top-[116px] bg-white z-10 gap-0"
      />
      <div className="px-6 space-y-[var(--core-spacing-md)] pb-20">
        {lessons &&
          lessons.length > 0 &&
          lessons.map((lesson, index) => (
            <LessonCard
              key={index}
              id={lesson.id}
              moduleId={(currentModule && currentModule.id) || ""}
              title={lesson.title}
              description={lesson.description}
              state={lesson.is_completed ? "completed" : "half-completed"}
            />
          ))}

        {/* default card on frontend */}
        {currentModule && currentModule.has_quiz && (
          <LessonCard
            title={lang === "mm" ? "စာမေးပွဲ" : "Final Exam"}
            description={
              lang === "mm"
                ? "မေးခွန်းတစ်ခုကို ဖြေဆိုချိန် ၃၀ စက္ကန့်ရရှိပါတယ်နော်."
                : "You get 30 seconds for a question."
            }
            state={currentModule.quiz_completed ? "completed" : "locked"}
          />
        )}

        {/* <LessonCard
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
        /> */}
      </div>
    </TabLayout>
  );
};
