"use client";
import React, { forwardRef, useEffect, useState, useRef, useCallback } from "react";
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

// 직접 입력이 가능한 드롭다운 컴포넌트
const InputDropdown = forwardRef<HTMLInputElement, InputDropdownProps>(
  ({ options, className = "", errormessage, name }, ref) => {
    // 드롭다운 상태 관리
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [isCustomInput, setIsCustomInput] = useState<boolean>(false);
    const { setValue, watch } = useFormContext();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 감지하여 드롭다운 닫기
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // 드롭다운 토글 핸들러
    const toggleDropdown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    };

    // 옵션 선택 핸들러
    const handleSelect = useCallback(
      (option: string | null) => {
        if (!option) {
          setIsOpen(false);
          return;
        }

        if (option === "직접 입력") {
          setIsCustomInput(true);
          setSelectedValue("");
          setValue(name, "", { shouldDirty: true });
          setIsOpen(false);
          return;
        }

        setSelectedValue(option);
        setIsCustomInput(false);
        setValue(name, option, { shouldDirty: true });
        setIsOpen(false);
      },
      [name, setValue]
    );

    // 입력값 변경 핸들러
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isCustomInput) {
          const value = e.target.value;
          setSelectedValue(value);
          setValue(name, value, { shouldDirty: true });
        }
      },
      [isCustomInput, name, setValue]
    );

    // 입력 필드 클릭 핸들러
    const handleInputClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isCustomInput) {
          setIsOpen(true);
        }
      },
      [isCustomInput]
    );

    // 폼 값 변경 감지하여 입력값 동기화
    useEffect(() => {
      const value = watch(name);
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [name, watch]);

    const textStyle = "text-base";

    const errorStyle = errormessage ? "!border-state-error" : "";
    const errorTextStyle =
      "absolute -bottom-[26px] text-[13px] text-sm font-medium leading-[22px] text-state-error lg:text-base lg:leading-[26px]";

    return (
      <div
        ref={dropdownRef}
        className={cn("relative inline-block text-left", "w-80 lg:w-[640px]", textStyle, className, errorStyle)}
      >
        <div
          onClick={isCustomInput ? undefined : toggleDropdown}
          className={cn(
            "rounded-md border border-transparent bg-background-200 p-2",
            !isCustomInput && "cursor-pointer hover:border-grayscale-200 hover:bg-background-300",
            isOpen && "ring-1 ring-grayscale-300"
          )}
        >
          <input
            type="text"
            ref={ref}
            value={selectedValue}
            onChange={handleInputChange}
            onClick={handleInputClick}
            readOnly={!isCustomInput}
            className={cn(
              "flex w-full items-center justify-between px-4 py-2 font-medium focus:outline-none",
              isCustomInput ? "cursor-text bg-transparent" : "cursor-pointer bg-transparent",
              "text-grayscale-700"
            )}
            placeholder={isCustomInput ? "직접 입력하세요" : "선택"}
          />
          <button
            type="button"
            className="absolute right-3 top-3.5 text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              if (isCustomInput) {
                setIsCustomInput(false);
                setSelectedValue("");
                setValue(name, "", { shouldDirty: true });
              }
            }}
          >
            <IoMdArrowDropdown className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
          </button>
        </div>
        {isOpen && <DropdownList list={options} onSelect={handleSelect} itemStyle={textStyle} />}
        {errormessage && <p className={cn(errorTextStyle, "right-0 pr-2")}>{errormessage}</p>}
      </div>
    );
  }
);
InputDropdown.displayName = "InputDropdown";

export default InputDropdown;
