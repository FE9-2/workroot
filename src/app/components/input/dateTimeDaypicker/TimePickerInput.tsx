"use client";
import { LuClock } from "react-icons/lu";
import { IoMdArrowDropup } from "react-icons/io";
import BaseInput from "../text/BaseInput";
import { useDropdownOpen } from "@/hooks/useDropdownOpen";
import DropdownList from "../../button/dropdown/dropdownComponent/DropdownList";
import { forwardRef, useRef, useEffect, useCallback } from "react";
import { BaseInputProps } from "@/types/textInput";
import { cn } from "@/lib/tailwindUtil";

const TimePickerInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const { value, onChange, errormessage } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen, handleOpenDropdown, setIsOpen } = useDropdownOpen();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleSelect = useCallback(
    (time: string | null) => {
      if (!time) {
        setIsOpen(false);
        return;
      }

      if (onChange) {
        onChange({ target: { value: time } } as React.ChangeEvent<HTMLInputElement>);
      }
      setIsOpen(false);
    },
    [onChange, setIsOpen]
  );

  const beforeIconStyle = "text-grayscale-400 size-5 lg:size-8";
  const afterIconStyle = "text-black-400 size-6 lg:size-9 transition-transform duration-200 ease-in-out";
  const width = "w-[150px] lg:w-[210px]";

  const timeOption = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      handleOpenDropdown();
    },
    [handleOpenDropdown]
  );

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={handleClick}>
        <BaseInput
          ref={ref}
          type="text"
          readOnly
          variant="white"
          placeholder="00:00"
          value={value || ""}
          size="w-[150px] h-[54px] lg:w-[210px] lg:h-[64px]"
          beforeIcon={<LuClock className={beforeIconStyle} strokeWidth="1" />}
          afterIcon={<IoMdArrowDropup className={cn(afterIconStyle, isOpen && "rotate-180")} />}
          errormessage={errormessage}
        />
      </div>
      {isOpen && (
        <DropdownList
          list={timeOption}
          onSelect={handleSelect}
          wrapperStyle={width}
          itemStyle="pl-[35px] text-base font-normal leading-[26px] lg:text-lg lg:leading-8"
        />
      )}
    </div>
  );
});

TimePickerInput.displayName = "TimePickerInput";

export default TimePickerInput;
