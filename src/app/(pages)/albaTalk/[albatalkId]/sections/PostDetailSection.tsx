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
      onCancel: () =>
        openModal("customForm", {
          isOpen: false,
          title: "",
          content: "",
          onConfirm: () => {},
          onCancel: () => {},
        }),
    });
  };

  const dropdownOptions = [{ label: "삭제하기", onClick: handleDelete, disabled: deletePost.isPending }];

  return (
    <section className="mb-12 w-full rounded-lg bg-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-[16px] font-semibold sm:text-[20px] lg:text-[24px]">{post?.title}</h1>
        {post?.writer.id === user?.id && <KebabDropdown options={dropdownOptions} />}
      </div>

      {/* Divider Line */}
      <div className="my-[9px] flex items-center justify-center lg:my-[16px]">
        <div className="w-full bg-line-100" style={{ height: "1px" }}></div>
      </div>

      {/* Author Info */}
      <div className="mb-4 flex items-center gap-2">
        <Image src="/icons/user/user-profile-sm.svg" alt="User Icon" className="rounded-full" width={32} height={32} />
        <div className="flex items-center gap-2">
          <span className="font-medium text-black-400">{post?.writer.nickname}</span>
          <span className="text-grayscale-400">|</span>
          <span className="text-sm text-grayscale-400">{formatLocalDate(post?.createdAt || new Date())}</span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-6 whitespace-pre-wrap text-sm leading-[1.6] text-black-400 sm:text-base lg:text-lg">
        {post?.content}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Image
            src={`/icons/comment/${isDesktop ? "comment-md.svg" : "comment-sm.svg"}`}
            alt="Comment Icon"
            width={24}
            height={24}
          />
          <span className="text-sm text-grayscale-500">{post?.commentCount}</span>
        </div>
        <div className="flex cursor-pointer items-center gap-1" onClick={handleLikeClick}>
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
            width={24}
            height={24}
          />
          <span className="text-sm text-grayscale-500">{post?.likeCount}</span>
        </div>
      </div>
    </section>
  );
}
