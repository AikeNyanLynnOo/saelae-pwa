import { useCommonStore } from "@/store/common-store";
import { useQuizStore } from "@/store/quiz-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SLTypo } from "../SLTypo";
import { Button } from "../ui/button";
import { useBabyStore } from "@/store/baby-store";
import { parseCookies } from "nookies";
import { deleteChild } from "@/utils/childApiFunctions";
import toast, { Toaster } from "react-hot-toast";
import { useTranslate } from "../hooks/use-translate";
import { getUserProfile } from "@/utils/userAPIFunctions";
import { useAuthStore } from "@/store/auth-store";

interface ConfirmDeleteBabyModalProps {
  children?: any;
  //   open?: boolean;
  //   setOpen?: any;
}

export const ConfirmDeleteBabyModal = ({
  children,
  //   open,
  //   setOpen,
}: ConfirmDeleteBabyModalProps) => {
  const clientCookies = parseCookies();
  const router = useRouter();
  const { lang } = useCommonStore();
  const { messages } = useTranslate();
  const { common } = messages;
  const { currentBaby, setCurrentBaby } = useBabyStore();
  const { setCurrentUser } = useAuthStore();

  const [open, setOpen] = useState(false);

  const handleDeleteBaby = async () => {
    // console.log("Current baby", currentBaby);
    const { status, statusText, success, message, data } = await deleteChild({
      id: currentBaby?.id,
      cookies: clientCookies,
    });
    if (success) {
      toast.success(common && common.toast_success_delete_saelae);
      setOpen(false);
      getUserProfile({ cookies: clientCookies }).then(({ success, data }) => {
        // console.log("User >>", success);
        if (success && data) {
          setCurrentUser((data && data.profile) || null);
          setCurrentBaby((data && data.profile.children[0]) || null);
        } else {
          router.push("/welcome?session_expired=true");
        }
      });
    } else {
      toast.error(message);
    }
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
                  ? "ဖျက်မှာ သေချာပါသလား။"
                  : "Are you sure to delete?"
              }
              variant={"fontH5Medium"}
              className="text-[var(--semantic-color-text-bold)] text-center"
            />

            <SLTypo
              as="p"
              text={
                lang === "mm"
                  ? "ဆည်းလည်းလေးနဲ့သက်ဆိုင်တဲ့ ဒေတာတွေ အကုန်ပျက်သွားမှာပါ။ ပြန်ပြင်လို့မရနိုင်ဘူးနော်။"
                  : "By doing so, all data associated with this account will be permanently removed."
              }
              variant={"fontBody3Normal"}
              className="text-[var(--semantic-color-text-subtle)] text-center mt-2 !leading-5"
            />
            <div className="flex justify-start items-center gap-x-3 mt-4">
              <Button
                variant="outline"
                className={`w-full flex-1 rounded-[var(--core-border-radius-xs)] bg-transparent border border-[var(--semantic-color-outline-default)] py-[var(--core-spacing-sm)] text-[var(--semantic-color-text-default)]`}
                onClick={() => setOpen(false)}
              >
                {lang === "mm" ? "ဆက်မလုပ်တော့ပါ" : "Cancel"}
              </Button>
              <Button
                className="w-full flex-1 bg-[#EF4444] hover:bg-[#EF4444]"
                onClick={handleDeleteBaby}
              >
                {lang === "mm" ? "သေချာတယ်" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
