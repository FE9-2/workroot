"use client";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";

interface DropdownListProps {
  options: { label: string; value: string }[]; // 객체 배열 형식으로 수정
  className?: string;
}

const DropdownListBtn: React.FC<DropdownListProps> = ({ options, className = "" }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(""); // 선택된 값 (label을 저장)
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false);

  const handleOptionClick = (option: { label: string; value: string }) => {
    if (option.label === "직접입력") {
      setIsCustomInput(true);
      setSelectedValue("");
    } else {
      setSelectedValue(option.label); // 선택된 레이블을 저장
      setIsCustomInput(false);
    }
    setIsOpen(false);
  };

  const baseStyle = "mr-4 inline-flex h-5 w-5 items-center justify-center rounded-2xl text-center text-sm";
  const tapMenuStyle = "rounded-2xl border bg-opacity-20 px-2 py-1 text-sm";

  return (
    <div className={cn("relative inline-block w-80 text-left text-base", className)}>
      <div
        className={cn(
          "hover:border-primary-gray-200 bg-primary-orange-300 p-2 text-white",
          isOpen ? "rounded-b-none rounded-t-xl ring-1 ring-line-200" : "rounded-2xl" // isOpen이 false일 때 모든 테두리가 둥글게
        )}
      >
        <div className="flex items-center pl-6">
          <span className={cn(baseStyle, "absolute bg-white font-bold text-primary-orange-300")}>1</span>
          <input
            type="text"
            value={selectedValue} // 선택된 값 표시
            onChange={(e) => isCustomInput && setSelectedValue(e.target.value)}
            placeholder="선택"
            className={cn(
              "flex w-full items-center justify-between py-2 pl-9 font-medium placeholder:text-white focus:outline-none",
              "bg-primary-orange-300"
            )}
          />
        </div>
        <div className="absolute right-3 top-1.5 mr-2 mt-2 flex items-center">
          <span className={cn(tapMenuStyle, "border-white bg-white")}>작성중</span>
          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
            <IoMdArrowDropdown className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
          </button>
        </div>
      </div>
      {isOpen && (
        <ul className="absolute right-0 z-10 w-full rounded-b-xl rounded-t-none border border-line-200 bg-white p-2">
          {options.map((option, idx) => (
            <li
              key={option.value} // 값이 고유하다면 `value`를 key로 사용
              onClick={() => handleOptionClick(option)} // option 객체 전체를 전달
              className={cn("cursor-pointer rounded-md px-6 py-3", "hover:bg-primary-gray-100")}
            >
              <span className={cn(baseStyle, "bg-background-300 font-bold text-gray-200")}>
                {idx + 2} {/* 1부터 시작하는 번호 */}
              </span>
              {option.label} {/* 옵션의 레이블 */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownListBtn;
