"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface SortProps {
  label: string;
  options: string[];
  className?: string;
  onSortChange: (option: string) => void;
}

const SortBtn: React.FC<SortProps> = ({ label, options, className = "", onSortChange }) => {
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
    <div className={`relative inline-block w-20 text-left text-xs md:w-32 md:text-lg ${className}`}>
      <div>
        <button
          type="button"
          className="bg-whitefont-medium flex w-full items-center justify-between rounded-md text-gray-700"
          onClick={toggleDropdown}
        >
          <span>{selectedLabel}</span>
          <span
            className={`transition-transform duration-200 hover:text-gray-200 ${isOpen ? "rotate-180 text-gray-200" : ""}`}
          >
            <IoIosArrowDown />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="ring-black h-30 absolute right-0 z-10 mt-2 w-20 overflow-y-auto rounded-md bg-white p-1 md:w-32 md:text-lg">
          <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <ul>
              {options.map((option) => (
                <li
                  key={option}
                  className="cursor-pointer rounded-md py-2 text-center text-gray-200 hover:bg-orange-100 hover:text-gray-700"
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

export default SortBtn;
