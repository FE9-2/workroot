import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";

interface InputDropdownProps {
  options: string[];
  className?: string;
}

const InputDropdown: React.FC<InputDropdownProps> = ({ options, className = "" }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [isCustomInput, setIsCustomInput] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    if (option === "직접입력") {
      setIsCustomInput(true);
      setSelectedValue("");
    } else {
      setSelectedValue(option);
      setIsCustomInput(false);
    }
    setIsOpen(false);
  };

  return (
    <div className={cn("relative inline-block text-left text-base", "w-80 md:w-[640px]", className)}>
      <div
        className={cn(
          "rounded-md border bg-gray-50 p-2",
          "hover:border-primary-gray-200",
          isOpen && "ring-1 ring-gray-300"
        )}
      >
        <input
          type="text"
          value={selectedValue}
          onChange={(e) => isCustomInput && setSelectedValue(e.target.value)}
          className={cn(
            "flex w-full items-center justify-between px-4 py-2 font-medium text-gray-700 focus:outline-none",
            "bg-gray-50"
          )}
          placeholder={isCustomInput ? "직접 입력하세요" : "선택"}
        />
        <button onClick={() => setIsOpen(!isOpen)} className="absolute right-3 top-3.5 text-3xl">
          <IoMdArrowDropdown className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
      </div>
      {isOpen && (
        <ul
          className={cn(
            "absolute right-0 z-10 mt-2 w-full rounded-md border bg-white p-2 shadow-md",
            "border-primary-gray-200"
          )}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={cn("cursor-pointer rounded-md px-6 py-4 hover:bg-gray-100")}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
