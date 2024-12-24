"use client";
import { PostListType } from "@/types/response/post";
import { formatLocalDate } from "@/utils/workDayFormatter";
import Image from "next/image";
import Link from "next/link";
import KebabDropdown from "../../button/dropdown/KebabDropdown";
import { useRouter } from "next/navigation";
import useModalStore from "@/store/modalStore";
import { useDeleteComment } from "@/hooks/queries/post/comment/useDeleteComment";
import { useQueryClient } from "@tanstack/react-query";

const BoardPostItem = ({
  post,
  isAuthor,
  limit,
  orderBy,
}: {
  post: PostListType;
  isAuthor: boolean;
  limit: number;
  orderBy: string;
}) => {
  const router = useRouter();
  const deleteComment = useDeleteComment(String(post.id));
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModalStore();

  const handleDelete = () => {
    openModal("customForm", {
      isOpen: true,
      title: "게시글을 삭제할까요?",
      content: "삭제된 게시글은 복구할 수 없습니다.",
      confirmText: "삭제하기",
      cancelText: "취소",
      onConfirm: () => {
        deleteComment.mutate(undefined, {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["post"] });
            await queryClient.invalidateQueries({ queryKey: ["myPosts", { limit, orderBy }] });
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
      label: "수정하기",
      onClick: () => router.push(`/work-talk/${post.id}/edit`),
    },
    {
      label: "삭제하기",
      onClick: handleDelete,
    },
  ];

  return (
    <Link
      href={`/work-talk/${post.id}`}
      className="block cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="relative flex h-[202px] min-w-[327px] flex-col justify-between rounded-[16px] border border-line-200 bg-grayscale-50 p-6 shadow-md md:w-[600px] lg:h-[264px] lg:w-full">
        <div className="flex flex-col gap-2">
          <h3 className="text-[16px] font-semibold text-black-400 lg:text-[20px]">{post.title}</h3>
          <p className="line-clamp-3 overflow-hidden text-[14px] text-grayscale-500 lg:text-[18px]">{post.content}</p>
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Image
                src={post.writer.imageUrl || "/icons/user/user-profile-md.svg"}
                alt={post.writer.nickname}
                width={24}
                height={24}
                className="size-6 overflow-hidden rounded-full lg:size-[26px]"
              />
              <span className="text-xs font-medium text-gray-500 lg:text-[16px]">{post.writer.nickname}</span>
            </div>
            <span className="text-line-200">|</span>
            <span className="text-xs text-grayscale-400 lg:text-[16px]">{formatLocalDate(post.updatedAt)}</span>
          </div>
          <div className="ml-3 flex items-center gap-2">
            <div className="flex items-center">
              <Image
                src="/icons/comment/comment-md.svg"
                alt="댓글"
                width={20}
                height={20}
                className="size-6 lg:size-9"
              />
              <span className="text-xs text-grayscale-400 lg:text-[16px]">{post.commentCount}</span>
            </div>
            <div className="flex items-center">
              <Image src="/icons/like/like-md.svg" alt="좋아요" width={20} height={20} className="size-6 lg:size-9" />
              <span className="text-xs text-grayscale-400 lg:text-[16px]">{post.likeCount}</span>
            </div>
          </div>
        </div>
        <div className="absolute right-3 top-6 size-9 bg-white text-center" onClick={(e) => e.stopPropagation()}>
          {isAuthor && <KebabDropdown options={dropdownOptions} />}
        </div>
      </div>
    </Link>
  );
};
export default BoardPostItem;
