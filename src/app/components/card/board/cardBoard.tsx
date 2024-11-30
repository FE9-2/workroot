"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export interface CardBoardProps {
  title: string;
  content: string;
  userName: string;
  date: string;
  comments: number;
  likes: number;
  variant?: "default" | "primary";
  onKebabClick?: () => void; // 케밥 버튼 클릭 핸들러
}

const CardBoard: React.FC<CardBoardProps> = ({
  title,
  content,
  userName,
  date,
  comments,
  likes,
  variant = "default",
  onKebabClick,
}) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  useEffect(() => {
    // 클라이언트 환경에서만 실행
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 600);
    };

    handleResize(); // 초기 상태 설정
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 정리
  }, []);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1); // 좋아요 취소 시 감소
    } else {
      setLikeCount((prev) => prev + 1); // 좋아요 클릭 시 증가
    }
    setIsLiked((prev) => !prev); // 좋아요 상태 토글
  };

  return (
    <div
      className={`flex flex-col rounded-[16px] border p-4 ${
        variant === "primary" ? "border-line-100 bg-primary-orange-100" : "border-line-100 bg-gray-50"
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
            className="flex h-9 w-9 items-center justify-center text-gray-500 hover:text-gray-700"
            aria-label="Options"
          >
            ⋮
          </button>
        </div>
        {/* Content */}
        <p className="line-clamp-2 font-nexon text-[14px] font-normal leading-[1.5] text-gray-500 sm:text-[16px]">
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
          {/* 이름 + 날짜 */}
          <div className="flex items-center gap-1 truncate">
            <span className="truncate font-nexon text-[14px] font-normal text-gray-500 sm:text-[16px]">{userName}</span>
            <span className="text-gray-500">|</span>
            <span className="whitespace-nowrap font-nexon text-[14px] font-normal text-gray-500 sm:text-[16px]">
              {date}
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
            <span className="font-nexon text-[14px] font-normal text-gray-500 sm:text-[16px]">{comments}</span>
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
            <span className="font-nexon text-[14px] font-normal text-gray-500 sm:text-[16px]">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBoard;
