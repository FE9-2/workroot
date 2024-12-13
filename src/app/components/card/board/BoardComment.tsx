"use client";

import Image from "next/image";
import useWidth from "@/hooks/useWidth";

export interface BoardCommentProps {
  title: string;
  content: string;
  comments: string;
  date: string;
  variant?: "default" | "primary";
  onKebabClick?: () => void; // 케밥 버튼 클릭 핸들러
}

const BoardComment = ({ title, content, comments, date, variant = "default", onKebabClick }: BoardCommentProps) => {
  const { isDesktop } = useWidth();
  // 아이콘 경로 설정
  const iconSrc =
    variant === "primary"
      ? `/images/modal/${isDesktop ? "closed-orange-md.svg" : "closed-orange-sm.svg"}`
      : `/images/modal/${isDesktop ? "closed-gray-md.svg" : "closed-gray-sm.svg"}`;

  // 케밥 아이콘 경로 설정
  const kebabSrc = `/icons/menu/${isDesktop ? "kebab-menu-md.svg" : "kebab-menu-sm.svg"}`;

  return (
    <div
      className={`flex flex-col rounded-[16px] border ${
        variant === "primary" ? "border-line-100 bg-primary-orange-50" : "border-line-100 bg-grayscale-50"
      } w-[327px] p-3 lg:w-[477px] lg:p-4`}
      style={{ minHeight: "202px" }}
    >
      {/* Header + Kebab */}
      <div className="mb-1 flex items-center justify-between lg:mb-2">
        {/* Left Content: Icon + Title */}
        <div className="flex items-center gap-2">
          {/* Icon */}
          <Image
            src={iconSrc}
            alt="Document Icon"
            width={isDesktop ? 32 : 26}
            height={isDesktop ? 32 : 26}
            className="inline-block align-middle"
            style={{ transform: "translate(2px, 2px)" }} // 위치 조정
          />
          {/* Title */}
          <h2 className="line-clamp-2 font-nexon text-[12px] font-medium text-black-100 lg:text-[16px]">{title}</h2>
        </div>

        {/* Right Content: Kebab */}
        <button
          type="button"
          onClick={onKebabClick}
          className="hover:text-grayscale-700 flex items-center justify-center text-grayscale-500"
          aria-label="Options"
        >
          <Image src={kebabSrc} alt="Kebab Menu Icon" width={isDesktop ? 28 : 24} height={isDesktop ? 28 : 24} />
          {/* 크기 조정 */}
        </button>
      </div>

      {/* Content */}
      <p
        className="line-clamp-2 flex-1 overflow-hidden text-ellipsis font-nexon text-[14px] font-normal leading-[1.5] text-grayscale-500 lg:text-[16px] lg:leading-[1.75]"
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {content}
      </p>

      {/* Divider Line */}
      <div className="my-[9px] flex items-center justify-center lg:my-[16px]">
        <div className="w-[279px] bg-line-100 lg:w-[427px]" style={{ height: "1px" }}></div>
      </div>

      {/* Comments + Date */}
      <div className="flex flex-1 flex-col justify-between lg:items-start">
        <div>
          <span className="font-nexon text-[14px] font-semibold text-black-400 lg:text-[18px]">{comments}</span>
        </div>
        <div className="mt-1">
          <span className="font-nexon text-[12px] font-normal text-grayscale-500 lg:text-[16px]">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default BoardComment;
