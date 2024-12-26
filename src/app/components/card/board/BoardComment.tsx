"use client";

import Image from "next/image";
import { formatLocalDate } from "@/utils/workDayFormatter";
import KebabDropdown from "@/app/components/button/dropdown/KebabDropdown";
import useModalStore from "@/store/modalStore";
import { useDeleteComment } from "@/hooks/queries/post/comment/useDeleteComment";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

export interface BoardCommentProps {
  id: string;
  postId: string;
  postTitle: string;
  postContent: string;
  comment: string;
  updatedAt: Date;
  isAuthor?: boolean;
}

const BoardComment = ({
  id,
  postId,
  postTitle,
  comment,
  postContent,
  updatedAt,
  isAuthor = false,
}: BoardCommentProps) => {
  const { openModal, closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const deleteComment = useDeleteComment(id);
  const router = useRouter();

  const handleDelete = () => {
    openModal("customForm", {
      isOpen: true,
      title: "댓글을 삭제할까요?",
      content: "삭제된 댓글은 복구할 수 없습니다.",
      confirmText: "삭제하기",
      cancelText: "취소",
      onConfirm: () => {
        deleteComment.mutate(undefined, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            closeModal();
          },
        });
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  const dropdownOptions = [
    {
      label: "게시글 보기",
      onClick: () => router.push(`/work-talk/${postId}`),
    },
    {
      label: "삭제하기",
      onClick: handleDelete,
    },
  ];

  return (
    <div className="relative">
      <Link href={`work-talk/${postId}`}>
        <div className="relative flex h-[202px] w-[327px] flex-col gap-2 rounded-[16px] border border-line-200 bg-grayscale-50 p-6 shadow-md transition-transform hover:scale-105 md:w-[600px] lg:h-[264px] lg:w-full">
          {/* Post Section */}
          <div className="flex w-full flex-col gap-4 border-b border-line-100 pb-2 lg:pb-4">
            <div className="flex items-center gap-[6px] lg:gap-2">
              <Image
                src="/icons/document/document.svg"
                alt="Icon"
                className="size-6 rounded-full lg:size-9"
                width={24}
                height={24}
              />
              <span className="text-[12px] text-black-100 lg:text-[16px]">{postTitle}</span>
            </div>
            <p className="text-[12px] text-grayscale-500 lg:text-[16px]">{postContent}</p>
          </div>

          {/* Comment Section */}
          <div className="flex flex-col gap-3 py-1 lg:py-4">
            <div className="line-clamp-2 overflow-hidden text-[14px] font-semibold md:h-[50px] lg:text-[18px]">
              {comment}
            </div>
            <div className="line-clamp-2 text-[12px] font-medium text-grayscale-500 lg:text-[16px]">
              {formatLocalDate(updatedAt)}
            </div>
          </div>
        </div>
      </Link>
      {/* 케밥 메뉴를 Link 밖으로 이동 */}
      <div className="absolute right-6 top-6 size-9 bg-white text-center">
        {isAuthor && <KebabDropdown options={dropdownOptions} />}
      </div>
    </div>
  );
};

export default BoardComment;
