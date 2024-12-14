"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/lib/tailwindUtil";
import DropdownList from "./dropdownComponent/DropdownList";

interface FilterDropdownProps {
  options: readonly string[];
  className?: string;
  onChange?: (selected: string) => void;
  initialValue?: string;
  readOnly?: boolean;
}

const FilterDropdown = ({ options, className = "", onChange, initialValue, readOnly = false }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(initialValue || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (initialValue) {
      setSelectedLabel(initialValue);
    }
  }, [initialValue]);

  const toggleDropdown = () => {
    if (readOnly) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    setSelectedLabel(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div
      ref={dropdownRef}
      className={cn(
        "relative inline-block text-left",
        "w-20 text-xs md:w-32 md:text-lg",
        readOnly && "cursor-default opacity-70",
        className
      )}
    >
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between rounded-md border p-2 font-medium shadow-sm",
          "text-grayscale-700 hover:bg-primary-orange-50",
          selectedLabel === options[0]
            ? "border border-grayscale-100 bg-white"
            : "border-primary-orange-300 bg-primary-orange-50"
        )}
        onClick={toggleDropdown}
        disabled={readOnly}
      >
        <span className={selectedLabel === options[0] ? "text-black-100" : "text-primary-orange-300"}>
          {selectedLabel}
        </span>
        <IoIosArrowDown
          className={cn(
            "text-orange-400 transition-transform duration-200",
            isOpen && "rotate-180",
            selectedLabel === options[0] ? "text-grayscale-200" : "text-primary-orange-300"
          )}
        />
      </button>

      {isOpen && !readOnly && (
        <DropdownList
          list={Array.from(options)}
          onSelect={handleSelect}
          wrapperStyle={className}
          itemStyle="md:text-lg text-xs"
        />
      )}
    </div>
  );
};

export default FilterDropdown;
