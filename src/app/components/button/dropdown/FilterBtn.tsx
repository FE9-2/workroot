"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownProps {
  label: string;
  options: string[];
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, className = "" }) => {
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
    <div className={`relative inline-block w-20 text-left text-xs md:w-32 md:text-lg ${className}`}>
      <div>
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-md border border-orange-300 bg-white p-2 font-medium text-gray-700 shadow-sm hover:bg-orange-100"
          onClick={toggleDropdown}
        >
          <span>{selectedLabel}</span>
          <span className={`text-orange-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
            <IoIosArrowDown />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="ring-black absolute right-0 z-10 mt-2 h-40 w-20 overflow-y-auto rounded-md bg-white ring-1 ring-gray-200 md:w-32 md:text-lg">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ul>
              {options.map((option) => (
                <li
                  key={option}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-50"
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

export default Dropdown;
