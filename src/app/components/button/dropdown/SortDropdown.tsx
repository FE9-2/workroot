"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";

interface SortProps {
  label: string;
  options: string[];
  className?: string;
  onSortChange: (option: string) => void;
}

const SortDropdown = ({ label, options, className = "", onSortChange }: SortProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(label);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    setSelectedLabel(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative inline-block text-left", "w-20 text-xs md:w-32 md:text-lg", className)}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className={cn(
            "text-grayscale-700 flex w-full items-center justify-between rounded-md font-medium",
            "bg-transparent"
          )}
        >
          <span>{selectedLabel}</span>
          <span className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "")}>
            <IoIosArrowDown className="text-grayscale-200" />
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          className={cn(
            "ring-black absolute right-0 z-10 mt-2 overflow-y-auto rounded-md bg-white",
            "h-30 w-20 md:w-32 md:p-1 md:text-lg"
          )}
        >
          <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ul>
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "cursor-pointer rounded-md py-2 text-center",
                    "hover:text-grayscale-700 text-grayscale-200 hover:bg-primary-orange-50 hover:font-bold"
                  )}
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

export default SortDropdown;
