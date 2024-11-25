"use client";
import { LuClock } from "react-icons/lu";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import BaseInput from "../text/BaseInput";
import { useDropdownOpen } from "@/hooks/useDropdownOpen";

const TimePickerInput = () => {
  const { isOpen, handleOpenDropdown } = useDropdownOpen();
  const iconStyle = "text-black-400 size-6 lg:size-9";
  const arrowIcon = isOpen ? <IoMdArrowDropup className={iconStyle} /> : <IoMdArrowDropdown className={iconStyle} />;

  return (
    <BaseInput
      name="timepicker"
      type="text"
      variant="white"
      placeholder="00:00"
      size="w-[150px] h-[54px] lg:w-[210px] lg:h-[64px]"
      beforeIcon={<LuClock className={iconStyle} />}
      afterIcon={arrowIcon}
    />
  );
};
