"use client";

import { useState } from "react";
import Image from "next/image";
import { formatLocalDate } from "@/utils/workDayFormatter";
import useWidth from "@/hooks/useWidth";

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

const CardBoard = ({
  title,
  content,
  nickname,
  updatedAt,
  commentCount,
  likeCount,
  variant = "default",
  onKebabClick,
}: CardBoardProps) => {
  const { isDesktop } = useWidth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeDisplayCount, setLikeDisplayCount] = useState(likeCount);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikeDisplayCount((prev) => prev - 1); // 좋아요 취소 시 감소
    } else {
      setLikeDisplayCount((prev) => prev + 1); // 좋아요 클릭 시 증가
    }
    setIsLiked((prev) => !prev); // 좋아요 상태 토글
  };

  // 케밥 아이콘 경로 설정
  const kebabSrc = `/icons/menu/${isDesktop ? "kebab-menu-md.svg" : "kebab-menu-sm.svg"}`;

  return (
    <div
      className={`flex flex-col rounded-[16px] border p-4 ${
        variant === "primary" ? "border-primary-orange-100 bg-primary-orange-50" : "border-line-100 bg-grayscale-50"
      } w-[277px] lg:w-[320px]`}
    >
      {/* Content Section */}
      <div className="flex w-[279px] flex-1 flex-col lg:w-[320px]">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <h2 className="line-clamp-2 font-nexon text-[16px] font-semibold text-black-400 lg:text-[18px]">{title}</h2>
          {/* Kebab Icon */}
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
        <p className="line-clamp-2 whitespace-pre-wrap font-nexon text-[14px] font-normal leading-[1.5] text-grayscale-500 lg:text-[16px]">
          {content}
        </p>
      </div>

      {/* Footer Section */}
      <div className="mt-4 flex h-[24px] w-[279px] items-center justify-between lg:h-[36px] lg:w-[429px]">
        {/* Left Info */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* 유저 아이콘 */}
          <Image
            src={`/icons/user/${isDesktop ? "user-profile-md.svg" : "user-profile-sm.svg"}`}
            alt="User Icon"
            width={28}
            height={28}
          />
          {/* 닉네임 + 수정일 */}
          <div className="flex items-center gap-1 truncate">
            <span className="truncate font-nexon text-[14px] font-normal text-grayscale-500 lg:text-[16px]">
              {nickname}
            </span>
            <span className="text-grayscale-500">|</span>
            <span className="whitespace-nowrap font-nexon text-[14px] font-normal text-grayscale-500 lg:text-[16px]">
              {formatLocalDate(updatedAt)}
            </span>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-1 lg:gap-2">
          {/* 댓글 아이콘 */}
          <div className="flex items-center gap-1">
            <Image
              src={`/icons/comment/${isDesktop ? "comment-md.svg" : "comment-sm.svg"}`}
              alt="Comment Icon"
              width={22}
              height={22}
            />
            <span className="font-nexon text-[14px] font-normal text-grayscale-500 lg:text-[16px]">{commentCount}</span>
          </div>
          {/* 좋아요 */}
          <div className="flex items-center gap-1">
            <Image
              src={`/icons/like/${
                isLiked
                  ? isDesktop
                    ? "like-md-active.svg"
                    : "like-sm-active.svg"
                  : isDesktop
                    ? "like-md.svg"
                    : "like-sm.svg"
              }`}
              alt="Like Icon"
              width={22}
              height={22}
              className="cursor-pointer"
              onClick={handleLikeClick}
            />
            <span className="font-nexon text-[14px] font-normal text-grayscale-500 lg:text-[16px]">
              {likeDisplayCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBoard;
