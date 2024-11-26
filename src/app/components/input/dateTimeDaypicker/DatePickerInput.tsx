"use client";
import BaseInput from "../text/BaseInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { KeyboardEvent, MouseEvent, useState } from "react";
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
  const handleSelectDate = (
    date: Date | null,
    e?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement> | undefined
  ): void => {
    setStartDate(date);
  };
  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  return (
    <div onClick={handleOpenDatePicker}>
      <BaseInput
        name="datepicker"
        type="text"
        placeholder="시작일 ~ 종료일"
        variant="white"
        beforeIcon={<BsCalendar4 className="size-6 text-gray-200 lg:size-9" />}
        afterIcon={arrowIcon}
      />
      <DatePicker
        locale={ko}
        dateFormat="yyyy.MM.dd"
        showIcon
        selected={startDate}
        onSelect={handleSelectDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DatePickerInput;
