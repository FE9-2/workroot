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
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";

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
    <section className="w-full" aria-label="댓글 섹션">
      <div className="mb-6 ml-6 text-[16px] font-semibold text-black-400 sm:text-[20px] lg:text-[24px]">
        댓글({commentsData?.totalItemCount ?? 0})
      </div>

      <div className="p-4">
        <BaseTextArea
          name="newComment"
          placeholder="댓글을 입력해주세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="h-[90px] w-[344px] resize-none rounded-lg bg-background-200 p-4 md:w-[742px] lg:h-[100px] lg:w-[994px] xl:w-[1410px]"
          size="h-[120px] w-[375px] md:w-[768px] lg:w-[1024px] xl:w-[1440px] lg:h-[144px]"
          variant="white"
        />
      </div>
      <div className="flex justify-end p-4">
        <Button
          onClick={handleAddComment}
          disabled={addComment.isPending || !newComment.trim()}
          className="h-[64px] w-[140px] rounded-lg text-[14px] font-medium"
        >
          {addComment.isPending ? <DotLoadingSpinner /> : "등록하기"}
        </Button>
      </div>

      <div className="mt-4">
        {commentsData?.data?.length ? (
          <>
            {commentsData.data.map((comment) => (
              <div key={comment.id} className="rounded-lg bg-white p-2">
                <Comment
                  id={comment.id.toString()}
                  nickname={comment.writer.nickname}
                  updatedAt={comment.createdAt}
                  content={comment.content}
                  isAuthor={comment.writer.id === user?.id}
                />
              </div>
            ))}
          </>
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
    </section>
  );
}
