"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useMyPosts } from "@/hooks/queries/user/me/useMyPosts";
import { useMySortStore } from "@/store/mySortStore";
import { useProfileStringValue } from "@/hooks/queries/user/me/useProfileStringValue";
import CardBoard from "@/app/components/card/board/CardBoard";
import Link from "next/link";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

// 한 페이지당 게시글 수
const POSTS_PER_PAGE = 10;

// 상태 메시지 컴포넌트
const StatusMessage = ({ message, className = "text-grayscale-500" }: { message: string; className?: string }) => (
  <div className="flex h-[calc(100vh-200px)] items-center justify-center">
    <p className={className}>{message}</p>
  </div>
);

export default function PostsSection() {
  // 정렬 상태 관리
  const { orderBy } = useMySortStore();
  useProfileStringValue();

  // 무한 스크롤을 위한 Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "100px",
  });

  // 내가 작성한 게시글 목록 조회
  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useMyPosts({
    limit: POSTS_PER_PAGE,
    orderBy: orderBy.posts,
  });

  // 스크롤이 하단에 도달하면 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // 에러 상태 처리
  if (error) return <StatusMessage message="게시글을 불러오는데 실패했습니다." className="text-red-500" />;
  if (isLoading) return <LoadingSpinner />;
  // 데이터가 없는 경우 처리
  if (!data?.pages[0]?.data?.length) return <StatusMessage message="작성한 게시글이 없습니다." />;

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-4 px-3">
      {/* 게시글 목록 렌더링 */}
      <div className="flex flex-col gap-4">
        {data.pages.map((page) => (
          <React.Fragment key={page.nextCursor}>
            {page.data.map((post) => (
              <div key={post.id} className="rounded-lg border border-grayscale-100 p-4 hover:bg-grayscale-50">
                <Link href={`/albatalk/${post.id}`}>
                  <CardBoard
                    id={post.id.toString()}
                    title={post.title}
                    content={post.content}
                    nickname={post.writer.nickname}
                    updatedAt={post.updatedAt}
                    commentCount={post.commentCount}
                    likeCount={post.likeCount}
                  />
                </Link>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* 무한 스크롤 트리거 영역 */}
      <div ref={ref} className="h-4 w-full">
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
}
