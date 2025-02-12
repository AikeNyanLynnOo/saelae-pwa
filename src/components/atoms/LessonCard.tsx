"use client";

import { CalendarDays, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SLTypo } from "../SLTypo";

interface LessonCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  state: "default" | "verified" | "progress";
  progressValue?: number;
  onButtonClick?: () => void;
  buttonText?: string;
  totalLessons?: string;
  completedLessons?: string;
}

export function LessonCard({
  title,
  description,
  imageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-N7sQEba2yjJKbWeg3zF6ZsBjZXV69v.png",
  state = "default",
  progressValue = 0,
  onButtonClick,
  buttonText = "စတင်သင်ယူမယ်",
  totalLessons,
  completedLessons,
}: LessonCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex gap-4 p-4">
        <div className="flex-shrink-0">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt=""
            className="h-12 w-12 rounded-sm object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="space-y-1">
            {state === "progress" && (
              <span className="inline-block rounded-full bg-purple-100 px-2 py-0.5 text-sm text-purple-600 mb-2">
                သင်ယူနေဆဲ
              </span>
            )}

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
                {`သင်ခန်းစာ ${totalLessons} ခု`}
              </SLTypo>
            )}
          </div>

          {state === "verified" && (
            <div className="mt-2 flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">
                မှတ်တမ်းတင်ပြီးအောင်မြင်စွာသိမ်းဆည်းပြီး
              </span>
            </div>
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
                  {`${completedLessons} ပိုင်း သင်ယူပြီး`}
                </SLTypo>
              </div>
              <Button onClick={onButtonClick} className="w-fit">
                စတင်သင်ယူမယ်
              </Button>
            </div>
          )}

          {/* Default State */}
          {state === "default" && (
            <Button onClick={onButtonClick} className="w-fit mt-3">
              စတင်သင်ယူမယ်
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
