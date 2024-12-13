"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Comment from "@/app/components/card/board/Comment";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import Button from "@/app/components/button/default/Button";
import { useAddComment } from "@/hooks/queries/post/comment/useAddComment";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { useComments } from "@/hooks/queries/post/comment/useComments";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import Pagination from "@/app/components/pagination/Pagination";

interface CommentsSectionProps {
  postId: string;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isCommentsLoading) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (commentsError) {
    return <div className="text-center text-state-error">댓글을 불러오는데 실패했습니다.</div>;
  }

  return (
    <section className="w-full max-w-[327px]">
      <h2 className="mb-4 text-[16px] font-semibold sm:text-[20px] lg:text-[24px]">
        댓글({commentsData?.totalItemCount || 0})
      </h2>

      <hr className="mb-4 border-t border-line-200" />

      {/* 댓글 입력 영역 */}
      <div className="mb-8">
        <BaseTextArea
          name="newComment"
          variant="white"
          placeholder="댓글을 입력해주세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-4 h-[132px] w-full lg:h-[160px]"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleAddComment}
            disabled={addComment.isPending || !newComment.trim()}
            className="h-[52px] w-[108px] text-base lg:h-[64px] lg:w-[214px] lg:text-xl"
          >
            {addComment.isPending ? "등록 중..." : "등록하기"}
          </Button>
        </div>
      </div>

      {/* 댓글 목록 */}
      {commentsData?.data && commentsData.data.length > 0 ? (
        <div className="space-y-4">
          {commentsData.data.map((comment) => (
            <div key={comment.id}>
              <Comment
                id={comment.id.toString()}
                nickname={comment.writer.nickname}
                updatedAt={comment.createdAt}
                content={comment.content}
                isAuthor={comment.writer.id === user?.id}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <Image src="/images/emptyComment-md.svg" alt="No comments" width={206} height={204} />
        </div>
      )}

      {/* 페이지네이션 */}
      {commentsData?.totalPages && commentsData.totalPages > 0 && (
        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPage={commentsData.totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </section>
  );
}
