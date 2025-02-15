"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Comment from "@/app/components/card/board/Comment";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import Button from "@/app/components/button/default/Button";
import { useAddComment } from "@/hooks/queries/post/comment/useAddComment";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { useComments } from "@/hooks/queries/post/comment/useComments";
import Pagination from "@/app/components/pagination/Pagination";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { usePostDetail } from "@/hooks/queries/post/usePostDetail";

interface CommentsSectionProps {
  postId: string;
}

export function CommentsSection({ postId }: CommentsSectionProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [newComment, setNewComment] = useState("");

  const { user } = useUser();
  const {
    data: commentsData,
    isPending: isCommentsLoading,
    error: commentsError,
  } = useComments(postId, {
    page: currentPage,
    pageSize: 10,
  });

  const { isLoading } = usePostDetail(postId);

  const addComment = useAddComment(postId);

  const handleAddComment = useCallback(() => {
    if (newComment.trim()) {
      addComment.mutate(
        { content: newComment },
        {
          onSuccess: () => setNewComment(""),
        }
      );
    }
  }, [addComment, newComment]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    const commentSection = document.querySelector("#comments-section");
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (isCommentsLoading && !isLoading) {
    // 로딩 스피너 중복 방지
    return (
      <div className="flex h-[200px] items-center justify-center">
        <DotLoadingSpinner />
      </div>
    );
  }

  if (commentsError) {
    return <div className="text-center text-state-error">댓글을 불러오는데 실패했습니다.</div>;
  }

  return (
    <section className="w-full" aria-label="댓글 섹션">
      {!isLoading && (
        <>
          <div className="mb-6 text-[16px] font-semibold text-black-400 md:text-[20px] lg:text-[24px]">
            댓글({commentsData?.totalItemCount ?? 0})
          </div>

          <BaseTextArea
            name="newComment"
            placeholder="댓글을 입력해주세요."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            size="h-[120px] w-full lg:h-[144px]"
            variant="white"
          />
          <div className="flex justify-end pb-10 pt-4">
            <Button
              onClick={handleAddComment}
              disabled={addComment.isPending || !newComment.trim()}
              className="h-[50px] w-[108px] rounded-lg text-[14px] font-medium lg:h-[64px] lg:w-[214px] lg:text-lg"
            >
              {addComment.isPending ? <DotLoadingSpinner /> : "등록하기"}
            </Button>
          </div>

          <div className="mb-6">
            {commentsData?.data?.length ? (
              commentsData.data.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id.toString()}
                  nickname={comment.writer.nickname}
                  updatedAt={comment.createdAt}
                  content={comment.content}
                  isAuthor={comment.writer.id === user?.id}
                />
              ))
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-lg bg-white p-5">
                <Image src="/images/emptyComment-md.svg" alt="No comments" width={206} height={204} className="mb-4" />
              </div>
            )}
          </div>

          {(commentsData?.totalPages ?? 0) > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPage={commentsData?.totalPages ?? 0}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}
