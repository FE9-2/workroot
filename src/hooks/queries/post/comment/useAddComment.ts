import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { CommentType } from "@/types/response/comment";

interface AddCommentRequest {
  content: string;
}

export const useAddComment = (postId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: AddCommentRequest) => {
      const response = await axios.post<CommentType>(`/api/posts/${postId}/comments`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("댓글이 등록되었습니다!", {
        style: {
          textAlign: "center",
        },
      });
      // 댓글 목록과 게시글 상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "댓글 등록에 실패했습니다.";
        toast.error(errorMessage, {
          style: {
            textAlign: "center",
          },
        });
      } else {
        toast.error("댓글 등록 중 오류가 발생했습니다.", {
          style: {
            textAlign: "center",
          },
        });
      }
    },
  });

  return {
    ...mutation,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
