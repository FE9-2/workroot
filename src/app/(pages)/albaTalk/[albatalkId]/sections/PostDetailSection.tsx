"use client";

import { useUser } from "@/hooks/queries/user/me/useUser";
import { useLikePost } from "@/hooks/queries/post/useLikePost";
import { useDeletePost } from "@/hooks/queries/post/useDeletePost";
import Image from "next/image";
import { formatLocalDate } from "@/utils/workDayFormatter";
import KebabDropdown from "@/app/components/button/dropdown/KebabDropdown";
import useModalStore from "@/store/modalStore";
import useWidth from "@/hooks/useWidth";
import { usePostDetail } from "@/hooks/queries/post/usePostDetail";

export function PostDetailSection({ postId }: { postId: string }) {
  const { isDesktop } = useWidth();
  const { user } = useUser();
  const { data: post } = usePostDetail(postId);
  const { likePost, unlikePost } = useLikePost(postId);
  const deletePost = useDeletePost(postId);
  const { openModal } = useModalStore();

  const handleLikeClick = () => {
    if (post?.isLiked) {
      unlikePost.mutate();
    } else {
      likePost.mutate();
    }
  };

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
        openModal("customForm", { isOpen: false, title: "", content: "", onConfirm: () => {}, onCancel: () => {} });
      },
    });
  };

  const dropdownOptions = [{ label: "삭제하기", onClick: handleDelete, disabled: deletePost.isPending }];

  return (
    <article className="mb-12 w-full max-w-[327px] rounded-lg border border-line-200 bg-white p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-[16px] font-semibold lg:text-[24px]">{post?.title}</h1>
        {post?.writer.id === user?.id && <KebabDropdown options={dropdownOptions} />}
      </div>

      {/* Author Info */}
      <div className="mb-4 flex items-center gap-2">
        <Image
          src="/icons/user/user-profile-sm.svg"
          alt="User Icon"
          className="rounded-full"
          width={24}
          height={24}
          sizes="(max-width: 600px) 24px, (max-width: 1480px) 28px, 30px"
        />
        <div className="flex items-center gap-1">
          <span className="font-nexon text-[14px] font-medium text-black-400 md:text-[16px] lg:text-[18px]">
            {post?.writer.nickname}
          </span>
          <span className="text-grayscale-400">|</span>
          <span className="font-nexon text-[12px] text-grayscale-400 md:text-[14px] lg:text-[16px]">
            {formatLocalDate(post?.createdAt || new Date())}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4 min-h-[200px] whitespace-pre-wrap break-words font-nexon text-[14px] leading-[1.6] text-black-400 md:text-[16px] lg:text-[18px]">
        {post?.content}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2">
        <div className="flex items-center gap-1">
          <Image
            src={`/icons/comment/${isDesktop ? "comment-md.svg" : "comment-sm.svg"}`}
            alt="Comment Icon"
            width={22}
            height={22}
          />
          <span className="font-nexon text-[14px] font-normal text-grayscale-500 lg:text-[16px]">
            {post?.commentCount}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src={`/icons/like/${
              post?.isLiked
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
            {post?.likeCount}
          </span>
        </div>
      </div>
    </article>
  );
}
