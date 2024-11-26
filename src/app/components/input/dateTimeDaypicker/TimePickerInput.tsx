"use client";
import { LuClock } from "react-icons/lu";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import BaseInput from "../text/BaseInput";
import { useDropdownOpen } from "@/hooks/useDropdownOpen";
import TimeOption from "./pickerComponents/TimeOption";
import { useFormContext } from "react-hook-form";

const TimePickerInput = () => {
  const { register, setValue, watch } = useFormContext();
  const timeValue = watch("timepicker");
  const handleTimeSelect = (time: string) => {
    setValue("timepicker", time);
    handleOpenDropdown();
  };
  const { isOpen, handleOpenDropdown } = useDropdownOpen();
  const beforeIconStyle = "text-gray-400 size-[13px] lg:size-5";
  const afterIconStyle = "text-black-400 size-6 lg:size-9";
  const arrowIcon = isOpen ? (
    <IoMdArrowDropup className={afterIconStyle} />
  ) : (
    <IoMdArrowDropdown className={afterIconStyle} />
  );

  return (
    <div onClick={handleOpenDropdown} className="relative">
      <div>{isOpen}</div>
      <BaseInput
        type="text"
        variant="white"
        placeholder="00:00"
        value={timeValue || null}
        size="w-[150px] h-[54px] lg:w-[210px] lg:h-[64px]"
        beforeIcon={<LuClock className={beforeIconStyle} />}
        afterIcon={arrowIcon}
        {...register("timepicker")}
      />
      {isOpen && <TimeOption className="absolute top-[58px] lg:top-[68px]" handleTimeSelect={handleTimeSelect} />}
    </div>
  );
};
export default TimePickerInput;
