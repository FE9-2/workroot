"use client";
import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { cn } from "@/lib/tailwindUtil";

interface KebabDropdownProps {
  options: { label: string; onClick: () => void }[];
  className?: string;
}

const KebabDropdown = ({ options, className = "" }: KebabDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={(e) => {
          setIsOpen(!isOpen);
          e.stopPropagation();
        }}
        className="rounded-full hover:bg-grayscale-50"
        aria-label="메뉴 더보기"
      >
        <BsThreeDotsVertical className="text-md text-grayscale-200 lg:text-xl" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-grayscale-100 bg-white shadow-lg">
          {options.map((option, index) => (
            <button
              type="button"
              key={`${index}-${option.label}`}
              onClick={(e) => {
                option.onClick();
                setIsOpen(false);
                e.stopPropagation();
              }}
              className={cn(
                "w-full px-6 py-2 text-left text-sm hover:bg-primary-orange-50",
                "text-grayscale-700 hover:text-primary-orange-300"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default KebabDropdown;
