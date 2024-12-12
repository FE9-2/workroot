"use client";

import React from "react";
import { useState } from "react";
import { useMyComments } from "@/hooks/queries/user/me/useMyComments";
import Pagination from "@/app/components/pagination/Pagination";
import Comment from "@/app/components/card/board/Comment";
import Link from "next/link";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import { useUser } from "@/hooks/queries/user/me/useUser";

// 한 페이지당 댓글 수
const COMMENTS_PER_PAGE = 10;

export default function CommentsSection() {
  const { user } = useUser();

  // 현재 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1);

  // 내가 작성한 댓글 목록 조회
  const { data, isLoading, error } = useMyComments({
    page: currentPage,
    pageSize: COMMENTS_PER_PAGE,
  });

  // 총 페이지 수 계산
  const totalPages = data ? Math.ceil(data.totalItemCount / COMMENTS_PER_PAGE) : 0;

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // 페이지 변경 시 상단으로 스크롤
  };

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-red-500">댓글을 불러오는데 실패했습니다.</p>
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

  // 데이터가 없는 경우 처리
  if (!data?.data?.length) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-grayscale-500">작성한 댓글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl space-y-4 px-3">
      {/* 댓글 목록 렌더링 */}
      <div className="flex flex-col gap-4">
        {data.data.map((comment) => (
          <div key={comment.id} className="rounded-lg border border-grayscale-100 p-4 hover:bg-grayscale-50">
            <Link href={`/albatalk/${comment.post.id}`}>
              <Comment
                nickname={user?.nickname || ""}
                updatedAt={comment.updatedAt}
                content={comment.content}
                onKebabClick={() => console.log("케밥 메뉴 클릭", comment.id)}
              />
            </Link>
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
