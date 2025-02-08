"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      style={{
        fontFamily: "var(--font-figtree)",
      }}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center gap-1",
        caption_dropdowns: "flex gap-1",
        caption_label: "text-sm font-medium",
        dropdown:
          "cursor-pointer rounded-md bg-transparent p-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        dropdown_month: "mr-1",
        dropdown_year: "ml-1",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-neutral-500 rounded-md w-8 font-normal text-sm dark:text-neutral-400 flex-auto",
        row: "flex w-full mt-2",
        cell: cn(
          "relative flex-auto p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:text-neutral-500 [&:has([aria-selected].day-outside)]:bg-neutral-100/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-neutral-800 dark:[&:has([aria-selected].day-outside)]:bg-neutral-800/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-[var(--semantic-color-text-default)]"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-[var(--semantic-color-bg-brand-primary)] !text-[var(--semantic-color-text-inverse)] hover:bg-[var(--semantic-color-bg-brand-subtlest)] hover:text-black focus:bg-[var(--semantic-color-bg-brand-subtlest)]  focus:text-[var(--semantic-color-text-default)] focus:bg-[var(--semantic-color-bg-brand-primary)] dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900",
        day_today:
          "bg-[var(--semantic-color-bg-brand-subtlest)] text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50",
        day_outside:
          "day-outside !text-[var(--semantic-color-text-disabled)] text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",

        day_disabled: "text-neutral-500 opacity-50 dark:text-neutral-400",
        day_range_middle:
          "aria-selected:bg-neutral-100 text-red-500 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
