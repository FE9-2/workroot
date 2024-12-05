"use client";
import { cn } from "@/lib/tailwindUtil";
import { useEffect, useRef } from "react";

const DropdownItem = ({
  item,
  onSelect,
  itemStyle,
}: {
  item: string;
  onSelect: (item: string) => void;
  itemStyle?: string;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onSelect(item);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li
      value={item}
      onClick={() => onSelect(item)}
      className={cn(
        "flex w-full cursor-pointer bg-grayscale-50 px-[10px] py-2 text-sm font-normal leading-[18px] text-black-100 hover:bg-primary-orange-50 lg:text-lg lg:leading-[26px]",
        itemStyle
      )}
    >
      {item}
    </li>
  );
};
const DropdownList = ({
  list,
  onSelect,
  wrapperStyle,
  itemStyle,
}: {
  list: string[];
  onSelect: (item: string) => void;
  wrapperStyle?: string;
  itemStyle?: string;
}) => {
  return (
    <div
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
      className={cn(
        "absolute left-0 right-0 z-10 mt-[6px] rounded border border-grayscale-100 bg-grayscale-50 pr-[2px] pt-1",
        wrapperStyle
      )}
    >
      <ul className="scrollbar-custom flex max-h-[100px] flex-col">
        {list.map((item) => (
          <DropdownItem key={item} item={item} onSelect={onSelect} itemStyle={itemStyle} />
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
