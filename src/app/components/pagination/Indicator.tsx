"use client";

import { GoDotFill } from "react-icons/go";

interface IndicatorProps {
  imageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Indicator = ({ imageCount, currentPage, onPageChange }: IndicatorProps) => {
  const activeStyle = "lg:size-5 text-primary-orange-300 opacity-60 size:3";
  const defaultStyle = "lg:size-3 text-primary-orange-100 opacity-60 size:1";

  // 이미지 개수 만큼 동적으로 생성
  const indicators = Array(imageCount)
    .fill(null)
    .map((_, index) => (
      <GoDotFill
        key={index}
        onClick={() => onPageChange(index)}
        className={currentPage === index ? activeStyle : defaultStyle}
      />
    ));

  return (
    <button
      type="button"
      className="flex items-center justify-between gap-1 rounded-full bg-primary-orange-50 bg-opacity-70 p-1 lg:gap-2 lg:p-2"
    >
      {indicators}
    </button>
  );
};

export default Indicator;
