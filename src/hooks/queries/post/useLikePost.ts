import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface LikePostResponse {
  message: string;
}

export const useLikePost = (postId: string) => {
  const queryClient = useQueryClient();

  const likePostMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post<LikePostResponse>(`/api/posts/${postId}/like`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("게시글을 좋아요 했습니다", {
        style: {
          textAlign: "center",
        },
      });
      // 게시글 상세 및 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "좋아요 등록에 실패했습니다.";
        toast.error(errorMessage, {
          style: {
            textAlign: "center",
          },
        });
      } else {
        toast.error("좋아요 등록 중 오류가 발생했습니다.", {
          style: {
            textAlign: "center",
          },
        });
      }
    },
  });

  const unlikePostMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete<LikePostResponse>(`/api/posts/${postId}/like`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("게시글 좋아요를 취소했습니다!", {
        style: {
          textAlign: "center",
        },
      });
      // 게시글 상세 및 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "좋아요 취소에 실패했습니다.";
        toast.error(errorMessage, {
          style: {
            textAlign: "center",
          },
        });
      } else {
        toast.error("좋아요 취소 중 오류가 발생했습니다.", {
          style: {
            textAlign: "center",
          },
        });
      }
    },
  });

  return {
    likePost: {
      ...likePostMutation,
      isPending: likePostMutation.isPending,
      error: likePostMutation.error,
    },
    unlikePost: {
      ...unlikePostMutation,
      isPending: unlikePostMutation.isPending,
      error: unlikePostMutation.error,
    },
  };
};
