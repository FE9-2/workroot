"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export interface BoardCommentProps {
  title: string;
  content: string;
  comments: string;
  date: string;
  variant?: "default" | "primary";
  onKebabClick?: () => void; // 케밥 버튼 클릭 핸들러
}

const BoardComment: React.FC<BoardCommentProps> = ({
  title,
  content,
  comments,
  date,
  variant = "default",
  onKebabClick,
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 600);
    };

    handleResize(); // 초기 상태 설정
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 정리
  }, []);

  // 아이콘 경로 설정
  const iconSrc =
    variant === "primary"
      ? `/images/modal/${isLargeScreen ? "closed-orange-md.svg" : "closed-orange-sm.svg"}`
      : `/images/modal/${isLargeScreen ? "closed-gray-md.svg" : "closed-gray-sm.svg"}`;

  // 케밥 아이콘 경로 설정
  const kebabSrc = `/icons/menu/${isLargeScreen ? "kebab-menu-md.svg" : "kebab-menu-sm.svg"}`;

  return (
    <div
      className={`flex flex-col rounded-[16px] border ${
        variant === "primary" ? "border-line-100 bg-primary-orange-50" : "border-line-100 bg-gray-50"
      } w-[327px] p-3 sm:w-[477px] sm:p-4`}
      style={{ minHeight: "202px" }}
    >
      {/* Header + Kebab */}
      <div className="mb-1 flex items-center justify-between sm:mb-2">
        {/* Left Content: Icon + Title */}
        <div className="flex items-center gap-2">
          {/* Icon */}
          <Image
            src={iconSrc}
            alt="Document Icon"
            width={isLargeScreen ? 32 : 26}
            height={isLargeScreen ? 32 : 26}
            className="inline-block align-middle"
            style={{ transform: "translate(2px, 2px)" }} // 위치 조정
          />
          {/* Title */}
          <h2 className="line-clamp-2 font-nexon text-[12px] font-medium text-black-100 sm:text-[16px]">{title}</h2>
        </div>

        {/* Right Content: Kebab */}
        <button
          onClick={onKebabClick}
          className="flex items-center justify-center text-gray-500 hover:text-gray-700"
          aria-label="Options"
        >
          <Image src={kebabSrc} alt="Kebab Menu Icon" width={28} height={28} /> {/* 크기 조정 */}
        </button>
      </div>

      {/* Content */}
      <p
        className="line-clamp-2 flex-1 overflow-hidden text-ellipsis font-nexon text-[14px] font-normal leading-[1.5] text-gray-500 sm:text-[16px] sm:leading-[1.75]"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {content}
      </p>

      {/* Divider Line */}
      <div className="my-[9px] flex items-center justify-center sm:my-[16px]">
        <div className="w-[279px] bg-line-100 sm:w-[427px]" style={{ height: "1px" }}></div>
      </div>

      {/* Comments + Date */}
      <div className="flex flex-1 flex-col justify-between sm:flex-col sm:items-start">
        <div>
          <span className="font-nexon text-[14px] font-semibold text-black-400 sm:text-[18px]">{comments}</span>
        </div>
        <div className="mt-1">
          <span className="font-nexon text-[12px] font-normal text-gray-500 sm:text-[16px]">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default BoardComment;
