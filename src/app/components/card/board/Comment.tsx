"use client";

import Image from "next/image";
import { formatLocalDate } from "@/utils/workDayFormatter";
import useWidth from "@/hooks/useWidth";

export interface CommentProps {
  nickname: string;
  updatedAt: Date;
  content: string;
  onKebabClick?: () => void; // 케밥 버튼 클릭 핸들러
}

const Comment = ({ nickname, updatedAt, content, onKebabClick }: CommentProps) => {
  const { isDesktop } = useWidth();

  // 케밥 아이콘 경로 설정
  const kebabSrc = `/icons/menu/${isDesktop ? "kebab-menu-md.svg" : "kebab-menu-sm.svg"}`;
  const kebabSize = isDesktop ? 28 : 24;

  return (
    <div className="relative flex h-[122px] w-[600px] flex-col border border-line-200 p-4 md:h-[128px] md:w-[327px] lg:h-[148px] lg:w-[1480px]">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            <span className="truncate font-nexon text-[14px] text-grayscale-500 md:text-[16px] lg:text-[20px]">
              {nickname}
            </span>
            <span className="text-grayscale-500">|</span>
            <span className="font-nexon text-[14px] text-grayscale-500 md:text-[16px] lg:text-[20px]">
              {formatLocalDate(updatedAt)}
            </span>
          </div>
        </div>

        {/* Right Content: Kebab */}
        <button
          type="button"
          onClick={onKebabClick}
          className="hover:text-grayscale-700 flex items-center justify-center text-grayscale-500"
          aria-label="Options"
        >
          <Image src={kebabSrc} alt="Kebab Menu Icon" width={kebabSize} height={kebabSize} />
        </button>
      </div>

      {/* Comment */}
      <div className="mt-2 flex h-[96px] w-full flex-1 items-center overflow-hidden text-[14px] leading-[1.5] md:text-[16px] lg:text-[20px]">
        <p className="line-clamp-2 font-nexon text-black-400">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
