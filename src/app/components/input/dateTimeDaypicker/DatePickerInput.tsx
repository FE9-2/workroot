"use client";
import BaseInput from "../text/BaseInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { IoIosClose, IoMdArrowDropup } from "react-icons/io";
import { BsCalendar4 } from "react-icons/bs";
import { useDropdownOpen } from "@/hooks/useDropdownOpen";
import { useFormContext } from "react-hook-form";
import DatePickerHeader from "./DatePickerHeader";
interface DatePickerInputProps {
  startDateName: string;
  endDateName: string;
  startDate?: Date;
  endDate?: Date;
  onChange: (dates: [Date | null, Date | null]) => void;
  required?: boolean;
  errormessage?: boolean;
}
const DatePickerInput = ({
  startDateName,
  endDateName,
  startDate,
  endDate,
  onChange,
  required,
  errormessage,
}: DatePickerInputProps) => {
  const { setValue, watch } = useFormContext();
  const { isOpen, handleOpenDropdown } = useDropdownOpen();
  const dateValue = watch("displayDate");

  const iconStyle = "text-black-400 size-9 transition-transform duration-200";

  const formatDisplayDate = (start: Date, end?: Date) => {
    const formatToDisplay = (date: Date) => {
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
    };

    if (start && end) {
      return `${formatToDisplay(start)} ~ ${formatToDisplay(end)}`;
    }
    return formatToDisplay(start);
  };

  const handleChange = (update: [Date | null, Date | null]) => {
    const [start, end] = update;

    if (start) {
      setValue("displayDate", formatDisplayDate(start, end || undefined));
      setValue(startDateName, start.toISOString());
    }
    if (start && end && end > start) {
      setValue("displayDate", formatDisplayDate(start, end));
      setValue(endDateName, end.toISOString());
      handleOpenDropdown();
    }
    onChange(update);
  };

  return (
    <div className="relative">
      <div onClick={handleOpenDropdown}>
        <BaseInput
          type="text"
          placeholder="시작일 ~ 종료일"
          variant="white"
          beforeIcon={<BsCalendar4 className="size-[18px] text-grayscale-200" />}
          afterIcon={<IoMdArrowDropup className={`${iconStyle} ${isOpen ? "rotate-180" : ""}`} />}
          value={dateValue || ""}
          readOnly
          required={required}
          wrapperClassName="cursor-pointer"
          innerClassName="cursor-pointer"
          errormessage={errormessage}
        />
        {isOpen && (
          <>
            <div
              className="absolute z-20 mt-1 h-[388px] w-[327px] rounded-lg bg-white lg:h-[584px] lg:w-[640px]"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <DatePicker
                inline
                selectsRange
                locale={ko}
                startDate={startDate}
                endDate={endDate}
                onChange={handleChange}
                renderCustomHeader={(props) => <DatePickerHeader {...props} />}
              />
            </div>
            <button
              type="button"
              onClick={() => handleOpenDropdown()}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="absolute left-[14px] top-[78px] z-30 cursor-pointer lg:top-[84px]"
            >
              <IoIosClose className="size-6 text-black-100 lg:size-9" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DatePickerInput;
