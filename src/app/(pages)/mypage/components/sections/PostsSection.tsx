"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useUser } from "@/hooks/useUser";
import { useSortStore } from "@/store/sortStore";
import type { PostListType } from "@/types/response/post";

const POSTS_PER_PAGE = 10;

export default function PostsSection() {
  const { orderBy } = useSortStore();
  const { ref, inView } = useInView();
  const { useMyPosts } = useUser();

  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useMyPosts({
    limit: POSTS_PER_PAGE,
    orderBy: orderBy.posts,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (error) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-red-500">게시글을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  if (!data?.pages[0]?.data?.length) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-gray-500">작성한 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((post: PostListType) => (
            <div key={post.id} className="rounded-lg border p-4">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
              <div className="mt-2 text-sm text-gray-500">
                <span>댓글 {post.commentCount}</span>
                <span className="mx-2">•</span>
                <span>좋아요 {post.likeCount}</span>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}

      {/* 무한 스크롤 트리거 */}
      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          {isFetchingNextPage ? <div>로딩 중...</div> : <div className="h-4" />}
        </div>
      )}
    </div>
  );
}
