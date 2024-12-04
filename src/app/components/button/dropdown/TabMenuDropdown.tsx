"use client";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";

interface TopMenuDropdownProps {
  // isopen 추가
  options: string[];
  className?: string;
  menuOpen: boolean;
  onClick: (menu: string) => void;
}

const EditingChip = () => {
  const tapMenuStyle = "rounded-2xl border bg-opacity-20 px-2 py-1 text-sm";

  return <span className={cn(tapMenuStyle, "border-white bg-white")}>작성중</span>;
};

const ArrowIcon = () => {
  return (
    <button
      // onClick={() => setIsOpen(!isOpen)}
      className="absolute right-3 top-1.5 mr-2 mt-2 flex items-center text-3xl"
    >
      <IoMdArrowDropdown
        className={cn(
          "transition-transform duration-200"
          // , isOpen && "rotate-180"
        )}
      />
    </button>
  );
};

const TabMenuDropdown = ({ options, className = "", menuOpen, onClick }: TopMenuDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(options[0]); // 선택된 값 (label을 저장)

  const handleOptionClick = (option: string) => {
    setSelectedLabel(option); // 선택된 레이블을 저장
    setIsOpen(false);
    onClick(option);
  };

  const baseStyle = "mr-4 inline-flex size-5 lg:size-7 items-center justify-center rounded-2xl text-center text-sm";

  const listStyle =
    "w-[327px] lg:w-[372px] cursor-pointer px-6 py-3 lg:py-6 lg:px-8 hover:bg-primary-grayscale-100 text-left text-sm lg:text-xl font-bold text-black-100";
  const selectedStyle = "focus:outline-none text-white bg-primary-orange-300";
  const wrapperStyle = `flex flex-col rounded-2xl overflow-hidden ${className}`;

  const numberStyle = `${baseStyle} bg-background-300 font-semibold text-grayscale-200`;
  const selectedIndexStyle = `bg-primary-orange-50 text-primary-orange-300`;

  return (
    <ul className={cn(wrapperStyle)}>
      {options.map((option, idx) => (
        <button
          type="button"
          className={cn(listStyle, selectedLabel === option && selectedStyle)}
          key={option}
          onClick={() => handleOptionClick(option)}
        >
          <span className={cn(numberStyle, selectedLabel === option && selectedIndexStyle)}>{idx + 1}</span>
          {option}
        </button>
      ))}
    </ul>
  );
};

export default TabMenuDropdown;
