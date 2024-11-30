"use client";

import { useState } from "react";
import { GoDotFill } from "react-icons/go";

const Indicator = ({ imageCount }: { imageCount: number }) => {
  // 상세폼 이미지 캐러셀 하단 페이지네이션 컴포넌트
  const [currentPage, setCurrentPage] = useState<number>(1);
  const activeStyle = "size-4 text-grayscale-300 opacity-60";
  const defaultStyle = "size-3 text-grayscale-50 opacity-60";

  // 이미지 개수 만큼 동적으로 생성
  const indicators = Array(imageCount)
    .fill(null)
    .map((_, index) => (
      <GoDotFill
        key={index}
        onClick={() => setCurrentPage(index)}
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
