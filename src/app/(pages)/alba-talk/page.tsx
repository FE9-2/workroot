"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePosts } from "@/hooks/queries/post/usePosts";
import { usePathname, useSearchParams } from "next/navigation";
import SortSection from "@/app/components/layout/posts/SortSection";
import SearchSection from "@/app/components/layout/forms/SearchSection";
import { useUser } from "@/hooks/queries/user/me/useUser";
import Link from "next/link";
import { RiEdit2Fill } from "react-icons/ri";
import FloatingBtn from "@/app/components/button/default/FloatingBtn";
import CardBoard from "@/app/components/card/board/CardBoard";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import { useRouter } from "next/navigation";
import ContentSection from "@/app/components/layout/ContentSection";
import useModalStore from "@/store/modalStore";

const POSTS_PER_PAGE = 10;

export default function AlbaTalk() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { openModal, closeModal } = useModalStore();

  // URL 쿼리 파라미터에서 키워드와 정렬 기준 가져오기
  const keyword = searchParams.get("keyword");
  const orderBy = searchParams.get("orderBy");

  // 무한 스크롤을 위한 Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "100px",
  });

  // 게시글 목록 조회
  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = usePosts({
    limit: POSTS_PER_PAGE,
    keyword: keyword || undefined,
    orderBy: orderBy || undefined,
  });

  // 스크롤이 하단에 도달하면 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // 리스트 아이템 클릭 시 로그인 여부 확인 후 이동
  const handlePostClick = (postId: number) => {
    if (!user) {
      openModal("customForm", {
        isOpen: true,
        title: "로그인이 필요합니다",
        content: "워크톡 게시글을 확인하려면 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?",
        confirmText: "로그인하기",
        cancelText: "취소",
        onConfirm: () => {
          closeModal();
          router.push("/login");
        },
        onCancel: () => {
          closeModal();
        },
      });
      return;
    }
    router.push(`/alba-talk/${postId}`);
  };

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-red-500">게시글 목록을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* 검색 섹션과 정렬 옵션을 고정 위치로 설정 */}
      <div className="fixed left-0 right-0 top-16 z-30 bg-white shadow-sm">
        {/* ���색 섹션 */}
        <div className="w-full border-b border-line-100">
          <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <SearchSection pathname={pathname} />
            </div>
          </div>
        </div>

        {/* 정렬 옵션 섹션 */}
        <div className="w-full border-b border-line-100">
          <div className="mx-auto flex max-w-screen-xl items-center justify-end gap-2 px-4 py-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <SortSection pathname={pathname} searchParams={searchParams} />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="w-full pt-[132px]">
        {/* 글쓰기 버튼 - 고정 위치 수정 */}
        {user && (
          <Link href="/alba-talk/add" className="fixed bottom-[50%] right-[8%] z-30 translate-y-1/2">
            <FloatingBtn icon={<RiEdit2Fill className="size-6" />} variant="orange" />
          </Link>
        )}

        {!data?.pages?.[0]?.data?.length ? (
          <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center">
            <p className="text-grayscale-500">등록된 게시��이 없습니다.</p>
          </div>
        ) : (
          <div className="mx-auto mt-4 w-full max-w-screen-xl px-3">
            <ContentSection>
              {data?.pages.map((page) => (
                <React.Fragment key={page.nextCursor}>
                  {page.data.map((post) => (
                    <div className="cursor-pointer" key={post.id} onClick={() => handlePostClick(post.id)}>
                      <CardBoard
                        id={post.id.toString()}
                        title={post.title}
                        content={post.content}
                        nickname={post.writer.nickname}
                        updatedAt={post.updatedAt}
                        commentCount={post.commentCount}
                        likeCount={post.likeCount}
                        isAuthor={post.writer.id === user?.id}
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </ContentSection>

            {/* 무한 스크롤 트리거 영역 */}
            <div ref={ref} className="h-4 w-full">
              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
