"use client";
import { LuClock } from "react-icons/lu";
import { IoMdArrowDropup } from "react-icons/io";
import BaseInput from "../text/BaseInput";
import { useDropdownOpen } from "@/hooks/useDropdownOpen";
import DropdownList from "../../button/dropdown/dropdownComponent/DropdownList";
import { forwardRef } from "react";
import { BaseInputProps } from "@/types/textInput";

const TimePickerInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const { value, onChange, errormessage } = props;

  const handleTimeSelect = (time: string) => {
    if (onChange) {
      onChange({ target: { value: time } } as React.ChangeEvent<HTMLInputElement>);
    }
    handleOpenDropdown();
  };
  const { isOpen, handleOpenDropdown } = useDropdownOpen();
  const beforeIconStyle = "text-grayscale-400 size-[13px] lg:size-5";
  const afterIconStyle =
    "text-black-400 size-6 lg:size-9  transition-all transition-transform duration-200 ease-in-out";
  const width = "w-[150px] lg:w-[210px]";

  const timeOption = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <div onClick={handleOpenDropdown} className="relative">
      <div>{isOpen}</div>
      <BaseInput
        ref={ref}
        type="text"
        readOnly={true}
        variant="white"
        placeholder="00:00"
        value={value || ""}
        size="w-[150px] h-[54px] lg:w-[210px] lg:h-[64px]"
        beforeIcon={<LuClock className={beforeIconStyle} />}
        afterIcon={<IoMdArrowDropup className={`${afterIconStyle} ${isOpen ? "rotate-180" : ""}`} />}
        errormessage={errormessage}
      />
      {isOpen && (
        <DropdownList
          list={timeOption}
          onSelect={handleTimeSelect}
          wrapperStyle={width}
          itemStyle="pl-[35px] text-base font-normal leading-[26px] lg:text-lg lg:leading-8 !important"
        />
      )}
    </div>
  );
});
TimePickerInput.displayName = "TimePickerInput";

export default TimePickerInput;
