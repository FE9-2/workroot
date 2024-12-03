"use client";

import { GoDotFill } from "react-icons/go";

interface IndicatorProps {
  imageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Indicator = ({ imageCount, currentPage, onPageChange }: IndicatorProps) => {
  const activeStyle = "size-4 text-grayscale-300 opacity-60";
  const defaultStyle = "size-3 text-grayscale-50 opacity-60";

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
    <button type="button" className="flex items-center justify-between gap-2">
      {indicators}
    </button>
  );
};

export default Indicator;
