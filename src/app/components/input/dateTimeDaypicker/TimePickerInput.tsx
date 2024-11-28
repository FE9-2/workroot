"use client";
import { LuClock } from "react-icons/lu";
import { IoMdArrowDropup } from "react-icons/io";
import BaseInput from "../text/BaseInput";
import { useDropdownOpen } from "@/hooks/useDropdownOpen";
import { useFormContext } from "react-hook-form";
import DropdownList from "../../button/dropdown/dropdownComponent/DropdownList";

const TimePickerInput = () => {
  const { register, setValue, watch } = useFormContext();
  const timeValue = watch("timepicker");
  const handleTimeSelect = (time: string) => {
    setValue("timepicker", time);
    handleOpenDropdown();
  };
  const { isOpen, handleOpenDropdown } = useDropdownOpen();
  const beforeIconStyle = "text-gray-400 size-[13px] lg:size-5";
  const afterIconStyle =
    "text-black-400 size-6 lg:size-9  transition-all transition-transform duration-200 ease-in-out";
  const timeOption = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`;
  });
  return (
    <div onClick={handleOpenDropdown} className="relative">
      <div>{isOpen}</div>
      <BaseInput
        type="text"
        readOnly={true}
        variant="white"
        placeholder="00:00"
        value={timeValue || ""}
        size="w-[150px] h-[54px] lg:w-[210px] lg:h-[64px]"
        beforeIcon={<LuClock className={beforeIconStyle} />}
        afterIcon={<IoMdArrowDropup className={`${afterIconStyle} ${isOpen ? "rotate-180" : ""}`} />}
        {...register("timepicker")}
      />
      {isOpen && (
        <DropdownList
          list={timeOption}
          onSelect={handleTimeSelect}
          wrapperStyle="h-[200px]"
          itemStyle="pl-[35px] text-sm font-normal leading-[26px] lg:text-base lg:leading-8 !important"
        />
      )}
    </div>
  );
};
export default TimePickerInput;
