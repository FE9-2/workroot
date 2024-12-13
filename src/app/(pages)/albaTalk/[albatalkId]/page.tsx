"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import CommentDetail from "@/app/components/card/board/CommentDetail";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";
import Button from "@/app/components/button/default/Button";
import { usePostActions } from "@/hooks/usePostActions";
import { Post } from "@/types/post";
import Image from "next/image";
import { format } from "date-fns";
import { useUser } from "@/hooks/queries/user/me/useUser";
import EditPostModal from "@/app/components/modal/modals/edit/EditPost";

export default function PostDetailPage() {
  const { talkId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [initialPost, setInitialPost] = useState<Post | null>(null);
  const [initialComments, setInitialComments] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [authorImageError, setAuthorImageError] = useState(false); // Added state for image error handling
  const optionsRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const { user } = useUser();

  const lastCommentElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const {
    post,
    comments = [],
    handleLike,
    handleDeletePost,
    handleAddComment,
    handleEditComment,
    handleDeleteComment,
    isPendingLike,
  } = usePostActions(initialPost, initialComments);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await fetch(`/api/posts/${talkId}`);
        const postData = await postResponse.json();
        setInitialPost(postData);

        const commentsResponse = await fetch(`/api/posts/${talkId}/comments?page=${page}&pageSize=10`);
        const commentsData = await commentsResponse.json();
        setInitialComments((prev) => {
          const newComments = page === 1 ? commentsData.data : [...prev, ...commentsData.data];
          return newComments.map((comment: any) => ({
            ...comment,
            userName: comment.writer.nickname,
            userImageUrl: comment.writer.imageUrl,
            isAuthor: comment.writer.id === user?.id,
          }));
        });
        setHasMore(commentsData.data.length > 0);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchPostAndComments();
    }
  }, [talkId, page, user]);

  if (isLoading || !post) {
    return <div>로딩 중...</div>;
  }

  console.log("Author image URL:", post.writer.imageUrl); // Added console log for image URL

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "yyyy. MM. dd");
  };

  const handleLikeClick = () => {
    handleLike();
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto flex w-full max-w-[1480px] flex-col items-center px-4 lg:px-8">
        {/* Post Content Box */}
        <div className="mb-12 flex h-[372px] w-full max-w-[327px] flex-col lg:h-[356px]">
          <div className="flex h-full flex-col">
            {/* Title and Profile Section */}
            <div className="flex h-[98px] flex-col justify-between lg:h-[128px]">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-[16px] font-semibold lg:text-[24px]">{post.title}</h1>
                {post.writer.id === user?.id && (
                  <div className="relative" ref={optionsRef}>
                    <button type="button" onClick={() => setShowOptions(!showOptions)} className="text-grayscale-500">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {showOptions && (
                      <div className="absolute right-0 mt-2 w-[80px] rounded-lg bg-white shadow-lg lg:w-[132px]">
                        <div className="flex h-[68px] flex-col justify-center gap-2 p-2 lg:h-[104px]">
                          <button
                            onClick={() => {
                              setShowEditModal(true);
                              setShowOptions(false);
                            }}
                            className="rounded-md bg-grayscale-50 p-2 text-xs text-grayscale-400 hover:bg-orange-50 hover:text-black-400 lg:text-sm"
                          >
                            수정하기
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("정말로 삭제하시겠습니까?")) {
                                handleDeletePost();
                              }
                              setShowOptions(false);
                            }}
                            className="rounded-md bg-grayscale-50 p-2 text-xs text-grayscale-400 hover:bg-orange-50 hover:text-black-400 lg:text-sm"
                          >
                            삭제하기
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <hr className="mb-4 border-t border-line-200" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {authorImageError ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300">
                      <span className="text-sm font-semibold text-gray-600">
                        {post.writer.nickname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={post.writer.imageUrl || "/icons/user/user-profile-sm.svg"}
                      alt="User Icon"
                      width={24}
                      height={24}
                      className="rounded-full"
                      onError={() => setAuthorImageError(true)}
                    />
                  )}
                  <span className="text-xs text-grayscale-500 lg:text-base">{post.writer.nickname}</span>
                  <span className="text-xs text-grayscale-500 lg:text-base">|</span>
                  <span className="text-xs text-grayscale-500 lg:text-base">{formatDate(post.createdAt)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Image
                      src="/icons/comment/comment-sm.svg"
                      alt="Comments"
                      width={24}
                      height={24}
                      className="h-[22px] w-[22px] lg:h-6 lg:w-6"
                    />
                    <span className="text-xs text-grayscale-500 lg:text-base">{post.commentCount}</span>
                  </div>
                  <div className="flex items-center gap-1 lg:gap-2">
                    <button onClick={handleLikeClick} disabled={isPendingLike}>
                      <Image
                        src={post.isLiked ? "/icons/like/like-sm-active.svg" : "/icons/like/like-sm.svg"}
                        alt="Like"
                        width={24}
                        height={24}
                        className="h-[22px] w-[22px] lg:h-6 lg:w-6"
                      />
                    </button>
                    <span className="text-xs text-grayscale-500 lg:text-base">{post.likeCount}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Content Section */}
            <div className="mt-auto h-[210px] overflow-y-auto whitespace-pre-wrap text-xs text-black-400 lg:h-[140px] lg:text-base">
              {post.content}
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mb-12 flex w-full max-w-[327px] flex-col lg:max-w-[1480px]">
          <h2 className="mb-4 text-[16px] font-semibold sm:text-[20px] lg:text-[24px]">댓글({post.commentCount})</h2>
          <hr className="mb-4 border-t border-line-200" />
          <div className="mb-[7px] flex-grow lg:mb-[10px]"></div>
          {/* Comment Input Box */}
          <div className="mt-auto">
            <div className="relative mb-4">
              <BaseTextArea
                name="newComment"
                variant="white"
                placeholder="댓글을 입력해주세요."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                size="w-full h-[132px] lg:h-[160px]"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  if (newComment.trim()) {
                    handleAddComment(newComment);
                    setNewComment("");
                  }
                }}
                className="h-[52px] w-[108px] text-base lg:h-[64px] lg:w-[214px] lg:text-xl"
              >
                등록하기
              </Button>
            </div>
          </div>
        </div>

        {/* Comments List or Empty State */}
        <div className="w-full max-w-[327px]">
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div
                  key={comment.id}
                  ref={index === comments.length - 1 ? lastCommentElementRef : undefined}
                  className="w-full"
                >
                  <CommentDetail
                    key={comment.id}
                    id={comment.id}
                    userName={comment.userName}
                    userImageUrl={comment.userImageUrl}
                    date={formatDate(comment.createdAt)}
                    comment={comment.content}
                    isAuthor={comment.isAuthor}
                    onEdit={(id, newContent) => handleEditComment({ commentId: id, newContent })}
                    onDelete={handleDeleteComment}
                  />
                </div>
              ))}
              {isLoading && <div className="text-center">로딩 중...</div>}
            </div>
          ) : (
            <div className="mt-8 flex justify-center">
              <Image src={`/images/emptyComment-md.svg`} alt="No comments" width={206} height={204} />
            </div>
          )}
        </div>
        {showEditModal && (
          <EditPostModal
            post={post}
            onClose={() => setShowEditModal(false)}
            onUpdate={(updatedPost) => {
              setInitialPost(updatedPost);
              setShowEditModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
