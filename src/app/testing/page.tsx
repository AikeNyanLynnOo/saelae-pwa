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

export default function TestingPage() {
  const [dob, setDob] = useState<Date | null>(null);
  return (
    <section>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !dob && "text-[var(--semantic-color-text-disabled)]"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {dob ? format(dob, "PPP") : <span>ရက်စွဲကို ရွေးခြယ်ပါ</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            // selected={dob || undefined}
            // onSelect={(date: any) => {
            //   if (date) {
            //     console.log(date);
            //     // setFormData({ ...formData, dob: date })
            //   }
            // }}
            // initialFocus
          />
        </PopoverContent>
      </Popover>
    </section>
  );
}
