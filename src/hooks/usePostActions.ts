import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface LikeResponse {
  likeCount: number;
  isLiked: boolean;
}

export function usePostActions(initialPost: Post | null, initialComments: any[]) {
  const [post, setPost] = useState<Post | null>(initialPost);
  const [comments, setComments] = useState<any[]>(initialComments);
  const queryClient = useQueryClient();

  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const likeMutation = useMutation<LikeResponse, Error>({
    mutationFn: async (): Promise<LikeResponse> => {
      if (!post) throw new Error("No post to like");
      if (post.isLiked) {
        const response = await axios.delete<LikeResponse>(`/api/posts/${post.id}/like`);
        return response.data;
      } else {
        const response = await axios.post<LikeResponse>(`/api/posts/${post.id}/like`);
        return response.data;
      }
    },
    onSuccess: (data) => {
      if (post) {
        setPost({
          ...post,
          likeCount: data.likeCount,
          isLiked: data.isLiked,
        });
        queryClient.invalidateQueries({ queryKey: ["post", post.id] });
      }
    },
    onError: (error) => {
      console.error("Error toggling like:", error);
    },
  });

  const editPostMutation = useMutation({
    mutationFn: async (newContent: string) => {
      if (!post) return;
      const response = await axios.patch(`/api/posts/${post.id}`, { content: newContent });
      return response.data;
    },
    onSuccess: (updatedPost) => {
      setPost(updatedPost);
      queryClient.invalidateQueries({ queryKey: ["post", post?.id] });
    },
    onError: (error) => {
      console.error("Error editing post:", error);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async () => {
      if (!post) return;
      await axios.delete(`/api/posts/${post.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // Handle post deletion (e.g., redirect to posts list)
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!post) return;
      const response = await axios.post(`/api/posts/${post.id}/comments`, { content });
      return response.data;
    },
    onSuccess: (newComment) => {
      setComments((prevComments) => [...prevComments, newComment]);
      if (post) {
        setPost({ ...post, commentCount: post.commentCount + 1 });
      }
      queryClient.invalidateQueries({ queryKey: ["post", post?.id] });
    },
    onError: (error) => {
      console.error("Error adding comment:", error);
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: async ({ commentId, newContent }: { commentId: number; newContent: string }) => {
      const response = await axios.patch(`/api/comments/${commentId}`, { content: newContent });
      return response.data;
    },
    onSuccess: (updatedComment) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === updatedComment.id
            ? {
                ...comment,
                ...updatedComment,
                userName: updatedComment.writer.nickname,
                userImageUrl: updatedComment.writer.imageUrl,
              }
            : comment
        )
      );
      queryClient.invalidateQueries({ queryKey: ["post", post?.id] });
    },
    onError: (error) => {
      console.error("Error editing comment:", error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      await axios.delete(`/api/comments/${commentId}`);
    },
    onSuccess: (_, commentId) => {
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      if (post) {
        setPost({ ...post, commentCount: post.commentCount - 1 });
      }
      queryClient.invalidateQueries({ queryKey: ["post", post?.id] });
    },
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

  return {
    post,
    comments,
    handleLike: likeMutation.mutate,
    handleEditPost: editPostMutation.mutate,
    handleDeletePost: deletePostMutation.mutate,
    handleAddComment: addCommentMutation.mutate,
    handleEditComment: editCommentMutation.mutate,
    handleDeleteComment: deleteCommentMutation.mutate,
    isPendingLike: likeMutation.isPending,
  };
}
