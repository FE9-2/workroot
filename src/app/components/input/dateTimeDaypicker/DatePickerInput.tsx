"use client";
import BaseInput from "../text/BaseInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { IoIosClose, IoMdArrowDropup } from "react-icons/io";
import { BsCalendar4 } from "react-icons/bs";
import { useDropdownOpen } from "@/hooks/useDropdownOpen";
import DatePickerHeader from "./DatePickerHeader";
import { useEffect, useRef } from "react";
interface DatePickerInputProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChange: (dates: [Date | null, Date | null]) => void;
  required?: boolean;
  errormessage?: boolean;
  displayValue: string;
}
const DatePickerInput = ({
  startDate,
  endDate,
  onChange,
  required,
  errormessage,
  displayValue,
}: DatePickerInputProps) => {
  const { isOpen, handleOpenDropdown } = useDropdownOpen();

  const handleClick = () => {
    if (endDate) {
      console.log("endDate", endDate);

      onChange([null, null]);
      console.log("nullnull 핸들클릭 이벤트 발생");
      console.log("endDate", endDate);
    }
    console.log("핸들클릭 이벤트 발생");
    handleOpenDropdown();
  };
  const handleChange = (update: [Date | null, Date | null]) => {
    // 날짜를 선택하면 onChange 호출 -> 상위로 전달
    const [start, end] = update;
    let newDateRange: [Date | null, Date | null] = [start || null, end || null];
    // 시작 날짜가 설정되지 않았거나, 종료 날짜가 선택되지 않은 경우 처리
    if (start && end && end < start) {
      newDateRange = [start, null];
    }

    // 시작 날짜와 종료 날짜가 올바르게 선택된 경우
    if (start && end && end > start) {
      newDateRange = [start, end]; // 시작 및 종료 날짜 설정
      handleOpenDropdown();
    }
    onChange(newDateRange);
  };

  //피커 바깥쪽 클릭 시 창 닫힘
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        handleOpenDropdown();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleOpenDropdown]);

  const iconStyle = "text-black-400 size-9 transition-transform duration-200";

  return (
    <div className="relative">
      <div onClick={handleClick}>
        <BaseInput
          type="text"
          placeholder="시작일 ~ 종료일"
          variant="white"
          beforeIcon={<BsCalendar4 className="size-4 text-grayscale-200 lg:size-8" />}
          afterIcon={<IoMdArrowDropup className={`${iconStyle} ${isOpen ? "rotate-180" : ""}`} />}
          value={displayValue || ""}
          readOnly
          required={required}
          wrapperClassName="cursor-pointer"
          innerClassName="cursor-pointer"
          errormessage={errormessage}
        />
      </div>

      {isOpen && (
        <>
          <div
            className="absolute z-20 mt-1 h-[388px] w-[327px] rounded-lg bg-white lg:h-[584px] lg:w-[640px]"
            ref={pickerRef}
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
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleOpenDropdown();
            }}
            className="absolute left-[14px] top-[78px] z-30 cursor-pointer lg:top-[84px]"
          >
            <IoIosClose className="size-6 text-black-100 lg:size-9" />
          </button>
        </>
      )}
    </div>
  );
};

export default DatePickerInput;
