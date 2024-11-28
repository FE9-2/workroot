"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";

interface FilterDropdownProps {
  label: string;
  options: string[];
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(label);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    setSelectedLabel(option);
    setIsOpen(false);
  };

  return (
    <div
      className={cn("relative inline-block text-left", "scrollbar-custom w-20 text-xs md:w-32 md:text-lg", className)}
    >
      <div>
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between rounded-md border p-2 font-medium shadow-sm",
            "border-orange-300 bg-white text-gray-700 hover:bg-primary-orange-50"
          )}
          onClick={toggleDropdown}
        >
          <span>{selectedLabel}</span>
          <IoIosArrowDown className={cn("text-orange-400 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 z-10 mt-2 overflow-y-auto rounded-md bg-white ring-1 ring-gray-200",
            "h-40 w-20 md:w-32 md:text-lg"
          )}
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ul>
              {options.map((option) => (
                <li
                  key={option}
                  className={cn("cursor-pointer px-4 py-2 hover:bg-gray-50")}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
