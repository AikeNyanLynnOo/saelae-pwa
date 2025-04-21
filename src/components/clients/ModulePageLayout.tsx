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
import { getUserProfile } from "@/utils/userAPIFunctions";
import { useAuthStore } from "@/store/auth-store";
import { parseCookies } from "nookies";

interface ModulePageLayoutProps {
  module_id?: string;
  cookies?: any;
}

export const ModulePageLayout = ({
  module_id,
  cookies,
}: ModulePageLayoutProps) => {
  const router = useRouter();
  const {
    categories,
    modules,
    setCategories,
    setModules,
    currentModule,
    setCurrentModule,
  } = useModuleStore();
  const clientCookies = parseCookies();
  const { lang } = useCommonStore();
  const { lessons, setLessons } = useLessonStore();
  const { setCurrentUser } = useAuthStore();
  const [isModuleValid, setIsModuleValid] = useState(true);

  // fetchUser
  // checkIsValid
  useEffect(() => {
    getUserProfile({ cookies: clientCookies }).then(
      ({ status, statusText, success, message, data, loading, error }) => {
        if (success && data) {
          setCurrentUser((data && data.profile) || null);
        } else {
          router.push("/welcome?session_expired=true");
        }
      }
    );
  }, []);

  useEffect(() => {
    if (module_id) {
      getModuleLessons({
        cookies: clientCookies,
        module_id: module_id,
      })
        .then(({ success, data }) => {
          if (success && data) {
            setCurrentModule(data);
            setLessons(data.lessons || []);
            // condition for module valid
            setIsModuleValid(true);
          } else {
            router.push("/");
          }
        })
        .catch((e) => {
          //error
          setIsModuleValid(false);
        });
    } else {
      setIsModuleValid(false);
    }
  }, [module_id]);

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

  useEffect(() => {
    getModules({
      cookies: clientCookies,
    }).then((res) => {
      if (res && res.success && res.data && res.data.length > 0) {
        setModules(res.data);
      }
    });
  }, []);

  useEffect(() => {
    // condition for module not valid
    if (!isModuleValid) {
      const firstModule = (modules && modules.length > 0 && modules[0]) || null;
      if (firstModule && firstModule.id) {
        getModuleLessons({
          cookies: clientCookies,
          module_id: firstModule.id,
        })
          .then(({ success, data }) => {
            if (success && data) {
              setCurrentModule(data);
              setLessons(data.lessons || []);
            } else {
              setLessons([]);
            }
          })
          .catch((e) => {
            //error
          });
      } else {
        setLessons([]);
      }
    }
  }, [isModuleValid, modules]);

  return (
    <TabLayout>
      <PageHeader className="sticky top-0 bg-white z-10">
        {currentModule && (
          <ResponsiveModal>
            <Button
              variant="outline"
              className={`w-fit max-w-full rounded-[var(--core-border-radius-xs)] bg-[var(--semantic-color-bg-primary)] border-none py-[var(--core-spacing-sm)] px-2 sm:px-[var(--core-spacing-lg)]`}
              onClick={() => {}}
            >
              <SLTypo
                as="span"
                text={(currentModule && currentModule.title) || ""}
                variant="fontBody2IntenseNormal"
                className="text-[var(--semantic-color-text-bold)] flex-1 truncate"
              />
              <ChevronDown size={2} />
            </Button>
          </ResponsiveModal>
        )}
      </PageHeader>
      <ContentHeader
        title={(currentModule && currentModule.title) || ""}
        titleVariant="fontH4Semibold"
        titleClassName="text-[var(--semantic-color-text-default)]"
        className="sticky top-[116px] bg-white z-10 gap-0"
      />
      <div className="px-6 space-y-[var(--core-spacing-md)] pb-20">
        {lessons.map((lesson, index) => (
          <LessonCard
            key={index}
            id={lesson.id}
            imageUrl={lesson.media_url || ""}
            moduleId={(currentModule && currentModule.id) || ""}
            title={lesson.title}
            description={lesson.description}
            state={lesson.is_completed ? "completed" : "half-completed"}
            showCtaBtn={false}
          />
        ))}
        {currentModule && currentModule.has_quiz && (
          <LessonCard
            imageUrl={currentModule.media_url || ""}
            title={lang === "mm" ? "စာမေးပွဲ" : "Final Exam"}
            description={
              lang === "mm"
                ? "မေးခွန်းတစ်ခုကို ဖြေဆိုချိန် ၃၀ စက္ကန့်ရရှိပါတယ်နော်."
                : "You get 30 seconds for a question."
            }
            state={
              currentModule.lessons.every((lesson: any) => lesson.is_completed)
                ? (currentModule.quiz_completed && "completed") ||
                  "half-completed"
                : "locked"
            }
            showCtaBtn={false}
            clickRoute={`/quiz?module_id=${currentModule.id}`}
          />
        )}

        {lessons.length === 0 && currentModule && !currentModule.has_quiz && (
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
      </div>
    </TabLayout>
  );
};
