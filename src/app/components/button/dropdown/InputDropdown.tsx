"use client";
import React, { forwardRef, useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";
import DropdownList from "./dropdownComponent/DropdownList";
import { useFormContext } from "react-hook-form";

interface InputDropdownProps {
  options: string[];
  className?: string;
  errormessage?: string;
  name: string;
  value?: string;
}

const InputDropdown = forwardRef<HTMLInputElement, InputDropdownProps>(
  ({ options, className = "", errormessage, name }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [isCustomInput, setIsCustomInput] = useState<boolean>(false);
    const { setValue, getValues } = useFormContext();

    const handleOptionClick = (option: string) => {
      if (option === "직접 입력") {
        setIsCustomInput(true);
        setSelectedValue("");
        // 동적으로 받아온 name에 값 할당 -> 훅폼에 저장
        setValue(name, selectedValue);
      } else {
        setSelectedValue(option);
        setIsCustomInput(false);
        setValue(name, option);
        setIsOpen(false);
      }
    };

    // 작성중인 탭으로 다시 이동했을때 이전에 저장된 훅폼 데이터 연동
    useEffect(() => {
      const data = getValues();
      setSelectedValue(data.name || "");
    }, [getValues]);

    const textStyle = "text-base";

    const errorStyle = errormessage ? "!border-state-error" : "";
    const errorTextStyle =
      "absolute -bottom-[26px] text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

    return (
      <div className={cn("relative inline-block text-left", "w-80 lg:w-[640px]", textStyle, className, errorStyle)}>
        <div
          onMouseDown={() => setIsOpen(!isOpen)}
          className={cn(
            "cursor-pointer rounded-md border border-transparent bg-background-200 p-2",
            "hover:border-grayscale-200 hover:bg-background-300",
            isOpen && "ring-1 ring-grayscale-300"
          )}
        >
          <input
            type="text"
            ref={ref}
            value={selectedValue}
            onChange={(e) => {
              if (isCustomInput) {
                setSelectedValue(e.target.value);
                setValue(name, e.target.value);
              }
            }}
            className={cn(
              "text-grayscale-700 flex w-full items-center justify-between px-4 py-2 font-medium focus:outline-none",
              "cursor-pointer bg-transparent"
            )}
            placeholder={isCustomInput ? "직접 입력하세요" : "선택"}
          />
          <button type="button" className="absolute right-3 top-3.5 text-3xl">
            <IoMdArrowDropdown className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
          </button>
        </div>
        {isOpen && <DropdownList list={options} onSelect={handleOptionClick} itemStyle={textStyle} />}
        {errormessage && <p className={cn(errorTextStyle, "right-0 pr-2")}>{errormessage}</p>}
      </div>
    );
  }
);
InputDropdown.displayName = "InputDropdown";

export default InputDropdown;
