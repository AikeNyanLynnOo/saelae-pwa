"use client";
import { ContentHeader } from "@/components/atoms/ContentHeader";
import { PageHeader } from "@/components/atoms/PageHeader";
import { LessonPageLayout } from "@/components/clients/LessonPageLayout";
import { useTranslate } from "@/components/hooks/use-translate";
import { SLTypo } from "@/components/SLTypo";
import { useAuthStore } from "@/store/auth-store";
import { useLessonStore } from "@/store/lesson-store";
import { getLesson } from "@/utils/lessonApiFunctions";
import {
  getUserProfile,
  removeFromBookmarks,
  saveToBookmarks,
} from "@/utils/userAPIFunctions";
import { Search } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface LessonPageLayoutWrapperProps {
  cookies?: any;
}

export const LessonPageLayoutWrapper = ({
  cookies,
}: LessonPageLayoutWrapperProps) => {
  const clientCookies = parseCookies();
  const searchParams = useSearchParams();
  const module_id = searchParams.get("module_id");

  const { currentUser, setCurrentUser } = useAuthStore();
  const { lesson, setLesson } = useLessonStore();
  const { messages, isLoading } = useTranslate();
  const { common } = messages;
  const router = useRouter();
  const params = useParams();
  const [scrollY, setScrollY] = useState(0);

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
    if (module_id && params.lesson_id) {
      getLesson({
        cookies: clientCookies,
        module_id,
        lesson_id: params.lesson_id.toString(),
      }).then((res) => {
        if (res && res.success && res.data) {
          setLesson(res.data);
        }
      });
    }
  }, [module_id, params.lesson_id]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const hideTopCta = useMemo(() => {
    if (scrollY > 250) {
      return true;
    }
  }, [scrollY]);

  const hideBottomCta = useMemo(() => {
    if (scrollY < 300) {
      return true;
    } else {
      return false;
    }
  }, [scrollY]);

  const onPrimaryButtonClick = useCallback(() => {
    if (lesson && lesson.quizzes && lesson.quizzes.length > 0) {
      router.push(`/lessons/${params.lesson_id}/quiz?module_id=${module_id}`);
    } else {
      toast(common && common.toast_no_quiz, {
        icon: <Search size={16} />,
      });
    }
  }, [params, router, common]);

  const handleFavoriteLesson = async () => {
    if (lesson && lesson.is_saved) {
      const { status, statusText, success, message, data } =
        await removeFromBookmarks({
          lesson_id: lesson?.id,
          cookies: clientCookies,
        });
      if (success) {
        toast.success(common && common.toast_success_remove_bookmark);
        if (module_id && params.lesson_id) {
          getLesson({
            cookies: clientCookies,
            module_id,
            lesson_id: params.lesson_id.toString(),
          }).then((res) => {
            if (res && res.success && res.data) {
              setLesson(res.data);
            }
          });
        }
        router.refresh();
      }
      return;
    }
    const { status, statusText, success, message, data } =
      await saveToBookmarks({
        lesson_id: lesson?.id,
        cookies: clientCookies,
      });
    if (success) {
      toast.success(common && common.toast_success_add_bookmark);
      if (module_id && params.lesson_id) {
        getLesson({
          cookies: clientCookies,
          module_id,
          lesson_id: params.lesson_id.toString(),
        }).then((res) => {
          if (res && res.success && res.data) {
            setLesson(res.data);
          }
        });
      }
      router.refresh();
    }
  };

  return (
    <section>
      {!isLoading && (
        <LessonPageLayout
          showHeartButton
          showPrimaryButton
          hideBottomCta={hideBottomCta}
          onPrimaryButtonClick={onPrimaryButtonClick}
          onHeartButtonClick={handleFavoriteLesson}
          isHeartActive={(lesson && lesson.is_saved && true) || false}
        >
          <PageHeader className="sticky top-0 bg-white z-20" />
          <ContentHeader
            hideCta={hideTopCta}
            showBackButton
            showPrimaryButton
            showHeartButton
            title={(lesson && lesson.title) || ""}
            description={(lesson && lesson.description) || ""}
            className="bg-white z-10"
            isHeartActive={(lesson && lesson.is_saved && true) || false}
            onHeartButtonClick={handleFavoriteLesson}
            onPrimaryButtonClick={onPrimaryButtonClick}
          />
          <div className="px-6 space-y-[var(--core-spacing-lg)] pb-20">
            {lesson && lesson.media_url && (
              <Image
                src={lesson && lesson.media_url}
                alt="lesson-1"
                width={390}
                height={400}
                className="mx-auto w-full h-auto rounded-[var(--core-radius-sm)]"
                priority
                loading="eager"
              />
            )}

            <SLTypo
              as="p"
              isDangerously
              variant="fontBody2Normal"
              className="text-[var(--semantic-color-text-default)] !leading-6"
            >
              {(lesson && lesson.content) || ""}
            </SLTypo>
            {/* <SLTypo
              as="p"
              text="
          ခေတ်တွေပြောင်းလာတာနဲ့အမျှ ကျွန်မတို့လူသားတွေရဲ့ကျန်းမာရေးစောင့်ရှောက်မှုတွေဟာလည်းပြောင်းလဲတိုးတက်လာပါတယ်။ 

          မိခင်နဲ့ကလေးကျန်းမာရေးပြုစုစောင့်ရှောက်မှုများမှာလည်း ယခင်အယူအဆနဲ့ကွဲလွဲတဲ့ ဆေးပညာဆိုင်ရာအချက်အလက်များပေါ်ပေါက်လာပါတယ်။ Evidence based medicine လို့ခေါ်တဲ့ သက်သေပြချက်ခိုင်ခိုင်မာမာရှိတဲ့ဆေးပညာအချက်အလက်တွေကိုသာ လူထုကိုအသိပညာပေးဖို့အတွက် လိုအပ်လာပါတယ်။ 

          အထူးသဖြင့် မိခင်နဲ့ကလေးရဲ့ကျန်းမာရေးစောင့်ရှောက်မှုမှာ အခုထိသုံးနေဆဲဖြစ်သော၊ လွဲမှားနေသော အယူအဆများ (Misconceptionsများ)ရှိနေပါသေးတယ်။ ကျွန်မတို့နိုင်ငံရဲ့ လူနေမှုဟာလူကြီးမိဘများနဲ့အတူမိသားစုတွေဟာယှဉ်တွဲနေထိုင်လေ့ရှိကြပြီး ယဉ်ကျေးမှုအရ လူကြီးမိဘတွေရဲ့စကားကို မပယ်ရှားဝံ့ဖြစ်တာကြောင့် အဆင်မပြေမှုလေးတွေရှိလာတတ်ပါတယ်။
          
          Misconception 1
          #ကလေးမွေးလာရင်မွေးဆံပင်နဲ့မထားနဲ့။ ဆံပင်မသန်ဘူး။ ဒါကြောင့်ကတုံးရိတ်ရမယ်။

          မွေးကင်းစကလေးကိုမွေးဆံပင်နဲ့ထားရင်ဆံပင်မသန်ဘူးဆိုတာမဟုတ်ပါဘူး။ ဆံပင်ဆိုတာ ဦးရေပြားရဲ့အောက်မှာရှိတဲ့ Hair follicle လို့ခေါ်တဲ့ မွေးညှင်းအိတ်လေးတွေကနေတဆင့်ပေါက်လာတာပါ။ ဒီတော့ပြင်ပဦးရေပြားအပြင်မှာရှိနေတဲ့ ဆံပင်ကိုရိတ်ခြင်းဟာ မွေးညှင်းအိတ်ကနေထွက်လာတဲ့ ဆံပင်ကိုဘာသက်ရောက်မှုမှမဖြစ်စေပါဘူး။ ဆံပင်သန်မှု၊မသန်မှုဟာ မျိုးဗီဇနဲ့ပိုဆိုင်ပါတယ်။ ဒါကြောင့် မွေးစကနေ ခြောက်လအထိကလေးကို လုံးဝကတုံးမရိတ်ပေးသင့်ပါဘူး။

          ကတုံးရိတ်ရာကနေ မတော်တဆအနာဖြစ်နိုင်ပါတယ်။ မေးခိုင်ပိုးဝင်နိုင်ပါတယ်။ဆံပင်မရှိလို့ နှာစေးနိုင်ပါတယ်။ ငယ်ထိပ်မပိတ်တဲ့အချိန်အရေပြားပွန်းရာကနေ ပိုးဝင်ပြီး ဦးနှောက်အမြှေးပါးယောင်ပြီး မစွမ်းမသန်ဖြစ်နိုင်ပါတယ်။ ကတုံးရိတ်တိုင်း ဒါမျိုးဖြစ်တာမဟုတ်ပေမယ့် ကတုံးရိတ်ရင်ဒီလိုနောက်ဆက်တွဲတွေဖြစ်ကောင်းဖြစ်လာနိုင်တာမို့ ရှောင်ကြဉ်တာအကောင်းဆုံးဖြစ်ပါတယ်။ 

          Misconception 2
          #နို့တိုက်မိခင်အစားမရှောင်လို့ကလေးလေနာတယ်။ ဝမ်းပျက်တယ်။ ဒါကြောင့် မီးဖွားပြီးခါစမိခင်ကို အစားရှောင်ခိုင်းရမယ်။

          ဖြေ။  ။ မွေးကင်းစကလေးများဟာ တစ်နေ့ကိုဝမ်း၁၀ကြိမ်ကျော်သွားနိုင်ပါတယ်။ ရက်သားလေးများဟာ လေနဲ့ဝမ်းနဲ့မကွဲတာမျိုး ၁၀ကြိမ်နဲ့ ဝမ်းအကြီးသွားတာမျိုး ၄-၅ကြိမ်ထိရှိတတ်ပါတယ်။ ဒါဟာသဘာဝဖြစ်ပါတယ်။ ဒါ့အပြင်ကလေးကို မကိုင်တွယ်ခင်မှာ လက်မဆေးတာ၊ နို့ဘူးတိုက်ရာမှာသေချာမဆေးကြော ၊ပိုးသတ်ခြင်းမပြုမိတာတွေကြောင့်သာဝမ်းပျက်နိုင်တာဖြစ်ပါတယ်။

          ​ကလေးအနေနဲ့ နို့စို့နည်းမမှန်တာ၊ နို့ဘူးစို့တာကြောင့် လေကိုပါမျိုချမိပြီး လေနာခြင်းများဖြစ်တတ်ပါတယ်။ လေနာခြင်းဟာ မိခင်အစားစားခြင်းနဲ့မသက်ဆိုင်ပါဘူး။ မီးဖွားပြီးခါစမိခင်ဟာ အစာအာဟာရအစုံစားဖို့လိုပါတယ်။ တညင်းသီးလိုအစားအစာမျိုးကိုသာ ရှောင်ဖို့လိုပါတယ်။ ကျန်တဲ့ အသား၊ငါး၊ပဲ၊ဥ၊နို့အမျိုးမျိုး၊ဟင်းသီးဟင်းရွက်အမျိုးမျိုးကိုအစုံစားမှသာ မိခင်နို့ဟာ ပမာဏရော အရည်အသွေးရောကောင်းမှာဖြစ်ပါတယ်​။ 

          မိခင်စားတဲ့အစားအစာကြောင့် ကလေးလေနာခြင်း၊ ဝမ်းပျက်ခြင်းမဖြစ်ပါဘူး။ မိခင်အာဟာရမပြည့်ဝရင်သာ ဗီတာမင်ဓာတ်တွေချို့တဲ့ပြီး ကလေးရော၊အမေပါ ကျန်းမာရေးထိခိုက်ပါတယ်​။ ဥပမာ Vit B1 deficiency။ 
          အသားလုံးဝမစားရတဲ့ အာဟာရချို့တဲ့သွားတဲ့နို့တိုက်မိခင်ရဲ့ကလေးဟာ Vitamin B 12 ချို့တဲ့ပြီး သွေးနီဥထုတ်လုပ်မှု၊ ဦးနှောက်ဖွံ့ဖြိုးမှုကိုထိခိုက်နိုင်ပါတယ်။ 
          "
              variant="fontBody2Normal"
              className="text-[var(--semantic-color-text-default)] !leading-6"
            /> */}
          </div>
        </LessonPageLayout>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1000,
        }}
      />
    </section>
  );
};
