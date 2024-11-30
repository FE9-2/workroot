"use client";

import React from "react";
import Image from "next/image";

export interface CommentProps {
  userName: string;
  date: string;
  comment: string;
}

const Comment: React.FC<CommentProps> = ({ userName, date, comment }) => {
  return (
    <div className="flex h-[128px] w-[327px] flex-col border border-line-200 p-4 sm:h-[122px] sm:w-[600px] xl:h-[148px] xl:w-[1480px]">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Image
          src="/icons/user/user-profile-sm.svg"
          alt="User Icon"
          className="rounded-full"
          width={24}
          height={24}
          sizes="(max-width: 600px) 24px, (max-width: 1480px) 28px, 30px"
        />
        <div className="flex items-center gap-1 truncate">
          <span className="truncate font-nexon text-[14px] text-gray-500 sm:text-[16px] xl:text-[20px]">
            {userName}
          </span>
          <span className="text-gray-500">|</span>
          <span className="font-nexon text-[14px] text-gray-500 sm:text-[16px] xl:text-[20px]">{date}</span>
        </div>
      </div>

      {/* Comment  */}
      <div className="mt-2 flex h-[96px] w-full flex-1 items-center overflow-hidden text-[14px] leading-[1.5] sm:text-[16px] xl:text-[20px]">
        <p className="line-clamp-2 font-nexon text-black-400">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
