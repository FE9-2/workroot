"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";
import DropdownList from "./dropdownComponent/DropdownList";

interface FilterDropdownProps {
  options: readonly string[];
  className?: string;
  onChange?: (selected: string) => void;
  initialValue?: string;
  readOnly?: boolean;
}

// 필터링 옵션을 선택할 수 있는 드롭다운 컴포넌트
const FilterDropdown = ({ options, className = "", onChange, initialValue, readOnly = false }: FilterDropdownProps) => {
  // 드롭다운 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(initialValue || options[0]);
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

  // initialValue가 변경되면 선택된 라벨 업데이트
  useEffect(() => {
    if (initialValue) {
      setSelectedLabel(initialValue);
    }
  }, [initialValue]);

  // 드롭다운 토글 핸들러
  const toggleDropdown = () => {
    if (readOnly) return;
    setIsOpen((prev) => !prev);
  };

  // 옵션 선택 핸들러
  const handleSelect = (option: string | null) => {
    if (option !== null) {
      setSelectedLabel(option);
      setIsOpen(false);
      onChange?.(option);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "relative inline-block text-left",
        "w-20 text-xs md:w-32 md:text-lg",
        readOnly && "cursor-default opacity-70",
        className
      )}
    >
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between rounded-md border p-2 font-medium shadow-sm",
          "text-grayscale-700 hover:bg-primary-orange-50",
          selectedLabel === options[0]
            ? "border border-grayscale-100 bg-white"
            : "border-primary-orange-300 bg-primary-orange-50"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleDropdown();
        }}
        disabled={readOnly}
      >
        <span className={selectedLabel === options[0] ? "text-black-100" : "text-primary-orange-500"}>
          {selectedLabel}
        </span>
        <IoIosArrowDown
          className={cn(
            "text-orange-400 transition-transform duration-200",
            isOpen && "rotate-180",
            selectedLabel === options[0] ? "text-grayscale-200" : "text-primary-orange-500"
          )}
        />
      </button>

      {isOpen && !readOnly && (
        <DropdownList
          list={Array.from(options)}
          onSelect={handleSelect}
          wrapperStyle={className}
          itemStyle="md:text-lg text-xs"
        />
      )}
    </div>
  );
};

export default FilterDropdown;
