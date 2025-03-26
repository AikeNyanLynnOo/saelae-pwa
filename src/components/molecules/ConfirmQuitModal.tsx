import { useCommonStore } from "@/store/common-store";
import { useQuizStore } from "@/store/quiz-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SLTypo } from "../SLTypo";
import { Button } from "../ui/button";

interface ConfirmQuitModalProps {
  children?: any;
}

export const ConfirmQuitModal = ({
  children,
}: ConfirmQuitModalProps) => {
  const router = useRouter();
  const { lang } = useCommonStore();
  const {
    setStep,
    setSelectedOption,
    setExplanation,
    setScore,
    setTimeLeft,
    setTimerActive,
    setSubmissions,
    setQuizState,
  } = useQuizStore();
  const [open, setOpen] = useState(false);

  const handleBack = () => {
    setQuizState("question");
    setSelectedOption(null);
    setExplanation("");
    setTimeLeft(30);
    setTimerActive(true);
    setScore(0);
    setStep(0);
    setSubmissions([]);
    router.back();
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${!open && "hidden"}`}
        onClick={() => setOpen(false)}
      >
        <div className="fixed inset-0 bg-black/50" />
        <div
          className="relative bg-white rounded-lg shadow-lg p-6 max-w-xs w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <SLTypo
              as="h5"
              text={
                lang === "mm"
                  ? "ထွက်မှာ တကယ်သေချာပြီလား။"
                  : "Are you sure to quit?"
              }
              variant={"fontH5Medium"}
              className="text-[var(--semantic-color-text-bold)] text-center"
            />

            <SLTypo
              as="p"
              text={
                lang === "mm"
                  ? "ယခုလက်ရှိထိဖြေထားသလောက် အဖြေတွေဆုံးရှုံးသွားမှာပါ။"
                  : "If you decide to quit now, you'll lose your current progress. But, you can always pick this up later!"
              }
              variant={"fontBody3Normal"}
              className="text-[var(--semantic-color-text-subtle)] text-center mt-2 !leading-5"
            />
            <div className="flex justify-start items-center gap-x-3 mt-4">
              <Button
                variant="outline"
                className={`w-full flex-1 rounded-[var(--core-border-radius-xs)] bg-transparent border border-[var(--semantic-color-outline-brand-default)] py-[var(--core-spacing-sm)] text-[var(--semantic-color-text-brand-default)]`}
                onClick={handleBack}
              >
                {lang === "mm" ? "ထွက်မယ်" : "Quit Now"}
              </Button>
              <Button className="w-full flex-1" onClick={() => setOpen(false)}>
                {lang === "mm" ? "ဆက်ဖြေမယ်" : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
