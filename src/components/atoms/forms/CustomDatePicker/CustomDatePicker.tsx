// CustomDatePicker.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePicker.css"; // Import your custom styles
import { getMonth, getYear } from "date-fns";
import { cn } from "@/lib/utils";

const CustomDatePicker = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
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
    base: "[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md ",
    monthContainer: {
      padding: "[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3",
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
      onChange={(date: Date | null) => setStartDate(date ?? new Date())}
      dateFormat="MMMM d, yyyy"
      calendarClassName={cn(
        calendarContainerClasses.base,
        calendarContainerClasses.monthContainer.padding,
        prevNextButtonClasses.base,
        prevNextButtonClasses.border,
        prevNextButtonClasses.size,
        prevNextButtonClasses.children.position,
        prevNextButtonClasses.children.border,
        prevNextButtonClasses.children.size,
      )}
      popperClassName={cn(popperClasses.base, "")}
      // renderCustomHeader={({
      //   date,
      //   changeYear,
      //   changeMonth,
      //   decreaseMonth,
      //   increaseMonth,

      //   prevMonthButtonDisabled,
      //   nextMonthButtonDisabled,
      // }: {
      //   date: Date;
      //   changeYear: (year: string) => void;
      //   changeMonth: (month: number) => void;
      //   decreaseMonth: () => void;
      //   increaseMonth: () => void;
      //   prevMonthButtonDisabled: boolean;
      //   nextMonthButtonDisabled: boolean;
      // }) => (
      //   <div className="custom-header">
      //     <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      //       {'<'}
      //     </button>
      //     <select
      //       value={date.getFullYear()}
      //       onChange={({ target: { value } }) => changeYear(value)}
      //     >
      //       {[...Array(10)].map((_, i) => (
      //         <option key={i} value={2020 + i}>
      //           {2020 + i}
      //         </option>
      //       ))}
      //     </select>
      //     <select
      //       value={date.getMonth()}
      //       onChange={({ target: { value } }) => changeMonth(Number(value))}

      //     >
      //       {[
      //         'January',
      //         'February',
      //         'March',
      //         'April',
      //         'May',
      //         'June',
      //         'July',
      //         'August',
      //         'September',
      //         'October',
      //         'November',
      //         'December',
      //       ].map((month, index) => (
      //         <option key={index} value={index}>
      //           {month}
      //         </option>
      //       ))}
      //     </select>
      //     <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      //       {'>'}
      //     </button>
      //   </div>
      // )}
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
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      dayClassName={(date: Date) =>
        date.getDate() === 28 || date.getDate() === 30 ? "highlighted-day" : ""
      }
    />
  );
};

export default CustomDatePicker;
