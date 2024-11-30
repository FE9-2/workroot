"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";
import DropdownList from "./dropdownComponent/DropdownList";

interface FilterDropdownProps {
  options: string[];
  className?: string;
}

const FilterDropdown = ({ options, className = "" }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    setSelectedLabel(option);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative inline-block text-left", "w-20 text-xs md:w-32 md:text-lg", className)}>
      <div>
        <button
          type="button"
          className={cn(
            "flex w-full items-center justify-between rounded-md border p-2 font-medium shadow-sm",
            "text-gray-700 hover:bg-primary-orange-50",
            selectedLabel === options[0]
              ? "border border-gray-100 bg-white"
              : "border-primary-orange-300 bg-primary-orange-50"
          )}
          onClick={toggleDropdown}
        >
          <span className={selectedLabel === options[0] ? "text-black-100" : "text-primary-orange-300"}>
            {selectedLabel}
          </span>
          <IoIosArrowDown
            className={cn(
              "text-orange-400 transition-transform duration-200",
              isOpen && "rotate-180",
              selectedLabel === options[0] ? "text-gray-200" : "text-primary-orange-300"
            )}
          />
        </button>
      </div>

      {isOpen && (
        <DropdownList
          list={options}
          onSelect={handleSelect}
          wrapperStyle="h-full w-[80px] md:w-[126px]"
          itemStyle="md:text-lg text-xs "
        />
      )}
    </div>
  );
};

export default FilterDropdown;
