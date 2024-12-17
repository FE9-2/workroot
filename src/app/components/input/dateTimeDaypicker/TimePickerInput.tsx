"use client";
import { LuClock } from "react-icons/lu";
import { IoMdArrowDropup } from "react-icons/io";
import BaseInput from "../text/BaseInput";
import { useDropdownOpen } from "@/hooks/useDropdownOpen";
import DropdownList from "../../button/dropdown/dropdownComponent/DropdownList";
import { forwardRef, useRef, useEffect, useCallback } from "react";
import { BaseInputProps } from "@/types/textInput";
import { cn } from "@/lib/tailwindUtil";

// 시간 선택을 위한 입력 컴포넌트
const TimePickerInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
  const { value, onChange, errormessage } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen, handleOpenDropdown, setIsOpen } = useDropdownOpen();

  // 외부 클릭 감지하여 드롭다운 닫기
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  // 외부 클릭 이벤트 리스너 등록
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // 시간 선택 핸들러
  const handleSelect = useCallback(
    (time: string | null) => {
      if (!time) {
        setIsOpen(false);
        return;
      }

      if (onChange) {
        const event = {
          target: { value: time, name: props.name },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }

      setIsOpen(false);
    },
    [onChange, props.name, setIsOpen]
  );

  // 24시간 형식의 시간 옵션 생성 (00:00 ~ 23:00)
  const timeOption = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  // 클릭 이벤트 핸들러
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
          beforeIcon={<LuClock className="size-5 text-grayscale-400 lg:size-8" strokeWidth="1" />}
          afterIcon={
            <IoMdArrowDropup
              className={cn(
                "size-6 text-black-400 transition-transform duration-200 lg:size-9",
                isOpen && "rotate-180"
              )}
            />
          }
          errormessage={errormessage}
        />
      </div>
      {isOpen && (
        <DropdownList
          list={timeOption}
          onSelect={handleSelect}
          wrapperStyle="w-[150px] lg:w-[210px]"
          itemStyle="pl-[35px] text-base font-normal leading-[26px] lg:text-lg lg:leading-8"
        />
      )}
    </div>
  );
});

TimePickerInput.displayName = "TimePickerInput";

export default TimePickerInput;
