"use client";

import { postSortOptions } from "@/constants/postOptions";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import Pagination from "@/app/components/pagination/Pagination";

const POSTS_PER_PAGE = 10;

export default function PostsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { useMyPosts } = useUser();
  const {
    data: postData,
    isLoading,
    error,
  } = useMyPosts({
    limit: POSTS_PER_PAGE,
    orderBy: postSortOptions.MOST_RECENT,
    cursor: ((currentPage - 1) * POSTS_PER_PAGE).toString(),
  });

  // nextCursor가 있으면 다음 페이지가 있다는 의미
  const hasNextPage = Boolean(postData?.nextCursor);
  const totalPages = hasNextPage ? currentPage + 1 : currentPage;

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

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

  if (!postData?.data?.length) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-gray-500">아직 작성한 글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 게시글 목록 */}
      <div className="space-y-4">
        {postData?.data.map((post) => (
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
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center py-4">
          <Pagination totalPage={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}
