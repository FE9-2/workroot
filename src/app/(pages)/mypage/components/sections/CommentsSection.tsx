"use client";

import React from "react";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import Pagination from "@/app/components/pagination/Pagination";
import type { MyCommentType } from "@/types/response/user";

const COMMENTS_PER_PAGE = 10;

export default function CommentsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const { useMyComments } = useUser();

  const { data, isLoading, error } = useMyComments({
    page: currentPage,
    pageSize: COMMENTS_PER_PAGE,
  });

  // 페이지네이션 로직
  const totalPages = data ? Math.ceil(data.totalItemCount / COMMENTS_PER_PAGE) : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (error) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-red-500">댓글을 불러오는데 실패했습니다.</p>
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

  if (!data?.data?.length) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-gray-500">작성한 댓글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.data.map((comment: MyCommentType) => (
        <div key={comment.id} className="rounded-lg border p-4">
          <h3 className="mb-2 font-medium text-gray-900">{comment.post.title}</h3>
          <p className="text-gray-600">{comment.content}</p>
          <div className="mt-2 text-sm text-gray-500">
            <time>{new Date(comment.createdAt).toLocaleDateString()}</time>
            {comment.updatedAt !== comment.createdAt && <span className="ml-2 text-gray-400">(수정됨)</span>}
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center py-4">
          <Pagination totalPage={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}
