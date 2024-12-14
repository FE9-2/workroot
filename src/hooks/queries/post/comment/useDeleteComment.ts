import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteComment = (commentId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/comments/${commentId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("댓글이 삭제되었습니다!", {
        style: {
          textAlign: "center",
        },
      });
      // 댓글 목록과 게시글 상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["comments", commentId] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "댓글 삭제에 실패했습니다.";
        toast.error(errorMessage, {
          style: {
            textAlign: "center",
          },
        });
      } else {
        toast.error("댓글 삭제 중 오류가 발���했습니다.", {
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
