"use client";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";

interface TopMenuDropdownProps {
  // isopen 추가
  options: { label: string; value: string }[];
  className?: string;
  menuOpen: boolean;
  onClick: (menu: string) => void;
}

const EditingChip = () => {
  const tapMenuStyle = "rounded-2xl border bg-opacity-20 px-2 py-1 text-sm";

  return <span className={cn(tapMenuStyle, "border-white bg-white")}>작성중</span>;
};

const TopMenuDropdown = ({ options, className = "", menuOpen, onClick }: TopMenuDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string>(""); // 선택된 값 (label을 저장)
  const [selectedValue, setSelectedValue] = useState<string>(""); // 선택된 값 (value를 저장)

  const handleOptionClick = (option: { label: string; value: string }) => {
    setSelectedLabel(option.label); // 선택된 레이블을 저장
    setSelectedValue(option.value); // 선택된 값을 저장
    setIsOpen(false);
    onClick(option.label);
  };

  const baseStyle = "mr-4 inline-flex h-5 w-5 items-center justify-center rounded-2xl text-center text-sm";

  return (
    <div className={cn("relative inline-block w-80 text-left text-base", className)}>
      <div
        className={cn(
          "hover:border-primary-grayscale-200 bg-primary-orange-300 p-2 text-white",
          isOpen ? "rounded-b-none rounded-t-2xl ring-1 ring-line-200" : "rounded-2xl"
        )}
      >
        <div className="flex items-center pl-6">
          <span className={cn(baseStyle, "absolute bg-white font-bold text-primary-orange-300")}>
            {options[0].value}
          </span>
          <input
            type="text"
            value={selectedLabel} // 선택된 값 표시
            onChange={(e) => setSelectedLabel(e.target.value)}
            placeholder="선택"
            className={cn(
              "flex w-[108px] items-center justify-between py-2 pl-9 font-medium placeholder:text-white focus:outline-none",
              "bg-primary-orange-300"
            )}
          />
        </div>
        <div className="absolute right-3 top-1.5 mr-2 mt-2 flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
            <IoMdArrowDropdown className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
          </button>
        </div>
      </div>
      {menuOpen && isOpen && (
        <ul className="absolute right-0 z-10 w-full rounded-b-xl rounded-t-none border border-line-200 bg-white px-2">
          {options.map((option, idx) => (
            <li
              key={option.value} // 값이 고유하다면 `value`를 key로 사용
              onClick={() => handleOptionClick(option)} // option 객체 전체를 전달
              className={cn("cursor-pointer rounded-md px-6 py-3.5", "hover:bg-primary-grayscale-100")}
            >
              <span className={cn(baseStyle, "bg-background-300 font-bold text-grayscale-200")}>
                {option.value} {/* label이랑 매칭되는 value값 유지 */}
              </span>
              {option.label} {/* 옵션의 레이블 */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopMenuDropdown;
