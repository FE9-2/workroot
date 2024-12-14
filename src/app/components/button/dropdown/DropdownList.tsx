"use client";
import { cn } from "@/lib/tailwindUtil";
import { useEffect, useRef } from "react";

// 드롭다운 메뉴의 각 항목 컴포넌트
const DropdownItem = ({
  item,
  onSelect,
  itemStyle,
}: {
  item: string;
  onSelect: (item: string | null) => void;
  itemStyle?: string;
}) => {
  // 항목 클릭 핸들러
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 이벤트 버블링 방지
    onSelect(item);
  };

  return (
    <li
      onClick={handleClick}
      className={cn(
        "flex w-full cursor-pointer bg-grayscale-50 px-[10px] py-2 text-sm font-normal leading-[18px] text-black-100 hover:bg-primary-orange-50 lg:text-lg lg:leading-[26px]",
        itemStyle
      )}
    >
      {item}
    </li>
  );
};

// 드롭다운 메뉴 리스트 컴포넌트
const DropdownList = ({
  list,
  onSelect,
  wrapperStyle,
  itemStyle,
}: {
  list: string[];
  onSelect: (item: string | null) => void;
  wrapperStyle?: string;
  itemStyle?: string;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지 및 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        event.preventDefault();
        onSelect(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, { capture: true });
    };
  }, [onSelect]);

  // 컨테이너 클릭 이벤트 처리
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
      ref={dropdownRef}
      onClick={handleContainerClick}
      className={cn(
        "absolute left-0 right-0 z-10 mt-[6px] rounded border border-grayscale-100 bg-grayscale-50 pr-[2px] pt-1",
        wrapperStyle
      )}
    >
      <ul className="scrollbar-custom flex max-h-[150px] flex-col">
        {list.map((item) => (
          <DropdownItem key={item} item={item} onSelect={onSelect} itemStyle={itemStyle} />
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
