"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, CircleCheck, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { SLTypo } from "@/components/SLTypo";
import { ImageWithPlaceholder } from "@/components/atoms/ImageWithPlaceholder";
import { useRouter } from "next/navigation";
import { useTranslate } from "../hooks/use-translate";
import { useCommonStore } from "@/store/common-store";

interface LessonCardProps {
  id?: string;
  moduleId?: string;
  title: string;
  description: string;
  imageUrl?: string;
  state: "default" | "completed" | "half-completed" | "locked" | "progress";
  progressValue?: number;
  onButtonClick?: () => void;
  buttonText?: string;
  totalLessons?: string;
  completedLessons?: string;
  ctaRoute?: string;
}

export function LessonCard({
  id,
  moduleId,
  title,
  description,
  imageUrl = "",
  state = "default",
  progressValue = 0,
  onButtonClick,
  buttonText,
  totalLessons,
  completedLessons,
  ctaRoute = "lessons",
}: LessonCardProps) {
  const { lang } = useCommonStore();
  const { messages, isLoading } = useTranslate();
  const { modules, common } = messages;
  const router = useRouter();
  return (
    <Card
      className={`w-full shadow-none rounded-[var(--core-border-radius-sm)] ${
        state !== "locked" && state !== "progress" && state !== "default"
          ? "cursor-pointer"
          : ""
      }`}
      onClick={() => {
        if (state !== "locked" && state !== "progress" && state !== "default") {
          // router.push(`/${ctaRoute}/${title.toLowerCase().replace(/ /g, "-")}`);
          router.push(`/${ctaRoute}/${id}?module_id=${moduleId}`);
        }
      }}
    >
      {state === "progress" && (
        <div className="px-4 mt-4 flex flex-wrap gap-2">
          <SLTypo
            as="span"
            variant="fontLabelMedium"
            className="text-[var(--semantic-color-text-brand-default)] bg-[var(--semantic-color-bg-brand-subtlest)] px-[var(--core-spacing-sm)] py-0.5 rounded-full"
          >
            {modules.is_learning_text}
          </SLTypo>
        </div>
      )}
      <CardContent className="flex gap-4 p-4 relative">
        <div
          className={`flex flex-col ${state === "completed" ? "justify-center" : "justify-start"}`}
        >
          {(imageUrl && (
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-sm object-cover"
            />
          )) || (
            <ImageWithPlaceholder
              className="h-10 w-10 rounded-none"
              containerClassName="mb-0"
            />
          )}
        </div>

        <div className="flex-1">
          <div className="space-y-1">
            <SLTypo
              variant="fontH6Semibold"
              className="text-[var(--semantic-color-text-default)] mb-2"
            >
              {title}
            </SLTypo>
            <SLTypo
              as="p"
              variant="fontBody3Normal"
              className="text-[var(--semantic-color-text-subtle)] !leading-6 mb-2"
            >
              {description}
            </SLTypo>

            {totalLessons && (
              <SLTypo
                as="p"
                variant="fontBody3Normal"
                className="text-[var(--semantic-color-text-subtle)] !leading-6 mb-2 flex items-center gap-1"
              >
                <CalendarDays className="w-3 h-3" />
                {(lang === "mm" && `သင်ခန်းစာ ${totalLessons} ခု`) ||
                  `${totalLessons} Lessons`}
              </SLTypo>
            )}
          </div>
          {state === "completed" && (
            <CircleCheck
              className="h-6 w-6 text-white absolute top-1/2 -translate-y-1/2 right-3"
              fill="#28A745"
            />
          )}
          {state === "half-completed" && (
            <CircleCheck
              className="h-6 w-6 text-white absolute top-1/2 -translate-y-1/2 right-3 opacity-30"
              fill="#28A745"
            />
          )}
          {state === "locked" && (
            <LockKeyhole className="h-5 w-5 absolute top-1/2 -translate-y-1/2 right-4 text-[var(--semantic-color-icon-default)] opacity-70" />
          )}

          {/* Progress State */}
          {state === "progress" && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <Progress value={progressValue} />
                <SLTypo
                  as="span"
                  variant="fontBody3Normal"
                  className="text-[var(--semantic-color-text-subtle)] !leading-6 whitespace-nowrap"
                >
                  {(lang === "mm" && `${completedLessons} ပိုင်း သင်ယူပြီး`) ||
                    `${completedLessons} Lessons Completed`}
                </SLTypo>
              </div>
              <Button
                onClick={onButtonClick}
                className="w-fit"
                style={{
                  fontFamily: lang === "en" ? "var(--font-figtree)" : "",
                }}
              >
                {common.cta_lesson_start}
              </Button>
            </div>
          )}

          {/* Default State */}
          {state === "default" && (
            <Button
              onClick={onButtonClick}
              className="w-fit mt-3"
              style={{
                fontFamily: lang === "en" ? "var(--font-figtree)" : "",
              }}
            >
              {common.cta_lesson_start}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
