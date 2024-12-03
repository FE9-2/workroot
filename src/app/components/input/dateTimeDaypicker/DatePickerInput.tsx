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
  name: string;
  startDate?: Date;
  endDate?: Date;
  onChange: (dates: [Date | null, Date | null]) => void;
}
const DatePickerInput = ({ name, startDate, endDate, onChange }: DatePickerInputProps) => {
  const { setValue, watch } = useFormContext();
  const { isOpen, handleOpenDropdown } = useDropdownOpen();
  const dateValue = watch(name);

  const iconStyle = "text-black-400 size-9 transition-transform duration-200";

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  };

  const handleChange = (update: [Date | null, Date | null]) => {
    const [start, end] = update;

    // 시작일만 선택된 경우
    if (start && !end) {
      setValue(name, `${formatDate(start)} ~`);
    } else if (start && end && end > start) {
      setValue(name, `${formatDate(start)} ~ ${formatDate(end)}`);
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
