"use client";

import Image from "next/image";
import { formatLocalDate } from "@/utils/workDayFormatter";
import KebabDropdown from "@/app/components/button/dropdown/KebabDropdown";
import useModalStore from "@/store/modalStore";
import { useDeleteComment } from "@/hooks/queries/post/comment/useDeleteComment";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface BoardCommentProps {
  id: string;
  postId: string;
  postTitle: string;
  comment: string;
  updatedAt: Date;
  isAuthor?: boolean;
}

const BoardComment = ({ id, postId, postTitle, comment, updatedAt, isAuthor = false }: BoardCommentProps) => {
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
    <div
      className={`flex w-[327px] flex-col rounded-[16px] border border-line-200 bg-grayscale-50 p-3 shadow-md md:w-[280px] lg:w-[320px] lg:p-4 xl:w-[380px]`}
      style={{ minHeight: "202px" }}
    >
      {/* Comment Section */}
      <div className="mb-4">
        <div className="w-full rounded-lg bg-white p-4">
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
              <div className="flex items-center gap-1">
                <span className="text-grayscale-400">|</span>
                <span className="font-nexon text-[12px] text-grayscale-400 md:text-[14px] lg:text-[16px]">
                  {formatLocalDate(updatedAt)}
                </span>
              </div>
            </div>

            {isAuthor && <KebabDropdown options={dropdownOptions} />}
          </div>

          <div className="mt-3">{comment}</div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="my-[9px] flex items-center justify-center lg:my-[16px]">
        <div className="w-full bg-line-100" style={{ height: "1px" }}></div>
      </div>

      {/* Post Section */}
      <div className="line-clamp-2 font-nexon text-[12px] font-medium text-black-100 lg:text-[16px]">{postTitle}</div>
    </div>
  );
};

export default BoardComment;
