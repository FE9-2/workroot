"use client";

// 필요한 훅과 컴포넌트 import
import { useUser } from "@/hooks/queries/user/me/useUser";
import { useLikePost } from "@/hooks/queries/post/useLikePost";
import { useDeletePost } from "@/hooks/queries/post/useDeletePost";
import Image from "next/image";
import { formatLocalDate } from "@/utils/workDayFormatter";
import KebabDropdown from "@/app/components/button/dropdown/KebabDropdown";
import useModalStore from "@/store/modalStore";
import useWidth from "@/hooks/useWidth";
import { usePostDetail } from "@/hooks/queries/post/usePostDetail";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5"; // 이전/다음 버튼 아이콘
import { toast } from "react-hot-toast";

export function PostDetailSection({ postId }: { postId: string }) {
  // 반응형 디자인을 위한 화면 크기 체크
  const { isDesktop } = useWidth();
  const { user } = useUser();
  const router = useRouter();
  const { data: post, isLoading } = usePostDetail(postId);
  const { likePost, unlikePost } = useLikePost(postId);
  const deletePost = useDeletePost(postId);
  const { openModal, closeModal } = useModalStore();

  // 이미지 캐러셀 관련 상태
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 쉼표로 구분된 이미지 URL 문자열을 배열로 변환
  const imageUrls = post?.imageUrl ? post.imageUrl.split(",").filter(Boolean) : [];

  // 이전 이미지로 이동하는 핸들러
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : imageUrls.length - 1));
  };

  // 다음 이미지로 이동하는 핸들러
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < imageUrls.length - 1 ? prev + 1 : 0));
  };

  // 낙관적 UI를 위한 상태 추가
  const [optimisticLiked, setOptimisticLiked] = useState<boolean | null>(null);
  const [optimisticLikeCount, setOptimisticLikeCount] = useState<number | null>(null);

  // post 데이터가 변경될 때 낙관적 UI 상태 초기화
  useEffect(() => {
    if (post) {
      setOptimisticLiked(post.isLiked);
      setOptimisticLikeCount(post.likeCount);
    }
  }, [post]);

  // 좋아요 토글 핸들러
  const handleLikeClick = () => {
    if (!post) return;

    // 현재 상태 저장
    const isCurrentlyLiked = optimisticLiked ?? post.isLiked;
    const currentLikeCount = optimisticLikeCount ?? post.likeCount;

    // 낙관적 업데이트
    setOptimisticLiked(!isCurrentlyLiked);
    setOptimisticLikeCount(currentLikeCount + (isCurrentlyLiked ? -1 : 1));

    // API 호출
    if (isCurrentlyLiked) {
      unlikePost.mutate(undefined, {
        onError: () => {
          // 실패 시 원래 상태로 복구
          setOptimisticLiked(isCurrentlyLiked);
          setOptimisticLikeCount(currentLikeCount);
          toast.error("좋아요 취소에 실패했습니다.");
        },
      });
    } else {
      likePost.mutate(undefined, {
        onError: () => {
          // 실패 시 원래 상태로 복구
          setOptimisticLiked(isCurrentlyLiked);
          setOptimisticLikeCount(currentLikeCount);
          toast.error("좋아요에 실패했습니다.");
        },
      });
    }
  };

  // 게시글 삭제 핸들러
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
            router.push("/work-talk");
          },
        });
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  // 게시글 수정 페이지로 이동
  const handleEdit = () => {
    router.push(`/work-talk/${postId}/edit`);
  };

  // 케밥 메뉴 옵션 설정
  const dropdownOptions = [
    { label: "수정하기", onClick: handleEdit },
    { label: "삭제하기", onClick: handleDelete, disabled: deletePost.isPending },
  ];

  // 로딩 중일 때 스피너 표시
  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="mb-12 w-full rounded-lg bg-white">
      {/* 게시글 제목과 수정/삭제 메뉴 */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-[16px] font-semibold md:text-[20px] lg:text-[24px]">{post?.title}</h1>
        {post?.writer.id === user?.id && <KebabDropdown options={dropdownOptions} />}
      </div>

      {/* 구분선 */}
      <div className="my-[9px] flex items-center justify-center lg:my-[16px]">
        <div className="w-full bg-line-100" style={{ height: "1px" }}></div>
      </div>

      {/* 작성자 정보, 댓글 수, 좋아요 수 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/user/user-profile-sm.svg"
            alt="User Icon"
            className="rounded-full"
            width={32}
            height={32}
          />
          <div className="flex items-center gap-2">
            <span className="font-medium text-black-400">{post?.writer.nickname}</span>
            <span className="text-grayscale-400">|</span>
            <span className="text-sm text-grayscale-400">{formatLocalDate(post?.createdAt || new Date())}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* 댓글 아이콘과 개수 */}
          <div className="flex items-center gap-1">
            <Image
              src={`/icons/comment/${isDesktop ? "comment-md.svg" : "comment-sm.svg"}`}
              alt="Comment Icon"
              width={24}
              height={24}
            />
            <span className="text-sm text-grayscale-500">{post?.commentCount}</span>
          </div>
          {/* 좋아요 아이콘과 개수 - 낙관적 UI 적용 */}
          <div className="flex cursor-pointer items-center gap-1" onClick={handleLikeClick}>
            <Image
              src={`/icons/like/${
                (optimisticLiked ?? post?.isLiked)
                  ? isDesktop
                    ? "like-md-active.svg"
                    : "like-sm-active.svg"
                  : isDesktop
                    ? "like-md.svg"
                    : "like-sm.svg"
              }`}
              alt="Like Icon"
              width={32}
              height={32}
              className="transition-transform hover:scale-125"
            />
            <span className="text-sm text-grayscale-500">{optimisticLikeCount ?? post?.likeCount}</span>
          </div>
        </div>
      </div>

      {/* 게시글 본문 */}
      <div className="mb-6 whitespace-pre-wrap text-sm leading-[1.6] text-black-400 md:text-base lg:text-lg">
        {post?.content}
      </div>

      {/* 이미지 캐러셀 */}
      {imageUrls.length > 0 && (
        <div className="mb-6">
          {/* 이미지 컨테이너 */}
          <div className="relative flex flex-col items-center">
            {/* 메인 이미지 */}
            <div className="relative aspect-square w-full max-w-[600px] overflow-hidden rounded-lg">
              <Image
                src={imageUrls[currentImageIndex]}
                alt={`Post Image ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain"
                priority
              />

              {/* 이미지가 2개 이상일 때만 네비게이션 버튼 표시 */}
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="bg-black/50 hover:bg-black/70 absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white transition-opacity"
                    aria-label="Previous image"
                  >
                    <IoChevronBack size={24} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="bg-black/50 hover:bg-black/70 absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-white transition-opacity"
                    aria-label="Next image"
                  >
                    <IoChevronForward size={24} />
                  </button>
                </>
              )}
            </div>

            {/* 하단 이미지 인디케이터 (점) */}
            {imageUrls.length > 1 && (
              <div className="mt-4 flex gap-2">
                {imageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-primary-orange-300"
                        : "bg-grayscale-200 hover:bg-primary-orange-200"
                    }`}
                    aria-label={`이미지 ${index + 1}번으로 이동`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
