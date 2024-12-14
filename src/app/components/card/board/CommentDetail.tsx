"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import Button from "@/app/components/button/default/Button";

export interface CommentDetailProps {
  id: number;
  userName: string;
  userImageUrl?: string;
  date: string;
  comment: string;
  isAuthor: boolean;
  onEdit: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
}

const CommentDetail: React.FC<CommentDetailProps> = ({
  id,
  userName,
  userImageUrl,
  date,
  comment,
  isAuthor,
  onEdit,
  onDelete,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);
  const [imageError, setImageError] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    onEdit(id, editedComment);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex h-auto min-h-[128px] w-full flex-col border border-line-200 p-4 sm:min-h-[122px] lg:min-h-[148px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {imageError || !userImageUrl ? (
            <div className="relative h-6 w-6 rounded-full bg-gray-300">
              <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-600">
                {userName?.[0]?.toUpperCase() || "?"}
              </span>
            </div>
          ) : (
            <Image
              src={userImageUrl}
              alt={`${userName || "User"}'s profile`}
              width={24}
              height={24}
              className="rounded-full"
              onError={() => setImageError(true)}
            />
          )}
          <div className="flex items-center gap-1 truncate">
            <span className="truncate font-nexon text-xs text-grayscale-500 sm:text-sm lg:text-base">
              {userName || "Anonymous"}
            </span>
            <span className="mx-1 text-grayscale-500"> | </span>
            <span className="font-nexon text-xs text-grayscale-500 sm:text-sm lg:text-base">{date}</span>
          </div>
        </div>

        {isAuthor && (
          <div className="relative" ref={optionsRef}>
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              className="text-grayscale-500"
              aria-label="Options"
            >
              <Image src="/icons/menu/kebab-menu-md.svg" alt="Menu" width={28} height={28} />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-[80px] rounded-lg bg-white shadow-lg sm:w-[132px] lg:w-[132px]">
                <div className="flex h-[68px] flex-col justify-center gap-2 p-2 sm:h-[104px] lg:h-[104px]">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowOptions(false);
                    }}
                    className="rounded-md bg-grayscale-50 p-2 text-xs text-grayscale-400 hover:bg-orange-50 hover:text-black-400 sm:text-sm"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("정말로 삭제하시겠습니까?")) {
                        onDelete(id);
                      }
                      setShowOptions(false);
                    }}
                    className="rounded-md bg-grayscale-50 p-2 text-xs text-grayscale-400 hover:bg-orange-50 hover:text-black-400 sm:text-sm"
                  >
                    삭제하기
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-4">
          <BaseTextArea
            name="editComment"
            variant="white"
            placeholder="댓글을 수정해주세요."
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            size="w-full h-[132px] sm:h-[132px] lg:h-[160px]"
          />
          <div className="mt-2 flex justify-end space-x-2">
            <Button onClick={handleEdit}>저장</Button>
            <Button onClick={() => setIsEditing(false)} variant="outlined">
              취소
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4 w-full overflow-hidden text-xs leading-normal sm:text-sm lg:text-base">
          <p className="font-nexon text-black-400">{comment}</p>
        </div>
      )}
    </div>
  );
};

export default CommentDetail;
