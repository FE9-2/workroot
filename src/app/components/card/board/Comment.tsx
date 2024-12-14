"use client";

import Image from "next/image";
import { formatLocalDate } from "@/utils/workDayFormatter";
import { useState } from "react";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import Button from "@/app/components/button/default/Button";
import KebabDropdown from "@/app/components/button/dropdown/KebabDropdown";
import useModalStore from "@/store/modalStore";
import { useEditComment } from "@/hooks/queries/post/comment/useEditComment";
import { useDeleteComment } from "@/hooks/queries/post/comment/useDeleteComment";

export interface CommentProps {
  id: string;
  nickname: string;
  updatedAt: Date;
  content: string;
  isAuthor?: boolean;
}

const Comment = ({ id, nickname, updatedAt, content, isAuthor = false }: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const { openModal } = useModalStore();

  const editComment = useEditComment(id);
  const deleteComment = useDeleteComment(id);

  const handleEdit = () => {
    if (editedContent.trim() === "") return;

    editComment.mutate(
      { content: editedContent },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

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
            openModal("customForm", {
              isOpen: false,
              title: "",
              content: "",
              onConfirm: () => {},
              onCancel: () => {},
            });
          },
        });
      },
      onCancel: () => {
        openModal("customForm", {
          isOpen: false,
          title: "",
          content: "",
          onConfirm: () => {},
          onCancel: () => {},
        });
      },
    });
  };

  const dropdownOptions = [
    { label: "수정하기", onClick: () => setIsEditing(true) },
    { label: "삭제하기", onClick: handleDelete },
  ];

  if (isEditing) {
    return (
      <div className="space-y-4">
        <BaseTextArea
          name="comment"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="h-[132px] w-full lg:h-[160px]"
          variant="white"
        />
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => setIsEditing(false)}
            className="h-[40px] w-[80px] bg-grayscale-50 text-sm lg:h-[48px] lg:w-[100px]"
          >
            취소
          </Button>
          <Button
            onClick={handleEdit}
            disabled={editComment.isPending || editedContent.trim() === ""}
            className="h-[40px] w-[80px] text-sm lg:h-[48px] lg:w-[100px]"
          >
            {editComment.isPending ? "수정 중..." : "수정하기"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border border-line-200 bg-white p-4">
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
          {nickname && (
            <div className="flex items-center gap-1">
              <span className="font-nexon text-[14px] font-medium text-black-400 md:text-[16px] lg:text-[18px]">
                {nickname}
              </span>
              <span className="text-grayscale-400">|</span>
              <span className="font-nexon text-[12px] text-grayscale-400 md:text-[14px] lg:text-[16px]">
                {formatLocalDate(updatedAt)}
              </span>
            </div>
          )}
        </div>

        {isAuthor && <KebabDropdown options={dropdownOptions} />}
      </div>

      <div className="mt-3">
        <p className="whitespace-pre-wrap break-words font-nexon text-[14px] leading-[1.6] text-black-400 md:text-[16px] lg:text-[18px]">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Comment;
