"use client";

import * as React from "react";

import CustomDatePicker from "@/components/atoms/forms/CustomDatePicker/CustomDatePicker";

export type CalendarProps = React.ComponentProps<any>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  customInput,
  ...props
}: CalendarProps) {
  return <CustomDatePicker customInput={customInput} {...props} />;
}
Calendar.displayName = "Calendar";

export { Calendar };
