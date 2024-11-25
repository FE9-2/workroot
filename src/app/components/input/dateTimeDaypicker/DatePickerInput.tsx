"use client";
import BaseInput from "../text/BaseInput";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BsCalendar4 } from "react-icons/bs";
import { useDropdownOpen } from "@/hooks/useDropdownOpen";

const DatePickerInput = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const { isOpen, handleOpenDropdown } = useDropdownOpen();
  const iconStyle = "text-black-400 size-9";
  const arrowIcon = isOpen ? <IoMdArrowDropup className={iconStyle} /> : <IoMdArrowDropdown className={iconStyle} />;
  const handleOpenDatePicker = () => {
    handleOpenDropdown();
  };

  return (
    <div onClick={handleOpenDatePicker}>
      <BaseInput
        name="datepicker"
        type="text"
        placeholder="시작일 ~ 종료일"
        variant="white"
        beforeIcon={<BsCalendar4 className="size-4 text-gray-200 lg:size-6" />}
        afterIcon={arrowIcon}
      />
      <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
    </div>
  );
};

export default DatePickerInput;
