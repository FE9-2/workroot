"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useMyPosts } from "@/hooks/queries/user/me/useMyPosts";
import { useMySortStore } from "@/store/mySortStore";
import type { PostListType } from "@/types/response/post";
import { useProfileStringValue } from "@/hooks/queries/user/me/useProfileStringValue";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

// 한 페이지당 게시글 수
const POSTS_PER_PAGE = 10;

// 컴포넌트
const StatusMessage = ({ message, className = "text-grayscale-500" }: { message: string; className?: string }) => (
  <div className="flex h-[calc(100vh-200px)] items-center justify-center">
    <p className={className}>{message}</p>
  </div>
);

const PostCard = ({ post }: { post: PostListType }) => (
  <div className="rounded-lg border p-4 transition-all hover:border-primary-orange-200">
    <h3 className="font-bold">{post.title}</h3>
    <p className="text-grayscale-600">{post.content}</p>
    <div className="mt-2 text-sm text-grayscale-500">
      <span>댓글 {post.commentCount}</span>
      <span className="mx-2">•</span>
      <span>좋아요 {post.likeCount}</span>
    </div>
  </div>
);

const PostList = ({ pages }: { pages: any[] }) => (
  <>
    {pages.map((page, index) => (
      <React.Fragment key={index}>
        {page.data.map((post: PostListType) => (
          <PostCard key={post.id} post={post} />
        ))}
      </React.Fragment>
    ))}
  </>
);

export default function PostsSection() {
  // 정렬 상태 관리
  const { orderBy } = useMySortStore();
  useProfileStringValue();

  // 무한 스크롤을 위한 Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.1, // 10% 정도 보이면 트리거
    triggerOnce: true, // 한 번만 트리거 (불필요한 API 호출 방지)
    rootMargin: "100px", // 하단 100px 전에 미리 로드
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
    <div className="mt-10 space-y-4">
      <PostList pages={data.pages} />

      {/* 무한 스크롤 트리거 영역 */}
      <div ref={ref} className="h-4 w-full">
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
}
