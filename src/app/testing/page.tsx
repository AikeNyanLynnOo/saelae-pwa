"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { LessonCard } from "@/components/atoms/LessonCard";

export default function TestingPage() {
  const [dob, setDob] = useState<Date | null>(null);
  return (
    <section>
      <div className="space-y-4">
        {/* Default State */}
        <LessonCard
          title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
          description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
          totalLessons="၆"
          state="default"
        />

        {/* Verified State */}
        <LessonCard
          title="မွေးကင်းစကလေးနှင့် သန့်ရှင်းရေး"
          description="သင်ခန်းစာအကြောင်းအသေးစိတ်ရှင်းလင်းချက်"
          state="completed"
        />
        <LessonCard
          title="ကိုယ်ဝန်ဆောင်ကျန်းမာရေး"
          description="ဆည်းလည်းလေးကို ကျန်းကျန်းမာမာနဲ့ ဖွားမြင်နိုင်ဖို့ဆို ဆည်းလည်းလေးရဲ့ မေမေကျန်းမာရေးနဲ့ ပတ်သက်တာတွေကို သင်ယူကြရအောင်နော်။"
          totalLessons="၆"
          state="progress"
          completedLessons="၂"
          progressValue={40}
        />
      </div>
    </section>
  );
}
