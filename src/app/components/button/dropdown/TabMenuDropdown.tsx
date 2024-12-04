"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";
import useWidth from "@/hooks/useWidth";

interface TopMenuDropdownProps {
  // isopen 추가
  options: { label: string; isEditing: boolean }[];
  className?: string;
  menuOpen: boolean;
  onClick: (menu: string) => void;
}

const EditingChip = ({ className = "", selected }: { className?: string; selected?: boolean }) => {
  const chipStyle = "rounded-2xl border lg:border-[1.5px] px-2 py-1 text-xs lg:text-base";
  const selectedStyle = "border-grayscale-100 bg-white bg-opacity-20 text-white";
  const defaultStyle = "bg-background-100 border-grayscale-100 text-grayscale-300";
  return <span className={cn(chipStyle, selected ? selectedStyle : defaultStyle, className)}>작성중</span>;
};

const TabMenuDropdown = ({ options, className = "", menuOpen, onClick }: TopMenuDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(options[0].label); // 선택된 값 (label을 저장)

  const handleOptionClick = (option: string) => {
    setSelectedLabel(option); // 선택된 레이블을 저장
    setIsOpen(false);
    onClick(option);
  };

  const baseStyle = "mr-4 inline-flex size-5 lg:size-7 items-center justify-center rounded-2xl text-center text-sm";

  const listStyle =
    "relative flex justify-between items-center w-[327px] lg:w-[372px] h-[52px] cursor-pointer px-6 py-3 lg:py-6 lg:px-8 hover:bg-primary-grayscale-100 text-left text-sm lg:text-xl font-bold text-black-100";
  const selectedStyle = "focus:outline-none text-white bg-primary-orange-300 rounded-2xl lg:rounded-[20px]";
  const wrapperStyle = `cursor-pointer flex flex-col rounded-2xl overflow-hidden ${className}`;

  const numberStyle = `${baseStyle} bg-background-300 font-semibold text-grayscale-200`;
  const selectedIndexStyle = `bg-primary-orange-50 text-primary-orange-300`;

  // 모바일일때는 클릭 시 메뉴 펼치기 & 메뉴 선택 시 메뉴 닫기 (ArrowIcon 표시)
  const { isDesktop } = useWidth();

  return (
    <ul className={cn(wrapperStyle)}>
      {options.map((option, idx) => (
        <li
          role="button"
          className={cn(listStyle, selectedLabel === option.label && selectedStyle)}
          key={option.label}
          onClick={() => handleOptionClick(option.label)}
        >
          <span>
            <span className={cn(numberStyle, selectedLabel === option.label && selectedIndexStyle)}>{idx + 1}</span>
            <span>{option.label}</span>
            <EditingChip
              selected={selectedLabel === option.label}
              className={cn("ml-3 lg:absolute lg:right-8 lg:top-[21px]", option.isEditing ? "" : "invisible")}
            />
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn("flex items-center", selectedLabel !== option.label && "hidden")}
          >
            <IoIosArrowDown
              className={cn("size-5 transition-transform duration-200 lg:hidden", isOpen && "rotate-180")}
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TabMenuDropdown;
