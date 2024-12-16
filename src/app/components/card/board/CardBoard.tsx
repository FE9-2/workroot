"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatLocalDate } from "@/utils/workDayFormatter";
import useWidth from "@/hooks/useWidth";
import KebabDropdown from "@/app/components/button/dropdown/KebabDropdown";
import useModalStore from "@/store/modalStore";
import { useDeletePost } from "@/hooks/queries/post/useDeletePost";

export interface CardBoardProps {
  id: string;
  title: string;
  content: string;
  nickname: string;
  updatedAt: Date;
  commentCount: number;
  likeCount: number;
  variant?: "default" | "primary";
  isAuthor?: boolean;
}

const CardBoard = ({
  id,
  title,
  content,
  nickname,
  updatedAt,
  commentCount,
  likeCount,
  variant = "default",
  isAuthor = false,
}: CardBoardProps) => {
  const { isDesktop } = useWidth();
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likeDisplayCount, setLikeDisplayCount] = useState(likeCount);
  const { openModal, closeModal } = useModalStore();

  const deletePost = useDeletePost(id);

  const handleDelete = () => {
    openModal("customForm", {
      isOpen: true,
      title: "게시글을 삭제할까요?",
      content: "삭제된 게시글은 복구할 수 없습니다.",
      confirmText: "삭제하기",
      cancelText: "취소",
      onConfirm: () => {
        deletePost.mutate(undefined, {
          onSuccess: () => {
            closeModal();
          },
        });
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  const handleEditTalk = () => {
    router.push(`/alba-talk/${id}/edit`);
  };

  const dropdownOptions = [
    { label: "수정하기", onClick: handleEditTalk },
    {
      label: "삭제하기",
      onClick: handleDelete,
      disabled: deletePost.isPending,
    },
  ];

  const handleLikeClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      setLikeDisplayCount((prev) => prev - 1);
    } else {
      setLikeDisplayCount((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
  };

  return (
    <div
      className={`h-[220px] w-[320px] rounded-[16px] border p-4 lg:h-[240px] lg:w-[360px] ${
        variant === "primary" ? "border-primary-orange-100 bg-primary-orange-50" : "border-line-100 bg-grayscale-50"
      } cursor-pointer`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
        }
      }}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="line-clamp-2 flex-1 font-nexon text-[16px] font-semibold text-black-400 lg:text-[18px]">
              {title}
            </h2>
            {isAuthor && (
              <div onClick={(e) => e.stopPropagation()}>
                <KebabDropdown options={dropdownOptions} />
              </div>
            )}
          </div>
          <div className="line-clamp-2 whitespace-pre-wrap break-all font-nexon text-xs font-normal leading-[1.5] text-grayscale-500 lg:text-base">
            {content}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-3">
            <Image
              src={`/icons/user/${isDesktop ? "user-profile-md.svg" : "user-profile-sm.svg"}`}
              alt="User Icon"
              width={28}
              height={28}
              className="shrink-0"
            />
            <div className="flex min-w-0 items-center gap-1">
              <span className="truncate font-nexon text-[14px] font-normal text-grayscale-500 lg:text-[16px]">
                {nickname}
              </span>
              <span className="shrink-0 text-grayscale-500">|</span>
              <span className="shrink-0 whitespace-nowrap font-nexon text-[14px] font-normal text-grayscale-500 lg:text-[16px]">
                {formatLocalDate(updatedAt)}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1 lg:gap-2">
            <div className="flex items-center gap-1">
              <Image
                src={`/icons/comment/${isDesktop ? "comment-md.svg" : "comment-sm.svg"}`}
                alt="Comment Icon"
                width={22}
                height={22}
              />
              <span className="font-nexon text-[14px] font-normal text-grayscale-500 lg:text-[16px]">
                {commentCount}
              </span>
            </div>
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
    </div>
  );
};

export default CardBoard;
