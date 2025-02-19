// CustomDatePicker.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePicker.css"; // Import your custom styles
import { getMonth, getYear } from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomDatePicker = ({
  customInput,
  ...props
}: {
  customInput: any;
  onSelect: (date: Date | null) => void;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const years = Array.from(
    { length: getYear(new Date()) - 1990 + 1 },
    (_, i) => 1990 + i
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calendarContainerClasses = {
    base: "[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md [&.react-datepicker]:font-[var(--font-figtree)]",
    monthContainer: {
      padding: "[&.react-datepicker>div]:pt-0 [&.react-datepicker>div]:pb-0",
    },
  };

  const prevNextButtonClasses = {
    base: "[&.react-datepicker>button]:items-baseline [&.react-datepicker>button]:top-7",
    border:
      "[&.react-datepicker>button]:border [&.react-datepicker>button]:border-solid [&.react-datepicker>button]:border-gray-300 [&.react-datepicker>button]:rounded-md",
    size: "[&.react-datepicker>button]:h-[22px] [&.react-datepicker>button]:w-[22px] hover:[&.react-datepicker>button]:border-gray-900 [&.react-datepicker>button:hover>span::before]:border-gray-900",
    children: {
      position: "[&.react-datepicker>button>span]:top-0",
      border:
        "[&.react-datepicker>button>span]:before:border-t-[1.5px] [&.react-datepicker>button>span]:before:border-r-[1.5px] [&.react-datepicker>button>span]:before:border-gray-400",
      size: "[&.react-datepicker>button>span]:before:h-[7px] [&.react-datepicker>button>span]:before:w-[7px]",
    },
  };

  const popperClasses = {
    base: "[&>svg]:!fill-white dark:[&>svg]:!fill-gray-100 [&>svg]:!stroke-gray-300 dark:[&>svg]:!stroke-muted dark:[&>svg]:!text-muted",
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={(date: Date | null) => {
        setStartDate(date ?? new Date());
        props.onSelect?.(date);
      }}
      dateFormat="MMMM d, yyyy"
      calendarClassName={cn(
        calendarContainerClasses.base,
        calendarContainerClasses.monthContainer.padding,
        prevNextButtonClasses.base,
        prevNextButtonClasses.border,
        prevNextButtonClasses.size,
        prevNextButtonClasses.children.position,
        prevNextButtonClasses.children.border,
        prevNextButtonClasses.children.size
      )}
      showPopperArrow={false}
      popperClassName={cn(popperClasses.base, "")}
      popperPlacement="bottom-start"
      customInput={customInput}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: "0 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxHeight: "20px",
            overflowY: "visible",
            position: "relative",
          }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="h-7 w-7"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <select
            onFocus={(e) => {
              e.target.size = 8;
            }}
            onBlur={(e) => {
              e.target.size = 1;
            }}
            value={getYear(date)}
            onChange={(e: any) => {
              e.target.size = 8;
              changeYear(Number(e.target.value));
              const select = e.target as HTMLSelectElement;
              select.blur();
            }}
            className={`focus:outline-none absolute top-0 -translate-y-1 left-9 hide-scrollbar focus:shadow-lg focus:border rounded-sm min-h-7 min-w-12`}
          >
            {years.map((option) => (
              <option key={option} value={option} className="text-xs py-1 px-3">
                {option}
              </option>
            ))}
          </select>
          <select
            onFocus={(e) => {
              e.target.size = 8;
            }}
            onBlur={(e) => {
              e.target.size = 1;
            }}
            value={months[getMonth(date)]}
            onChange={(e) => {
              e.target.size = 8;
              changeMonth(months.indexOf(e.target.value));
              const select = e.target as HTMLSelectElement;
              select.blur();
            }}
            className={`focus:outline-none absolute top-0 -translate-y-[5px] right-9 hide-scrollbar focus:shadow-lg focus:border rounded-sm min-h-7 min-w-12`}
          >
            {months.map((option) => (
              <option key={option} value={option} className="text-xs py-1 px-3">
                {option}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="icon"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="h-7 w-7"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
      dayClassName={(date: Date) =>
        date.getDate() === 28 || date.getDate() === 30 ? "highlighted-day" : ""
      }
    />
  );
};

export default CustomDatePicker;
