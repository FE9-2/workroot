"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatLocalDate } from "@/utils/workDayFormatter";

export interface CardBoardProps {
  title: string;
  content: string;
  nickname: string;
  updatedAt: Date;
  commentCount: number;
  likeCount: number;
  variant?: "default" | "primary";
  onKebabClick?: () => void; // 케밥 버튼 클릭 핸들러
}

const CardBoard: React.FC<CardBoardProps> = ({
  title,
  content,
  nickname,
  updatedAt,
  commentCount,
  likeCount,
  variant = "default",
  onKebabClick,
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeDisplayCount, setLikeDisplayCount] = useState(likeCount);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 600);
    };

    handleResize(); // 초기 상태 설정
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 정리
  }, []);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikeDisplayCount((prev) => prev - 1); // 좋아요 취소 시 감소
    } else {
      setLikeDisplayCount((prev) => prev + 1); // 좋아요 클릭 시 증가
    }
    setIsLiked((prev) => !prev); // 좋아요 상태 토글
  };

  // 케밥 아이콘 경로 설정
  const kebabSrc = `/icons/menu/${isLargeScreen ? "kebab-menu-md.svg" : "kebab-menu-sm.svg"}`;

  return (
    <div
      className={`flex flex-col rounded-[16px] border p-4 ${
        variant === "primary" ? "border-primary-orange-100 bg-primary-orange-50" : "border-line-100 bg-grayscale-50"
      } h-[210px] w-[327px] sm:h-[280px] sm:w-[477px]`}
    >
      {/* Content Section */}
      <div className="flex h-[162px] w-[279px] flex-1 flex-col sm:h-[232px] sm:w-[429px]">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <h2 className="line-clamp-2 font-nexon text-[16px] font-semibold text-black-400 sm:text-[18px]">{title}</h2>
          {/* Kebab Icon */}
          <button
            onClick={onKebabClick}
            className="hover:text-grayscale-700 flex items-center justify-center text-grayscale-500"
            aria-label="Options"
          >
            <Image
              src={kebabSrc}
              alt="Kebab Menu Icon"
              width={isLargeScreen ? 28 : 24}
              height={isLargeScreen ? 28 : 24}
            />{" "}
            {/* 크기 조정 */}
          </button>
        </div>
        {/* Content */}
        <p className="line-clamp-2 font-nexon text-[14px] font-normal leading-[1.5] text-grayscale-500 sm:text-[16px]">
          {content}
        </p>
      </div>

      {/* Footer Section */}
      <div className="mt-4 flex h-[24px] w-[279px] items-center justify-between sm:h-[36px] sm:w-[429px]">
        {/* Left Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 유저 아이콘 */}
          <Image
            src={`/icons/user/${isLargeScreen ? "user-profile-md.svg" : "user-profile-sm.svg"}`}
            alt="User Icon"
            width={28}
            height={28}
          />
          {/* 닉네임 + 수정일 */}
          <div className="flex items-center gap-1 truncate">
            <span className="truncate font-nexon text-[14px] font-normal text-grayscale-500 sm:text-[16px]">
              {nickname}
            </span>
            <span className="text-grayscale-500">|</span>
            <span className="whitespace-nowrap font-nexon text-[14px] font-normal text-grayscale-500 sm:text-[16px]">
              {formatLocalDate(updatedAt)}
            </span>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
          {/* 댓글 아이콘 */}
          <div className="flex items-center gap-1">
            <Image
              src={`/icons/comment/${isLargeScreen ? "comment-md.svg" : "comment-sm.svg"}`}
              alt="Comment Icon"
              width={22}
              height={22}
            />
            <span className="font-nexon text-[14px] font-normal text-grayscale-500 sm:text-[16px]">{commentCount}</span>
          </div>
          {/* 좋아요 */}
          <div className="flex items-center gap-1">
            <Image
              src={`/icons/like/${
                isLiked
                  ? isLargeScreen
                    ? "like-md-active.svg"
                    : "like-sm-active.svg"
                  : isLargeScreen
                    ? "like-md.svg"
                    : "like-sm.svg"
              }`}
              alt="Like Icon"
              width={22}
              height={22}
              className="cursor-pointer"
              onClick={handleLikeClick}
            />
            <span className="font-nexon text-[14px] font-normal text-grayscale-500 sm:text-[16px]">
              {likeDisplayCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBoard;
